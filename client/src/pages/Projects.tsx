import { useQuery } from "@tanstack/react-query";
import { Project } from "@/types";
import ProjectCard from "@/components/dashboard/ProjectCard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Projects = () => {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
          <Button className="flex items-center">
            <PlusIcon className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
        
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900">All Projects</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <ul className="divide-y divide-gray-200">
                  {Array(5).fill(0).map((_, index) => (
                    <li key={index} className="py-4">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-10 w-10 rounded" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {projects?.map((project) => (
                    <ProjectCard 
                      key={project.id}
                      id={project.id}
                      name={project.name}
                      updatedAt={project.updatedAt}
                      status={project.status}
                      colorClass={project.colorClass}
                    />
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Projects;
