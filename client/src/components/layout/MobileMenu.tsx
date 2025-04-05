import { Link, useLocation } from "wouter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MobileMenuProps {
  navigationItems: { name: string; href: string }[];
}

const MobileMenu = ({ navigationItems }: MobileMenuProps) => {
  const [location] = useLocation();

  return (
    <div className="sm:hidden" id="mobile-menu">
      <div className="pt-2 pb-3 space-y-1">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={
              location === item.href
                ? "bg-gray-50 border-primary text-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            }
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="pt-4 pb-3 border-t border-gray-200">
        <div className="flex items-center px-4">
          <div className="flex-shrink-0">
            <Avatar className="h-10 w-10 bg-primary">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-gray-800">John Doe</div>
            <div className="text-sm font-medium text-gray-500">john@example.com</div>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <Link href="/profile" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
            Your Profile
          </Link>
          <Link href="/account" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
            Account Settings
          </Link>
          <Link href="/signout" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
            Sign out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
