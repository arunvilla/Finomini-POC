import React, { useState } from 'react';
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

interface AISubscriptionAuditScreenProps {
  onBack: () => void;
}

interface Subscription {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'yearly';
  category: string;
  icon: string;
  status: 'active' | 'cancelled';
  nextCharge: string;
  riskLevel: 'high' | 'medium' | 'low';
  suggestions: string[];
  priceIncrease?: {
    oldPrice: number;
    newPrice: number;
  };
}

interface AuditInsight {
  id: string;
  type: 'duplicate' | 'price_increase' | 'unused' | 'optimization';
  title: string;
  description: string;
  potentialSavings: number;
  confidence: number;
  action: string;
}

export default function AISubscriptionAuditScreen({ onBack }: AISubscriptionAuditScreenProps) {
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>([]);

  const subscriptions: Subscription[] = [
    {
      id: '1',
      name: 'Netflix',
      amount: 15.99,
      frequency: 'monthly',
      category: 'Entertainment',
      icon: '🎬',
      status: 'active',
      nextCharge: 'Mar 15',
      riskLevel: 'low',
      suggestions: ['Consider family plan', 'Check usage frequency']
    },
    {
      id: '2',
      name: 'Spotify Premium',
      amount: 9.99,
      frequency: 'monthly',
      category: 'Entertainment',
      icon: '🎵',
      status: 'active',
      nextCharge: 'Mar 10',
      riskLevel: 'low',
      suggestions: ['High usage detected', 'Good value']
    },
    {
      id: '3',
      name: 'Amazon Prime',
      amount: 14.99,
      frequency: 'monthly',
      category: 'Shopping',
      icon: '📦',
      status: 'active',
      nextCharge: 'Mar 28',
      riskLevel: 'medium',
      suggestions: ['Switch to yearly', 'Save $40/year'],
      priceIncrease: {
        oldPrice: 12.99,
        newPrice: 14.99
      }
    },
    {
      id: '4',
      name: 'Adobe Creative Cloud',
      amount: 52.99,
      frequency: 'monthly',
      category: 'Software',
      icon: '🎨',
      status: 'active',
      nextCharge: 'Mar 15',
      riskLevel: 'high',
      suggestions: ['Low usage detected', 'Consider alternatives', 'Pause subscription']
    },
    {
      id: '5',
      name: 'Hulu',
      amount: 12.99,
      frequency: 'monthly',
      category: 'Entertainment',
      icon: '📺',
      status: 'active',
      nextCharge: 'Mar 22',
      riskLevel: 'medium',
      suggestions: ['Bundle with Disney+', 'Similar to Netflix']
    },
    {
      id: '6',
      name: 'ChatGPT Plus',
      amount: 20.00,
      frequency: 'monthly',
      category: 'AI Tools',
      icon: '🤖',
      status: 'active',
      nextCharge: 'Mar 1',
      riskLevel: 'low',
      suggestions: ['High value', 'Frequently used']
    }
  ];

  const auditInsights: AuditInsight[] = [
    {
      id: '1',
      type: 'duplicate',
      title: 'Duplicate Streaming Services',
      description: 'Netflix and Hulu have 70% overlapping content. Consider keeping just one.',
      potentialSavings: 155.88,
      confidence: 92,
      action: 'Cancel one service'
    },
    {
      id: '2',
      type: 'price_increase',
      title: 'Recent Price Increases',
      description: 'Amazon Prime increased by $2/month. Annual plan is better value.',
      potentialSavings: 40,
      confidence: 100,
      action: 'Switch to yearly'
    },
    {
      id: '3',
      type: 'unused',
      title: 'Underutilized Subscription',
      description: 'Adobe Creative Cloud used only 3 times in last 60 days. Consider alternatives.',
      potentialSavings: 635.88,
      confidence: 88,
      action: 'Cancel or pause'
    },
    {
      id: '4',
      type: 'optimization',
      title: 'Bundle Opportunity',
      description: 'Bundle Hulu + Disney+ + ESPN for $14.99 instead of separate subscriptions.',
      potentialSavings: 120,
      confidence: 85,
      action: 'Switch to bundle'
    }
  ];

  const totalMonthly = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + (s.frequency === 'monthly' ? s.amount : s.amount / 12), 0);

  const totalAnnual = totalMonthly * 12;

  const totalPotentialSavings = auditInsights.reduce((sum, insight) => sum + insight.potentialSavings, 0);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return colors.danger;
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return '#6b7280';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'duplicate': return '👯';
      case 'price_increase': return '📈';
      case 'unused': return '💤';
      case 'optimization': return '💡';
      default: return 'ℹ️';
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
          <Text style={styles.headerTitle}>Subscription Audit</Text>
          <Text style={styles.headerSubtitle}>Find hidden savings</Text>
        </View>
        <View style={styles.aiIcon}>
          <Text style={styles.aiIconText}>🔍</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.section}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>💰 Spending Summary</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Monthly Total</Text>
                <Text style={styles.summaryValue}>${totalMonthly.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Annual Total</Text>
                <Text style={styles.summaryValue}>${totalAnnual.toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.savingsHighlight}>
              <Text style={styles.savingsLabel}>Potential Annual Savings</Text>
              <Text style={styles.savingsValue}>${totalPotentialSavings.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* AI Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Insights</Text>
          {auditInsights.map((insight) => (
            <View key={insight.id} style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <View style={styles.insightTitleRow}>
                  <Text style={styles.insightIcon}>{getInsightIcon(insight.type)}</Text>
                  <View style={styles.insightTitleContainer}>
                    <Text style={styles.insightTitle}>{insight.title}</Text>
                    <View style={styles.savingsBadge}>
                      <Text style={styles.savingsText}>
                        Save ${insight.potentialSavings}/year
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.confidenceBadge}>
                  <Text style={styles.confidenceText}>{insight.confidence}%</Text>
                </View>
              </View>
              <Text style={styles.insightDescription}>{insight.description}</Text>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>{insight.action}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Active Subscriptions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Subscriptions</Text>
          {subscriptions
            .filter(s => s.status === 'active')
            .map((subscription) => (
              <View key={subscription.id} style={styles.subscriptionCard}>
                <View style={styles.subscriptionHeader}>
                  <View style={styles.subscriptionTitleRow}>
                    <Text style={styles.subscriptionIcon}>{subscription.icon}</Text>
                    <View style={styles.subscriptionInfo}>
                      <Text style={styles.subscriptionName}>{subscription.name}</Text>
                      <Text style={styles.subscriptionCategory}>{subscription.category}</Text>
                    </View>
                  </View>
                  <View style={[styles.riskBadge, { 
                    backgroundColor: getRiskColor(subscription.riskLevel) + '20' 
                  }]}>
                    <Text style={[styles.riskText, { 
                      color: getRiskColor(subscription.riskLevel) 
                    }]}>
                      {subscription.riskLevel.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View style={styles.subscriptionDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Amount:</Text>
                    <Text style={styles.detailValue}>
                      ${subscription.amount}/{subscription.frequency === 'monthly' ? 'mo' : 'yr'}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Next Charge:</Text>
                    <Text style={styles.detailValue}>{subscription.nextCharge}</Text>
                  </View>
                  {subscription.priceIncrease && (
                    <View style={styles.priceIncreaseAlert}>
                      <Text style={styles.priceIncreaseText}>
                        📈 Price increased from ${subscription.priceIncrease.oldPrice} to ${subscription.priceIncrease.newPrice}
                      </Text>
                    </View>
                  )}
                </View>

                {subscription.suggestions.length > 0 && (
                  <View style={styles.suggestionsContainer}>
                    {subscription.suggestions.map((suggestion, idx) => (
                      <View key={idx} style={styles.suggestionChip}>
                        <Text style={styles.suggestionText}>{suggestion}</Text>
                      </View>
                    ))}
                  </View>
                )}
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
    marginBottom: 16,
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
  savingsHighlight: {
    backgroundColor: '#dcfce7',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  savingsLabel: {
    fontSize: 12,
    color: '#059669',
    marginBottom: 4,
  },
  savingsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#047857',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  insightTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  insightIcon: {
    fontSize: 24,
  },
  insightTitleContainer: {
    flex: 1,
    gap: 4,
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  savingsBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  savingsText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#047857',
  },
  confidenceBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  insightDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  subscriptionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  subscriptionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  subscriptionIcon: {
    fontSize: 32,
  },
  subscriptionInfo: {
    flex: 1,
  },
  subscriptionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  subscriptionCategory: {
    fontSize: 12,
    color: '#6b7280',
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  riskText: {
    fontSize: 10,
    fontWeight: '700',
  },
  subscriptionDetails: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
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
  priceIncreaseAlert: {
    backgroundColor: '#fef3c7',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  priceIncreaseText: {
    fontSize: 12,
    color: '#d97706',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionChip: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  suggestionText: {
    fontSize: 12,
    color: '#4b5563',
  },
});
