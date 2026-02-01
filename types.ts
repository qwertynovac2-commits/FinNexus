
export type LoanStatus = 'PENDING' | 'KYC_COMPLETED' | 'UNDERWRITING' | 'APPROVED' | 'DISBURSED' | 'REJECTED' | 'CLOSED';
export type DPDLevel = '0' | '1-30' | '31-60' | '61-90' | 'NPA';
export type ProductType = 'PERSONAL' | 'BUSINESS' | 'MSME' | 'GOLD' | 'VEHICLE' | 'LAP';

export interface Customer {
  id: string;
  name: string;
  pan: string;
  aadhaar: string;
  phone: string;
  email: string;
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  cibilScore?: number;
  income?: number;
}

export interface LoanApplication {
  id: string;
  customer: Customer;
  amount: number;
  tenure: number;
  productType: ProductType;
  interestRate: number;
  status: LoanStatus;
  createdAt: string;
  riskScore?: number;
  riskFactors?: string[];
}

export interface EMISlot {
  date: string;
  amount: number;
  principal: number;
  interest: number;
  balance: number;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
}

export interface LoanAccount extends LoanApplication {
  outstandingAmount: number;
  nextEMIDate: string;
  lastPaymentDate?: string;
  dpd: number;
  dpdBucket: DPDLevel;
  schedule: EMISlot[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface CollectionCase {
  loanId: string;
  customerName: string;
  overdueAmount: number;
  dpd: number;
  lastAction: string;
  assignedTo: string;
  status: 'PTP' | 'FOLLOW_UP' | 'LEGAL' | 'SETTLED';
}
