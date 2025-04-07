import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Server, Palette, Gamepad2, Wrench } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BotCommand } from "@/types";

const CommandsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const { data: commands, isLoading, error } = useQuery<BotCommand[]>({
    queryKey: ["/api/commands"],
  });

  // Get unique categories from commands
  const categories = commands 
    ? [...new Set(commands.map(command => command.category))]
    : [];

  // Filter commands by active category
  const filteredCommands = commands 
    ? (activeCategory === "all" 
        ? commands 
        : commands.filter(command => command.category === activeCategory))
    : [];

  // Get the appropriate icon for each category
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'moderation':
        return <Server className="h-5 w-5" />;
      case 'customization':
        return <Palette className="h-5 w-5" />;
      case 'fun':
        return <Gamepad2 className="h-5 w-5" />;
      case 'utility':
        return <Wrench className="h-5 w-5" />;
      default:
        return <Server className="h-5 w-5" />;
    }
  };

  // Get the color class for each category
  const getCategoryColorClass = (category: string) => {
    switch(category) {
      case 'moderation':
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      case 'customization':
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20";
      case 'fun':
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case 'utility':
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  // Format category name for display
  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Failed to load commands. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container py-6 mx-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text mb-6">
          Bot Commands
        </h1>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
          <div className="border-b mb-4">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="all" className="px-4">
                All Commands
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="px-4">
                  <span className="flex items-center gap-2">
                    {getCategoryIcon(category)} 
                    {formatCategory(category)}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value={activeCategory} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCommands.map((command) => (
                <Card key={command.id} className="overflow-hidden border border-muted">
                  <CardHeader className="bg-muted/30 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-mono font-bold">
                          !{command.name}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {command.description}
                        </CardDescription>
                      </div>
                      <Badge className={getCategoryColorClass(command.category)}>
                        {formatCategory(command.category)}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Usage</h3>
                        <p className="mt-1 font-mono bg-muted p-2 rounded-md text-sm">
                          {command.usage}
                        </p>
                      </div>
                      
                      {command.examples && command.examples.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Examples</h3>
                          <div className="mt-1 space-y-2">
                            {command.examples.map((example, index) => (
                              <p key={index} className="font-mono bg-muted p-2 rounded-md text-sm">
                                {example}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommandsPage;