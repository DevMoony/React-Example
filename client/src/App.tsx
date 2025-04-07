import { Switch, Route, useRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import AfkUsers from "@/pages/Projects"; // Now holds AFK users
import Team from "@/pages/Team"; // Team page now has Boosters
import Settings from "@/pages/Settings";
import Leaderboard from "@/pages/Leaderboard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Base path configuration for GitHub Pages
// In production, this would be "/unity-bot/dashboard", in dev it's "/"
export const BASE_PATH = import.meta.env.VITE_BASE_PATH || "";

// Commands page placeholder
const Commands = () => (
  <div className="py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">Bot Commands</h1>
      <p className="mt-4 text-muted-foreground">This page is under construction. Check back later to see all available bot commands.</p>
    </div>
  </div>
);

function Router() {
  return (
    <Switch>
      <Route path={`${BASE_PATH}/`} component={Dashboard} />
      <Route path={`${BASE_PATH}/leaderboard`} component={Leaderboard} />
      <Route path={`${BASE_PATH}/boosters`} component={Team} /> {/* Team page now includes Boosters */}
      <Route path={`${BASE_PATH}/team`} component={Team} /> {/* Also keep the /team route for backwards compatibility */}
      <Route path={`${BASE_PATH}/afk`} component={AfkUsers} />
      <Route path={`${BASE_PATH}/commands`} component={Commands} />
      <Route path={`${BASE_PATH}/settings`} component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
