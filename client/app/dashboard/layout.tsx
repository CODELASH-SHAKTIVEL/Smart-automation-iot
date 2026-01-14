'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Droplets,
  Sun,
  CalendarDays,
  Brain,
  Settings,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ---------- Sidebar Items (Href unchanged) ---------- */
const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/dashboard/sensor-stats',
  },
  {
    icon: Droplets,
    label: 'Soil & Water',
    href: '/dashboard/historical-data',
  },
  {
    icon: Sun,
    label: 'Light & Temperature',
    href: '/dashboard/expense-tracker',
  },
  {
    icon: CalendarDays,
    label: 'Crop Irrigation Calendar',
    href: '/dashboard/custom-rules',
  },
  {
    icon: Brain,
    label: 'Ask AI for Crop',
    href: '/dashboard/ask-ai',
  },
  {
    icon: Settings,
    label: 'System Settings',
    href: '/dashboard/settings',
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-black dark:to-black">

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 rounded-lg bg-emerald-600 p-2 text-white shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={22} />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-64 transform bg-white transition-transform duration-200 ease-in-out dark:bg-neutral-900 lg:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col border-r border-emerald-200 dark:border-emerald-900">

          {/* Brand */}
          <div className="p-6">
            <h2 className="text-2xl font-extrabold tracking-wide text-emerald-700 dark:text-emerald-400">
              GREENPULSE
            </h2>
            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-500">
              Smart Greenhouse Control
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-emerald-700 hover:bg-emerald-100 dark:text-emerald-300 dark:hover:bg-emerald-950'
                  )}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          'min-h-screen transition-all duration-200 ease-in-out',
          isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'
        )}
      >
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
