'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Thermometer, History, DollarSign, Settings, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { icon: Thermometer, label: 'Sensor Stats', href: '/dashboard/sensor-stats' },
  { icon: History, label: 'Historical Data', href: '/dashboard/historical-data' },
  { icon: DollarSign, label: 'Expense Tracker', href: '/dashboard/expense-tracker' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={24} />
      </button>

     
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 transform bg-card transition-transform duration-200 ease-in-out lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col border-r">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-primary">NodePulse</h2>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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

      <main className={cn(
        "min-h-screen transition-all duration-200 ease-in-out",
        isSidebarOpen ? "lg:pl-64" : "lg:pl-0"
      )}>
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}