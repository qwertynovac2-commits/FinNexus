
import React from 'react';
import { 
  LayoutDashboard, 
  FilePlus, 
  Users, 
  Wallet, 
  ShieldAlert, 
  BarChart3, 
  Settings,
  FileSpreadsheet
} from 'lucide-react';
import { LoanApplication, LoanAccount, CollectionCase } from './types';

export const COLORS = {
  primary: '#0f172a',
  secondary: '#334155',
  accent: '#2563eb',
  success: '#16a34a',
  warning: '#ca8a04',
  danger: '#dc2626',
};

export const NAVIGATION = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'los', label: 'Origination (LOS)', icon: <FilePlus className="w-5 h-5" /> },
  { id: 'lms', label: 'Management (LMS)', icon: <Wallet className="w-5 h-5" /> },
  { id: 'collections', label: 'Collections Hub', icon: <ShieldAlert className="w-5 h-5" /> },
  { id: 'analytics', label: 'Portfolio Analytics', icon: <BarChart3 className="w-5 h-5" /> },
  { id: 'compliance', label: 'Compliance & RBI', icon: <FileSpreadsheet className="w-5 h-5" /> },
  { id: 'customers', label: 'CRM / Customers', icon: <Users className="w-5 h-5" /> },
  { id: 'settings', label: 'System Config', icon: <Settings className="w-5 h-5" /> },
];

export const MOCK_APPLICATIONS: LoanApplication[] = [
  { id: 'APP-1029', customer: { id: 'C1', name: 'Rajesh Kumar', pan: 'ABCDE1234F', aadhaar: 'xxxx-xxxx-1234', phone: '9876543210', email: 'rajesh@example.com', kycStatus: 'VERIFIED', cibilScore: 785 }, amount: 500000, tenure: 24, productType: 'PERSONAL', interestRate: 14.5, status: 'KYC_COMPLETED', createdAt: '2023-11-20' },
  { id: 'APP-1030', customer: { id: 'C2', name: 'Priya Sharma', pan: 'FGHIJ5678K', aadhaar: 'xxxx-xxxx-5678', phone: '9876543211', email: 'priya@example.com', kycStatus: 'PENDING', cibilScore: 620 }, amount: 1500000, tenure: 60, productType: 'BUSINESS', interestRate: 11.2, status: 'UNDERWRITING', createdAt: '2023-11-21' },
  { id: 'APP-1031', customer: { id: 'C3', name: 'Anil Mehta', pan: 'KLMNO9012P', aadhaar: 'xxxx-xxxx-9012', phone: '9876543212', email: 'anil@example.com', kycStatus: 'VERIFIED', cibilScore: 810 }, amount: 250000, tenure: 12, productType: 'MSME', interestRate: 13.0, status: 'APPROVED', createdAt: '2023-11-22' },
];

export const MOCK_LOANS: LoanAccount[] = [
  { 
    id: 'L-50122', 
    customer: { id: 'C1', name: 'Amit Jha', pan: 'AAAAA1111A', aadhaar: 'xxxx-xxxx-1111', phone: '9999999999', email: 'amit@example.com', kycStatus: 'VERIFIED' },
    amount: 1250000, 
    outstandingAmount: 940000, 
    tenure: 36, 
    productType: 'LAP', 
    interestRate: 9.5, 
    status: 'DISBURSED', 
    createdAt: '2023-01-15',
    nextEMIDate: '2023-12-05',
    dpd: 0,
    dpdBucket: '0',
    schedule: []
  },
  { 
    id: 'L-50123', 
    customer: { id: 'C2', name: 'Suman Singh', pan: 'BBBBB2222B', aadhaar: 'xxxx-xxxx-2222', phone: '8888888888', email: 'suman@example.com', kycStatus: 'VERIFIED' },
    amount: 450000, 
    outstandingAmount: 442000, 
    tenure: 24, 
    productType: 'PERSONAL', 
    interestRate: 18.0, 
    status: 'DISBURSED', 
    createdAt: '2023-06-10',
    nextEMIDate: '2023-12-01',
    dpd: 32,
    dpdBucket: '31-60',
    schedule: []
  }
];

export const MOCK_COLLECTIONS: CollectionCase[] = [
  { loanId: 'L-50123', customerName: 'Suman Singh', overdueAmount: 24500, dpd: 32, lastAction: 'Call Made', assignedTo: 'Agent Rahul', status: 'FOLLOW_UP' },
  { loanId: 'L-50200', customerName: 'Vikram Batra', overdueAmount: 110000, dpd: 95, lastAction: 'Notice Sent', assignedTo: 'Legal Team', status: 'LEGAL' },
];

export const MOCK_CHART_DATA = [
  { name: 'Jan', applications: 400, disbursed: 240, collection: 98 },
  { name: 'Feb', applications: 300, disbursed: 139, collection: 97 },
  { name: 'Mar', applications: 200, disbursed: 980, collection: 95 },
  { name: 'Apr', applications: 278, disbursed: 390, collection: 96 },
  { name: 'May', applications: 189, disbursed: 480, collection: 99 },
  { name: 'Jun', applications: 239, disbursed: 380, collection: 98 },
];

export const PRODUCT_DISTRIBUTION = [
  { name: 'Personal Loans', value: 45 },
  { name: 'Business Loans', value: 25 },
  { name: 'MSME', value: 20 },
  { name: 'Gold Loans', value: 10 },
];
