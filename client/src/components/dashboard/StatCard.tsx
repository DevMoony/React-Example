import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
}

const StatCard = ({ title, value, change = 0, changeLabel = "from last month", icon }: StatCardProps) => {
  const hasTrend = change !== 0;
  const isPositive = change > 0;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-start">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {value}
              </dd>
            </dl>
            {icon && <div className="ml-2">{icon}</div>}
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 flex items-center">
          {hasTrend ? (
            <>
              <span 
                className={cn(
                  "text-sm font-medium flex items-center",
                  isPositive ? "text-green-500" : "text-red-500"
                )}
              >
                {isPositive ? (
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                )}
                {Math.abs(change)}%
              </span>
              <span className="text-gray-500 text-sm ml-2">{changeLabel}</span>
            </>
          ) : (
            <span className="text-gray-500 text-sm">
              No change {changeLabel}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
