"use client";

import React, { PropsWithChildren, useState } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { UserButton } from "@clerk/nextjs";
import Home from "../../assets/category.svg";
import Wallet from "../../assets/wallet-2.svg";
import Coin from "../../assets/coin.svg";
import Money from "../../assets/money-add.svg"; 
import Logo from "../../assets/logo.svg";
import Hamburger from "../../assets/hamburger.svg";
import {
  Menu,
  Moon,
  Sun,
  X,
  Bell,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Input } from '@/components/ui/input';

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Wallet",
    href: "/dashboard/wallet",
    icon: Wallet,
  },
  {
    name: "Pay",
    href: "/dashboard/pay",
    icon: Coin,
  },
  {
    name: "Earn",
    href: "/dashboard/earn",
    icon: Money,
  },
];

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <div className="p-2">
        <div className="flex items-center gap-2 mb-6">
          <Image src={Logo} alt="Shield Payments" width={32} height={32} />
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
              className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-colors ${pathname === item.href
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
            >
              <Image src={item.icon} alt={item.name} width={20} height={20} />
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
        <p className="text-xs text-gray-500 mt-4">© 2025 Shield Payments V1.0</p>
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  const currentRoute = sidebarItems.find((item) => item.href === pathname)?.name || "";

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 lg:w-72 bg-[#F5F5F5] border-r border-gray-100 p-6">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden bg-white">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="text-gray-500 hover:text-gray-600"
          >
            <Image src={Hamburger} alt="Shield Payments" width={24} height={24} />
          </button>

          <p className="text-lg/7 font-semibold text-brand-900">
            {currentRoute}
          </p>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="w-5 h-5 text-gray-500" />
            </button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        {/* Desktop Header */}
        <header className="hidden md:flex h-16 border-b items-center justify-between px-6 bg-white">
          <h1 className="text-xl font-semibold">{currentRoute}</h1>
          <div className="flex items-center gap-4 w-full mx-24">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-gray-100 border-0"
              />
            </div>


          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="w-5 h-5 text-gray-500" />
            </button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="p-6">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Drawer */}
      <Modal
        className="p-4"
        showModal={isDrawerOpen}
        setShowModal={setIsDrawerOpen}
      >
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg/7 font-semibold text-brand-900">
            Shield Payments
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
  );
};

export default Layout;
