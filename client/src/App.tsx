import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/Projects";
import Team from "@/pages/Team";
import Settings from "@/pages/Settings";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Create temporary components for the new pages
const Leaderboard = () => (
  <div className="py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">User Leaderboard</h1>
      <p className="mt-4">This page is under construction. Check back later for the full leaderboard.</p>
    </div>
  </div>
);

const Boosters = () => (
  <div className="py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Server Boosters</h1>
      <p className="mt-4">This page is under construction. Check back later to see server boosters.</p>
    </div>
  </div>
);

const AFKList = () => (
  <div className="py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">AFK Users</h1>
      <p className="mt-4">This page is under construction. Check back later to see the AFK users list.</p>
    </div>
  </div>
);

const Commands = () => (
  <div className="py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Bot Commands</h1>
      <p className="mt-4">This page is under construction. Check back later to see all available bot commands.</p>
    </div>
  </div>
);

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/boosters" component={Boosters} />
      <Route path="/afk" component={AFKList} />
      <Route path="/commands" component={Commands} />
      <Route path="/team" component={Team} />
      <Route path="/settings" component={Settings} />
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
