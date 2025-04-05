import { useQuery } from "@tanstack/react-query";
import { AfkUser } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const { data: afkUsers, isLoading } = useQuery<AfkUser[]>({
    queryKey: ["/api/afk"],
  });

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-6 flex items-center">
          <Clock className="h-6 w-6 mr-2 text-primary" />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
            AFK Users
          </span>
        </h1>
        
        <Card className="border-t-4 border-orange-500">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
              Currently Away
            </CardTitle>
            <CardDescription>
              Users who have set themselves as away from keyboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array(5).fill(0).map((_, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-card shadow-sm flex items-start">
                    <Skeleton className="h-12 w-12 rounded-full mr-4" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-2 w-full max-w-md" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {afkUsers?.map((user) => (
                  <div 
                    key={user.id} 
                    className="p-4 border rounded-lg shadow-sm bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 transition-colors flex items-start"
                  >
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
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-medium">{user.username}</h3>
                        <Badge variant="outline" className="bg-amber-900/30 border-amber-800 text-amber-300">
                          <Clock className="h-3 w-3 mr-1" /> 
                          {user.afkDuration}
                        </Badge>
                      </div>
                      {user.reason ? (
                        <p className="text-sm text-muted-foreground mt-1">
                          <span className="font-medium text-slate-400">Reason:</span> {user.reason}
                        </p>
                      ) : (
                        <p className="text-sm italic text-muted-foreground mt-1">
                          No reason provided
                        </p>
                      )}
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

export default Projects;