import { Wallet, Bitcoin, LineChart, Banknote } from 'lucide-react';

interface PortfolioData {
  name: string;
  value: number;
  color: string;
}

interface PortfolioTableMobileProps {
  data: PortfolioData[];
  totalValue: number;
}

export function PortfolioTableMobile({ data, totalValue }: PortfolioTableMobileProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Cash':
        return <Wallet className="w-3 h-3" />;
      case 'Crypto':
        return <Bitcoin className="w-3 h-3" />;
      case 'Stocks':
        return <LineChart className="w-3 h-3" />;
      case 'Bonds':
        return <Banknote className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div 
          key={item.name}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-5 h-5 rounded-md flex items-center justify-center"
              style={{ backgroundColor: `${item.color}20` }}
            >
              {getIcon(item.name)}
            </div>
            <span className="text-sm">{item.name}</span>
            <span className="text-sm text-emerald-500">↑ 11.00%</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">25%</span>
            <span className="text-sm">
              {new Intl.NumberFormat('en-CA', { 
                style: 'currency', 
                currency: 'CAD' 
              }).format(totalValue * (item.value / 100))}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
} 