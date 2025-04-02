import { relations } from "drizzle-orm";
import { banks, merchants, users } from "./schema";

export const merchantRelations = relations(merchants, ({ one }) => ({
  bank: one(banks, {
    fields: [merchants.bankIfsc],
    references: [banks.ifscCode],
    relationName: "merchant_bank",
  }),
}));

export const userRelations = relations(users, ({ one }) => ({
  bank: one(banks, {
    fields: [users.bankIfsc],
    references: [banks.ifscCode],
    relationName: "user_bank",
  }),
}));

export const bankRelations = relations(banks, ({ many }) => ({
  users: many(users, {
    relationName: "users",
  }),
  merchants: many(merchants, {
    relationName: "merchants",
  }),
}));
