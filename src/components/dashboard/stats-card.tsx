interface StatsCardProps {
    title: string;
    value: string;
    subValue?: string;
    icon?: React.ReactNode;
  }
  
  export const StatsCard = ({ title, value, subValue, icon }: StatsCardProps) => {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500 dark:text-gray-400">{title}</h3>
          {icon}
        </div>
        <div className="mt-2">
          <div className="text-2xl font-semibold">{value}</div>
          {subValue && (
            <div className="text-sm text-gray-500 dark:text-gray-400">{subValue}</div>
          )}
        </div>
      </div>
    );
  };