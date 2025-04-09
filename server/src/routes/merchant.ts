import { getMerchantById, login, register } from "@/api/merchant";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.get("/:id", getMerchantById);
router.post("/login", login);

export default router;
