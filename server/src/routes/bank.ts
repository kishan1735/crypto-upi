import { getAllUsersAndMerchants, init } from "@/api/bank";
import express from "express";

const router = express.Router();

router.post("/init", init);
router.get("/:name", getAllUsersAndMerchants);

export default router;
