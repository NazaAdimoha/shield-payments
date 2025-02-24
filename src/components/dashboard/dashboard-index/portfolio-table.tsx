import { type PortfolioData } from './portfolio-section';
import { Wallet, Bitcoin, LineChart, Banknote, ChevronUp } from 'lucide-react';

interface PortfolioTableProps {
  data: PortfolioData[];
  activeIndex?: number;
  onRowEnter: (index: number) => void;
  onRowLeave: () => void;
}

const assetIcons = {
  Cash: Wallet,
  Crypto: Bitcoin,
  Stocks: LineChart,
  Bonds: Banknote,
};

export const PortfolioTable = ({ 
  data, 
  activeIndex, 
  onRowEnter, 
  onRowLeave 
}: PortfolioTableProps) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="text-sm text-gray-500 border-b border-gray-100">
          <th className="text-left pb-4">Asset Class</th>
          <th className="text-left pb-4">% of Assets</th>
          <th className="text-left pb-4">Value</th>
          <th className="text-left pb-4">Return</th>
          <th className="w-8 pb-4"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          const Icon = assetIcons[item.name as keyof typeof assetIcons];
          return (
            <tr 
              key={item.name}
              className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer"
              onMouseEnter={() => onRowEnter(index)}
              onMouseLeave={onRowLeave}
              style={{ opacity: activeIndex === undefined || activeIndex === index ? 1 : 0.5 }}
            >
              <td className="py-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" 
                       style={{ backgroundColor: item.color + '20' }}>
                    <Icon size={16} style={{ color: item.color }} />
                  </div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
              </td>
              <td className="text-left py-4 text-gray-600">25%</td>
              <td className="text-left py-4 text-gray-600">C$ 24,000.00</td>
              <td className="text-left py-4">
                <span className="text-emerald-500">↑ C$10k (11.00%)</span>
              </td>
              <td className="text-right py-4">
                <ChevronUp className="text-gray-400" size={16} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}; 