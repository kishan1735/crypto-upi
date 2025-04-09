import { getAllUsersAndMerchants, init } from "@/api/bank";
import { getChain } from "@/api/transaction";
import express from "express";

const router = express.Router();

router.post("/init", init);
router.get("/blockchain/get", getChain);
router.get("/:name", getAllUsersAndMerchants);

export default router;
