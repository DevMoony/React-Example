import { Link } from "wouter";
import { FolderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  id: number;
  name: string;
  updatedAt: string;
  status: string;
  colorClass: string;
}

const ProjectCard = ({ id, name, updatedAt, status, colorClass }: ProjectCardProps) => {
  const getStatusColor = () => {
    switch (colorClass) {
      case "green":
        return "bg-green-100 text-green-800";
      case "blue":
        return "bg-blue-100 text-blue-800";
      case "yellow":
        return "bg-yellow-100 text-yellow-800";
      case "red":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFolderColor = () => {
    switch (colorClass) {
      case "green":
        return "bg-[#10B981]"; // secondary
      case "blue":
        return "bg-[#3B82F6]"; // primary
      case "yellow":
        return "bg-yellow-500";
      case "purple":
        return "bg-[#8B5CF6]"; // accent
      default:
        return "bg-gray-500";
    }
  };

  return (
    <li className="px-4 py-4 sm:px-6 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={cn("h-10 w-10 rounded flex items-center justify-center text-white", getFolderColor())}>
            <FolderIcon className="h-5 w-5" />
          </div>
          <div className="ml-3">
            <Link href={`/projects/${id}`}>
              <p className="text-sm font-medium text-gray-900 hover:text-primary">{name}</p>
            </Link>
            <p className="text-sm text-gray-500">Updated {updatedAt}</p>
          </div>
        </div>
        <div>
          <Badge variant="outline" className={cn("px-2 py-1 text-xs font-medium rounded-full", getStatusColor())}>
            {status}
          </Badge>
        </div>
      </div>
    </li>
  );
};

export default ProjectCard;
