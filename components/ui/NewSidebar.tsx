"use client";

import { useEffect, useState, useRef } from "react";
import { Tooltip } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, useUser } from "@clerk/nextjs";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  Settings,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  Package,
  DollarSign,
  Calendar,
  MessageSquare,
  UserCog,
} from "lucide-react";

// Utility function for conditional class names
function cn(...classes: (string | undefined | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Mock function - replace with your actual user role check
function checkUserRole(session: any): string {
  // This is a placeholder - implement your actual role checking logic here
  return "admin"; // Default to admin for now
}

// Sidebar width states
const sidebarWidths = {
  collapsed: "w-20",
  expanded: "w-64",
};

const Sidebar = () => {
  const { user } = useUser();
  const { session } = useSession();
  const pathname = usePathname();
  const userRole = checkUserRole(session);
  const [dbUserRole, setDbUserRole] = useState<string>("");
  const [collapsed, setCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const sidebarClass = `h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden shadow-lg transition-all duration-300 ${
    collapsed ? sidebarWidths.collapsed : sidebarWidths.expanded
  }`;

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        if (window.innerWidth < 768) {
          setCollapsed(true);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetch(
        `https://sheba-xyz-backend-0wsp.onrender.com/api/v1/users/${user.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setDbUserRole(data?.data?.role || "");
        })
        .catch((error) => {
          console.error("Error fetching user role:", error);
        });
    }
  }, [user?.id]);

  // Navigation items
  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: <LayoutDashboard size={20} />,
      roles: ["admin", "user", "super_admin"],
    },
    {
      title: "Services",
      href: "/services",
      icon: <Package size={20} />,
      roles: ["admin", "user", "super_admin"],
    },
    {
      title: "Bookings",
      href: "/bookings",
      icon: <Calendar size={20} />,
      roles: ["admin", "user", "super_admin"],
    },
    {
      title: "Messages",
      href: "/messages",
      icon: <MessageSquare size={20} />,
      roles: ["admin", "user", "super_admin"],
    },
    {
      title: "Users",
      href: "/allusers",
      icon: <Users size={20} />,
      roles: ["admin", "super_admin"],
    },
    {
      title: "Create Content",
      href: "/createcontent",
      icon: <PlusCircle size={20} />,
      roles: ["admin", "super_admin"],
    },
    {
      title: "Create Category",
      href: "/createcategory",
      icon: <PlusCircle size={20} />,
      roles: ["admin", "super_admin"],
    },
    {
      title: "Add Service",
      href: "/addservice",
      icon: <DollarSign size={20} />,
      roles: ["admin", "super_admin"],
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings size={20} />,
      roles: ["admin", "user", "super_admin"],
    },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.roles.some((role) => [userRole, dbUserRole].includes(role))
  );

  return (
    <div className="fixed top-0 left-0 h-full z-50" ref={sidebarRef}>
      <div className={sidebarClass}>
        {/* Logo and Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          {!collapsed ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="font-bold text-lg whitespace-nowrap">Sheba</span>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold mx-auto">
              S
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2">
          <div className="space-y-1">
            {filteredNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <div key={item.href}>
                  <Tooltip
                    title={collapsed ? item.title : ""}
                    placement="right"
                    overlayClassName="ml-2"
                  >
                    <Link href={item.href}>
                      <div
                        className={cn(
                          "flex items-center p-3 rounded-lg transition-colors duration-200",
                          isActive
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        )}
                      >
                        <span
                          className={cn(
                            "flex-shrink-0",
                            collapsed ? "mx-auto" : "mr-3"
                          )}
                        >
                          {item.icon}
                        </span>
                        {!collapsed && (
                          <span className="whitespace-nowrap font-medium text-sm">
                            {item.title}
                          </span>
                        )}
                      </div>
                    </Link>
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 overflow-hidden">
              {user?.imageUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={user.imageUrl}
                    alt={user.fullName || "User"}
                    className="object-cover"
                    fill
                    sizes="40px"
                    priority
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <UserCog size={20} className="text-gray-500" />
                </div>
              )}
            </div>
            {!collapsed && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.fullName || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {dbUserRole || "User"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
    </div>
  );
};

export default Sidebar;
