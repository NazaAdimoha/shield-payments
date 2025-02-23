  
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
  transactionId: string;
  dateTime: string;
  amount: string;
  type: "Transfer" | "Withdrawal";
  description: string;
  status: "Pending" | "Approved" | "Failed";
  recipient?: string;
  fees?: number;
  amountReceived?: string;
}

// types/table.ts
export interface PaginationMetadata {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface TableColumn<T> {
  id: string;
  header: string;
  accessorKey: keyof T;
  cell?: (props: { row: T }) => React.ReactNode;
}

// types/theme.ts
export interface ThemeStore {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

// types/dashboard.ts
export interface PortfolioBreakdownItem {
  type: 'Cash' | 'Crypto' | 'Stocks' | 'Bonds';
  percentage: number;
  amount: number;
  growth: number;
  icon: React.ReactNode;
  color: string;
}

export interface TransactionDetails {
  id: string;
  amount: string;
  dateTime: string;
  type: "Transfer" | "Withdrawal";
  recipient?: string;
  description: string;
  status: "Pending" | "Approved" | "Failed";
  amountTendered?: string;
  amountReceived?: string;
  totalFees?: string;
  transactionId: string;
}



