import { useQuery } from "@tanstack/react-query";
import { Booster } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, GemIcon, Gift, Crown, Award } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Team = () => {
  const { data: boosters, isLoading } = useQuery<Booster[]>({
    queryKey: ["/api/boosters"],
  });

  // Function to determine the booster tier icon
  const getBoostTierIcon = (tier: number) => {
    switch (tier) {
      case 3:
        return <Crown className="h-5 w-5 text-yellow-400" />;
      case 2:
        return <Gift className="h-5 w-5 text-indigo-400" />;
      case 1:
      default:
        return <Zap className="h-5 w-5 text-blue-400" />;
    }
  };
  
  // Function to get booster tier name
  const getBoostTierName = (tier: number) => {
    switch (tier) {
      case 3:
        return "Diamond";
      case 2:
        return "Gold";
      case 1:
      default:
        return "Basic";
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-6 flex items-center">
          <GemIcon className="h-6 w-6 mr-2 text-primary" />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
            Server Boosters
          </span>
        </h1>
        
        <Card className="border-t-4 border-indigo-500">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center">
              <Award className="h-5 w-5 mr-2 text-indigo-500" />
              Active Boosters
            </CardTitle>
            <CardDescription>
              Members who have boosted the server for extra perks
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array(6).fill(0).map((_, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-card shadow-sm">
                    <div className="flex items-center space-x-4 mb-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-2 w-full" />
                      <Skeleton className="h-2 w-4/5" />
                      <div className="flex flex-wrap gap-1 mt-2">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {boosters?.map((booster) => (
                  <div 
                    key={booster.id} 
                    className={`p-4 border rounded-lg shadow-sm transition-transform duration-200 hover:shadow-md hover:-translate-y-1 bg-slate-800/50 border-slate-700`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className={`h-12 w-12 border-2 ${
                          booster.colorClass === 'purple' ? 'border-purple-500' : 
                          booster.colorClass === 'blue' ? 'border-blue-500' : 
                          booster.colorClass === 'green' ? 'border-green-500' : 
                          booster.colorClass === 'yellow' ? 'border-yellow-500' : 'border-red-500'
                        }`}>
                          <AvatarImage src={booster.avatar} />
                          <AvatarFallback className={`${
                            booster.colorClass === 'purple' ? 'bg-purple-900 text-purple-100' : 
                            booster.colorClass === 'blue' ? 'bg-blue-900 text-blue-100' : 
                            booster.colorClass === 'green' ? 'bg-green-900 text-green-100' : 
                            booster.colorClass === 'yellow' ? 'bg-yellow-900 text-yellow-100' : 
                            'bg-red-900 text-red-100'
                          }`}>
                            {booster.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{booster.username}</h3>
                          <p className="text-xs text-muted-foreground">Boosting for {booster.boostDuration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-900/50 text-indigo-300 text-xs font-medium">
                        {getBoostTierIcon(booster.boostTier)}
                        <span>{getBoostTierName(booster.boostTier)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Booster Perks</h4>
                      <div className="flex flex-wrap gap-1">
                        {booster.perks.map((perk, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className={`${
                              booster.colorClass === 'purple' ? 'border-purple-800 bg-purple-950/30' : 
                              booster.colorClass === 'blue' ? 'border-blue-800 bg-blue-950/30' : 
                              booster.colorClass === 'green' ? 'border-green-800 bg-green-950/30' : 
                              booster.colorClass === 'yellow' ? 'border-yellow-800 bg-yellow-950/30' : 
                              'border-red-800 bg-red-950/30'
                            }`}
                          >
                            {perk}
                          </Badge>
                        ))}
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

export default Team;