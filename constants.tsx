
import React from 'react';
import { 
  LayoutDashboard, 
  FilePlus, 
  Users, 
  Wallet, 
  ShieldAlert, 
  BarChart3, 
  Settings,
  FileSpreadsheet,
  BookOpen
} from 'lucide-react';
import { LoanApplication, LoanAccount, LedgerEntry } from './types';

export const COLORS = {
  primary: '#0f172a',
  secondary: '#334155',
  accent: '#2563eb',
  success: '#16a34a',
  warning: '#ca8a04',
  danger: '#dc2626',
};

export const NAVIGATION = [
  { id: 'dashboard', label: 'Executive Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'los', label: 'Origination (LOS)', icon: <FilePlus className="w-5 h-5" /> },
  { id: 'lms', label: 'Management (LMS)', icon: <Wallet className="w-5 h-5" /> },
  { id: 'collections', label: 'Collections Hub', icon: <ShieldAlert className="w-5 h-5" /> },
  { id: 'accounting', label: 'Accounting & GL', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'compliance', label: 'Regulatory (RBI)', icon: <FileSpreadsheet className="w-5 h-5" /> },
  { id: 'analytics', label: 'BI & Analytics', icon: <BarChart3 className="w-5 h-5" /> },
  { id: 'settings', label: 'System Config', icon: <Settings className="w-5 h-5" /> },
];

// Added missing mock chart data for Dashboard
export const MOCK_CHART_DATA = [
  { name: 'Jul', disbursed: 4500000 },
  { name: 'Aug', disbursed: 5200000 },
  { name: 'Sep', disbursed: 4800000 },
  { name: 'Oct', disbursed: 6100000 },
  { name: 'Nov', disbursed: 5500000 },
  { name: 'Dec', disbursed: 7200000 },
];

// Added missing product distribution data for Dashboard
export const PRODUCT_DISTRIBUTION = [
  { name: 'Personal', value: 35 },
  { name: 'Business', value: 25 },
  { name: 'Gold', value: 15 },
  { name: 'Vehicle', value: 15 },
  { name: 'LAP', value: 10 },
];

export const MOCK_APPLICATIONS: LoanApplication[] = [
  { 
    id: 'APP-1029', 
    customer: { id: 'C1', name: 'Rajesh Kumar', pan: 'ABCDE1234F', aadhaar: 'xxxx-xxxx-1234', phone: '9876543210', email: 'rajesh@example.com', kycStatus: 'VERIFIED', cibilScore: 785, income: 120000 }, 
    amount: 500000, tenure: 24, productType: 'PERSONAL', interestRate: 14.5, status: 'KYC_PENDING', createdAt: '2023-11-20',
    documents: [{ name: 'Aadhaar', status: 'VERIFIED' }, { name: 'PAN', status: 'VERIFIED' }]
  },
  { 
    id: 'APP-1030', 
    customer: { id: 'C2', name: 'Priya Sharma', pan: 'FGHIJ5678K', aadhaar: 'xxxx-xxxx-5678', phone: '9876543211', email: 'priya@example.com', kycStatus: 'VERIFIED', cibilScore: 620, income: 85000 }, 
    amount: 1500000, tenure: 60, productType: 'BUSINESS', interestRate: 11.2, status: 'UNDERWRITING', createdAt: '2023-11-21' 
  },
];

export const MOCK_LOANS: LoanAccount[] = [
  { 
    id: 'L-50122', 
    customer: { id: 'C1', name: 'Amit Jha', pan: 'AAAAA1111A', aadhaar: 'xxxx-xxxx-1111', phone: '9999999999', email: 'amit@example.com', kycStatus: 'VERIFIED' },
    amount: 1250000, outstandingAmount: 940000, tenure: 36, productType: 'LAP', interestRate: 9.5, status: 'DISBURSED', createdAt: '2023-01-15',
    nextEMIDate: '2023-12-05', emiAmount: 42500, dpd: 0, dpdBucket: '0',
    schedule: Array.from({ length: 36 }, (_, i) => ({ installmentNo: i+1, date: `2024-01-${i+1}`, amount: 42500, principal: 30000, interest: 12500, balance: 1250000 - (i+1)*30000, status: i < 5 ? 'PAID' : 'PENDING' }))
  },
  { 
    id: 'L-50123', 
    customer: { id: 'C2', name: 'Suman Singh', pan: 'BBBBB2222B', aadhaar: 'xxxx-xxxx-2222', phone: '8888888888', email: 'suman@example.com', kycStatus: 'VERIFIED' },
    amount: 450000, outstandingAmount: 442000, tenure: 24, productType: 'PERSONAL', interestRate: 18.0, status: 'DISBURSED', createdAt: '2023-06-10',
    nextEMIDate: '2023-12-01', emiAmount: 22000, dpd: 32, dpdBucket: '31-60',
    schedule: []
  }
];

export const MOCK_LEDGER: LedgerEntry[] = [
  { id: 'TXN-001', date: '2023-11-22', description: 'EMI Receipt - L-50122', accountHead: 'Loan Repayments', type: 'CREDIT', amount: 42500 },
  { id: 'TXN-002', date: '2023-11-22', description: 'Loan Disbursement - L-9920', accountHead: 'Disbursement A/C', type: 'DEBIT', amount: 250000 },
  { id: 'TXN-003', date: '2023-11-21', description: 'Processing Fee - APP-1031', accountHead: 'Other Income', type: 'CREDIT', amount: 5000 },
];

// Added missing mock collections data for CollectionsHub
export const MOCK_COLLECTIONS = [
  { loanId: 'L-50123', customerName: 'Suman Singh', overdueAmount: 22000, dpd: 32, assignedTo: 'Rahul M.', status: 'FOLLOW_UP' },
  { loanId: 'L-50125', customerName: 'Vikram Aditya', overdueAmount: 45000, dpd: 65, assignedTo: 'Sneh L.', status: 'LEGAL' },
  { loanId: 'L-50128', customerName: 'Anjali Gupta', overdueAmount: 12500, dpd: 15, assignedTo: 'Rahul M.', status: 'PTP' },
];
