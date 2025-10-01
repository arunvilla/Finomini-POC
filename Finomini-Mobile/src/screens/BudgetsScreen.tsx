import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { budgets } from '../data/mockData';

export default function BudgetsScreen() {
  const totalAllocated = budgets.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const remaining = totalAllocated - totalSpent;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budgets</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Monthly Budget Overview</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryAmount}>${totalAllocated.toLocaleString()}</Text>
            <Text style={styles.summaryItemLabel}>Allocated</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryAmount, styles.spentAmount]}>
              ${totalSpent.toLocaleString()}
            </Text>
            <Text style={styles.summaryItemLabel}>Spent</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryAmount, styles.remainingAmount]}>
              ${remaining.toLocaleString()}
            </Text>
            <Text style={styles.summaryItemLabel}>Remaining</Text>
          </View>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${(totalSpent / totalAllocated) * 100}%` }
              ]}
            />
          </View>
          <Text style={styles.progressLabel}>
            {((totalSpent / totalAllocated) * 100).toFixed(1)}% used
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Categories</Text>
        {budgets.map((budget) => {
          const percentUsed = (budget.spent / budget.allocated) * 100;
          const isOverBudget = percentUsed > 100;
          
          return (
            <TouchableOpacity key={budget.id} style={styles.budgetCard}>
              <View style={styles.budgetHeader}>
                <View style={styles.budgetLeft}>
                  <View style={[styles.categoryIcon, { backgroundColor: budget.color + '20' }]}>
                    <View style={[styles.categoryDot, { backgroundColor: budget.color }]} />
                  </View>
                  <View>
                    <Text style={styles.categoryName}>{budget.category}</Text>
                    <Text style={styles.budgetPeriod}>
                      {budget.period.charAt(0).toUpperCase() + budget.period.slice(1)}
                    </Text>
                  </View>
                </View>
                <View style={styles.budgetRight}>
                  <Text style={styles.budgetAmount}>
                    ${budget.spent.toLocaleString()} / ${budget.allocated.toLocaleString()}
                  </Text>
                  <Text style={[
                    styles.remainingText,
                    isOverBudget && styles.overBudgetText
                  ]}>
                    {isOverBudget ? 
                      `$${(budget.spent - budget.allocated).toLocaleString()} over` :
                      `$${(budget.allocated - budget.spent).toLocaleString()} left`
                    }
                  </Text>
                </View>
              </View>
              
              <View style={styles.progressBarContainer}>
                <View style={styles.budgetProgressBackground}>
                  <View
                    style={[
                      styles.budgetProgressFill,
                      {
                        width: `${Math.min(percentUsed, 100)}%`,
                        backgroundColor: isOverBudget ? '#ef4444' : budget.color,
                      }
                    ]}
                  />
                </View>
                <Text style={[
                  styles.percentText,
                  isOverBudget && styles.overBudgetText
                ]}>
                  {percentUsed.toFixed(0)}%
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Create Budget</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  settingsButton: {
    padding: 8,
  },
  settingsButtonText: {
    fontSize: 20,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  spentAmount: {
    color: '#f59e0b',
  },
  remainingAmount: {
    color: '#10b981',
  },
  summaryItemLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  budgetCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  budgetLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  budgetPeriod: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  budgetRight: {
    alignItems: 'flex-end',
  },
  budgetAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  remainingText: {
    fontSize: 12,
    color: '#10b981',
    marginTop: 4,
  },
  overBudgetText: {
    color: '#ef4444',
  },
  budgetProgressBackground: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  budgetProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  percentText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 6,
    textAlign: 'right',
  },
  addButton: {
    backgroundColor: '#6366f1',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
