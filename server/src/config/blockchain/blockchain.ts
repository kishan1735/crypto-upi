import fs from "fs";
import path from "path";
import { Block } from "./block";
import sha256 from "crypto-js/sha256";
import encHex from "crypto-js/enc-hex";

const DATA_FILE = path.join(__dirname, "block_data.json");

export class Blockchain {
  private chain: Block[] = [];

  constructor() {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      this.chain = JSON.parse(data);
    } else {
      this.createGenesisBlock();
      this.saveChain();
    }
  }

  private saveChain() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(this.chain, null, 2), "utf-8");
  }

  private createGenesisBlock() {
    const genesisBlock: Block = this.createBlock("0", "0", 0, "0");
    this.chain.push(genesisBlock);
  }

  private createBlock(
    uid: string,
    mid: string,
    amount: number,
    previousHash: string
  ): Block {
    const timestamp = Date.now();
    const transactionId = sha256(uid + mid + timestamp + amount).toString(
      encHex
    );
    const blockWithoutHash = {
      transactionId,
      uid,
      mid,
      amount,
      timestamp,
      previousHash,
    };
    const hash = sha256(JSON.stringify(blockWithoutHash)).toString(encHex);
    return { ...blockWithoutHash, hash };
  }

  public addTransaction(uid: string, mid: string, amount: number): Block {
    const previousHash = this.chain[this.chain.length - 1].hash;
    const newBlock = this.createBlock(uid, mid, amount, previousHash);
    this.chain.push(newBlock);
    this.saveChain();
    return newBlock;
  }

  public getChain(): Block[] {
    return this.chain;
  }
}
