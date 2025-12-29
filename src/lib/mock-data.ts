// ================================
// TraderCheck – Mock Data
// ================================

/* =====================
   CORE INTERFACES
===================== */

export interface Abuser {
  id: string;
  categoryId: string;
  subCategory: string;
  allegationTypeId: string;
  value: string;
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
  status: 'pending' | 'verified' | 'cleared';
  verified: boolean;
  reportedBy: string;
  createdAt: string;
  description: string;

  abuser: {
    name: string;
    emails: string[];
    contact: string;
    address: string;
    city: string;
    country: string;
    ips: string[];
    documentType: string;
    documentNumber: string;
  };
}

export interface Broker {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'active' | 'inactive';
  createdAt: string;
  complaintsSubmitted: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  inputType: string;
}

export interface AllegationType {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high';
}

export interface SearchLog {
  id: string;
  brokerId: string;
  brokerName: string;
  category: string;
  searchValue: string;
  resultScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  timestamp: string;
}

/* =====================
   MOCK DATA
===================== */

export const brokers: Broker[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@broker1.com',
    company: 'Alpha Trading',
    status: 'active',
    createdAt: '2024-01-15',
    complaintsSubmitted: 12,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@broker2.com',
    company: 'Beta Investments',
    status: 'active',
    createdAt: '2024-02-20',
    complaintsSubmitted: 8,
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike@broker3.com',
    company: 'Gamma Securities',
    status: 'inactive',
    createdAt: '2024-03-10',
    complaintsSubmitted: 5,
  },
];

export const categories: Category[] = [
  { id: '1', name: 'Financial Fraud', description: 'Money related fraud', inputType: 'text' },
  { id: '2', name: 'Cyber Crime', description: 'Online abuse activity', inputType: 'text' },
  { id: '3', name: 'Market Manipulation', description: 'Trading manipulation', inputType: 'text' },
];

export const allegationTypes: AllegationType[] = [
  { id: '1', name: 'Fraud', severity: 'high' },
  { id: '2', name: 'Non-Payment', severity: 'medium' },
  { id: '3', name: 'Fake Identity', severity: 'high' },
  { id: '4', name: 'Chargeback Fraud', severity: 'high' },
];

/* =====================
   ABUSER RECORDS
===================== */

export const abusers: Abuser[] = [
  {
    id: '1',
    categoryId: '1',
    subCategory: 'Fake Broker',
    allegationTypeId: '1',
    value: 'john.fakebroker.com',
    score: 20,
    riskLevel: 'high',
    status: 'verified',
    verified: true,
    reportedBy: '1',
    createdAt: '2024-06-15',
    description: 'Fraudulent trading platform',
    abuser: {
      name: 'John Doe',
      emails: ['john@fakebroker.com', 'support@fakebroker.com'],
      contact: '+1-555-123456',
      address: '123 Wall Street',
      city: 'New York',
      country: 'USA',
      ips: ['192.168.1.1', '172.16.0.2'],
      documentType: 'Passport',
      documentNumber: 'P12345678',
    },
  },
  {
    id: '2',
    categoryId: '2',
    subCategory: 'Phishing',
    allegationTypeId: '3',
    value: 'phishing@email.com',
    score: 15,
    riskLevel: 'medium',
    status: 'pending',
    verified: false,
    reportedBy: '2',
    createdAt: '2024-07-20',
    description: 'Using fake identity for phishing',
    abuser: {
      name: 'Michael Trader',
      emails: ['michael@scam.com'],
      contact: '+44-7700-900123',
      address: '45 Oxford Street',
      city: 'London',
      country: 'UK',
      ips: ['10.0.0.1'],
      documentType: 'Driving License',
      documentNumber: 'DL-987654',
    },
  },
];

/* =====================
   SEARCH LOGS
===================== */

export const searchLogs: SearchLog[] = [
  {
    id: '1',
    brokerId: '1',
    brokerName: 'John Smith',
    category: 'Email',
    searchValue: 'john@fakebroker.com',
    resultScore: 20,
    riskLevel: 'high',
    timestamp: '2024-12-28 10:30:00',
  },
];

/* =====================
   HELPERS
===================== */

export function getRiskLevel(score: number): 'low' | 'medium' | 'high' {
  if (score <= 5) return 'low';
  if (score <= 15) return 'medium';
  return 'high';
}

export function getRiskBadgeVariant(
  level: 'low' | 'medium' | 'high'
): 'default' | 'secondary' | 'destructive' {
  switch (level) {
    case 'low':
      return 'default';
    case 'medium':
      return 'secondary';
    case 'high':
      return 'destructive';
  }
}

export function getStatusBadgeVariant(
  status: 'pending' | 'verified' | 'cleared'
): 'warning' | 'success' | 'default' {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'verified':
      return 'success';
    case 'cleared':
      return 'default';
  }
}

// ================================
// End of TraderCheck – Mock Data
// ================================