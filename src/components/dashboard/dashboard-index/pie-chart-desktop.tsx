import { PieChart, Cell, Pie } from 'recharts';

interface PieChartDesktopData {
  name: string;
  value: number;
  color: string;
}

interface PieChartDesktopProps {
  data: PieChartDesktopData[];
  totalValue: number;
  activeIndex?: number;
  onPieEnter?: (entry: any, index: number) => void;
  onPieLeave?: () => void;
  width?: number;
  height?: number;
  centerX?: number;
  centerY?: number;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
}

export function PieChartDesktop({ 
  data,
  totalValue,
  activeIndex,
  onPieEnter,
  onPieLeave,
  width = 256,
  height = 256,
  centerX = 128,
  centerY = 128,
  innerRadius = 60,
  outerRadius = 110,
  paddingAngle = 4,
}: PieChartDesktopProps) {
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        cx={centerX}
        cy={centerY}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        paddingAngle={paddingAngle}
        dataKey="value"
        onMouseEnter={onPieEnter}
        onMouseLeave={onPieLeave}
      >
        {data.map((entry, index) => (
          <Cell 
            key={`cell-${index}`} 
            fill={entry.color}
            opacity={activeIndex === undefined || activeIndex === index ? 1 : 0.5}
          />
        ))}
      </Pie>
      <text
        x={centerX}
        y={centerY - 8}
        textAnchor="middle"
        className="text-sm text-gray-600 dark:text-gray-400"
      >
        Assets
      </text>
      <text
        x={centerX}
        y={centerY + 16}
        textAnchor="middle"
        className="text-base font-semibold"
      >
        {new Intl.NumberFormat('en-CA', { 
          style: 'currency', 
          currency: 'CAD' 
        }).format(totalValue)}
      </text>
    </PieChart>
  );
} 