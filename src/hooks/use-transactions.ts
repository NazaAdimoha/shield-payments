import { useQuery } from '@tanstack/react-query';
import { Transaction } from '@/types';

async function fetchTransactions(page: number = 1) {
  const res = await fetch(`/api/transactions?page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
}

export function useTransactions(page: number = 1) {
  return useQuery({
    queryKey: ['transactions', page],
    queryFn: () => fetchTransactions(page),
  });
}