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

interface LinkedAccountsScreenProps {
  onBack?: () => void;
}

interface Account {
  id: string;
  bankName: string;
  accountType: string;
  lastFour: string;
  status: 'connected' | 'needs-attention' | 'syncing';
  balance: string;
}

export default function LinkedAccountsScreen({ onBack }: LinkedAccountsScreenProps) {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      bankName: 'Chase Bank',
      accountType: 'Checking',
      lastFour: '4532',
      status: 'connected',
      balance: '$2,847.56',
    },
    {
      id: '2',
      bankName: 'Bank of America',
      accountType: 'Savings',
      lastFour: '7891',
      status: 'connected',
      balance: '$15,230.44',
    },
    {
      id: '3',
      bankName: 'Capital One',
      accountType: 'Credit Card',
      lastFour: '2468',
      status: 'needs-attention',
      balance: '$1,245.67',
    },
  ]);

  const getStatusBadge = (status: Account['status']) => {
    switch (status) {
      case 'connected':
        return <View style={styles.badgeSuccess}><Text style={styles.badgeSuccessText}>Connected</Text></View>;
      case 'needs-attention':
        return <View style={styles.badgeWarning}><Text style={styles.badgeWarningText}>Needs Attention</Text></View>;
      case 'syncing':
        return <View style={styles.badgeInfo}><Text style={styles.badgeInfoText}>Syncing...</Text></View>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Linked Accounts</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connected Accounts</Text>
          {accounts.map((account, index) => (
            <View key={account.id} style={styles.accountCard}>
              <View style={styles.accountHeader}>
                <View style={styles.bankIcon}>
                  <Text style={styles.bankIconText}>🏦</Text>
                </View>
                <View style={styles.accountInfo}>
                  <Text style={styles.bankName}>{account.bankName}</Text>
                  <Text style={styles.accountType}>
                    {account.accountType} ••••{account.lastFour}
                  </Text>
                </View>
                {getStatusBadge(account.status)}
              </View>
              
              <View style={styles.accountBalance}>
                <Text style={styles.balanceLabel}>Balance</Text>
                <Text style={styles.balanceAmount}>{account.balance}</Text>
              </View>

              <View style={styles.accountActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Refresh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.actionButtonDanger]}>
                  <Text style={[styles.actionButtonText, styles.actionButtonDangerText]}>Unlink</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Link New Account</Text>
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
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 4,
  },
  backText: {
    fontSize: 18,
    color: '#6366f1',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: 50,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
  },
  accountCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bankIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bankIconText: {
    fontSize: 24,
  },
  accountInfo: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  accountType: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  badgeSuccess: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#d1fae5',
  },
  badgeSuccessText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#065f46',
  },
  badgeWarning: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#fee2e2',
  },
  badgeWarningText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#991b1b',
  },
  badgeInfo: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#dbeafe',
  },
  badgeInfoText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1e40af',
  },
  accountBalance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  accountActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6366f1',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
  actionButtonDanger: {
    borderColor: '#ef4444',
  },
  actionButtonDangerText: {
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
