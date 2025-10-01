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

interface SubCategoryDetailScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  subcategory?: any;
}

export default function SubCategoryDetailScreen({ onBack, onNavigate, subcategory }: SubCategoryDetailScreenProps) {
  const subCategoryData = subcategory || {
    id: '1',
    name: 'Organic Produce',
    parentCategory: 'Groceries',
    parentIcon: '🛒',
    color: '#10b981',
    spent: 245.50,
    budget: 300,
    transactions: 18,
  };

  const transactions = [
    { id: '1', merchant: 'Whole Foods', amount: 78.90, date: '2025-09-28' },
    { id: '2', merchant: 'Farmers Market', amount: 45.20, date: '2025-09-25' },
    { id: '3', merchant: 'Whole Foods', amount: 65.15, date: '2025-09-22' },
    { id: '4', merchant: 'Local Farm Stand', amount: 32.50, date: '2025-09-18' },
  ];

  const progress = (subCategoryData.spent / subCategoryData.budget) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subcategory</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.categoryHeader}>
          <View style={[styles.categoryIcon, { backgroundColor: subCategoryData.color + '20' }]}>
            <Text style={styles.categoryEmoji}>{subCategoryData.parentIcon}</Text>
          </View>
          <Text style={styles.categoryName}>{subCategoryData.name}</Text>
          <Text style={styles.parentCategory}>in {subCategoryData.parentCategory}</Text>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Spent</Text>
              <Text style={styles.statValue}>${subCategoryData.spent.toFixed(2)}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Budget</Text>
              <Text style={styles.statValue}>${subCategoryData.budget.toFixed(2)}</Text>
            </View>
          </View>
          
          <View style={styles.progressSection}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%`, backgroundColor: subCategoryData.color }]} />
            </View>
            <Text style={styles.progressText}>
              {progress.toFixed(0)}% of budget used
            </Text>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Total Transactions</Text>
            <Text style={styles.metaValue}>{subCategoryData.transactions}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transactions</Text>
          
          {transactions.map((transaction) => (
            <TouchableOpacity 
              key={transaction.id}
              style={styles.transactionCard}
              onPress={() => onNavigate?.('transaction-detail', transaction)}
            >
              <View style={styles.transactionLeft}>
                <View style={styles.transactionIcon}>
                  <Text style={styles.transactionIconText}>{subCategoryData.parentIcon}</Text>
                </View>
                <View>
                  <Text style={styles.merchantName}>{transaction.merchant}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                  <Text style={styles.subcategoryLabel}>{subCategoryData.name}</Text>
                </View>
              </View>
              <Text style={styles.transactionAmount}>
                -${transaction.amount.toFixed(2)}
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
  categoryHeader: {
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
  categoryName: {
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
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  metaValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
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
  subcategoryLabel: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
});
