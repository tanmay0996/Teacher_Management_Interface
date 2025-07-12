'use client';

import React from 'react';
import { 
  Edit2, 
  Mail, 
  Phone, 
  MapPin, 
  Award,
  DollarSign,
  Calendar,
  User
} from 'lucide-react';
import { TeacherProfile as TeacherProfileType } from '@/types/teacher';

interface TeacherProfileDisplayProps {
  profile: TeacherProfileType;
  onEdit: () => void;
}

export function TeacherProfileDisplay({ profile, onEdit }: TeacherProfileDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Header with avatar and basic info */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex items-center space-x-6 relative z-10">
            <div className="relative">
              <img
                src={profile.teacher.avatar}
                alt={`${profile.teacher.firstName} ${profile.teacher.lastName}`}
                className="h-24 w-24 rounded-full border-4 border-white shadow-lg object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2 shadow-lg">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold text-white animate-fade-in">
                    {profile.teacher.firstName} {profile.teacher.lastName}
                  </h1>
                  <p className="text-emerald-100 text-lg animate-fade-in-delay-1">{profile.teacher.role}</p>
                  <p className="text-emerald-200 text-sm animate-fade-in-delay-2">{profile.teacher.department} Department</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1 text-emerald-200 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>Hired: {new Date(profile.teacher.hireDate).toLocaleDateString()}</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      profile.teacher.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {profile.teacher.status.charAt(0).toUpperCase() + profile.teacher.status.slice(1)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={onEdit}
                  className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 hover:scale-105 active:scale-95 group/btn"
                >
                  <Edit2 className="h-4 w-4 mr-2 transition-transform duration-200 group-hover/btn:rotate-12" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-200">
              <Mail className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Email</h3>
          </div>
          <p className="text-slate-600 break-all">{profile.contact.email}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors duration-200">
              <Phone className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Phone</h3>
          </div>
          <p className="text-slate-600">{profile.contact.phone}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors duration-200">
              <MapPin className="h-5 w-5 text-amber-600 group-hover:scale-110 transition-transform duration-200" />
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
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-indigo-50">
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
              {profile.qualifications.map((qual, index) => (
                <tr 
                  key={qual.id} 
                  className="hover:bg-slate-50 transition-all duration-200 hover:scale-[1.01] hover:shadow-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      {qual.subject}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {qual.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    <div className="flex items-center group">
                      <DollarSign className="h-4 w-4 text-emerald-500 mr-1 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-semibold text-emerald-600">{qual.privateRate}</span>/hr
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    <div className="flex items-center group">
                      <DollarSign className="h-4 w-4 text-emerald-500 mr-1 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-semibold text-emerald-600">{qual.groupRate}</span>/hr
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div>
                      <p className="font-medium">{qual.certification}</p>
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