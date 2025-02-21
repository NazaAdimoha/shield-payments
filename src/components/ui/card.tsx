interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
  }
  
  export const Card = ({ title, children, className = '' }: CardProps) => {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm ${className}`}>
        {title && (
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-lg">{title}</h3>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    );
  };