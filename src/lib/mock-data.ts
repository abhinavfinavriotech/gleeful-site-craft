// Mock data for the TraderCheck platform

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

export interface Abuser {
  id: string;
  categoryId: string;
  value: string;
  allegationTypeId: string;
  description: string;
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
  reportedBy: string;
  createdAt: string;
  verified: boolean;
  status: 'pending' | 'verified' | 'cleared';
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

// Initial mock data
export const brokers: Broker[] = [
  { id: '1', name: 'John Smith', email: 'john@broker1.com', company: 'Alpha Trading', status: 'active', createdAt: '2024-01-15', complaintsSubmitted: 12 },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@broker2.com', company: 'Beta Investments', status: 'active', createdAt: '2024-02-20', complaintsSubmitted: 8 },
  { id: '3', name: 'Mike Wilson', email: 'mike@broker3.com', company: 'Gamma Securities', status: 'inactive', createdAt: '2024-03-10', complaintsSubmitted: 5 },
];

export const categories: Category[] = [
  { id: '1', name: 'Name', description: 'Full name or alias of the trader', inputType: 'text' },
  { id: '2', name: 'Email', description: 'Email address used by the trader', inputType: 'email' },
  { id: '3', name: 'Mobile Number', description: 'Phone number with country code', inputType: 'tel' },
  { id: '4', name: 'Document Number', description: 'PAN/Aadhar/Passport number', inputType: 'text' },
];

export const allegationTypes: AllegationType[] = [
  { id: '1', name: 'Fraud', severity: 'high' },
  { id: '2', name: 'Non-Payment', severity: 'medium' },
  { id: '3', name: 'Fake Identity', severity: 'high' },
  { id: '4', name: 'Chargeback Fraud', severity: 'high' },
  { id: '5', name: 'Trading Scam', severity: 'medium' },
  { id: '6', name: 'Misleading Information', severity: 'low' },
];

export const abusers: Abuser[] = [
  { id: '1', categoryId: '2', value: 'john.doe@email.com', allegationTypeId: '1', description: 'Fraudulent trading activity', score: 20, riskLevel: 'high', reportedBy: '1', createdAt: '2024-06-15', verified: true, status: 'verified' },
  { id: '2', categoryId: '1', value: 'Michael Trader', allegationTypeId: '2', description: 'Failed to pay on multiple trades', score: 10, riskLevel: 'medium', reportedBy: '2', createdAt: '2024-07-20', verified: false, status: 'pending' },
  { id: '3', categoryId: '3', value: '+1-555-0123', allegationTypeId: '3', description: 'Using fake identity documents', score: 25, riskLevel: 'high', reportedBy: '1', createdAt: '2024-08-10', verified: true, status: 'verified' },
  { id: '4', categoryId: '4', value: 'ABCDE1234F', allegationTypeId: '4', description: 'Multiple chargeback attempts', score: 5, riskLevel: 'low', reportedBy: '3', createdAt: '2024-09-05', verified: false, status: 'pending' },
];

export const searchLogs: SearchLog[] = [
  { id: '1', brokerId: '1', brokerName: 'John Smith', category: 'Email', searchValue: 'john.doe@email.com', resultScore: 20, riskLevel: 'high', timestamp: '2024-12-28 10:30:00' },
  { id: '2', brokerId: '2', brokerName: 'Sarah Johnson', category: 'Name', searchValue: 'Michael Trader', resultScore: 10, riskLevel: 'medium', timestamp: '2024-12-28 11:45:00' },
  { id: '3', brokerId: '1', brokerName: 'John Smith', category: 'Mobile Number', searchValue: '+1-555-0123', resultScore: 25, riskLevel: 'high', timestamp: '2024-12-28 14:20:00' },
];

// Helper function to calculate risk level from score
export function getRiskLevel(score: number): 'low' | 'medium' | 'high' {
  if (score <= 5) return 'low';
  if (score <= 15) return 'medium';
  return 'high';
}

export function getRiskColor(level: 'low' | 'medium' | 'high'): string {
  switch (level) {
    case 'low': return 'text-green-500';
    case 'medium': return 'text-yellow-500';
    case 'high': return 'text-red-500';
  }
}

export function getRiskBadgeVariant(level: 'low' | 'medium' | 'high'): 'default' | 'secondary' | 'destructive' {
  switch (level) {
    case 'low': return 'default';
    case 'medium': return 'secondary';
    case 'high': return 'destructive';
  }
}
