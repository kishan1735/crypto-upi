import { Block } from "./block";
import sha256 from "crypto-js/sha256";
import encHex from "crypto-js/enc-hex";

export class Blockchain {
  private chain: Block[] = [];

  constructor() {
    this.createGenesisBlock();
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
    return newBlock;
  }

  public getChain(): Block[] {
    return this.chain;
  }
}
