'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Save, X, User, Mail, Phone, Building, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { TeacherProfile as TeacherProfileType } from '@/types/teacher';
import { useToast } from '@/hooks/use-toast';

interface TeacherEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: TeacherProfileType;
  onUpdate: (profile: TeacherProfileType) => void;
}

export function TeacherEditModal({ isOpen, onClose, profile, onUpdate }: TeacherEditModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      firstName: profile.teacher.firstName,
      lastName: profile.teacher.lastName,
      email: profile.teacher.email,
      phone: profile.teacher.phone,
      role: profile.teacher.role,
      department: profile.teacher.department,
      birthDate: profile.teacher.birthDate,
    }
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulate API call with loading animation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedProfile = {
        ...profile,
        teacher: {
          ...profile.teacher,
          ...data,
        },
        contact: {
          ...profile.contact,
          email: data.email,
          phone: data.phone,
        }
      };
      
      onUpdate(updatedProfile);
      onClose();
      toast({
        title: 'Profile Updated Successfully! ✨',
        description: 'Teacher profile has been updated with the new information.',
        type: 'success'
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'There was an error updating the profile. Please try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <User className="h-6 w-6 text-emerald-600" />
            </div>
            <span>Edit Teacher Profile</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
              <User className="h-5 w-5 text-slate-600" />
              <span>Personal Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  First Name *
                </label>
                <input
                  {...register('firstName', { required: 'First name is required' })}
                  className={cn(
                    'w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-slate-400',
                    errors.firstName && 'border-red-500 focus:ring-red-500'
                  )}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600 animate-in slide-in-from-left-2 duration-200">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Last Name *
                </label>
                <input
                  {...register('lastName', { required: 'Last name is required' })}
                  className={cn(
                    'w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-slate-400',
                    errors.lastName && 'border-red-500 focus:ring-red-500'
                  )}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600 animate-in slide-in-from-left-2 duration-200">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Birth Date
                </label>
                <input
                  {...register('birthDate')}
                  type="date"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
              <Mail className="h-5 w-5 text-slate-600" />
              <span>Contact Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Email Address *
                </label>
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  className={cn(
                    'w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-slate-400',
                    errors.email && 'border-red-500 focus:ring-red-500'
                  )}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 animate-in slide-in-from-left-2 duration-200">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Phone Number *
                </label>
                <input
                  {...register('phone', { required: 'Phone number is required' })}
                  type="tel"
                  className={cn(
                    'w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-slate-400',
                    errors.phone && 'border-red-500 focus:ring-red-500'
                  )}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 animate-in slide-in-from-left-2 duration-200">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
              <Building className="h-5 w-5 text-slate-600" />
              <span>Professional Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Role/Position *
                </label>
                <input
                  {...register('role', { required: 'Role is required' })}
                  className={cn(
                    'w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-slate-400',
                    errors.role && 'border-red-500 focus:ring-red-500'
                  )}
                  placeholder="Enter role or position"
                />
                {errors.role && (
                  <p className="text-sm text-red-600 animate-in slide-in-from-left-2 duration-200">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Department *
                </label>
                <select
                  {...register('department', { required: 'Department is required' })}
                  className={cn(
                    'w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-slate-400',
                    errors.department && 'border-red-500 focus:ring-red-500'
                  )}
                >
                  <option value="">Select Department</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="History">History</option>
                  <option value="Physical Education">Physical Education</option>
                  <option value="Arts">Arts</option>
                  <option value="Music">Music</option>
                </select>
                {errors.department && (
                  <p className="text-sm text-red-600 animate-in slide-in-from-left-2 duration-200">
                    {errors.department.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}