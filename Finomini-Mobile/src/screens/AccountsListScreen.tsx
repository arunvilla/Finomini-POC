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
import { accounts } from '../data/mockData';

interface AccountsListScreenProps {
  onNavigate?: (screen: string, data?: any) => void;
}

export default function AccountsListScreen({ onNavigate }: AccountsListScreenProps) {
  const [showBalances, setShowBalances] = useState(true);

  const totalAssets = accounts
    .filter(a => a.balance > 0)
    .reduce((sum, a) => sum + a.balance, 0);

  const totalLiabilities = Math.abs(
    accounts
      .filter(a => a.balance < 0)
      .reduce((sum, a) => sum + a.balance, 0)
  );

  const accountsByType = {
    'Cash & Bank': accounts.filter(a => a.type === 'checking' || a.type === 'savings'),
    'Credit Cards': accounts.filter(a => a.type === 'credit'),
    'Investments': accounts.filter(a => a.type === 'investment'),
  };

  const formatBalance = (balance: number) => {
    if (!showBalances) return '••••••';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.abs(balance));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Accounts</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => setShowBalances(!showBalances)} style={styles.iconButton}>
            <Text style={styles.icon}>{showBalances ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.icon}>⚙️</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => onNavigate?.('add-account')}
          >
            <Text style={styles.addIcon}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Assets</Text>
            <Text style={styles.assetsAmount}>{formatBalance(totalAssets)}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Liabilities</Text>
            <Text style={styles.liabilitiesAmount}>{formatBalance(totalLiabilities)}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {Object.entries(accountsByType).map(([category, categoryAccounts]) => {
          if (categoryAccounts.length === 0) return null;
          
          return (
            <View key={category} style={styles.section}>
              <Text style={styles.sectionTitle}>{category}</Text>
              {categoryAccounts.map((account) => (
                <TouchableOpacity
                  key={account.id}
                  style={styles.accountCard}
                >
                  <View style={styles.accountLeft}>
                    <View style={styles.accountIcon}>
                      <Text style={styles.accountIconText}>
                        {account.type === 'checking' ? '🏦' :
                         account.type === 'savings' ? '💰' :
                         account.type === 'credit' ? '💳' : '📈'}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.accountName}>{account.name}</Text>
                      <Text style={styles.accountType}>
                        {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                      </Text>
                    </View>
                  </View>
                  <Text style={[
                    styles.accountBalance,
                    account.balance < 0 && styles.negativeBalance
                  ]}>
                    {formatBalance(account.balance)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => onNavigate?.('add-account')}>
        <Text style={styles.addButtonText}>+ Add Account</Text>
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
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  icon: {
    fontSize: 20,
  },
  addIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
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
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 8,
  },
  assetsAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
  },
  liabilitiesAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
  },
  accountCard: {
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
  accountLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  accountIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  accountIconText: {
    fontSize: 20,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  accountType: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  accountBalance: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  negativeBalance: {
    color: '#ef4444',
  },
  addButton: {
    backgroundColor: '#6366f1',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
