import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { colors } from '../theme/colors';

interface AIDebtManagementScreenProps {
  onBack: () => void;
}

interface DebtAccount {
  id: string;
  name: string;
  type: 'credit_card' | 'student_loan' | 'auto_loan';
  balance: number;
  interestRate: number;
  minimumPayment: number;
  priority: number;
  payoffMonths: number;
  totalInterest: number;
}

interface PayoffStrategy {
  id: string;
  name: string;
  description: string;
  type: 'avalanche' | 'snowball' | 'ai_optimized';
  totalInterestSaved: number;
  timeToPayoff: number;
  monthlyPayment: number;
  confidence: number;
}

interface DebtInsight {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'warning' | 'refinance';
  impact: string;
  potentialSavings: number;
  urgency: 'high' | 'medium' | 'low';
}

export default function AIDebtManagementScreen({ onBack }: AIDebtManagementScreenProps) {
  const debtAccounts: DebtAccount[] = [
    {
      id: '1',
      name: 'Chase Sapphire Credit Card',
      type: 'credit_card',
      balance: 8420,
      interestRate: 24.99,
      minimumPayment: 210,
      priority: 1,
      payoffMonths: 18,
      totalInterest: 2180
    },
    {
      id: '2',
      name: 'Capital One Venture Card',
      type: 'credit_card',
      balance: 3250,
      interestRate: 19.99,
      minimumPayment: 85,
      priority: 2,
      payoffMonths: 24,
      totalInterest: 890
    },
    {
      id: '3',
      name: 'Federal Student Loan',
      type: 'student_loan',
      balance: 15600,
      interestRate: 6.8,
      minimumPayment: 165,
      priority: 3,
      payoffMonths: 120,
      totalInterest: 4200
    },
    {
      id: '4',
      name: 'Honda Civic Auto Loan',
      type: 'auto_loan',
      balance: 12890,
      interestRate: 4.2,
      minimumPayment: 285,
      priority: 4,
      payoffMonths: 48,
      totalInterest: 1650
    }
  ];

  const payoffStrategies: PayoffStrategy[] = [
    {
      id: '1',
      name: 'AI-Optimized Strategy',
      description: 'Custom strategy balancing psychology and mathematics',
      type: 'ai_optimized',
      totalInterestSaved: 1850,
      timeToPayoff: 42,
      monthlyPayment: 945,
      confidence: 94
    },
    {
      id: '2',
      name: 'Debt Avalanche',
      description: 'Pay highest interest rate first',
      type: 'avalanche',
      totalInterestSaved: 2100,
      timeToPayoff: 45,
      monthlyPayment: 945,
      confidence: 100
    },
    {
      id: '3',
      name: 'Debt Snowball',
      description: 'Pay smallest balance first for quick wins',
      type: 'snowball',
      totalInterestSaved: 1200,
      timeToPayoff: 48,
      monthlyPayment: 945,
      confidence: 85
    }
  ];

  const debtInsights: DebtInsight[] = [
    {
      id: '1',
      title: 'High-Interest Credit Card Alert',
      description: 'Your Chase Sapphire card has a 24.99% APR - highest priority for payoff',
      type: 'warning',
      impact: 'Costing $2,180 in total interest',
      potentialSavings: 1800,
      urgency: 'high'
    },
    {
      id: '2',
      title: 'Balance Transfer Opportunity',
      description: 'You qualify for 0% APR balance transfer offers for 18 months',
      type: 'opportunity',
      impact: 'Could save $1,500 in interest',
      potentialSavings: 1500,
      urgency: 'medium'
    },
    {
      id: '3',
      title: 'Auto Loan Refinance',
      description: 'Current rates 1.5% lower than your auto loan rate',
      type: 'refinance',
      impact: 'Save $420 over remaining loan term',
      potentialSavings: 420,
      urgency: 'low'
    }
  ];

  const totalDebt = debtAccounts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalInterest = debtAccounts.reduce((sum, debt) => sum + debt.totalInterest, 0);
  const highestRate = Math.max(...debtAccounts.map(d => d.interestRate));

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'credit_card': return '💳';
      case 'student_loan': return '🎓';
      case 'auto_loan': return '🚗';
      default: return '💵';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'opportunity': return '💡';
      case 'refinance': return '🔄';
      default: return 'ℹ️';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return colors.danger;
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return '#6b7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Debt Management</Text>
          <Text style={styles.headerSubtitle}>AI-powered payoff strategies</Text>
        </View>
        <View style={styles.aiIcon}>
          <Text style={styles.aiIconText}>💳</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.section}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>💰 Debt Overview</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Total Debt</Text>
                <Text style={[styles.summaryValue, { color: colors.danger }]}>
                  ${totalDebt.toLocaleString()}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Total Interest</Text>
                <Text style={styles.summaryValue}>${totalInterest.toLocaleString()}</Text>
              </View>
            </View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Highest Rate</Text>
                <Text style={[styles.summaryValue, { color: colors.warning }]}>
                  {highestRate}%
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Accounts</Text>
                <Text style={styles.summaryValue}>{debtAccounts.length}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* AI Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Insights</Text>
          {debtInsights.map((insight) => (
            <View key={insight.id} style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <View style={styles.insightTitleRow}>
                  <Text style={styles.insightIcon}>{getInsightIcon(insight.type)}</Text>
                  <View style={styles.insightTitleContainer}>
                    <Text style={styles.insightTitle}>{insight.title}</Text>
                    <View style={[styles.urgencyBadge, { 
                      backgroundColor: getUrgencyColor(insight.urgency) + '20' 
                    }]}>
                      <Text style={[styles.urgencyText, { 
                        color: getUrgencyColor(insight.urgency) 
                      }]}>
                        {insight.urgency.toUpperCase()} PRIORITY
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <Text style={styles.insightDescription}>{insight.description}</Text>
              <View style={styles.impactContainer}>
                <Text style={styles.impactLabel}>Impact:</Text>
                <Text style={styles.impactText}>{insight.impact}</Text>
              </View>
              <View style={styles.savingsHighlight}>
                <Text style={styles.savingsText}>
                  💰 Save ${insight.potentialSavings.toLocaleString()}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Payoff Strategies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payoff Strategies</Text>
          {payoffStrategies.map((strategy) => (
            <View key={strategy.id} style={styles.strategyCard}>
              <View style={styles.strategyHeader}>
                <View>
                  <Text style={styles.strategyName}>{strategy.name}</Text>
                  <Text style={styles.strategyDescription}>{strategy.description}</Text>
                </View>
                <View style={styles.confidenceBadge}>
                  <Text style={styles.confidenceText}>{strategy.confidence}%</Text>
                </View>
              </View>
              
              <View style={styles.strategyStats}>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Time to Payoff:</Text>
                  <Text style={styles.statValue}>{strategy.timeToPayoff} months</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Monthly Payment:</Text>
                  <Text style={styles.statValue}>${strategy.monthlyPayment}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Interest Saved:</Text>
                  <Text style={[styles.statValue, { color: colors.success }]}>
                    ${strategy.totalInterestSaved.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Debt Accounts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Debts</Text>
          {debtAccounts.map((debt) => (
            <View key={debt.id} style={styles.debtCard}>
              <View style={styles.debtHeader}>
                <View style={styles.debtTitleRow}>
                  <Text style={styles.debtIcon}>{getTypeIcon(debt.type)}</Text>
                  <View style={styles.debtInfo}>
                    <Text style={styles.debtName}>{debt.name}</Text>
                    <Text style={styles.debtType}>
                      {debt.type.replace('_', ' ').toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={styles.priorityBadge}>
                  <Text style={styles.priorityText}>#{debt.priority}</Text>
                </View>
              </View>

              <View style={styles.debtDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Balance:</Text>
                  <Text style={[styles.detailValue, { fontWeight: 'bold' }]}>
                    ${debt.balance.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Interest Rate:</Text>
                  <Text style={[styles.detailValue, { 
                    color: debt.interestRate > 15 ? colors.danger : colors.warning 
                  }]}>
                    {debt.interestRate}%
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Min Payment:</Text>
                  <Text style={styles.detailValue}>${debt.minimumPayment}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Payoff Time:</Text>
                  <Text style={styles.detailValue}>{debt.payoffMonths} months</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Total Interest:</Text>
                  <Text style={[styles.detailValue, { color: colors.danger }]}>
                    ${debt.totalInterest.toLocaleString()}
                  </Text>
                </View>
              </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#1f2937',
  },
  headerContent: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  aiIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiIconText: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  insightCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  insightHeader: {
    marginBottom: 8,
  },
  insightTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  insightIcon: {
    fontSize: 24,
  },
  insightTitleContainer: {
    flex: 1,
    gap: 6,
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  urgencyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  urgencyText: {
    fontSize: 10,
    fontWeight: '700',
  },
  insightDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  impactContainer: {
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  impactLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 4,
  },
  impactText: {
    fontSize: 13,
    color: '#1f2937',
  },
  savingsHighlight: {
    backgroundColor: '#dcfce7',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  savingsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#047857',
  },
  strategyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  strategyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  strategyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  strategyDescription: {
    fontSize: 13,
    color: '#6b7280',
  },
  confidenceBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  strategyStats: {
    gap: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statLabel: {
    fontSize: 13,
    color: '#6b7280',
  },
  statValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
  },
  debtCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  debtHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  debtTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  debtIcon: {
    fontSize: 32,
  },
  debtInfo: {
    flex: 1,
  },
  debtName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  debtType: {
    fontSize: 11,
    color: '#6b7280',
  },
  priorityBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  debtDetails: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 13,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
  },
});
