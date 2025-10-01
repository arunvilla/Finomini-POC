import { Transaction, Budget, Goal } from '../types';

export const generateNetWorthSeries = (currentNetWorth: number) => {
  if (!Number.isFinite(currentNetWorth)) {
    return [{ label: '', value: 0 }];
  }
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const baseValue = currentNetWorth * 0.7;
  
  return months.map((label, index) => ({
    label,
    value: baseValue + (index * (currentNetWorth - baseValue) / 5),
  })).filter(item => Number.isFinite(item.value));
};

export const generateAssetsVsLiabilitiesSeries = (assets: number, liabilities: number) => {
  if (!Number.isFinite(assets) || !Number.isFinite(liabilities)) {
    return [{ label: '', assets: 0, liabilities: 0 }];
  }
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  return months.map((label, index) => {
    const growth = index * 0.05;
    return {
      label,
      assets: assets * (1 - 0.2 + growth),
      liabilities: liabilities * (1 - 0.1 + growth * 0.5),
    };
  }).filter(item => Number.isFinite(item.assets) && Number.isFinite(item.liabilities));
};

export const computeSpendingByCategory = (transactions: Transaction[]) => {
  if (!transactions || !Array.isArray(transactions)) {
    return [{ value: 0, label: 'No data' }];
  }
  
  const categoryTotals: { [key: string]: number } = {};
  
  transactions
    .filter(t => t && Number.isFinite(t.amount) && t.amount < 0)
    .forEach(t => {
      const category = t.category || 'Other';
      categoryTotals[category] = (categoryTotals[category] || 0) + Math.abs(t.amount);
    });
  
  const result = Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      value: amount,
      label: category,
    }))
    .filter(item => Number.isFinite(item.value) && item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
    
  return result.length > 0 ? result : [{ value: 0, label: 'No spending' }];
};

export const computeMonthlySpendTrend = (transactions: Transaction[]) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  return months.map((label, index) => {
    const baseSpend = 2500;
    const variance = Math.random() * 800 - 400;
    return {
      label,
      value: baseSpend + variance + (index * 100),
    };
  });
};

export const computeBudgetProgress = (budgets: Budget[]) => {
  return budgets.map(budget => ({
    category: budget.category,
    percentage: (budget.spent / budget.allocated) * 100,
    spent: budget.spent,
    allocated: budget.allocated,
  }));
};

export const computeGoalProgress = (goal: Goal) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const monthlyProgress = goal.currentAmount / 6;
  
  return months.map((label, index) => ({
    label,
    value: monthlyProgress * (index + 1),
  }));
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
