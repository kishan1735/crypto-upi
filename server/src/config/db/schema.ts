import { timestamp } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const merchants = pgTable("merchant", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  hashedPassword: text("hashed_password").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  bankIfsc: text("bank")
    .references(() => banks.ifscCode)
    .notNull(),
  merchantID: varchar("merchant_id", { length: 16 }).notNull(),
  amount: integer("amount").notNull().default(0),
});

export const bankEnum = pgEnum("bank_enum", ["HDFC", "ICICI", "SBI"]);

export const banks = pgTable("bank", {
  ifscCode: text("ifscCode").notNull().primaryKey(),
  name: bankEnum("name").notNull(),
});

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  hashedPassword: text("hashed_password").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  bankIfsc: text("bank")
    .references(() => banks.ifscCode)
    .notNull(),
  amount: integer("amount").notNull().default(0),
  pin: varchar("pin", { length: 16 }).notNull(),
  mmid: text("mmid").notNull(),
  phoneNumber: text("phone_number").notNull(),
});
