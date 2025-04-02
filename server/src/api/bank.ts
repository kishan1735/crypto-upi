import { db } from "@/config/db";
import { banks } from "@/config/db/schema";
import { asyncHandler } from "@/config/routeHandler";

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
