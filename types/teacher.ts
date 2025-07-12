export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  role: string;
  department: string;
  hireDate: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'on-leave';
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface Qualification {
  id: string;
  subject: string;
  level: string;
  privateRate: number;
  groupRate: number;
  certification?: string;
  expiryDate?: string;
}

export interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  isScheduled: boolean;
  subject?: string;
  studentName?: string;
}

export interface TeacherProfile {
  teacher: Teacher;
  contact: ContactInfo;
  qualifications: Qualification[];
  availability: TimeSlot[];
  paymentInfo: PaymentInfo;
}

export interface PaymentInfo {
  bankAccount: {
    accountNumber: string;
    routingNumber: string;
    bankName: string;
  };
  paymentMethods: PaymentMethod[];
  earnings: {
    thisMonth: number;
    lastMonth: number;
    totalEarnings: number;
  };
}

export interface PaymentMethod {
  id: string;
  type: 'bank' | 'paypal' | 'stripe';
  isDefault: boolean;
  details: string;
  status: 'active' | 'pending' | 'inactive';
}