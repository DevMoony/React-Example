import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import StatCard from "@/components/dashboard/StatCard";
import ProjectCard from "@/components/dashboard/ProjectCard";
import ActivityItem from "@/components/dashboard/ActivityItem";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Server, Users, Zap, Trophy } from "lucide-react";
import { Stat, LeaderboardUser, Activity, ServerStat } from "@/types";

const Dashboard = () => {
  const { data: stats, isLoading: isLoadingStats } = useQuery<Stat[]>({
    queryKey: ["/api/stats"],
  });

  const { data: topUsers, isLoading: isLoadingLeaderboard } = useQuery<LeaderboardUser[]>({
    queryKey: ["/api/leaderboard"],
    select: (data) => data.slice(0, 3),
  });

  const { data: recentActivity, isLoading: isLoadingActivity } = useQuery<Activity[]>({
    queryKey: ["/api/activity/recent"],
  });

  const { data: servers, isLoading: isLoadingServers } = useQuery<ServerStat[]>({
    queryKey: ["/api/servers"],
  });

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
          <Bot className="mr-2 h-6 w-6 text-primary" />
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
            Discord Bot Dashboard
          </span>
        </h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bot stats */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {isLoadingStats ? (
            // Loading skeletons for stats
            Array(4).fill(0).map((_, index) => (
              <Card key={index} className="overflow-hidden border-t-4 border-primary">
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
            stats?.map((stat, index) => {
              // Custom icons for each stat card
              const icons = [
                <Server className="h-8 w-8 text-indigo-500" key="server" />,
                <Users className="h-8 w-8 text-purple-500" key="users" />,
                <Zap className="h-8 w-8 text-pink-500" key="commands" />,
                <Bot className="h-8 w-8 text-green-500" key="uptime" />
              ];
              
              return (
                <StatCard 
                  key={stat.id}
                  title={stat.name}
                  value={stat.value}
                  change={stat.change}
                  changeLabel="from last week"
                  icon={icons[index]}
                />
              );
            })
          )}
        </div>

        {/* Leaderboard and Activity */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Top Users on Leaderboard */}
          <Card className="border-t-4 border-indigo-500">
            <CardHeader className="px-4 py-5 sm:px-6 flex flex-row justify-between items-center">
              <CardTitle className="text-lg font-medium text-gray-900 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                Top Users
              </CardTitle>
              <Link href="/leaderboard" className="text-sm font-medium text-primary hover:text-blue-600">
                View all
              </Link>
            </CardHeader>
            <div className="border-t border-gray-200">
              {isLoadingLeaderboard ? (
                // Loading skeletons for leaderboard
                <ul className="divide-y divide-gray-200">
                  {Array(3).fill(0).map((_, index) => (
                    <li key={index} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {topUsers?.map((user) => (
                    <li key={user.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-800 font-bold">
                          {user.rank}
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">{user.username}</p>
                          <div className="flex items-center">
                            <div className="text-xs text-gray-500">Level {user.level}</div>
                            <div className="ml-2 w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${user.colorClass === 'purple' ? 'bg-purple-500' : 
                                  user.colorClass === 'blue' ? 'bg-blue-500' : 
                                  user.colorClass === 'green' ? 'bg-green-500' : 
                                  user.colorClass === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'}`} 
                                style={{width: `${(user.xp / user.xpNeeded) * 100}%`}}
                              ></div>
                            </div>
                            <div className="ml-2 text-xs text-gray-500">
                              {user.xp}/{user.xpNeeded} XP
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="border-t-4 border-purple-500">
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

        {/* Servers */}
        <div className="mt-8">
          <Card className="border-t-4 border-green-500">
            <CardHeader className="px-4 py-5 sm:px-6">
              <CardTitle className="text-lg font-medium text-gray-900 flex items-center">
                <Server className="h-5 w-5 mr-2 text-green-500" />
                Servers Using This Bot
              </CardTitle>
            </CardHeader>
            <div className="border-t border-gray-200 p-4">
              {isLoadingServers ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Array(3).fill(0).map((_, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Skeleton className="h-8 w-full" />
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {servers?.map((server) => (
                    <Card key={server.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
                          <Server className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{server.name}</h3>
                          <p className="text-sm text-gray-500">{server.memberCount} members</p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {server.features.map((feature, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
