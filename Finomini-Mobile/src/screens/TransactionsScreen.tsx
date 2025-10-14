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
import { transactions } from '../data/mockData';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius, shadows } from '../theme/spacing';
import { ModernCard } from '../components/ModernCard';

interface TransactionsScreenProps {
  onNavigate?: (screen: string, data?: any) => void;
}

export default function TransactionsScreen({ onNavigate }: TransactionsScreenProps) {
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = new Date(transaction.date);
    const dateKey = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(transaction);
    return groups;
  }, {} as Record<string, typeof transactions>);

  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => onNavigate?.('merchant-trends')}
          >
            <Text style={styles.iconButtonText}>📊</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => onNavigate?.('bulk-edit-transactions')}
          >
            <Text style={styles.iconButtonText}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => onNavigate?.('add-transaction')}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Summary Card */}
      <ModernCard style={styles.summaryCard} variant="elevated">
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={styles.incomeText}>
              ${income.toLocaleString()}
            </Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Expenses</Text>
            <Text style={styles.expenseText}>
              ${expenses.toLocaleString()}
            </Text>
          </View>
        </View>
      </ModernCard>

      {/* Transactions List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {Object.entries(groupedTransactions).map(([date, transactionList]) => (
          <View key={date} style={styles.dateGroup}>
            <Text style={styles.dateHeader}>{date}</Text>
            {transactionList.map((transaction) => (
              <TouchableOpacity
                key={transaction.id}
                onPress={() => onNavigate?.('transaction-detail', transaction)}
              >
                <ModernCard style={styles.transactionCard} variant="elevated">
                  <View style={styles.transactionContent}>
                    <View style={styles.transactionLeft}>
                      <View style={[
                        styles.transactionIcon,
                        { backgroundColor: transaction.type === 'income' ? colors.success[100] : colors.danger[100] }
                      ]}>
                        <Text style={styles.transactionIconText}>
                          {transaction.type === 'income' ? '↗' : '↙'}
                        </Text>
                      </View>
                      <View style={styles.transactionInfo}>
                        <Text style={styles.merchantName}>{transaction.merchant}</Text>
                        <Text style={styles.categoryName}>{transaction.category}</Text>
                        {transaction.account && (
                          <Text style={styles.accountName}>{transaction.account}</Text>
                        )}
                      </View>
                    </View>
                    <View style={styles.transactionRight}>
                      <Text style={[
                        styles.transactionAmount,
                        transaction.type === 'income' ? styles.incomeAmount : styles.expenseAmount
                      ]}>
                        {transaction.type === 'income' ? '+' : '-'}$
                        {Math.abs(transaction.amount).toLocaleString()}
                      </Text>
                      <Text style={styles.transactionTime}>
                        {new Date(transaction.date).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </Text>
                    </View>
                  </View>
                </ModernCard>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* FAB Button */}
      <TouchableOpacity 
        style={styles.fabButton}
        onPress={() => onNavigate?.('add-transaction')}
      >
        <Text style={styles.fabButtonText}>+ Add Transaction</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.lg,
    backgroundColor: colors.background,
    ...shadows.sm,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.text.primary,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonText: {
    fontSize: 20,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: colors.background,
    fontWeight: '600',
  },
  summaryCard: {
    marginHorizontal: spacing.base,
    marginTop: spacing.base,
    marginBottom: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  incomeText: {
    ...typography.h3,
    color: colors.success[600],
  },
  expenseText: {
    ...typography.h3,
    color: colors.danger[600],
  },
  summaryDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  scrollView: {
    flex: 1,
  },
  dateGroup: {
    paddingHorizontal: spacing.base,
    marginTop: spacing.base,
  },
  dateHeader: {
    ...typography.label,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  transactionCard: {
    marginBottom: spacing.sm,
    paddingVertical: spacing.md,
  },
  transactionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  transactionIconText: {
    fontSize: 20,
  },
  transactionInfo: {
    flex: 1,
  },
  merchantName: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  },
  categoryName: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 2,
  },
  accountName: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginTop: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    ...typography.body,
    fontWeight: '600',
  },
  incomeAmount: {
    color: colors.success[600],
  },
  expenseAmount: {
    color: colors.danger[600],
  },
  transactionTime: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 2,
  },
  fabButton: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.base,
    right: spacing.base,
    backgroundColor: colors.primary[600],
    paddingVertical: spacing.base,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg,
  },
  fabButtonText: {
    ...typography.button,
    color: colors.background,
  },
});
