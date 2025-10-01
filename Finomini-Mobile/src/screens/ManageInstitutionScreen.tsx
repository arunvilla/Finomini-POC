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
  ActivityIndicator,
} from 'react-native';
import { colors } from '../theme/colors';

interface Institution {
  id: string;
  name: string;
  logo: string;
  status: 'connected' | 'needs_attention' | 'disconnected';
  lastSync: Date;
  accountCount: number;
  accounts: string[];
}

interface Account {
  id: string;
  name: string;
  type: string;
  accountNumber: string;
  balance: number;
  status: string;
}

interface ManageInstitutionScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  institution?: Institution;
}

const mockInstitutionAccounts: Account[] = [
  {
    id: '1',
    name: 'Chase Checking',
    type: 'checking',
    accountNumber: '****1234',
    balance: 5584.00,
    status: 'connected',
  },
  {
    id: '2',
    name: 'Chase Freedom Unlimited',
    type: 'credit',
    accountNumber: '****9012',
    balance: -1378.00,
    status: 'connected',
  },
];

export default function ManageInstitutionScreen({ 
  onBack, 
  onNavigate,
  institution 
}: ManageInstitutionScreenProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUpdatingLogin, setIsUpdatingLogin] = useState(false);

  const currentInstitution = institution || {
    id: '1',
    name: 'Chase Bank',
    logo: '🏦',
    status: 'connected' as const,
    lastSync: new Date(Date.now() - 5 * 60 * 1000),
    accountCount: 2,
    accounts: ['Chase Checking', 'Chase Freedom Unlimited'],
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.abs(amount));
  };

  const formatLastSync = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return colors.green[100];
      case 'needs_attention':
        return colors.yellow[100];
      case 'disconnected':
        return colors.red[100];
      default:
        return colors.gray[100];
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'connected':
        return colors.green[800];
      case 'needs_attention':
        return colors.yellow[800];
      case 'disconnected':
        return colors.red[800];
      default:
        return colors.gray[800];
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connected and syncing normally';
      case 'needs_attention':
        return 'Authentication required - please update login';
      case 'disconnected':
        return 'Disconnected - no longer syncing';
      default:
        return 'Unknown status';
    }
  };

  const handleUpdateLogin = async () => {
    setIsUpdatingLogin(true);
    // Simulate Plaid Link flow
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUpdatingLogin(false);
    Alert.alert('Success', 'Login credentials updated successfully');
  };

  const handleRefreshAccounts = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
    Alert.alert('Success', 'Accounts refreshed successfully');
  };

  const handleDisconnectAll = () => {
    Alert.alert(
      `Disconnect ${currentInstitution.name}?`,
      `This will disconnect all ${currentInstitution.accountCount} account${currentInstitution.accountCount !== 1 ? 's' : ''} from ${currentInstitution.name}. You can reconnect them later if needed.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disconnect All',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Disconnected', 'All accounts have been disconnected');
            onBack?.();
          },
        },
      ]
    );
  };

  const handleAccountClick = (account: Account) => {
    onNavigate?.('account-detail', { account });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentInstitution.name}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Institution Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.institutionLogo}>{currentInstitution.logo}</Text>
            <View style={styles.summaryDetails}>
              <Text style={styles.institutionName}>{currentInstitution.name}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(currentInstitution.status) }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: getStatusTextColor(currentInstitution.status) }
                ]}>
                  {currentInstitution.status === 'connected' ? 'Connected' :
                   currentInstitution.status === 'needs_attention' ? 'Needs Attention' : 'Disconnected'}
                </Text>
              </View>
              <Text style={styles.statusDescription}>
                {getStatusText(currentInstitution.status)}
              </Text>
              <View style={styles.institutionInfo}>
                <Text style={styles.infoText}>Last synced: {formatLastSync(currentInstitution.lastSync)}</Text>
                <Text style={styles.infoText}>Connected accounts: {currentInstitution.accountCount}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsCard}>
          {currentInstitution.status !== 'disconnected' && (
            <>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  currentInstitution.status === 'needs_attention' && styles.actionButtonPrimary
                ]}
                onPress={handleUpdateLogin}
                disabled={isUpdatingLogin}
              >
                {isUpdatingLogin ? (
                  <ActivityIndicator color={currentInstitution.status === 'needs_attention' ? '#ffffff' : colors.primary} />
                ) : (
                  <Text style={[
                    styles.actionButtonText,
                    currentInstitution.status === 'needs_attention' && styles.actionButtonTextPrimary
                  ]}>
                    🔗 {isUpdatingLogin ? 'Updating...' : 'Update Login Settings'}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleRefreshAccounts}
                disabled={isRefreshing}
              >
                {isRefreshing ? (
                  <ActivityIndicator color={colors.primary} />
                ) : (
                  <Text style={styles.actionButtonText}>
                    🔄 Refresh All Accounts from {currentInstitution.name}
                  </Text>
                )}
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            style={styles.actionButtonDanger}
            onPress={handleDisconnectAll}
          >
            <Text style={styles.actionButtonDangerText}>
              🔌 Disconnect All Accounts from {currentInstitution.name}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Linked Accounts */}
        <View style={styles.accountsCard}>
          <Text style={styles.accountsTitle}>Linked Accounts</Text>
          {mockInstitutionAccounts.map((account) => (
            <TouchableOpacity
              key={account.id}
              style={styles.accountItem}
              onPress={() => handleAccountClick(account)}
            >
              <View style={styles.accountLeft}>
                <Text style={styles.accountName}>{account.name}</Text>
                <View style={styles.accountTypeBadge}>
                  <Text style={styles.accountTypeText}>
                    {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                  </Text>
                </View>
                <Text style={styles.accountNumber}>{account.accountNumber}</Text>
              </View>
              <View style={styles.accountRight}>
                <Text style={[
                  styles.accountBalance,
                  { color: account.balance < 0 ? colors.danger : colors.text.primary }
                ]}>
                  {formatCurrency(account.balance)}
                </Text>
                <Text style={styles.accountBalanceLabel}>Current Balance</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
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
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: colors.text.primary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  summaryCard: {
    margin: 16,
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
  },
  institutionLogo: {
    fontSize: 48,
    marginRight: 16,
  },
  summaryDetails: {
    flex: 1,
  },
  institutionName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  institutionInfo: {
    marginTop: 4,
  },
  infoText: {
    fontSize: 13,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  actionsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButton: {
    padding: 16,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  actionButtonPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  actionButtonTextPrimary: {
    color: '#ffffff',
  },
  actionButtonDanger: {
    padding: 16,
    backgroundColor: colors.red[50],
    borderWidth: 1,
    borderColor: colors.red[300],
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonDangerText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.red[700],
  },
  accountsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  accountsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  accountLeft: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  accountTypeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: colors.gray[200],
    borderRadius: 4,
    marginBottom: 4,
  },
  accountTypeText: {
    fontSize: 11,
    color: colors.text.secondary,
  },
  accountNumber: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  accountRight: {
    alignItems: 'flex-end',
    position: 'relative',
  },
  accountBalance: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  accountBalanceLabel: {
    fontSize: 11,
    color: colors.text.secondary,
  },
  chevron: {
    position: 'absolute',
    right: -8,
    top: '50%',
    fontSize: 20,
    color: colors.gray[400],
    marginTop: -10,
  },
});
