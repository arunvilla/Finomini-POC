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

interface BudgetSubcategoryDetailScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  subcategory?: any;
}

export default function BudgetSubcategoryDetailScreen({ onBack, onNavigate, subcategory }: BudgetSubcategoryDetailScreenProps) {
  const subcategoryData = subcategory || {
    name: 'Fast Food',
    parentCategory: 'Dining',
    parentIcon: '🍽️',
    color: '#f59e0b',
    budgeted: 200,
    spent: 156.75,
    remaining: 43.25,
    transactions: 12,
  };

  const transactions = [
    { id: '1', merchant: 'Chipotle', amount: 18.50, date: '2025-09-28', category: 'Fast Food' },
    { id: '2', merchant: 'McDonald\'s', amount: 12.30, date: '2025-09-26', category: 'Fast Food' },
    { id: '3', merchant: 'Taco Bell', amount: 15.75, date: '2025-09-24', category: 'Fast Food' },
    { id: '4', merchant: 'Subway', amount: 11.20, date: '2025-09-22', category: 'Fast Food' },
    { id: '5', merchant: 'Chick-fil-A', amount: 14.85, date: '2025-09-20', category: 'Fast Food' },
  ];

  const progress = (subcategoryData.spent / subcategoryData.budgeted) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subcategory Budget</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.subcategoryHeader}>
          <View style={[styles.categoryIcon, { backgroundColor: subcategoryData.color + '20' }]}>
            <Text style={styles.categoryEmoji}>{subcategoryData.parentIcon}</Text>
          </View>
          <Text style={styles.subcategoryName}>{subcategoryData.name}</Text>
          <Text style={styles.parentCategory}>under {subcategoryData.parentCategory}</Text>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Spent</Text>
              <Text style={[styles.statValue, { color: '#ef4444' }]}>
                ${subcategoryData.spent.toFixed(2)}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Budget</Text>
              <Text style={styles.statValue}>${subcategoryData.budgeted.toFixed(2)}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Left</Text>
              <Text style={[styles.statValue, { color: '#10b981' }]}>
                ${subcategoryData.remaining.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${Math.min(progress, 100)}%`,
                    backgroundColor: progress > 90 ? '#ef4444' : subcategoryData.color,
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {progress.toFixed(0)}% of budget used • {subcategoryData.transactions} transactions
            </Text>
          </View>
        </View>

        <View style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <Text style={styles.insightIcon}>💡</Text>
            <Text style={styles.insightTitle}>Budget Insight</Text>
          </View>
          <Text style={styles.insightText}>
            {progress > 90 
              ? `You're close to your ${subcategoryData.name} budget limit. Consider reducing spending in this area.`
              : `You have $${subcategoryData.remaining.toFixed(2)} remaining for ${subcategoryData.name} this month.`
            }
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transactions ({transactions.length})</Text>

          {transactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              style={styles.transactionCard}
              onPress={() => onNavigate?.('transaction-detail', transaction)}
            >
              <View style={styles.transactionLeft}>
                <View style={[styles.transactionIcon, { backgroundColor: subcategoryData.color + '20' }]}>
                  <Text style={styles.transactionEmoji}>{subcategoryData.parentIcon}</Text>
                </View>
                <View>
                  <Text style={styles.merchantName}>{transaction.merchant}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                  <Text style={styles.categoryLabel}>{transaction.category}</Text>
                </View>
              </View>
              <Text style={styles.transactionAmount}>-${transaction.amount.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.viewParentButton}
          onPress={() => onNavigate?.('budget-category-detail', { name: subcategoryData.parentCategory })}
        >
          <Text style={styles.viewParentText}>
            View {subcategoryData.parentCategory} Budget
          </Text>
          <Text style={styles.viewParentIcon}>→</Text>
        </TouchableOpacity>
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
  subcategoryHeader: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryEmoji: {
    fontSize: 32,
  },
  subcategoryName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  parentCategory: {
    fontSize: 14,
    color: '#6b7280',
  },
  statsCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  progressSection: {
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
  },
  insightCard: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
  },
  insightText: {
    fontSize: 14,
    color: '#3b82f6',
    lineHeight: 20,
  },
  section: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
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
  transactionDate: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  categoryLabel: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
  viewParentButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  viewParentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
  viewParentIcon: {
    fontSize: 20,
    color: '#2563eb',
  },
});
