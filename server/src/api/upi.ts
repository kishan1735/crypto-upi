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
import { bankParamsSchema } from "./bank";

const transactionSchema = z.object({
  mmid: z.string().nonempty(),
  vid: z.string().nonempty(),
  amount: z.coerce.number().default(0),
  pin: z.string().nonempty(),
});

const paramsSchema = z.object({
  id: z.string().nonempty(),
});

const hdfc_blockchain = new Blockchain("HDFC");
const icici_blockchain = new Blockchain("ICICI");
const sbi_blockchain = new Blockchain("SBI");

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

    const merch_with_bank = await tx.query.merchants.findFirst({
      where: (m) => eq(m.id, ms[0].id),
      with: {
        merchant_bank: true,
      },
    });

    const user_with_bank = await tx.query.users.findFirst({
      where: (u) => eq(u.id, us[0].id),
      with: {
        user_bank: true,
      },
    });

    if (
      merch_with_bank?.merchant_bank.name === "HDFC" ||
      user_with_bank?.user_bank.name === "HDFC"
    ) {
      hdfc_blockchain.addTransaction(us[0].pin, ms[0].merchantID, amount);
    } else if (
      merch_with_bank?.merchant_bank.name === "ICICI" ||
      user_with_bank?.user_bank.name === "ICICI"
    ) {
      icici_blockchain.addTransaction(us[0].pin, ms[0].merchantID, amount);
    } else if (
      merch_with_bank?.merchant_bank.name === "SBI" ||
      user_with_bank?.user_bank.name === "SBI"
    ) {
      sbi_blockchain.addTransaction(us[0].pin, ms[0].merchantID, amount);
    }
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

export const getAllTransactionsByBank = asyncHandler(
  async (req, res, _next) => {
    const { name } = bankParamsSchema.parse(req.params);
    if (name === "HDFC") {
      res.json({ chain: hdfc_blockchain.getChain() });
    } else if (name === "SBI") {
      res.json({ chain: sbi_blockchain.getChain() });
    } else if (name === "ICICI") {
      res.json({ chain: icici_blockchain.getChain() });
    } else {
      res
        .status(500)
        .json({ success: "false", message: "Internal Server Error" });
    }
  }
);
