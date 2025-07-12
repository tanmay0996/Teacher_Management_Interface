'use client';

import React, { useState } from 'react';
import { Clock, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TimeSlot } from '@/types/teacher';

interface AvailabilityCalendarProps {
  availability: TimeSlot[];
  onUpdate?: (availability: TimeSlot[]) => void;
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

export function AvailabilityCalendar({ availability, onUpdate }: AvailabilityCalendarProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ day: string; time: string } | null>(null);

  const getSlotForDayAndTime = (day: string, time: string) => {
    return availability.find(slot => 
      slot.day === day && 
      slot.startTime <= time && 
      slot.endTime > time
    );
  };

  const handleSlotClick = (day: string, time: string) => {
    const existingSlot = getSlotForDayAndTime(day, time);
    
    if (existingSlot) {
      // Remove existing slot
      const updatedAvailability = availability.filter(slot => slot.id !== existingSlot.id);
      onUpdate?.(updatedAvailability);
    } else {
      // Add new slot
      const newSlot: TimeSlot = {
        id: Date.now().toString(),
        day,
        startTime: time,
        endTime: `${String(parseInt(time.split(':')[0]) + 1).padStart(2, '0')}:00`,
        isAvailable: true,
        isScheduled: false
      };
      onUpdate?.([...availability, newSlot]);
    }
  };

  const handleDragStart = (day: string, time: string) => {
    setDragStart({ day, time });
  };

  const handleDragEnd = (day: string, time: string) => {
    if (dragStart && (dragStart.day !== day || dragStart.time !== time)) {
      // Create availability block from drag start to drag end
      const startHour = parseInt(dragStart.time.split(':')[0]);
      const endHour = parseInt(time.split(':')[0]) + 1;
      
      if (startHour < endHour) {
        const newSlot: TimeSlot = {
          id: Date.now().toString(),
          day: dragStart.day,
          startTime: dragStart.time,
          endTime: `${String(endHour).padStart(2, '0')}:00`,
          isAvailable: true,
          isScheduled: false
        };
        onUpdate?.([...availability, newSlot]);
      }
    }
    setDragStart(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="px-6 py-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Clock className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Weekly Availability</h3>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-emerald-100 border border-emerald-300 rounded"></div>
              <span className="text-slate-600">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
              <span className="text-slate-600">Scheduled</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Days header */}
            <div className="grid grid-cols-11 gap-1 mb-2">
              <div className="font-medium text-slate-700 text-sm p-3"></div>
              {daysOfWeek.map(day => (
                <div key={day} className="font-semibold text-slate-800 text-sm p-3 text-center bg-slate-50 rounded-lg">
                  {day.slice(0, 3)}
                </div>
              ))}
            </div>
            
            {/* Time slots grid */}
            {timeSlots.map((time, timeIndex) => (
              <div key={time} className="grid grid-cols-11 gap-1 mb-1">
                {/* Time label */}
                <div className="font-medium text-slate-700 text-sm p-3 text-right bg-slate-50 rounded-lg flex items-center justify-end">
                  {time}
                </div>
                
                {/* Day slots for this time */}
                {daysOfWeek.map((day, dayIndex) => {
                  const slot = getSlotForDayAndTime(day, time);
                  const isScheduled = slot?.isScheduled;
                  const isAvailable = slot?.isAvailable;

                  return (
                    <div
                      key={`${day}-${time}`}
                      className={cn(
                        'h-14 border-2 border-slate-200 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md relative group hover:scale-105 active:scale-95',
                        isScheduled && 'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300 shadow-sm',
                        isAvailable && !isScheduled && 'bg-gradient-to-br from-emerald-100 to-emerald-200 border-emerald-300 shadow-sm',
                        !isAvailable && 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                      )}
                      onClick={() => handleSlotClick(day, time)}
                      onMouseDown={() => handleDragStart(day, time)}
                      onMouseUp={() => handleDragEnd(day, time)}
                      title={slot ? 
                        `${slot.subject || 'Available'} ${slot.studentName ? `- ${slot.studentName}` : ''}` : 
                        'Click to add availability'
                      }
                      style={{ 
                        animationDelay: `${(timeIndex * daysOfWeek.length + dayIndex) * 50}ms`,
                        animation: 'fadeInUp 0.5s ease-out forwards'
                      }}
                    >
                      {slot && slot.isScheduled && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                          <div className="text-xs text-blue-800 font-semibold text-center">
                            <div className="truncate w-full">{slot.subject}</div>
                            {slot.studentName && (
                              <div className="text-blue-600 text-xs truncate w-full">{slot.studentName}</div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {slot && !slot.isScheduled && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                          <div className="bg-emerald-600 rounded-full p-1">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                      )}
                      
                      {!slot && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                          <Plus className="h-5 w-5 text-slate-400 group-hover:text-emerald-600 transition-colors duration-200" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <p className="text-sm font-medium text-slate-700 mb-2">Instructions:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
            <ul className="space-y-1">
              <li className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-200 border border-emerald-300 rounded"></div>
                <span>Click empty slots to add availability</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-200 border border-blue-300 rounded"></div>
                <span>Blue slots are scheduled classes</span>
              </li>
            </ul>
            <ul className="space-y-1">
              <li className="flex items-center space-x-2">
                <Trash2 className="h-3 w-3 text-slate-400" />
                <span>Click available slots to remove them</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="h-3 w-3 text-slate-400" />
                <span>Drag across slots for time blocks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}