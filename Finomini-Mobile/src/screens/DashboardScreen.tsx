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
import { LineChart } from 'react-native-gifted-charts';
import { netWorthData, accounts, transactions } from '../data/mockData';
import { generateNetWorthSeries } from '../utils/chartDataAdapters';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius, shadows } from '../theme/spacing';
import ChartErrorBoundary from '../components/ChartErrorBoundary';
import { ModernCard } from '../components/ModernCard';
import { Badge } from '../components/Badge';

interface DashboardScreenProps {
  onNavigate?: (screen: string, data?: any) => void;
}

export default function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const [chartWidth, setChartWidth] = useState(300);
  const recentTransactions = transactions.slice(0, 3);
  const netWorthSeries = generateNetWorthSeries(netWorthData.netWorth);

  const netWorthChange = netWorthData.changePercent >= 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome, Taylor!</Text>
            <Text style={styles.subtitle}>Here's your financial overview</Text>
          </View>
          <View style={styles.profileIcon}>
            <Text style={styles.profileIconText}>T</Text>
          </View>
        </View>

        {/* Net Worth Card */}
        <ModernCard style={styles.netWorthCard} variant="elevated">
          <View style={styles.netWorthHeader}>
            <Text style={styles.cardLabel}>Net Worth</Text>
            <Badge 
              label={`${netWorthChange ? '+' : ''}${netWorthData.changePercent}%`}
              variant={netWorthChange ? 'success' : 'danger'}
              size="sm"
            />
          </View>
          
          <Text style={styles.netWorthAmount}>
            ${netWorthData.netWorth.toLocaleString()}
          </Text>
          
          <Text style={styles.changeDescription}>
            {netWorthChange ? '↗' : '↘'} ${Math.abs(netWorthData.change).toLocaleString()} from last month
          </Text>

          {/* Chart */}
          <View 
            style={styles.chartContainer}
            onLayout={(event) => {
              const { width } = event.nativeEvent.layout;
              setChartWidth(width - 16);
            }}
          >
            <ChartErrorBoundary resetKey={chartWidth}>
              <LineChart
                data={netWorthSeries}
                width={chartWidth}
                height={120}
                thickness={3}
                color={colors.primary[600]}
                startFillColor={colors.primary[200]}
                endFillColor={colors.primary[50]}
                areaChart
                hideDataPoints={false}
                dataPointsColor={colors.primary[600]}
                dataPointsRadius={3}
                hideRules
                hideYAxisText
                xAxisThickness={0}
                yAxisThickness={0}
                curved
                animateOnDataChange
                animationDuration={500}
              />
            </ChartErrorBoundary>
          </View>

          {/* Assets & Liabilities */}
          <View style={styles.assetsLiabilities}>
            <View style={styles.assetItem}>
              <Text style={styles.assetLabel}>Assets</Text>
              <Text style={styles.assetAmount}>
                ${netWorthData.assets.toLocaleString()}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.liabilityItem}>
              <Text style={styles.liabilityLabel}>Liabilities</Text>
              <Text style={styles.liabilityAmount}>
                ${netWorthData.liabilities.toLocaleString()}
              </Text>
            </View>
          </View>
        </ModernCard>

        {/* Accounts Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Accounts</Text>
            <TouchableOpacity onPress={() => onNavigate?.('Accounts')}>
              <Text style={styles.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>
          
          {accounts.map((account) => (
            <ModernCard key={account.id} style={styles.accountCard} variant="elevated">
              <View style={styles.accountInfo}>
                <View style={[
                  styles.accountIcon,
                  { backgroundColor: colors.primary[100] }
                ]}>
                  <Text style={styles.accountIconText}>
                    {account.type === 'checking' ? '🏦' :
                     account.type === 'savings' ? '💰' :
                     account.type === 'credit' ? '💳' : '📈'}
                  </Text>
                </View>
                <View style={styles.accountDetails}>
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
            </ModernCard>
          ))}
        </View>

        {/* Recent Transactions Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => onNavigate?.('Transactions')}>
              <Text style={styles.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>
          
          {recentTransactions.map((transaction) => (
            <ModernCard key={transaction.id} style={styles.transactionCard} variant="elevated">
              <View style={styles.transactionInfo}>
                <View style={[
                  styles.transactionIcon,
                  { backgroundColor: transaction.type === 'income' ? colors.success[100] : colors.danger[100] }
                ]}>
                  <Text style={styles.transactionIconText}>
                    {transaction.type === 'income' ? '↗' : '↙'}
                  </Text>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionMerchant}>{transaction.merchant}</Text>
                  <Text style={styles.transactionCategory}>{transaction.category}</Text>
                </View>
              </View>
              <Text style={[
                styles.transactionAmount,
                transaction.type === 'income' ? styles.incomeAmount : styles.expenseAmount
              ]}>
                {transaction.type === 'income' ? '+' : '-'}$
                {Math.abs(transaction.amount).toLocaleString()}
              </Text>
            </ModernCard>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  scrollView: {
    flex: 1,
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
  greeting: {
    ...typography.h2,
    color: colors.text.primary,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  profileIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIconText: {
    ...typography.h4,
    color: colors.background,
  },
  netWorthCard: {
    marginHorizontal: spacing.base,
    marginTop: spacing.base,
    marginBottom: spacing.sm,
    paddingVertical: spacing.lg,
  },
  netWorthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardLabel: {
    ...typography.label,
    color: colors.text.secondary,
  },
  netWorthAmount: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  changeDescription: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  chartContainer: {
    marginTop: spacing.lg,
    paddingTop: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
  },
  assetsLiabilities: {
    flexDirection: 'row',
    marginTop: spacing.base,
    paddingTop: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  assetItem: {
    flex: 1,
  },
  assetLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  assetAmount: {
    ...typography.h4,
    color: colors.success[600],
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.base,
  },
  liabilityItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
  liabilityLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  liabilityAmount: {
    ...typography.h4,
    color: colors.danger[600],
  },
  section: {
    paddingHorizontal: spacing.base,
    marginTop: spacing.base,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  seeAll: {
    ...typography.label,
    color: colors.primary[600],
  },
  accountCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  accountIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  accountIconText: {
    fontSize: 22,
  },
  accountDetails: {
    flex: 1,
  },
  accountName: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  },
  accountType: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 2,
  },
  accountBalance: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  },
  negativeAmount: {
    color: colors.danger[600],
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  transactionInfo: {
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
  transactionDetails: {
    flex: 1,
  },
  transactionMerchant: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  },
  transactionCategory: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 2,
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
});
