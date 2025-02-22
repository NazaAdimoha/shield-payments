    export interface Portfolio {
    total: number;
    currency: string;
    breakdown: {
      cash: number;
      crypto: number;
      stocks: number;
      bonds: number;
    };
  }

  // types/transaction.ts
export interface Transaction {
  id: string;
  dateTime: string;
  amount: string;
  type: "Transfer" | "Withdrawal";
  description: string;
  status: "Pending" | "Approved" | "Failed";
  recipient?: string;
  fees?: number;
  amountReceived?: string;
}

