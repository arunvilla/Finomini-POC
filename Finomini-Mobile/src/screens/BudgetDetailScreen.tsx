import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

interface BudgetDetailScreenProps {
  budget?: any;
  onBack?: () => void;
}

export default function BudgetDetailScreen({ budget, onBack }: BudgetDetailScreenProps) {
  const budgetData = budget || {
    category: 'Groceries',
    spent: 450.00,
    limit: 600.00,
    period: 'Monthly',
    startDate: '2024-10-01',
    endDate: '2024-10-31',
    transactions: [
      { id: '1', merchant: 'Whole Foods', amount: -127.45, date: '2024-10-15' },
      { id: '2', merchant: 'Trader Joes', amount: -89.50, date: '2024-10-10' },
      { id: '3', merchant: 'Safeway', amount: -156.32, date: '2024-10-08' },
      { id: '4', merchant: 'Costco', amount: -76.73, date: '2024-10-03' },
    ],
  };

  const percentage = (budgetData.spent / budgetData.limit) * 100;
  const remaining = budgetData.limit - budgetData.spent;
  const isOverBudget = percentage > 100;

  const daysLeft = Math.ceil((new Date(budgetData.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Budget Details</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.categoryName}>{budgetData.category}</Text>
          <Text style={styles.periodText}>{budgetData.period} Budget</Text>
          
          <View style={styles.amountRow}>
            <View>
              <Text style={styles.amountLabel}>Spent</Text>
              <Text style={[styles.amountValue, isOverBudget && styles.overBudget]}>
                ${budgetData.spent.toFixed(2)}
              </Text>
            </View>
            <View>
              <Text style={styles.amountLabel}>Budget</Text>
              <Text style={styles.amountValue}>${budgetData.limit.toFixed(2)}</Text>
            </View>
            <View>
              <Text style={styles.amountLabel}>Remaining</Text>
              <Text style={[styles.amountValue, remaining < 0 && styles.overBudget]}>
                ${remaining.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(percentage, 100)}%` },
                isOverBudget && styles.progressOverBudget,
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {percentage.toFixed(0)}% used • {daysLeft} days left
          </Text>
        </View>

        {isOverBudget && (
          <View style={styles.alertCard}>
            <Text style={styles.alertIcon}>⚠️</Text>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Over Budget</Text>
              <Text style={styles.alertMessage}>
                You've exceeded your budget by ${Math.abs(remaining).toFixed(2)}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget Period</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Start Date</Text>
            <Text style={styles.infoValue}>{new Date(budgetData.startDate).toLocaleDateString()}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>End Date</Text>
            <Text style={styles.infoValue}>{new Date(budgetData.endDate).toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <Text style={styles.transactionCount}>{budgetData.transactions.length}</Text>
          </View>
          
          {budgetData.transactions.map((txn: any) => (
            <View key={txn.id} style={styles.transactionItem}>
              <View>
                <Text style={styles.transactionMerchant}>{txn.merchant}</Text>
                <Text style={styles.transactionDate}>
                  {new Date(txn.date).toLocaleDateString()}
                </Text>
              </View>
              <Text style={styles.transactionAmount}>${Math.abs(txn.amount).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Adjust Budget</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>View All Transactions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  periodText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  amountLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  overBudget: {
    color: '#ef4444',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  progressOverBudget: {
    backgroundColor: '#ef4444',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  alertCard: {
    backgroundColor: '#fef2f2',
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  alertIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: 14,
    color: '#991b1b',
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  transactionCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionMerchant: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  actionButtons: {
    padding: 16,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#7c3aed',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});
