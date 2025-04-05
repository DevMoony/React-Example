import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import StatCard from "@/components/dashboard/StatCard";
import ProjectCard from "@/components/dashboard/ProjectCard";
import ActivityItem from "@/components/dashboard/ActivityItem";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stat, Project, Activity } from "@/types";

const Dashboard = () => {
  const { data: stats, isLoading: isLoadingStats } = useQuery<Stat[]>({
    queryKey: ["/api/stats"],
  });

  const { data: recentProjects, isLoading: isLoadingProjects } = useQuery<Project[]>({
    queryKey: ["/api/projects/recent"],
  });

  const { data: recentActivity, isLoading: isLoadingActivity } = useQuery<Activity[]>({
    queryKey: ["/api/activity/recent"],
  });

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard stats */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {isLoadingStats ? (
            // Loading skeletons for stats
            Array(4).fill(0).map((_, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-8 w-1/3" />
                  <div className="mt-6">
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            stats?.map((stat) => (
              <StatCard 
                key={stat.id}
                title={stat.name}
                value={stat.value}
                change={stat.change}
                changeLabel="from last month"
              />
            ))
          )}
        </div>

        {/* Projects and Activity */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Projects */}
          <Card>
            <CardHeader className="px-4 py-5 sm:px-6 flex flex-row justify-between items-center">
              <CardTitle className="text-lg font-medium text-gray-900">Recent Projects</CardTitle>
              <Link href="/projects" className="text-sm font-medium text-primary hover:text-blue-600">
                View all
              </Link>
            </CardHeader>
            <div className="border-t border-gray-200">
              {isLoadingProjects ? (
                // Loading skeletons for projects
                <ul className="divide-y divide-gray-200">
                  {Array(3).fill(0).map((_, index) => (
                    <li key={index} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-10 w-10 rounded" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {recentProjects?.map((project) => (
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
            </div>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="px-4 py-5 sm:px-6">
              <CardTitle className="text-lg font-medium text-gray-900">Recent Activity</CardTitle>
            </CardHeader>
            <div className="border-t border-gray-200">
              {isLoadingActivity ? (
                // Loading skeletons for activity
                <ul className="divide-y divide-gray-200">
                  {Array(3).fill(0).map((_, index) => (
                    <li key={index} className="px-4 py-4 sm:px-6">
                      <div className="flex space-x-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/4" />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {recentActivity?.map((activity) => (
                    <ActivityItem
                      key={activity.id}
                      type={activity.type}
                      user={activity.user}
                      action={activity.action}
                      target={activity.target}
                      note={activity.note}
                      time={activity.time}
                    />
                  ))}
                </ul>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
