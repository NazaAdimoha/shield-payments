"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon, Home, Wallet, Send, DollarSign } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Wallet', href: '/wallet', icon: Wallet },
  { label: 'Pay', href: '/pay', icon: Send },
  { label: 'Earn', href: '/earn', icon: DollarSign },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 p-4 border-r border-gray-200 dark:border-gray-800 h-screen">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-purple-500 rounded-lg" />
        <span className="font-semibold text-lg">Shield Payments</span>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-purple-500 text-white' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="mt-auto">
        <button className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <span>🌙</span>
          <span>Dark Mode</span>
        </button>
      </div>
    </aside>
  );
};