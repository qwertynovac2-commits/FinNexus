
export type LoanStatus = 'LEAD' | 'KYC_PENDING' | 'UNDERWRITING' | 'SANCTIONED' | 'AGREEMENT_PENDING' | 'SIGNED' | 'DISBURSED' | 'REJECTED' | 'CLOSED' | 'NPA';
export type DPDLevel = '0' | '1-30' | '31-60' | '61-90' | '90+';
export type ProductType = 'PERSONAL' | 'BUSINESS' | 'MSME' | 'GOLD' | 'VEHICLE' | 'LAP';
export type TransactionType = 'CREDIT' | 'DEBIT';

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
  employmentType?: 'SALARIED' | 'SELF_EMPLOYED' | 'BUSINESS';
}

export interface EMISlot {
  installmentNo: number;
  date: string;
  amount: number;
  principal: number;
  interest: number;
  balance: number;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
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
  esignStatus?: 'NOT_STARTED' | 'PENDING' | 'COMPLETED';
  documents?: { name: string; status: 'UPLOADED' | 'VERIFIED' | 'REJECTED' }[];
}

export interface LoanAccount extends LoanApplication {
  disbursementDate?: string;
  outstandingAmount: number;
  nextEMIDate: string;
  emiAmount: number;
  dpd: number;
  dpdBucket: DPDLevel;
  schedule: EMISlot[];
}

export interface LedgerEntry {
  id: string;
  date: string;
  description: string;
  accountHead: string;
  type: TransactionType;
  amount: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
