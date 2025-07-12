'use client';

import React from 'react';
import { BookOpen, GraduationCap, Users, Award, Clock, TrendingUp } from 'lucide-react';

export function EducationAnimation() {
  return (
    <div className="relative w-full h-full min-h-[600px] bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 rounded-xl overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Circles */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-emerald-200/30 rounded-full animate-float-slow"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-blue-200/30 rounded-full animate-float-medium"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-200/30 rounded-full animate-float-fast"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-amber-200/30 rounded-full animate-float-slow"></div>
        
        {/* Animated Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path
            d="M50,50 Q200,100 350,50 T650,50"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-draw-line"
          />
          <path
            d="M100,200 Q250,150 400,200 T700,200"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-draw-line-delayed"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
        {/* Central Icon with Pulse Animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
          <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-full shadow-lg">
            <GraduationCap className="h-12 w-12 text-white animate-bounce-gentle" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-slate-800 mb-4 animate-fade-in-up">
          Education Excellence
        </h3>
        <p className="text-slate-600 mb-8 max-w-md animate-fade-in-up-delayed">
          Empowering teachers and students through innovative management solutions
        </p>

        {/* Floating Icons */}
        <div className="relative w-full max-w-md h-40">
          <div className="absolute top-0 left-0 animate-orbit-1">
            <div className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
              <BookOpen className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          
          <div className="absolute top-0 right-0 animate-orbit-2">
            <div className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          
          <div className="absolute bottom-0 left-1/4 animate-orbit-3">
            <div className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          
          <div className="absolute bottom-0 right-1/4 animate-orbit-4">
            <div className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-orbit-5">
            <div className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
              <TrendingUp className="h-6 w-6 text-rose-600" />
            </div>
          </div>
        </div>

        {/* Stats Animation */}
        <div className="mt-12 grid grid-cols-3 gap-6 w-full max-w-sm">
          <div className="text-center animate-count-up">
            <div className="text-2xl font-bold text-emerald-600 animate-number-count">150+</div>
            <div className="text-xs text-slate-500">Teachers</div>
          </div>
          <div className="text-center animate-count-up-delayed">
            <div className="text-2xl font-bold text-blue-600 animate-number-count">2.5K+</div>
            <div className="text-xs text-slate-500">Students</div>
          </div>
          <div className="text-center animate-count-up-delayed-2">
            <div className="text-2xl font-bold text-purple-600 animate-number-count">98%</div>
            <div className="text-xs text-slate-500">Success</div>
          </div>
        </div>
      </div>

      {/* Particle Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}