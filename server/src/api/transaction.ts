import { Blockchain } from "@/config/blockchain/blockchain";
import { asyncHandler } from "@/config/routeHandler";
import express from "express";

const router = express.Router();

const hdfc_blockchain = new Blockchain("hdfc");

export const getChain = asyncHandler(async (_req, res, _next) => {
  // res.status(200).json(blockchain.getChain());
});

export default router;
