'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Edit2, 
  Save, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Award,
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TeacherProfile as TeacherProfileType } from '@/types/teacher';
import { useToast } from '@/hooks/use-toast';

interface TeacherProfileProps {
  profile: TeacherProfileType;
  onUpdate?: (profile: TeacherProfileType) => void;
}

export function TeacherProfile({ profile, onUpdate }: TeacherProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
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
    }
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedProfile = {
        ...profile,
        teacher: {
          ...profile.teacher,
          ...data,
        }
      };
      
      onUpdate?.(updatedProfile);
      setIsEditing(false);
      toast({
        title: 'Profile Updated',
        description: 'Teacher profile has been successfully updated.',
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

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with avatar and basic info */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-8">
          <div className="flex items-center space-x-6">
            <img
              src={profile.teacher.avatar}
              alt={`${profile.teacher.firstName} ${profile.teacher.lastName}`}
              className="h-24 w-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {profile.teacher.firstName} {profile.teacher.lastName}
                  </h1>
                  <p className="text-emerald-100 text-lg">{profile.teacher.role}</p>
                  <p className="text-emerald-200 text-sm">{profile.teacher.department} Department</p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors duration-200"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Editable form section */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  First Name
                </label>
                <input
                  {...register('firstName', { required: 'First name is required' })}
                  disabled={!isEditing}
                  className={cn(
                    'w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                    !isEditing && 'bg-slate-50 text-slate-600',
                    errors.firstName && 'border-red-500'
                  )}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Last Name
                </label>
                <input
                  {...register('lastName', { required: 'Last name is required' })}
                  disabled={!isEditing}
                  className={cn(
                    'w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                    !isEditing && 'bg-slate-50 text-slate-600',
                    errors.lastName && 'border-red-500'
                  )}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  disabled={!isEditing}
                  className={cn(
                    'w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                    !isEditing && 'bg-slate-50 text-slate-600',
                    errors.email && 'border-red-500'
                  )}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone
                </label>
                <input
                  {...register('phone', { required: 'Phone number is required' })}
                  disabled={!isEditing}
                  className={cn(
                    'w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                    !isEditing && 'bg-slate-50 text-slate-600',
                    errors.phone && 'border-red-500'
                  )}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Role
                </label>
                <input
                  {...register('role', { required: 'Role is required' })}
                  disabled={!isEditing}
                  className={cn(
                    'w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                    !isEditing && 'bg-slate-50 text-slate-600',
                    errors.role && 'border-red-500'
                  )}
                />
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Department
                </label>
                <input
                  {...register('department', { required: 'Department is required' })}
                  disabled={!isEditing}
                  className={cn(
                    'w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                    !isEditing && 'bg-slate-50 text-slate-600',
                    errors.department && 'border-red-500'
                  )}
                />
                {errors.department && (
                  <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors duration-200"
                >
                  {isLoading ? (
                    <div className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Email</h3>
          </div>
          <p className="text-slate-600">{profile.contact.email}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Phone className="h-5 w-5 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Phone</h3>
          </div>
          <p className="text-slate-600">{profile.contact.phone}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <MapPin className="h-5 w-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Address</h3>
          </div>
          <p className="text-slate-600 text-sm">
            {profile.contact.address.street}<br />
            {profile.contact.address.city}, {profile.contact.address.state} {profile.contact.address.zipCode}
          </p>
        </div>
      </div>

      {/* Qualifications Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Qualifications & Rates</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Private Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Group Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Certification
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {profile.qualifications.map((qual) => (
                <tr key={qual.id} className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {qual.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {qual.level}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-emerald-500 mr-1" />
                      {qual.privateRate}/hr
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-emerald-500 mr-1" />
                      {qual.groupRate}/hr
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div>
                      <p>{qual.certification}</p>
                      {qual.expiryDate && (
                        <p className="text-xs text-slate-500 mt-1">
                          Expires: {new Date(qual.expiryDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}