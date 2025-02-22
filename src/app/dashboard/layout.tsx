"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Search } from "@/components/ui/search";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import {
  Gem,
  Home,
  Key,
  LucideIcon,
  Menu,
  Moon,
  Settings,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useState } from "react";

interface SidebarItem {
  href: string;
  icon: LucideIcon;
  text: string;
}

interface SidebarCategory {
  category: string;
  items: SidebarItem[];
}

// const SIDEBAR_ITEMS: SidebarCategory[] = [
//   {
//     category: "Overview",
//     items: [{ href: "/dashboard", icon: Home, text: "Dashboard" }],
//   },
//   {
//     category: "Account",
//     items: [{ href: "/dashboard/upgrade", icon: Gem, text: "Upgrade" }],
//   },
//   {
//     category: "Settings",
//     items: [
//       { href: "/dashboard/api-key", icon: Key, text: "API Key" },
//       {
//         href: "/dashboard/account-settings",
//         icon: Settings,
//         text: "Account Settings",
//       },
//     ],
//   },
// ];

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Wallet",
    href: "/wallet",
    icon: Gem,
  },
  {
    name: "Pay",
    href: "/pay",
    icon: Key,
  },
  {
    name: "Earn",
    href: "/earn",
    icon: Key,
  },
];

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-md">
      {/* <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" /> */}
      <Search
        value={""}
        onChange={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  return (
    <div className="space-y-4 md:space-y-6 relative z-20 flex flex-col h-full bg-[#F5F5F5]">
      <div className="p-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 rounded-full bg-purple-600" />
          <div>
            <h1 className="font-semibold">Shield Payments</h1>
            <p className="text-sm text-gray-500">Free plan</p>
          </div>
        </div>

        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-colors ${
                pathname === item.href
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm">Light</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <span className="text-sm">Dark</span>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          © 2025 Shield Payments V1.0
        </p>
      </div>

      <div className="flex flex-col">
        <hr className="my-4 md:my-6 w-full h-px bg-gray-100" />

        <UserButton
          showName
          appearance={{
            elements: {
              userButtonBox: "flex-row-reverse",
            },
          }}
        />
      </div>
    </div>
  );
};

const Layout = ({ children }: PropsWithChildren) => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const currentRoute =
    sidebarItems.find((item) => item.href === pathname)?.name || "";

  return (
    <div className="relative h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* sidebar for desktop */}
      <div className="bg-[#F5F5F5] hidden md:block w-64 lg:w-72 border-r border-gray-100 p-6 h-full text-brand-900 relative z-10">
        <Sidebar />
      </div>

      {/* Desktop Navbar */}


      <div className="flex-1 flex flex-col overflow-hidden">
        {/* mobile header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <p className="text-lg/7 font-semibold text-brand-900">
            JobBoarD<span className="text-brand-700">_NG</span>
          </p>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="text-gray-500 hover:text-gray-600"
          >
            <Menu className="size-6" />
          </button>
        </div>

        {/* main content area */}
        {/* <div className="flex-1 overflow-y-auto bg-gray-50 shadow-md p-4 md:p-6 relative z-10">
          <div className="relative min-h-full flex flex-col">
            <div className="h-full flex flex-col flex-1 space-y-4">
              {children}
            </div>
          </div>
        </div> */}

        <div className="flex-1 bg-white shadow-md p-4 md:p-6 relative z-10">
          {/* Top Navigation */}
          <header className="hidden md:flex h-14 border-b items-center justify-between px-6">
            <h1 className="text-xl font-semibold">{currentRoute}</h1>
            <div className="flex items-center gap-4">
              <SearchBar />
              <UserButton afterSignOutUrl="/" />
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6 bg-white min-h-[calc(100vh-4rem)] overflow-y-auto">
            {children}
          </main>
        </div>

        <Modal
          className="p-4"
          showModal={isDrawerOpen}
          setShowModal={setIsDrawerOpen}
        >
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg/7 font-semibold text-brand-900">
              JobBoarD<span className="text-brand-700">_NG</span>
            </p>
            <button
              aria-label="Close modal"
              onClick={() => setIsDrawerOpen(false)}
            >
              <X className="size-6" />
            </button>
          </div>

          <Sidebar />
        </Modal>
      </div>
    </div>
  );
};

export default Layout;
