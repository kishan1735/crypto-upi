import { generateQR, handleUserTransaction } from "@/api/upi";
import express from "express";

const router = express.Router();

router.post("/transaction/:id", handleUserTransaction);
router.get("/generate/:id", generateQR);

export default router;
