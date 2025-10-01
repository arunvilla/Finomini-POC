export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  description?: string;
  account?: string;
}

export interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  period: 'monthly' | 'weekly' | 'yearly';
  icon?: string;
  color?: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  icon?: string;
  color?: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
}

export interface NetWorthData {
  assets: number;
  liabilities: number;
  netWorth: number;
  change: number;
  changePercent: number;
}
