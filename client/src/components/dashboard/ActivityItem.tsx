import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Terminal, 
  ArrowUpCircle, 
  ServerCrash, 
  Sparkles, 
  MessageSquare, 
  HandMetal, 
  CheckCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ActivityType } from "@/types";

interface ActivityItemProps {
  type: "user-action" | "status-change" | "comment" | ActivityType;
  user?: string;
  action?: string;
  target?: string;
  note?: string;
  time: string;
}

const ActivityItem = ({ type, user, action, target, note, time }: ActivityItemProps) => {
  const renderIcon = () => {
    switch (type) {
      case "command-used":
        return (
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Terminal className="h-5 w-5 text-indigo-600" />
          </div>
        );
      case "level-up":
        return (
          <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <ArrowUpCircle className="h-5 w-5 text-yellow-600" />
          </div>
        );
      case "server-joined":
        return (
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <ServerCrash className="h-5 w-5 text-green-600" />
          </div>
        );
      case "bot-update":
        return (
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-purple-600" />
          </div>
        );
      case "user-action":
        return (
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <HandMetal className="h-5 w-5 text-primary" />
          </div>
        );
      case "status-change":
        return (
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
        );
      case "comment":
        return (
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-purple-600" />
          </div>
        );
      default:
        return (
          <Avatar className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600">
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        );
    }
  };

  const renderContent = () => {
    switch(type) {
      case "command-used":
        return (
          <p className="text-sm">
            <span className="font-medium">{user}</span> used command{" "}
            <code className="px-1.5 py-0.5 bg-slate-800 rounded text-sm font-mono text-primary">{action}</code>
            {target && <span> in {target}</span>}
          </p>
        );
      case "level-up":
        return (
          <p className="text-sm">
            <span className="font-medium">{user}</span> leveled up to{" "}
            <span className="font-medium text-purple-500">Level {target}</span>
            {note && <span className="block mt-1 text-xs text-muted-foreground">{note}</span>}
          </p>
        );
      case "server-joined":
        return (
          <p className="text-sm">
            Bot was added to server{" "}
            <span className="font-medium text-primary">{target}</span>
            {note && <span className="block mt-1 text-xs text-muted-foreground">{note}</span>}
          </p>
        );
      case "bot-update":
        return (
          <p className="text-sm">
            <span className="font-medium text-purple-500">Bot updated</span> to version {target}
            {note && <span className="block mt-1 text-xs text-muted-foreground">{note}</span>}
          </p>
        );
      case "user-action":
        return (
          <p className="text-sm">
            <span className="font-medium">{user}</span> {action}{" "}
            <span className="font-medium text-primary">{target}</span>
          </p>
        );
      case "status-change":
        return (
          <p className="text-sm">
            <span className="font-medium">{note}</span>
          </p>
        );
      case "comment":
        return (
          <p className="text-sm">
            <span className="font-medium">{user}</span> {action}{" "}
            <span className="font-medium text-primary">{target}</span>
          </p>
        );
      default:
        return (
          <p className="text-sm">
            <span className="font-medium">{note || "Unknown activity"}</span>
          </p>
        );
    }
  };

  return (
    <li className="px-4 py-4 sm:px-6 hover:bg-slate-900/30">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          {renderIcon()}
        </div>
        <div className="min-w-0 flex-1">
          {renderContent()}
          <p className="text-sm text-muted-foreground">{time}</p>
        </div>
      </div>
    </li>
  );
};

export default ActivityItem;
