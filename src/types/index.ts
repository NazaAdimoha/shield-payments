export interface Transaction {
    id: string;
    date: string;
    amount: number;
    currency: string;
    type: 'transfer' | 'withdrawal' | 'deposit';
    description: string;
    status: 'pending' | 'approved' | 'failed';
    recipientId?: string;
    fees?: number;
  }
  
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