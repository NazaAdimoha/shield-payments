import { NextResponse } from 'next/server';
import { mockTransactions } from '@/lib/mock-data';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const start = (page - 1) * limit;
  const end = start + limit;
  const transactions = mockTransactions.slice(start, end);
  
  return NextResponse.json({
    data: transactions,
    metadata: {
      currentPage: page,
      totalPages: Math.ceil(mockTransactions.length / limit),
      totalItems: mockTransactions.length,
    },
  });
}