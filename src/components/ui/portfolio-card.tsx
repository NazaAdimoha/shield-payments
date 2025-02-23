// components/ui/portfolio-card.tsx
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface PortfolioCardProps {
  type: string
  percentage: number
  amount: string
  growth: number
  icon: LucideIcon  // Changed from Icon to icon to match the data structure
  color: string
}

export const PortfolioCard = ({
  type,
  percentage,
  amount,
  growth,
  icon: Icon, // Destructure and rename to keep the capitalized version for the component
  color,
}: PortfolioCardProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={cn("p-2 rounded-full", color, "bg-opacity-10")}>
            <Icon className={cn("h-6 w-6", color)} />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">{type}</p>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">↑ {growth}%</span>
              <span className="text-gray-500">{percentage}%</span>
            </div>
          </div>
        </div>
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {amount}
        </p>
      </div>
    </Card>
  )
}