import { Transaction, Budget, Goal, Account, NetWorthData } from '../types';

export const netWorthData: NetWorthData = {
  assets: 67251.65,
  liabilities: 286828,
  netWorth: -219576.35,
  change: 10116.05,
  changePercent: 6.1,
};

export const transactions: Transaction[] = [
  {
    id: '1',
    date: '2025-09-28',
    merchant: 'Whole Foods',
    category: 'Groceries',
    amount: -127.45,
    type: 'expense',
    account: 'Chase Checking',
  },
  {
    id: '2',
    date: '2025-09-27',
    merchant: 'Amazon',
    category: 'Shopping',
    amount: -89.99,
    type: 'expense',
    account: 'AmEx Credit',
  },
  {
    id: '3',
    date: '2025-09-26',
    merchant: 'Salary Deposit',
    category: 'Income',
    amount: 5200.00,
    type: 'income',
    account: 'Chase Checking',
  },
  {
    id: '4',
    date: '2025-09-25',
    merchant: 'Starbucks',
    category: 'Dining',
    amount: -15.80,
    type: 'expense',
    account: 'Chase Checking',
  },
  {
    id: '5',
    date: '2025-09-24',
    merchant: 'Shell Gas',
    category: 'Transportation',
    amount: -65.00,
    type: 'expense',
    account: 'Chase Checking',
  },
];

export const budgets: Budget[] = [
  {
    id: '1',
    category: 'Groceries',
    allocated: 800,
    spent: 623,
    period: 'monthly',
    color: '#10b981',
  },
  {
    id: '2',
    category: 'Dining Out',
    allocated: 400,
    spent: 387,
    period: 'monthly',
    color: '#f59e0b',
  },
  {
    id: '3',
    category: 'Transportation',
    allocated: 300,
    spent: 198,
    period: 'monthly',
    color: '#6366f1',
  },
  {
    id: '4',
    category: 'Entertainment',
    allocated: 200,
    spent: 145,
    period: 'monthly',
    color: '#8b5cf6',
  },
  {
    id: '5',
    category: 'Shopping',
    allocated: 500,
    spent: 456,
    period: 'monthly',
    color: '#ec4899',
  },
];

export const goals: Goal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 6800,
    deadline: '2025-12-31',
    category: 'Savings',
    color: '#10b981',
  },
  {
    id: '2',
    name: 'Vacation to Japan',
    targetAmount: 5000,
    currentAmount: 2300,
    deadline: '2026-06-15',
    category: 'Travel',
    color: '#6366f1',
  },
  {
    id: '3',
    name: 'New Laptop',
    targetAmount: 2500,
    currentAmount: 1850,
    deadline: '2025-11-30',
    category: 'Technology',
    color: '#8b5cf6',
  },
];

export const accounts: Account[] = [
  {
    id: '1',
    name: 'Chase Checking',
    type: 'checking',
    balance: 12450.32,
    currency: 'USD',
  },
  {
    id: '2',
    name: 'AmEx Credit',
    type: 'credit',
    balance: -3245.67,
    currency: 'USD',
  },
  {
    id: '3',
    name: 'Ally Savings',
    type: 'savings',
    balance: 25800.00,
    currency: 'USD',
  },
  {
    id: '4',
    name: 'Vanguard 401k',
    type: 'investment',
    balance: 45600.80,
    currency: 'USD',
  },
];
