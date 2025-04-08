import { getUserById, register } from "@/api/user";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.get("/:id", getUserById);

export default router;
