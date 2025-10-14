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

interface BudgetCategoryDetailScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  category?: any;
}

export default function BudgetCategoryDetailScreen({ onBack, onNavigate, category }: BudgetCategoryDetailScreenProps) {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  const categoryData = category || {
    name: 'Dining',
    icon: '🍽️',
    color: '#f59e0b',
    budgeted: 600,
    spent: 478.50,
    remaining: 121.50,
    transactions: 24,
  };

  const dailyData = [
    { day: 'Mon', amount: 45 },
    { day: 'Tue', amount: 32 },
    { day: 'Wed', amount: 67 },
    { day: 'Thu', amount: 28 },
    { day: 'Fri', amount: 89 },
    { day: 'Sat', amount: 156 },
    { day: 'Sun', amount: 61 },
  ];

  const transactions = [
    { id: '1', merchant: 'Chipotle', amount: 18.50, date: 'Today', time: '12:30 PM' },
    { id: '2', merchant: 'Starbucks', amount: 6.75, date: 'Today', time: '8:15 AM' },
    { id: '3', merchant: 'Olive Garden', amount: 67.20, date: 'Yesterday', time: '7:00 PM' },
    { id: '4', merchant: 'Subway', amount: 12.50, date: 'Sep 26', time: '1:00 PM' },
  ];

  const progress = (categoryData.spent / categoryData.budgeted) * 100;
  const maxDaily = Math.max(...dailyData.map(d => d.amount));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Budget Details</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => onNavigate?.('create-edit-budget', categoryData)}
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
        </View>

        <View style={styles.statsCard}>
          <View style={styles.mainStats}>
            <View style={styles.statColumn}>
              <Text style={styles.statLabel}>Spent</Text>
              <Text style={[styles.statValue, { color: '#ef4444' }]}>
                ${categoryData.spent.toFixed(2)}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statColumn}>
              <Text style={styles.statLabel}>Budgeted</Text>
              <Text style={styles.statValue}>${categoryData.budgeted.toFixed(2)}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statColumn}>
              <Text style={styles.statLabel}>Remaining</Text>
              <Text style={[styles.statValue, { color: '#10b981' }]}>
                ${categoryData.remaining.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${Math.min(progress, 100)}%`,
                    backgroundColor: progress > 90 ? '#ef4444' : progress > 75 ? '#f59e0b' : '#10b981',
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{progress.toFixed(0)}% used</Text>
          </View>

          <View style={styles.metaInfo}>
            <Text style={styles.metaText}>{categoryData.transactions} transactions this month</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Spending</Text>
          
          <View style={styles.chartCard}>
            <View style={styles.chart}>
              {dailyData.map((item, index) => (
                <View key={index} style={styles.chartColumn}>
                  <View style={styles.barContainer}>
                    <View 
                      style={[
                        styles.bar,
                        {
                          height: `${(item.amount / maxDaily) * 100}%`,
                          backgroundColor: categoryData.color,
                        }
                      ]}
                    />
                  </View>
                  <Text style={styles.dayLabel}>{item.day}</Text>
                  <Text style={styles.amountLabel}>${item.amount}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => onNavigate?.('Transactions')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {transactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              style={styles.transactionCard}
              onPress={() => onNavigate?.('transaction-detail', transaction)}
            >
              <View style={styles.transactionLeft}>
                <View style={[styles.transactionIcon, { backgroundColor: categoryData.color + '20' }]}>
                  <Text style={styles.transactionEmoji}>{categoryData.icon}</Text>
                </View>
                <View>
                  <Text style={styles.merchantName}>{transaction.merchant}</Text>
                  <Text style={styles.transactionTime}>{transaction.date} at {transaction.time}</Text>
                </View>
              </View>
              <Text style={styles.transactionAmount}>-${transaction.amount.toFixed(2)}</Text>
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
  },
  categoryIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryEmoji: {
    fontSize: 36,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
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
  mainStats: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statColumn: {
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
  progressContainer: {
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
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  metaInfo: {
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
    color: '#6b7280',
  },
  section: {
    marginTop: 8,
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
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
  chartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
  },
  barContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  bar: {
    width: '70%',
    borderRadius: 4,
    alignSelf: 'center',
  },
  dayLabel: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '500',
    marginTop: 4,
  },
  amountLabel: {
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 2,
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
  transactionTime: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
});
