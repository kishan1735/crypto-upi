export interface Block {
  transactionId: string;
  uid: string;
  mid: string;
  amount: number;
  timestamp: number;
  hash: string;
  previousHash: string;
}
