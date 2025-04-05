import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Settings, LogOut, Crown } from "lucide-react";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="ml-3 relative" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open user menu</span>
          <div className="relative">
            <Avatar className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center">
              <Crown className="h-4 w-4 text-yellow-500" />
            </span>
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-100">
            Administrator
          </div>
          <Link 
            href="/profile" 
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <User className="h-4 w-4 mr-2 text-gray-500" />
            Your Profile
          </Link>
          <Link 
            href="/account" 
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="h-4 w-4 mr-2 text-gray-500" />
            Bot Settings
          </Link>
          <Link 
            href="/signout" 
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <LogOut className="h-4 w-4 mr-2 text-gray-500" />
            Sign out
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
