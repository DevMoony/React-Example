import { useQuery } from "@tanstack/react-query";
import { LeaderboardUser } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trophy, Award, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Leaderboard = () => {
  const { data: users, isLoading } = useQuery<LeaderboardUser[]>({
    queryKey: ["/api/leaderboard"],
  });

  // Determine appropriate medal for top 3 users
  const getMedal = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Award className="h-5 w-5 text-gray-300" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-700" />;
      default:
        return null;
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-6 flex items-center">
          <Trophy className="h-6 w-6 mr-2 text-primary" />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
            User Leaderboard
          </span>
        </h1>
        
        <Card className="border-t-4 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              XP Ranking
            </CardTitle>
            <CardDescription>
              Users ranked by level and experience points
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array(8).fill(0).map((_, index) => (
                  <div key={index} className="flex items-center p-4 rounded-lg bg-slate-800/50">
                    <Skeleton className="h-8 w-8 rounded-full mr-4" />
                    <Skeleton className="h-12 w-12 rounded-full mr-4" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-2 w-full" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {users?.map((user) => (
                  <div 
                    key={user.id} 
                    className={`flex items-center p-4 rounded-lg hover:bg-slate-800/70 transition-colors border border-slate-700 ${
                      user.rank <= 3 ? 'bg-slate-800/80 shadow-md' : 'bg-slate-800/30'
                    }`}
                  >
                    <div className="w-8 text-center mr-4">
                      {getMedal(user.rank) || <span className="text-slate-400 font-mono">{user.rank}</span>}
                    </div>
                    <Avatar className={`h-12 w-12 mr-4 border-2 ${
                      user.colorClass === 'purple' ? 'border-purple-500' : 
                      user.colorClass === 'blue' ? 'border-blue-500' : 
                      user.colorClass === 'green' ? 'border-green-500' : 
                      user.colorClass === 'yellow' ? 'border-yellow-500' : 'border-red-500'
                    }`}>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className={`${
                        user.colorClass === 'purple' ? 'bg-purple-900 text-purple-100' : 
                        user.colorClass === 'blue' ? 'bg-blue-900 text-blue-100' : 
                        user.colorClass === 'green' ? 'bg-green-900 text-green-100' : 
                        user.colorClass === 'yellow' ? 'bg-yellow-900 text-yellow-100' : 
                        'bg-red-900 text-red-100'
                      }`}>
                        {user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{user.username}</span>
                        <span className="text-sm font-semibold px-2 py-1 rounded-full bg-indigo-900/50 text-indigo-300">
                          Level {user.level}
                        </span>
                      </div>
                      <Progress 
                        value={(user.xp / user.xpNeeded) * 100} 
                        className="h-2 mb-1"
                        indicatorClassName={`${
                          user.colorClass === 'purple' ? 'bg-gradient-to-r from-purple-600 to-purple-400' : 
                          user.colorClass === 'blue' ? 'bg-gradient-to-r from-blue-600 to-blue-400' : 
                          user.colorClass === 'green' ? 'bg-gradient-to-r from-green-600 to-green-400' : 
                          user.colorClass === 'yellow' ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' : 
                          'bg-gradient-to-r from-red-600 to-red-400'
                        }`}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{user.xp} XP</span>
                        <span>{user.xpNeeded} XP needed</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;