import {
  blocksToHex,
  parseHexKey,
  reverseVidFull,
  speckEncrypt,
} from "@/config/speck";
import env from "@/config/environment";
import z from "zod";
import { and, eq, sql } from "drizzle-orm";
import { HttpCode, HttpError } from "@/config/error";
import QRCode from "qrcode";
import { asyncHandler } from "@/config/routeHandler";
import { db } from "@/config/db";
import { merchants, users } from "@/config/db/schema";
import { Blockchain } from "@/config/blockchain/blockchain";

const transactionSchema = z.object({
  mmid: z.string().nonempty(),
  vid: z.string().nonempty(),
  amount: z.coerce.number().default(0),
  pin: z.string().nonempty(),
});

const paramsSchema = z.object({
  id: z.string().nonempty(),
});

const blockchain = new Blockchain();

export const handleUserTransaction = asyncHandler(async (req, res, next) => {
  const { mmid, vid, amount, pin } = transactionSchema.parse(req.body);
  console.log(mmid, vid, amount, pin, "hi");
  const { id } = paramsSchema.parse(req.params);
  const user = await db.query.users.findFirst({
    where: (users) =>
      and(eq(users.id, id), eq(users.mmid, mmid), eq(users.pin, pin)),
  });
  if (!user) {
    return next(
      new HttpError(HttpCode.NOT_FOUND, "User credentials incorrect")
    );
  }

  const { merchantID, timestamp } = reverseVidFull(vid, env.SPECK_KEY);
  const now = Date.now();
  const maxAllowedAge = 5 * 60 * 1000;

  if (now - Number(timestamp) > maxAllowedAge) {
    return next(new HttpError(HttpCode.BAD_REQUEST, "VID Expired"));
  }

  await db.transaction(async (tx) => {
    const ms = await tx
      .update(merchants)
      .set({ amount: sql`${merchants.amount} + ${amount}` })
      .where(eq(merchants.merchantID, merchantID))
      .returning();

    if (!ms.length) {
      return next(new HttpError(HttpCode.NOT_FOUND, "Incorrect VID"));
    }

    const us = await tx
      .update(users)
      .set({ amount: sql`${users.amount} - ${amount}` })
      .where(eq(users.id, id))
      .returning();

    if (!us.length) {
      return next(new HttpError(HttpCode.NOT_FOUND, "User not found"));
    }

    blockchain.addTransaction(us[0].pin, ms[0].merchantID, amount);
  });

  res.status(200).json({ success: true });
});

export const generateQR = asyncHandler(async (req, res, next) => {
  const parsed = paramsSchema.parse(req.params);

  const merchant = await db.query.merchants.findFirst({
    where: (merchants) => eq(merchants.id, parsed.id),
  });

  if (!merchant) {
    return next(new HttpError(HttpCode.NOT_FOUND, "Merchant Not Found"));
  }
  const merchantID = merchant.merchantID;
  const timestamp = BigInt(Date.now());

  const merchantIdBuffer = Buffer.from(merchantID, "hex");

  const timestampBuffer = Buffer.alloc(8);
  timestampBuffer.writeBigUInt64BE(timestamp, 0);

  const fullBuffer = Buffer.concat([merchantIdBuffer, timestampBuffer]);
  const part1: [number, number] = [
    fullBuffer.readUInt32BE(0),
    fullBuffer.readUInt32BE(4),
  ];
  const part2: [number, number] = [
    fullBuffer.readUInt32BE(8),
    fullBuffer.readUInt32BE(12),
  ];

  const key = parseHexKey(env.SPECK_KEY);

  const encrypted1 = speckEncrypt(part1, key);
  const encrypted2 = speckEncrypt(part2, key);

  const vid = blocksToHex(encrypted1) + blocksToHex(encrypted2);

  const qrDataUrl = await QRCode.toDataURL(vid);

  res.json({
    vid,
    qr: qrDataUrl,
  });
});
