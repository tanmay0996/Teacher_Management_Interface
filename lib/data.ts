import { TeacherProfile } from '@/types/teacher';

export const mockTeacherProfile: TeacherProfile = {
  teacher: {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@school.edu',
    phone: '+1 (555) 123-4567',
    birthDate: '1985-03-15',
    role: 'Senior Mathematics Teacher',
    department: 'Mathematics',
    hireDate: '2018-08-20',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  contact: {
    email: 'sarah.johnson@school.edu',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Oak Street, Apt 4B',
      city: 'Boston',
      state: 'MA',
      zipCode: '02101',
      country: 'United States'
    }
  },
  qualifications: [
    {
      id: '1',
      subject: 'Algebra',
      level: 'High School',
      privateRate: 75,
      groupRate: 45,
      certification: 'MA Teaching License',
      expiryDate: '2026-06-30'
    },
    {
      id: '2',
      subject: 'Calculus',
      level: 'AP/College',
      privateRate: 90,
      groupRate: 55,
      certification: 'Advanced Mathematics Certification',
      expiryDate: '2025-12-15'
    },
    {
      id: '3',
      subject: 'Geometry',
      level: 'High School',
      privateRate: 70,
      groupRate: 40,
      certification: 'MA Teaching License'
    }
  ],
  availability: [
    {
      id: '1',
      day: 'Monday',
      startTime: '09:00',
      endTime: '12:00',
      isAvailable: true,
      isScheduled: false
    },
    {
      id: '2',
      day: 'Monday',
      startTime: '14:00',
      endTime: '16:00',
      isAvailable: true,
      isScheduled: true,
      subject: 'Algebra',
      studentName: 'John Smith'
    },
    {
      id: '3',
      day: 'Tuesday',
      startTime: '10:00',
      endTime: '13:00',
      isAvailable: true,
      isScheduled: false
    },
    {
      id: '4',
      day: 'Wednesday',
      startTime: '09:00',
      endTime: '11:00',
      isAvailable: true,
      isScheduled: true,
      subject: 'Calculus',
      studentName: 'Emma Davis'
    },
    {
      id: '5',
      day: 'Thursday',
      startTime: '13:00',
      endTime: '17:00',
      isAvailable: true,
      isScheduled: false
    },
    {
      id: '6',
      day: 'Friday',
      startTime: '09:00',
      endTime: '12:00',
      isAvailable: true,
      isScheduled: false
    }
  ],
  paymentInfo: {
    bankAccount: {
      accountNumber: '****1234',
      routingNumber: '021000021',
      bankName: 'Chase Bank'
    },
    paymentMethods: [
      {
        id: '1',
        type: 'bank',
        isDefault: true,
        details: 'Chase Bank ****1234',
        status: 'active'
      },
      {
        id: '2',
        type: 'paypal',
        isDefault: false,
        details: 'sarah.johnson@email.com',
        status: 'active'
      }
    ],
    earnings: {
      thisMonth: 3250,
      lastMonth: 2890,
      totalEarnings: 28750
    }
  }
};

export const schools = [
  { id: '1', name: 'Lincoln High School', location: 'Boston, MA' },
  { id: '2', name: 'Roosevelt Middle School', location: 'Cambridge, MA' },
  { id: '3', name: 'Washington Elementary', location: 'Somerville, MA' }
];