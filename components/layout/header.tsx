'use client';

import React from 'react';
import { ChevronDown, Bell, Search, MapPin } from 'lucide-react';
import { schools } from '@/lib/data';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left side - School selector and search */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-slate-400" />
            <select className="text-sm font-medium text-slate-900 bg-transparent border-none focus:outline-none focus:ring-0">
              {schools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.name} - {school.location}
                </option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
          
          <div className="hidden md:block">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search teachers, courses..."
                className="block w-full rounded-md border-slate-300 pl-10 pr-3 py-2 text-sm placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Right side - Notifications and user menu */}
        <div className="flex items-center space-x-4">
          <button className="rounded-full p-2 text-slate-400 hover:text-slate-500 hover:bg-slate-100 transition-colors duration-200">
            <Bell className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-slate-900">Admin User</p>
              <p className="text-xs text-slate-500">admin@school.edu</p>
            </div>
            <img
              className="h-8 w-8 rounded-full object-cover"
              src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop"
              alt="Admin avatar"
            />
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
}