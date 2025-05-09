import { asyncHandler } from "@/config/routeHandler";
import { z } from "zod";
import sha256 from "crypto-js/sha256";
import encHex from "crypto-js/enc-hex";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { HttpCode, HttpError } from "@/config/error";
import { users } from "@/config/db/schema";
import bcrypt from "bcryptjs";

const registerSchema = z.object({
  name: z.string().nonempty(),
  ifscCode: z.string().length(11),
  password: z.string().nonempty(),
  amount: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Amount must be a valid number",
  }),
  phoneNumber: z.string(),
  pin: z
    .string()
    .length(16)
    .refine((val) => !isNaN(Number(val)), {
      message: "Pin should be a number",
    }),
});

export const register = asyncHandler(async (req, res, next) => {
  const { name, ifscCode, password, amount, pin, phoneNumber } =
    registerSchema.parse(req.body);
  const userExists = await db.query.users.findFirst({
    where: (user) => eq(user.bankIfsc, ifscCode),
  });
  if (userExists) {
    return next(new HttpError(HttpCode.BAD_REQUEST, "User Already Exists"));
  }

  const mmid = sha256(pin + phoneNumber)
    .toString(encHex)
    .substring(0, 16);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await db.insert(users).values({
    name,
    bankIfsc: ifscCode,
    amount: +amount,
    hashedPassword,
    phoneNumber,
    mmid,
    pin,
  });
  res.status(201).json({ success: true });
});

export const paramsSchema = z.object({
  id: z.string().nonempty(),
});

export const getUserById = asyncHandler(async (req, res, _next) => {
  const parsed = paramsSchema.parse(req.params);

  const user = await db.query.users.findFirst({
    where: (users) => eq(users.id, parsed.id),
  });

  res.status(200).json({ success: true, user });
});

const loginSchema = z.object({
  name: z.string().nonempty(),
  password: z.string().nonempty(),
});

export const login = asyncHandler(async (req, res, next) => {
  const parsed = loginSchema.parse(req.body);

  const user = await db.query.users.findFirst({
    where: (users) => eq(users.name, parsed.name),
  });

  if (!user) {
    return next(new HttpError(HttpCode.NOT_FOUND, "User Not Found"));
  }

  const pass = await bcrypt.compare(parsed.password, user.hashedPassword);

  if (!pass) {
    return next(new HttpError(HttpCode.BAD_REQUEST, "Password Incorrect"));
  }
  console.log(user);

  res.status(200).json({ success: true, user });
});
