import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';

interface CategoryDetailScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  category?: any;
}

export default function CategoryDetailScreen({ onBack, onNavigate, category }: CategoryDetailScreenProps) {
  const [timeframe, setTimeframe] = useState<'month' | 'quarter' | 'year'>('month');

  const categoryData = category || {
    id: '1',
    name: 'Groceries',
    icon: '🛒',
    color: '#10b981',
    type: 'expense',
    budget: 800,
    spent: 645.50,
    transactions: 42,
    trend: '+12%',
  };

  const transactions = [
    { id: '1', merchant: 'Whole Foods', amount: 156.78, date: '2025-09-28', category: 'Groceries' },
    { id: '2', merchant: 'Trader Joe\'s', amount: 89.45, date: '2025-09-25', category: 'Groceries' },
    { id: '3', merchant: 'Safeway', amount: 124.30, date: '2025-09-22', category: 'Groceries' },
    { id: '4', merchant: 'Whole Foods', amount: 92.15, date: '2025-09-18', category: 'Groceries' },
    { id: '5', merchant: 'Farmers Market', amount: 45.20, date: '2025-09-15', category: 'Groceries' },
  ];

  const progress = (categoryData.spent / categoryData.budget) * 100;
  const remaining = categoryData.budget - categoryData.spent;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Category Details</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => onNavigate?.('edit-category', categoryData)}
        >
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.categoryHeader}>
          <View style={[styles.categoryIcon, { backgroundColor: categoryData.color + '20' }]}>
            <Text style={styles.categoryEmoji}>{categoryData.icon}</Text>
          </View>
          <Text style={styles.categoryName}>{categoryData.name}</Text>
          <View style={[styles.typeBadge, { backgroundColor: categoryData.type === 'expense' ? '#fee2e2' : '#d1fae5' }]}>
            <Text style={[styles.typeBadgeText, { color: categoryData.type === 'expense' ? '#ef4444' : '#10b981' }]}>
              {categoryData.type}
            </Text>
          </View>
        </View>

        <View style={styles.timeframeSelector}>
          <TouchableOpacity 
            style={[styles.timeframeButton, timeframe === 'month' && styles.timeframeButtonActive]}
            onPress={() => setTimeframe('month')}
          >
            <Text style={[styles.timeframeText, timeframe === 'month' && styles.timeframeTextActive]}>Month</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.timeframeButton, timeframe === 'quarter' && styles.timeframeButtonActive]}
            onPress={() => setTimeframe('quarter')}
          >
            <Text style={[styles.timeframeText, timeframe === 'quarter' && styles.timeframeTextActive]}>Quarter</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.timeframeButton, timeframe === 'year' && styles.timeframeButtonActive]}
            onPress={() => setTimeframe('year')}
          >
            <Text style={[styles.timeframeText, timeframe === 'year' && styles.timeframeTextActive]}>Year</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Spent</Text>
              <Text style={styles.statValue}>${categoryData.spent.toFixed(2)}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Budget</Text>
              <Text style={styles.statValue}>${categoryData.budget.toFixed(2)}</Text>
            </View>
          </View>
          
          <View style={styles.progressSection}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%`, backgroundColor: progress > 100 ? '#ef4444' : categoryData.color }]} />
            </View>
            <Text style={[styles.remainingText, { color: remaining < 0 ? '#ef4444' : '#10b981' }]}>
              {remaining < 0 ? `Over by $${Math.abs(remaining).toFixed(2)}` : `$${remaining.toFixed(2)} remaining`}
            </Text>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Transactions</Text>
              <Text style={styles.metaValue}>{categoryData.transactions}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Trend</Text>
              <Text style={[styles.metaValue, { color: categoryData.trend.startsWith('+') ? '#ef4444' : '#10b981' }]}>
                {categoryData.trend}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => onNavigate?.('Transactions')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {transactions.map((transaction) => (
            <TouchableOpacity 
              key={transaction.id}
              style={styles.transactionCard}
              onPress={() => onNavigate?.('transaction-detail', transaction)}
            >
              <View style={styles.transactionLeft}>
                <View style={styles.transactionIcon}>
                  <Text style={styles.transactionIconText}>{categoryData.icon}</Text>
                </View>
                <View>
                  <Text style={styles.merchantName}>{transaction.merchant}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </View>
              <Text style={styles.transactionAmount}>
                -${transaction.amount.toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => {
            Alert.alert(
              'Delete Category',
              'Are you sure you want to delete this category? All transactions will be uncategorized.',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => {
                    Alert.alert('Success', 'Category deleted successfully', [
                      { text: 'OK', onPress: onBack }
                    ]);
                  },
                },
              ]
            );
          }}
        >
          <Text style={styles.deleteButtonText}>Delete Category</Text>
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
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  categoryHeader: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  categoryIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryEmoji: {
    fontSize: 40,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  timeframeSelector: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    gap: 8,
  },
  timeframeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  timeframeButtonActive: {
    backgroundColor: '#2563eb',
  },
  timeframeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  timeframeTextActive: {
    color: '#ffffff',
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
  statRow: {
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
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  progressSection: {
    marginBottom: 16,
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
  remainingText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metaItem: {
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  seeAllText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
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
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionIconText: {
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
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
  deleteButton: {
    margin: 16,
    marginTop: 24,
    padding: 16,
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
});
