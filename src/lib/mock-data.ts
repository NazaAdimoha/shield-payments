import { Transaction } from '@/types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    transactionId: 'JDEUAYYWTQ',
    dateTime: '2024-05-10T11:05:00',
    amount: '38525',
    type: 'Transfer',
    description: 'Bills Payment',
    status: 'Approved',
    fees: 5,
    recipient: 'Bills.co',
    amountTendered: '250 CAD',
    totalFees: '5 CAD',
    amountReceived: '177.90 USD'
  },
  {
    id: '2',
    transactionId: 'XKVP789RTY',
    dateTime: '2024-05-09T15:30:00',
    amount: '1500',
    type: 'Withdrawal',
    description: 'ATM Withdrawal',
    status: 'Approved',
    fees: 2,
    recipient: 'Self',
    amountTendered: '1500 CAD',
    totalFees: '2 CAD',
    amountReceived: '1498 CAD'
  },
  {
    id: '3',
    transactionId: 'MNBV456QWE',
    dateTime: '2024-05-09T09:15:00',
    amount: '2750',
    type: 'Transfer',
    description: 'Rent Payment',
    status: 'Pending',
    fees: 0,
    recipient: 'Landlord Inc',
    amountTendered: '2750 CAD',
    totalFees: '0 CAD',
    amountReceived: '2750 CAD'
  },
  {
    id: '4',
    transactionId: 'POIU852ASD',
    dateTime: '2024-05-08T14:20:00',
    amount: '89',
    type: 'Transfer',
    description: 'Grocery Shopping',
    status: 'Failed',
    fees: 1,
    recipient: 'Walmart',
    amountTendered: '89 CAD',
    totalFees: '1 CAD',
    amountReceived: '0 CAD'
  },
  {
    id: '5',
    transactionId: 'LKJH147ZXC',
    dateTime: '2024-05-08T11:45:00',
    amount: '5000',
    type: 'Transfer',
    description: 'Investment Deposit',
    status: 'Approved',
    fees: 10,
    recipient: 'Trading Account',
    amountTendered: '5000 CAD',
    totalFees: '10 CAD',
    amountReceived: '4990 CAD'
  }
] as const;
