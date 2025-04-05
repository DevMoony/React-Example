import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HandMetal, CheckCircleIcon, MessageSquareIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItemProps {
  type: "user-action" | "status-change" | "comment";
  user?: string;
  action?: string;
  target?: string;
  note?: string;
  time: string;
}

const ActivityItem = ({ type, user, action, target, note, time }: ActivityItemProps) => {
  const renderIcon = () => {
    switch (type) {
      case "user-action":
        return (
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <HandMetal className="h-5 w-5 text-primary" />
          </div>
        );
      case "status-change":
        return (
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircleIcon className="h-5 w-5 text-[#10B981]" />
          </div>
        );
      case "comment":
        return (
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
            <MessageSquareIcon className="h-5 w-5 text-[#8B5CF6]" />
          </div>
        );
      default:
        return (
          <Avatar className="h-10 w-10">
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        );
    }
  };

  return (
    <li className="px-4 py-4 sm:px-6 hover:bg-gray-50">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          {renderIcon()}
        </div>
        <div className="min-w-0 flex-1">
          {type === "user-action" && (
            <p className="text-sm text-gray-900">
              <a href="#" className="font-medium text-gray-900">{user}</a> {action}{" "}
              <a href="#" className="font-medium text-primary">{target}</a>
            </p>
          )}
          {type === "status-change" && (
            <p className="text-sm text-gray-900">
              <span className="font-medium text-gray-900">{note}</span>
            </p>
          )}
          {type === "comment" && (
            <p className="text-sm text-gray-900">
              <a href="#" className="font-medium text-gray-900">{user}</a> {action}{" "}
              <a href="#" className="font-medium text-primary">{target}</a>
            </p>
          )}
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>
    </li>
  );
};

export default ActivityItem;
