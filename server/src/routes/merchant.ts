import { getMerchantById, register } from "@/api/merchant";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.get("/:id", getMerchantById);

export default router;
