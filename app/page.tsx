'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { TeacherProfileDisplay } from '@/components/teacher/teacher-profile-display';
import { TeacherEditModal } from '@/components/teacher/teacher-edit-modal';
import { AvailabilityCalendar } from '@/components/calendar/availability-calendar';
import { PaymentInterface } from '@/components/payment/payment-interface';
import { EducationAnimation } from '@/components/animations/education-animation';
import { Toaster } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { mockTeacherProfile } from '@/lib/data';
import { TeacherProfile as TeacherProfileType } from '@/types/teacher';

export default function Home() {
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfileType>(mockTeacherProfile);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast, dismiss, toasts } = useToast();

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleProfileUpdate = (updatedProfile: TeacherProfileType) => {
    setTeacherProfile(updatedProfile);
  };

  const handleAvailabilityUpdate = (availability: any[]) => {
    setTeacherProfile(prev => ({
      ...prev,
      availability
    }));
    toast({
      title: 'Availability Updated',
      description: 'Teacher availability has been successfully updated.',
      type: 'success'
    });
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Sidebar />
        
        <div className="lg:pl-64">
          <Header />
          
          <main className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Loading skeleton */}
              <div className="animate-pulse">
                <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
                
                <div className="bg-white rounded-xl p-6 mb-6">
                  <div className="h-32 bg-slate-200 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6">
                  <div className="h-64 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      
      <div className="lg:pl-64">
        <Header />
        
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-slate-900 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text">
                Teacher Dashboard
              </h1>
              <p className="mt-2 text-slate-600">View and manage teacher profile and availability schedule</p>
            </div>

            {/* Teacher Profile Section */}
            <div className="animate-fade-in-delay-1">
              <TeacherProfileDisplay 
                profile={teacherProfile} 
                onEdit={handleEditProfile}
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-delay-2">
              {/* Left Column - Calendar */}
              <div className="lg:col-span-2">
                <AvailabilityCalendar 
                  availability={teacherProfile.availability}
                  onUpdate={handleAvailabilityUpdate}
                />
              </div>
              
              {/* Right Column - Animation */}
              <div className="lg:col-span-1">
                <EducationAnimation />
              </div>
            </div>

            {/* Payment Interface Section */}
            <div className="animate-fade-in-delay-2">
              <PaymentInterface 
                paymentInfo={teacherProfile.paymentInfo}
                onUpdate={(paymentInfo) => setTeacherProfile(prev => ({ ...prev, paymentInfo }))}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Edit Modal */}
      <TeacherEditModal
  isOpen={isEditModalOpen}
  onClose={() => setIsEditModalOpen(false)}
  profile={teacherProfile}
  onUpdate={handleProfileUpdate}
/>


      {/* Toast notifications */}
      <Toaster toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}