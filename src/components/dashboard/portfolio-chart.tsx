import { PieChart, Cell, Pie } from 'recharts';

interface PortfolioData {
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

export const PortfolioChart = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="w-64 h-64">
        <PieChart width={256} height={256}>
          <Pie
            data={data}
            cx={128}
            cy={128}
            innerRadius={60}
            outerRadius={128}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="font-medium">{item.name}</span>
            </div>
            <div className="text-right">
              <div className="font-semibold">C$ 24,000.00</div>
              <div className="text-sm text-green-500">↑ C$10k (11.00%)</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};