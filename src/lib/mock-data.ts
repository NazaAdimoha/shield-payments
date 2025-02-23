import { Transaction, Portfolio } from '@/types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    transactionId: 'JDEUAYYWTQ',
    dateTime: '2023-08-30T12:30:00Z',
    amount: '38522',
    type: 'Transfer', // Capital "T"
    description: 'Bills payment',
    status: 'Pending', // Capital "P"
    fees: 5,
    // etc...
  },
  {
    id: '2',
    transactionId: 'ABC123XYZ',
    dateTime: '2023-08-30T12:30:00Z',
    amount: '50000',
    type: 'Withdrawal', // Must be "Withdrawal" if you want
    description: 'Card payment',
    status: 'Approved', // Capital "A"
    fees: 15,
  },
  // ...
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