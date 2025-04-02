import { init } from "@/api/bank";
import express from "express";

const router = express.Router();

router.post("/init", init);

export default router;
