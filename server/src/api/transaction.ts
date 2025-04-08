import { Blockchain } from "@/config/blockchain/blockchain";
import { asyncHandler } from "@/config/routeHandler";
import express from "express";

const router = express.Router();

const blockchain = new Blockchain();

export const transaction = asyncHandler(async (req, res, _next) => {
  const { uid, mid, amount } = req.body;

  const block = blockchain.addTransaction(uid, mid, amount);
  res.status(201).json({ message: "Transaction recorded", block });
});

export const getChain = asyncHandler(async (_req, res, _next) => {
  res.status(200).json(blockchain.getChain());
});

export default router;
