'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  Settings, 
  Home,
  Menu,
  X,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home, current: false },
  { name: 'Teachers', href: '/teachers', icon: Users, current: true },
  { name: 'Schedule', href: '/schedule', icon: Calendar, current: false },
  { name: 'Courses', href: '/courses', icon: BookOpen, current: false },
  { name: 'Settings', href: '/settings', icon: Settings, current: false },
];

export function Sidebar({ className }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-slate-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <GraduationCap className="h-8 w-8 text-emerald-600" />
                <span className="ml-2 text-xl font-bold text-slate-900">EduManage</span>
              </div>
              <nav className="mt-8 space-y-1 px-3">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    disabled={!item.current}
                    className={cn(
                      item.current
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'text-slate-400 cursor-not-allowed opacity-50',
                      'group flex items-center rounded-md px-2 py-2 text-sm font-medium w-full text-left transition-all duration-200 hover:scale-105 active:scale-95'
                    )}
                  >
                    <item.icon
                      className={cn(
                        item.current ? 'text-emerald-500' : 'text-slate-400',
                        'mr-3 h-5 w-5 flex-shrink-0'
                      )}
                    />
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className={cn("hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0", className)}>
        <div className="flex min-h-0 flex-1 flex-col border-r border-slate-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <GraduationCap className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-xl font-bold text-slate-900">EduManage</span>
            </div>
            <nav className="mt-8 flex-1 space-y-1 px-3">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  disabled={!item.current}
                  className={cn(
                    item.current
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'text-slate-400 cursor-not-allowed opacity-50',
                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 w-full text-left'
                  )}
                >
                  <item.icon
                    className={cn(
                      item.current ? 'text-emerald-500' : 'text-slate-400',
                      'mr-3 h-5 w-5 flex-shrink-0'
                    )}
                  />
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}