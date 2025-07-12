'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Check,
  AlertCircle,
  Calendar,
  ArrowUpRight,
  Wallet
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PaymentInfo } from '@/types/teacher';

interface PaymentInterfaceProps {
  paymentInfo: PaymentInfo;
  onUpdate?: (paymentInfo: PaymentInfo) => void;
}

export function PaymentInterface({ paymentInfo, onUpdate }: PaymentInterfaceProps) {
  const [selectedMethod, setSelectedMethod] = useState(paymentInfo.paymentMethods.find(m => m.isDefault)?.id || '');

  const earningsGrowth = ((paymentInfo.earnings.thisMonth - paymentInfo.earnings.lastMonth) / paymentInfo.earnings.lastMonth * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Earnings Overview */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <Wallet className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Earnings Overview</h3>
            </div>
            <div className="flex items-center space-x-2 text-emerald-100">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">+{earningsGrowth}%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group">
              <p className="text-emerald-100 text-sm mb-1">This Month</p>
              <p className="text-2xl font-bold group-hover:scale-105 transition-transform duration-200">
                ${paymentInfo.earnings.thisMonth.toLocaleString()}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group">
              <p className="text-emerald-100 text-sm mb-1">Last Month</p>
              <p className="text-2xl font-bold group-hover:scale-105 transition-transform duration-200">
                ${paymentInfo.earnings.lastMonth.toLocaleString()}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group">
              <p className="text-emerald-100 text-sm mb-1">Total Earnings</p>
              <p className="text-2xl font-bold group-hover:scale-105 transition-transform duration-200">
                ${paymentInfo.earnings.totalEarnings.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Payment Methods</h3>
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95 group">
              <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
              Add Method
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {paymentInfo.paymentMethods.map((method, index) => (
            <div
              key={method.id}
              className={cn(
                'p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 group',
                method.isDefault 
                  ? 'border-emerald-300 bg-emerald-50' 
                  : 'border-slate-200 hover:border-slate-300'
              )}
              onClick={() => setSelectedMethod(method.id)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    'p-2 rounded-lg transition-colors duration-200',
                    method.type === 'bank' && 'bg-green-100',
                    method.type === 'paypal' && 'bg-blue-100',
                    method.type === 'stripe' && 'bg-purple-100'
                  )}>
                    {method.type === 'bank' && <DollarSign className="h-5 w-5 text-green-600" />}
                    {method.type === 'paypal' && <CreditCard className="h-5 w-5 text-blue-600" />}
                    {method.type === 'stripe' && <CreditCard className="h-5 w-5 text-purple-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 group-hover:text-emerald-600 transition-colors duration-200">
                      {method.details}
                    </p>
                    <p className="text-sm text-slate-500 capitalize">{method.type} • {method.status}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {method.isDefault && (
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full animate-pulse">
                      Default
                    </span>
                  )}
                  {method.status === 'active' && (
                    <Check className="h-5 w-5 text-emerald-500 group-hover:scale-110 transition-transform duration-200" />
                  )}
                  {method.status === 'pending' && (
                    <AlertCircle className="h-5 w-5 text-amber-500 animate-pulse" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
            </div>
            <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center space-x-1 hover:scale-105 transition-all duration-200">
              <span>View All</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-200">
          {[
            { date: '2024-01-15', amount: 450, student: 'John Smith', subject: 'Algebra' },
            { date: '2024-01-14', amount: 380, student: 'Emma Davis', subject: 'Calculus' },
            { date: '2024-01-13', amount: 290, student: 'Mike Johnson', subject: 'Geometry' },
            { date: '2024-01-12', amount: 520, student: 'Sarah Wilson', subject: 'Statistics' }
          ].map((transaction, index) => (
            <div 
              key={index} 
              className="p-4 hover:bg-slate-50 transition-all duration-200 hover:scale-[1.01] group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-medium text-slate-900 group-hover:text-emerald-600 transition-colors duration-200">
                        {transaction.student}
                      </p>
                      <p className="text-sm text-slate-500">{transaction.subject} • {transaction.date}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-600 group-hover:scale-110 transition-transform duration-200">
                    +${transaction.amount}
                  </p>
                  <p className="text-xs text-slate-500">Completed</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}