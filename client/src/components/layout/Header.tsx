import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  PlusIcon, 
  Bot, 
  Trophy, 
  Zap, 
  Clock, 
  Settings, 
  LayoutDashboard, 
  Server
} from "lucide-react";
import MobileMenu from "./MobileMenu";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigationItems = [
    { name: "Dashboard", href: "/", icon: <LayoutDashboard className="h-4 w-4 mr-1" /> },
    { name: "Leaderboard", href: "/leaderboard", icon: <Trophy className="h-4 w-4 mr-1" /> },
    { name: "Boosters", href: "/boosters", icon: <Zap className="h-4 w-4 mr-1" /> },
    { name: "AFK List", href: "/afk", icon: <Clock className="h-4 w-4 mr-1" /> },
    { name: "Commands", href: "/commands", icon: <Server className="h-4 w-4 mr-1" /> },
    { name: "Settings", href: "/settings", icon: <Settings className="h-4 w-4 mr-1" /> },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Bot className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">DiscordBot</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:ml-6 md:flex space-x-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={
                    location === item.href
                      ? "border-b-2 border-primary text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  }
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Button className="flex items-center bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add to Server
              </Button>
            </div>
            
            <div className="ml-4 flex items-center sm:ml-6">
              <ProfileDropdown />
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden ml-4">
              <button 
                type="button" 
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && <MobileMenu navigationItems={navigationItems} />}
      </div>
    </header>
  );
};

export default Header;
