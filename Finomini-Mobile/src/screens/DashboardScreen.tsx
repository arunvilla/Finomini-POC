import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { netWorthData, accounts, transactions } from '../data/mockData';
import { generateNetWorthSeries, computeSpendingByCategory } from '../utils/chartDataAdapters';
import { colors } from '../theme/colors';
import { getChartWidth } from '../utils/dimensions';

interface DashboardScreenProps {
  onNavigate?: (screen: string, data?: any) => void;
}

export default function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const recentTransactions = transactions.slice(0, 3);
  const netWorthSeries = generateNetWorthSeries(netWorthData.netWorth);
  const spendingData = computeSpendingByCategory(transactions);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome, Taylor!</Text>
            <Text style={styles.subtitle}>Here's your financial overview</Text>
          </View>
          <View style={styles.profileIcon}>
            <Text style={styles.profileIconText}>T</Text>
          </View>
        </View>

        <View style={styles.netWorthCard}>
          <Text style={styles.cardTitle}>Net Worth</Text>
          <Text style={styles.netWorthAmount}>
            ${netWorthData.netWorth.toLocaleString()}
          </Text>
          <View style={styles.changeContainer}>
            <Text style={styles.changeText}>
              ↗ {netWorthData.changePercent}% (+${netWorthData.change.toLocaleString()})
            </Text>
            <Text style={styles.changeLabel}>last month</Text>
          </View>
          
          <View style={styles.chartContainer}>
            <Text style={styles.chartLabel}>6 Month Trend</Text>
            <LineChart
              data={netWorthSeries}
              width={getChartWidth()}
              height={100}
              thickness={3}
              color={colors.primary}
              startFillColor={colors.chart.area}
              endFillColor={colors.background}
              areaChart
              hideDataPoints
              hideRules
              hideYAxisText
              xAxisThickness={0}
              yAxisThickness={0}
              curved
            />
          </View>

          <View style={styles.assetsLiabilities}>
            <View style={styles.assetItem}>
              <Text style={styles.assetLabel}>Assets</Text>
              <Text style={styles.assetAmount}>
                ${netWorthData.assets.toLocaleString()}
              </Text>
            </View>
            <View style={styles.liabilityItem}>
              <Text style={styles.liabilityLabel}>Liabilities</Text>
              <Text style={styles.liabilityAmount}>
                ${netWorthData.liabilities.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Accounts</Text>
            <Text style={styles.seeAll}>See all</Text>
          </View>
          {accounts.map((account) => (
            <View key={account.id} style={styles.accountCard}>
              <View style={styles.accountInfo}>
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
                account.balance < 0 && styles.negativeAmount
              ]}>
                ${Math.abs(account.balance).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <Text style={styles.seeAll}>See all</Text>
          </View>
          {recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionInfo}>
                <View style={styles.transactionIcon}>
                  <Text style={styles.transactionIconText}>
                    {transaction.type === 'income' ? '↗' : '↙'}
                  </Text>
                </View>
                <View>
                  <Text style={styles.transactionMerchant}>{transaction.merchant}</Text>
                  <Text style={styles.transactionCategory}>{transaction.category}</Text>
                </View>
              </View>
              <Text style={[
                styles.transactionAmount,
                transaction.type === 'income' ? styles.incomeAmount : styles.expenseAmount
              ]}>
                {transaction.type === 'income' ? '+' : ''}{transaction.amount < 0 ? '-' : ''}$
                {Math.abs(transaction.amount).toLocaleString()}
              </Text>
            </View>
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIconText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  netWorthCard: {
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
  cardTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  netWorthAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  changeText: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
    marginRight: 8,
  },
  changeLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  assetsLiabilities: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  assetItem: {
    flex: 1,
  },
  assetLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  assetAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#10b981',
  },
  liabilityItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
  liabilityLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  liabilityAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ef4444',
  },
  chartContainer: {
    marginVertical: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  chartLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 12,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  seeAll: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
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
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  accountBalance: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  negativeAmount: {
    color: '#ef4444',
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
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionIconText: {
    fontSize: 20,
  },
  transactionMerchant: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  transactionCategory: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
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
});
