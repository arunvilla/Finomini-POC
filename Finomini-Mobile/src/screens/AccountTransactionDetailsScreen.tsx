import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

interface AccountTransactionDetailsScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  account?: any;
}

export default function AccountTransactionDetailsScreen({ onBack, onNavigate, account }: AccountTransactionDetailsScreenProps) {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

  const accountData = account || {
    name: 'Chase Checking',
    institution: 'Chase Bank',
    logo: '🏦',
    balance: 5584.00,
    type: 'checking',
  };

  const transactions = [
    { id: '1', merchant: 'Whole Foods', amount: -156.78, date: '2025-09-28', category: 'Groceries', type: 'expense' },
    { id: '2', merchant: 'Salary Deposit', amount: 4500.00, date: '2025-09-27', category: 'Income', type: 'income' },
    { id: '3', merchant: 'Shell Gas Station', amount: -45.20, date: '2025-09-26', category: 'Transportation', type: 'expense' },
    { id: '4', merchant: 'Netflix', amount: -15.99, date: '2025-09-25', category: 'Entertainment', type: 'expense' },
    { id: '5', merchant: 'Amazon', amount: -89.45, date: '2025-09-24', category: 'Shopping', type: 'expense' },
    { id: '6', merchant: 'Chipotle', amount: -18.50, date: '2025-09-23', category: 'Dining', type: 'expense' },
    { id: '7', merchant: 'PG&E', amount: -124.30, date: '2025-09-22', category: 'Utilities', type: 'expense' },
    { id: '8', merchant: 'Trader Joe\'s', amount: -67.20, date: '2025-09-21', category: 'Groceries', type: 'expense' },
  ];

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filter);

  const incomeTotal = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expenseTotal = Math.abs(transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Transactions</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.accountCard}>
          <View style={styles.accountHeader}>
            <View style={styles.accountLogo}>
              <Text style={styles.accountEmoji}>{accountData.logo}</Text>
            </View>
            <View>
              <Text style={styles.accountName}>{accountData.name}</Text>
              <Text style={styles.institutionName}>{accountData.institution}</Text>
            </View>
          </View>
          <Text style={styles.balance}>${accountData.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={[styles.summaryValue, { color: '#10b981' }]}>
                +${incomeTotal.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Expenses</Text>
              <Text style={[styles.summaryValue, { color: '#ef4444' }]}>
                -${expenseTotal.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'income' && styles.filterButtonActive]}
            onPress={() => setFilter('income')}
          >
            <Text style={[styles.filterText, filter === 'income' && styles.filterTextActive]}>
              Income
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'expense' && styles.filterButtonActive]}
            onPress={() => setFilter('expense')}
          >
            <Text style={[styles.filterText, filter === 'expense' && styles.filterTextActive]}>
              Expenses
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionList}>
          <Text style={styles.listTitle}>
            {filteredTransactions.length} Transaction{filteredTransactions.length !== 1 ? 's' : ''}
          </Text>

          {filteredTransactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              style={styles.transactionCard}
              onPress={() => onNavigate?.('transaction-detail', transaction)}
            >
              <View style={styles.transactionLeft}>
                <View style={[
                  styles.transactionIcon,
                  { backgroundColor: transaction.type === 'income' ? '#d1fae5' : '#fee2e2' }
                ]}>
                  <Text style={styles.transactionEmoji}>
                    {transaction.type === 'income' ? '💰' : '💳'}
                  </Text>
                </View>
                <View>
                  <Text style={styles.merchantName}>{transaction.merchant}</Text>
                  <Text style={styles.categoryName}>{transaction.category}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </View>
              <Text style={[
                styles.transactionAmount,
                { color: transaction.amount >= 0 ? '#10b981' : '#ef4444' }
              ]}>
                {transaction.amount >= 0 ? '+' : ''} ${Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  accountCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  accountLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  accountEmoji: {
    fontSize: 24,
  },
  accountName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  institutionName: {
    fontSize: 14,
    color: '#6b7280',
  },
  balance: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
  },
  summaryCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  transactionList: {
    paddingHorizontal: 16,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionEmoji: {
    fontSize: 20,
  },
  merchantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  categoryName: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  transactionDate: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
});
