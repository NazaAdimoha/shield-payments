import { Transaction, Portfolio } from '@/types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2023-08-30T12:30:00Z',
    amount: 38522,
    currency: 'CAD',
    type: 'transfer',
    description: 'Bills payment',
    status: 'pending',
    fees: 5,
  },
  // Add more mock transactions...
];

export const mockPortfolio: Portfolio = {
  total: 100000,
  currency: 'CAD',
  breakdown: {
    cash: 25000,
    crypto: 25000,
    stocks: 25000,
    bonds: 25000,
  },
};