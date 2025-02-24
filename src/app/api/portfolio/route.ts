import { NextResponse } from 'next/server';

export async function GET() {
  // In a real app, this would come from a database
  const portfolioData = {
    totalValue: 100000,
    growth: {
      amount: 10000,
      percentage: 11.00
    }
  };

  return NextResponse.json(portfolioData);
} 