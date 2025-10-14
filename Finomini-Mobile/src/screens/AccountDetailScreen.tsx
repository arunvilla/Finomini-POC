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

interface AccountDetailScreenProps {
  account?: any;
  onBack?: () => void;
}

export default function AccountDetailScreen({ account, onBack }: AccountDetailScreenProps) {
  const accountData = account || {
    id: '1',
    name: 'Chase Checking',
    type: 'checking',
    balance: 5432.10,
    lastUpdated: '2024-10-15',
    accountNumber: '****1234',
    institution: 'Chase Bank',
    category: 'Assets',
    isLinked: true,
    transactions: [
      { id: '1', merchant: 'Whole Foods', amount: -127.45, date: '2024-10-15', category: 'Groceries' },
      { id: '2', merchant: 'Salary Deposit', amount: 5000.00, date: '2024-10-01', category: 'Income' },
      { id: '3', merchant: 'Netflix', amount: -15.99, date: '2024-09-28', category: 'Entertainment' },
      { id: '4', merchant: 'Electric Company', amount: -120.00, date: '2024-09-25', category: 'Utilities' },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Details</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreIcon}>⋯</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.balanceCard}>
          <View style={styles.accountHeader}>
            <View>
              <Text style={styles.accountName}>{accountData.name}</Text>
              <Text style={styles.accountType}>{accountData.type.toUpperCase()}</Text>
            </View>
            <View style={[styles.statusBadge, accountData.isLinked && styles.linkedBadge]}>
              <Text style={styles.statusText}>{accountData.isLinked ? '🔗 Linked' : 'Manual'}</Text>
            </View>
          </View>

          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceAmount}>${accountData.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          
          <Text style={styles.lastUpdated}>
            Last updated: {new Date(accountData.lastUpdated).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Institution</Text>
            <Text style={styles.infoValue}>{accountData.institution}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Account Number</Text>
            <Text style={styles.infoValue}>{accountData.accountNumber}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Account Type</Text>
            <Text style={styles.infoValue}>{accountData.type}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Category</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{accountData.category}</Text>
            </View>
          </View>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>➕</Text>
            <Text style={styles.actionText}>Add Transaction</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>💸</Text>
            <Text style={styles.actionText}>Transfer</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>🔄</Text>
            <Text style={styles.actionText}>Sync Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {accountData.transactions.map((txn: any) => (
            <View key={txn.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <Text style={styles.transactionMerchant}>{txn.merchant}</Text>
                <Text style={styles.transactionCategory}>{txn.category}</Text>
                <Text style={styles.transactionDate}>
                  {new Date(txn.date).toLocaleDateString()}
                </Text>
              </View>
              <Text style={[
                styles.transactionAmount,
                txn.amount > 0 ? styles.incomeAmount : styles.expenseAmount
              ]}>
                {txn.amount > 0 ? '+' : '-'}${Math.abs(txn.amount).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.dangerZone}>
          <Text style={styles.dangerTitle}>Danger Zone</Text>
          
          <TouchableOpacity style={styles.dangerButton}>
            <Text style={styles.dangerButtonText}>🔓 Unlink Account</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.dangerButton}>
            <Text style={styles.dangerButtonText}>🗑️ Delete Account</Text>
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
  moreButton: {
    padding: 8,
  },
  moreIcon: {
    fontSize: 24,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  balanceCard: {
    backgroundColor: '#7c3aed',
    padding: 24,
    marginBottom: 16,
  },
  accountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  accountName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  accountType: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  linkedBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  balanceLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
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
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7c3aed',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  categoryBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#059669',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionLeft: {
    flex: 1,
  },
  transactionMerchant: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 11,
    color: '#999',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  incomeAmount: {
    color: '#10b981',
  },
  expenseAmount: {
    color: '#ef4444',
  },
  dangerZone: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 32,
  },
  dangerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 12,
  },
  dangerButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 8,
    marginBottom: 8,
  },
  dangerButtonText: {
    fontSize: 14,
    color: '#dc2626',
    textAlign: 'center',
  },
});
