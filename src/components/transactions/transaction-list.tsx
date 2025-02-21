import { Badge } from '../ui/badge';

interface Transaction {
  id: string;
  date: string;
  amount: string;
  type: string;
  description: string;
  status: 'pending' | 'approved' | 'failed';
}

const statusVariants = {
  pending: 'warning',
  approved: 'success',
  failed: 'error',
} as const;

export const TransactionList = () => {
  const transactions: Transaction[] = [
    {
      id: '1',
      date: 'Aug 30, 2023 at 12:30 pm',
      amount: '38,522 CAD',
      type: 'Transfer',
      description: 'Bills payment',
      status: 'pending',
    },
    {
        id: '2',
        date: 'Aug 30, 2023 at 12:30 pm',
        amount: '63,522 CAD',
        type: 'Transfer',
        description: 'Card payment',
        status: 'approved',
      },
      {
        id: '3',
        date: 'Aug 30, 2023 at 12:30 pm',
        amount: '28,522 CAD',
        type: 'Transfer',
        description: 'Car Repairs',
        status: 'failed',
      },
    // Add more transactions...
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-200 dark:border-gray-700">
            <th className="pb-3 font-medium">Date & Time</th>
            <th className="pb-3 font-medium">Amount</th>
            <th className="pb-3 font-medium">Type</th>
            <th className="pb-3 font-medium">Description</th>
            <th className="pb-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <td className="py-4">{transaction.date}</td>
              <td className="py-4">{transaction.amount}</td>
              <td className="py-4">{transaction.type}</td>
              <td className="py-4">{transaction.description}</td>
              <td className="py-4">
                <Badge variant={statusVariants[transaction.status]}>
                  {transaction.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};