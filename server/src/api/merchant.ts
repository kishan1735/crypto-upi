import { asyncHandler } from "@/config/routeHandler";
import { z } from "zod";
import sha256 from "crypto-js/sha256";
import encHex from "crypto-js/enc-hex";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { HttpCode, HttpError } from "@/config/error";
import { merchants } from "@/config/db/schema";
import bcrypt from "bcryptjs";

export const registerSchema = z.object({
  name: z.string().nonempty(),
  ifscCode: z.string().length(11),
  password: z.string().nonempty(),
  amount: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Amount must be a valid number",
  }),
});

export type RegisterType = z.infer<typeof registerSchema>;

export const register = asyncHandler(async (req, res, next) => {
  const { name, ifscCode, password, amount } = registerSchema.parse(req.body);
  const merchantExists = await db.query.merchants.findFirst({
    where: (merchant) => eq(merchant.bankIfsc, ifscCode),
  });
  if (merchantExists) {
    return next(new HttpError(HttpCode.BAD_REQUEST, "Merchant Already Exists"));
  }
  const time = new Date();
  const mid = sha256(name + time + password)
    .toString(encHex)
    .substring(0, 16);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await db.insert(merchants).values({
    name,
    bankIfsc: ifscCode,
    amount: +amount,
    hashedPassword,
    merchantID: mid,
    createdAt: time,
  });
  res.status(201).json({ success: true });
});
