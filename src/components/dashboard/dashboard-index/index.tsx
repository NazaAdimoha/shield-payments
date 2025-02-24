"use client";
import { PortfolioSection } from "@/components/dashboard/dashboard-index/portfolio-section";


import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ValueCards } from "./value-cards";
import { RecentTransactions } from "@/components/transactions/recent-transactions";

export default function DashboardPage() { 
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <MaxWidthWrapper>
        <div className="py-4 space-y-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Overview
          </h2>

          <div className="w-full mt-4 border"></div>
          <ValueCards />
          <div className="w-full mt-4 border"></div>
          <PortfolioSection />
          <RecentTransactions title={false} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
