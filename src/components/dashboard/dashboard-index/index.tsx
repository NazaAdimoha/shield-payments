"use client";
// import { Wallet, TrendingUp, DollarSign, Landmark } from 'lucide-react';
// import { Card } from '@/components/ui/card';
// import { StatsCard } from '@/components/dashboard/stats-card';
import { PortfolioChart } from "@/components/dashboard/portfolio-chart";
// import { TransactionList } from '@/components/transactions/transaction-list';

// export default function DashboardPage() {
//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <StatsCard
//           title="My Savings"
//           value="C$0.00"
//           subValue="C$0.03 earned"
//           icon={<Wallet className="text-purple-500" size={24} />}
//         />
//         <StatsCard
//           title="My Portfolio"
//           value="C$100,000.00"
//           subValue="↑ 11.00%"
//           icon={<TrendingUp className="text-green-500" size={24} />}
//         />
//         <StatsCard
//           title="Total Earnings"
//           value="C$15,245.00"
//           subValue="This month"
//           icon={<DollarSign className="text-blue-500" size={24} />}
//         />
//         <StatsCard
//           title="Total Investments"
//           value="C$85,000.00"
//           subValue="Across assets"
//           icon={<Landmark className="text-yellow-500" size={24} />}
//         />
//       </div>

//       <Card title="Portfolio Breakdown">
//         <PortfolioChart />
//       </Card>

//       <Card title="Recent Transactions">
//         <TransactionList />
//       </Card>
//     </div>
//   );
// }

import { Card } from "@/components/ui/card";
import {
  Banknote,
  Bitcoin,
  TrendingUp,
  Landmark,
  ChevronRight,
} from "lucide-react";

import { useTransactions } from "@/hooks/use-transactions";
import { usePortfolio } from "@/hooks/use-portfolio";
import { StatusPill } from "@/components/ui/status-pill";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PortfolioCard } from "@/components/ui/portfolio-card";
import { Button } from "@/components/ui/button";

const portfolioBreakdown = [
  {
    type: "Cash",
    icon: Banknote,
    color: "text-emerald-500",
  },
  {
    type: "Crypto",
    icon: Bitcoin,
    color: "text-purple-500",
  },
  {
    type: "Stocks",
    icon: TrendingUp,
    color: "text-blue-500",
  },
  {
    type: "Bonds",
    icon: Landmark,
    color: "text-yellow-500",
  },
];

export default function DashboardPage() {
  const { data: portfolio, isLoading: isLoadingPortfolio } = usePortfolio();
  const { data: transactions } = useTransactions(1);
  const { isMobile } = useMediaQuery();

  const totalValue = portfolio?.total || 0;
  const portfolioItems = portfolioBreakdown.map((item, index) => ({
    ...item,
    percentage: 25,
    amount: `$${(totalValue * 0.25).toLocaleString()}`,
    growth: 11.0,
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <MaxWidthWrapper>
        <div className="py-4 space-y-6">
          <h3>Overview</h3>

          <div className="border border-[#E9EAEB] w-full"></div>

          <div className="mt-4 flex flex-col md:flex-row gap-4">
            {/* Card 1: My Savings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex-1 border border-gray-200 dark:border-gray-700 space-y-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                My Savings
              </p>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {portfolioItems[0].amount}
              </h2>
              <p className="text-sm text-purple-500">{totalValue}</p>
              <div className="flex flex-col md:flex-row gap-x-4">
                <Button variant="default" size="lg">
                  Add Money
                </Button>

                <Button variant="outline" size="lg">
                  Transfer
                </Button>
              </div>
            </div>

            {/* Card 2: My Portfolio */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex-1 border border-gray-200 dark:border-gray-700 space-y-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                My Portfolio
              </p>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {portfolioItems[1].amount}
              </h2>
              <p className="text-sm text-green-500">{totalValue}</p>

              <div className="flex flex-col md:flex-row gap-x-4">
                <Button variant="default" size="lg">
                  Invest
                </Button>

                <Button variant="outline" size="lg">
                  Withdaw
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Portfolio Breakdown
              </h2>
              <button className="text-primary hover:text-primary/80">
                Explore →
              </button>
            </div>

            {isMobile ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {portfolioItems.map((item, index) => (
                    <CarouselItem key={item.type}>
                      <PortfolioCard {...item} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              <PortfolioChart />
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Recent Transactions
            </h2>
            <div className="space-y-4">
              {transactions?.data.slice(0, 4).map((transaction: any) => (
                <div
                
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.dateTime).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {transaction.amount}
                    </p>
                    <StatusPill status={transaction.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
