import {
  generateQR,
  getAllTransactionsByBank,
  handleUserTransaction,
} from "@/api/upi";
import express from "express";

const router = express.Router();

router.post("/transaction/:id", handleUserTransaction);
router.get("/generate/:id", generateQR);
router.get("/bank/:name", getAllTransactionsByBank);

export default router;
