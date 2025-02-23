import { cn } from "@/lib/utils";

interface StatusPillProps {
  status: "Pending" | "Approved" | "Failed";
  className?: string;
}

const statusConfig = {
  Pending: {
    backgroundColor: "bg-yellow-50 dark:bg-yellow-900/20",
    textColor: "text-yellow-700 dark:text-yellow-500",
  },
  Approved: {
    backgroundColor: "bg-green-50 dark:bg-green-900/20",
    textColor: "text-green-700 dark:text-green-500",
  },
  Failed: {
    backgroundColor: "bg-red-50 dark:bg-red-900/20",
    textColor: "text-red-700 dark:text-red-500",
  },
};

export const StatusPill = ({ status, className }: StatusPillProps) => {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        // config.backgroundColor,
        // config.textColor,
        className
      )}
    >
      {status}
    </span>
  );
};