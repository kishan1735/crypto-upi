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
  phoneNumber: z.string().nonempty(),
});

export type RegisterType = z.infer<typeof registerSchema>;

export const register = asyncHandler(async (req, res, next) => {
  const { name, ifscCode, password, amount, phoneNumber } =
    registerSchema.parse(req.body);
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
    phoneNumber,
  });
  res.status(201).json({ success: true });
});

export const paramsSchema = z.object({
  id: z.string().nonempty(),
});

export const getMerchantById = asyncHandler(async (req, res, _next) => {
  const parsed = paramsSchema.parse(req.params);

  const merchant = await db.query.merchants.findFirst({
    where: (merchants) => eq(merchants.id, parsed.id),
  });

  res.status(200).json({ success: true, merchant });
});

const loginSchema = z.object({
  name: z.string().nonempty(),
  password: z.string().nonempty(),
});

export const login = asyncHandler(async (req, res, next) => {
  const parsed = loginSchema.parse(req.body);

  const merchant = await db.query.merchants.findFirst({
    where: (merchant) => eq(merchant.name, parsed.name),
  });

  if (!merchant) {
    return next(new HttpError(HttpCode.NOT_FOUND, "User Not Found"));
  }

  const pass = await bcrypt.compare(parsed.password, merchant.hashedPassword);

  if (!pass) {
    return next(new HttpError(HttpCode.BAD_REQUEST, "Password Incorrect"));
  }

  res.status(200).json({ success: true, merchant });
});
