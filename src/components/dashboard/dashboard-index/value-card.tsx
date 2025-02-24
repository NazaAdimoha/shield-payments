"use client";

import { ArrowUp, Eye } from 'lucide-react';

interface ValueCardProps {
  title: string;
  value: string | number;
  growth?: {
    amount: number;
    percentage: number;
  };
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: {
    primary: {
      label: string;
      onClick: () => void;
    };
    secondary: {
      label: string;
      onClick: () => void;
    };
  };
}

export const ValueCard = ({ title, value, growth, subtitle, icon, actions }: ValueCardProps) => {
  const displayValue = typeof value === 'number' 
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
    : value;

  return (
    <div className="p-6 rounded-lg">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-6 text-sm text-gray-500 mb-1">
            <h3 className='text-[#6B7280] text-sm md:text-base leading-5 md:font-medium'>{title}</h3>
            <Eye className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-4">
            <p className="text-2xl font-semibold">C{displayValue}</p>

            {growth && (
              <div className="flex items-center gap-1">
                <ArrowUp className="w-3 h-3 text-emerald-500" />
                <span className="text-emerald-500 text-sm">
                  {growth.percentage}%
                </span>
              </div>
            )}
          {subtitle && <div className="text-sm text-emerald-500">{subtitle}</div>}
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button 
          onClick={actions?.primary.onClick}
          className="px-8 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          {actions?.primary.label}
        </button>
        <button 
          onClick={actions?.secondary.onClick}
          className="px-8 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {actions?.secondary.label}
        </button>
      </div>
    </div>
  );
}; 