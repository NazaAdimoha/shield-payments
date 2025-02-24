"use client";
import { PieChart, Cell, Pie } from 'recharts';
import { useState, useCallback } from 'react';
import { PortfolioTable } from './portfolio-table';
import { PieChartDesktop } from './pie-chart-desktop';
import { useMediaQuery } from "@/hooks/use-media-query";
import { PortfolioTableMobile } from "./portfolio-table-mobile";

export interface PortfolioData {
  name: string;
  value: number;
  color: string;
}

const data: PortfolioData[] = [
  { name: 'Cash', value: 25, color: '#10B981' },
  { name: 'Crypto', value: 25, color: '#8B5CF6' },
  { name: 'Bonds', value: 25, color: '#F59E0B' },
  { name: 'Stocks', value: 25, color: '#3B82F6' },
];

export const PortfolioSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const {isMobile} = useMediaQuery();

  const onPieEnter = useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const onPieLeave = useCallback(() => {
    setActiveIndex(undefined);
  }, [setActiveIndex]);

  return (
    <div className="flex flex-col md:flex-row items-start gap-8">
      <div className="w-full md:w-1/3">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
          <div className="w-64 h-64 mx-auto">
            <PieChartDesktop
              data={data}
              totalValue={100000}
              activeIndex={activeIndex}
              onPieEnter={onPieEnter}
              onPieLeave={onPieLeave}
            />
          </div>

          {/* Legend - Shows on mobile & desktop */}
          <div className="flex justify-center gap-3 mt-4">
            {data.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center gap-1.5 cursor-pointer"
                onMouseEnter={() => onPieEnter(null, index)}
                onMouseLeave={onPieLeave}
                style={{ opacity: activeIndex === undefined || activeIndex === index ? 1 : 0.5 }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-gray-500">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/3">
        {isMobile ? (
          <PortfolioTableMobile data={data} totalValue={100000} />
        ) : (
          <PortfolioTable
            data={data}
            activeIndex={activeIndex}
            onRowEnter={(index) => onPieEnter(null, index)}
            onRowLeave={onPieLeave}
          />
        )}
      </div>
    </div>
  );
};