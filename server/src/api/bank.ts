import { db } from "@/config/db";
import { banks } from "@/config/db/schema";
import { asyncHandler } from "@/config/routeHandler";
import { eq } from "drizzle-orm";
import z from "zod";

export const init = asyncHandler(async (_req, res, _next) => {
  await db.insert(banks).values([
    { ifscCode: "1234abcd123", name: "HDFC" },
    { ifscCode: "1234abcd124", name: "HDFC" },
    { ifscCode: "1234abcd125", name: "HDFC" },
    { ifscCode: "1234abcd126", name: "ICICI" },
    { ifscCode: "1234abcd127", name: "ICICI" },
    { ifscCode: "1234abcd128", name: "ICICI" },
    { ifscCode: "1234abcd129", name: "SBI" },
    { ifscCode: "1234abcd120", name: "SBI" },
    { ifscCode: "1234abcd121", name: "SBI" },
  ]);

  res.status(201).json({ success: true });
});
export const bank = ["HDFC", "ICICI", "SBI"] as const;

const bankParamsSchema = z.object({
  name: z.enum(bank),
});

export const getAllUsersAndMerchants = asyncHandler(async (req, res, _next) => {
  const { name } = bankParamsSchema.parse(req.params);

  const data = await db.query.banks.findFirst({
    where: (b) => eq(b.name, name),
    with: {
      merchants: true,
      users: true,
    },
  });

  res.status(200).json({ success: true, data });
});
