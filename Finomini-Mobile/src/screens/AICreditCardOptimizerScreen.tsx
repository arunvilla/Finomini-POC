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

interface AICreditCardOptimizerScreenProps {
  onBack: () => void;
}

interface CreditCard {
  id: string;
  name: string;
  network: string;
  currentUsage: number;
  optimalUsage: number;
  cashbackRate: number;
  annualFee: number;
  rewardsEarned: number;
  potentialRewards: number;
  utilizationRate: number;
  icon: string;
  strengths: string[];
}

interface SpendingOptimization {
  category: string;
  currentCard: string;
  recommendedCard: string;
  currentRate: string;
  optimizedRate: string;
  monthlySpending: number;
  additionalEarnings: number;
  urgency: 'high' | 'medium' | 'low';
  icon: string;
}

export default function AICreditCardOptimizerScreen({ onBack }: AICreditCardOptimizerScreenProps) {
  const currentCards: CreditCard[] = [
    {
      id: '1',
      name: 'Chase Freedom Unlimited',
      network: 'Visa',
      currentUsage: 65,
      optimalUsage: 40,
      cashbackRate: 1.5,
      annualFee: 0,
      rewardsEarned: 285,
      potentialRewards: 420,
      utilizationRate: 14,
      icon: '💳',
      strengths: ['No annual fee', 'Flat cashback rate', 'Good for everyday spending']
    },
    {
      id: '2',
      name: 'Chase Sapphire Preferred',
      network: 'Visa',
      currentUsage: 25,
      optimalUsage: 45,
      cashbackRate: 2.0,
      annualFee: 95,
      rewardsEarned: 420,
      potentialRewards: 890,
      utilizationRate: 8,
      icon: '💎',
      strengths: ['2x on travel & dining', 'Travel insurance', 'Premium benefits']
    },
    {
      id: '3',
      name: 'Amex Blue Cash Preferred',
      network: 'Amex',
      currentUsage: 10,
      optimalUsage: 15,
      cashbackRate: 6.0,
      annualFee: 95,
      rewardsEarned: 120,
      potentialRewards: 340,
      utilizationRate: 5,
      icon: '🔷',
      strengths: ['6% groceries', '3% gas', 'Great for families']
    }
  ];

  const spendingOptimizations: SpendingOptimization[] = [
    {
      category: 'Groceries',
      currentCard: 'Chase Freedom',
      recommendedCard: 'Amex Blue Cash',
      currentRate: '1.5%',
      optimizedRate: '6%',
      monthlySpending: 650,
      additionalEarnings: 29.25,
      urgency: 'high',
      icon: '🛒'
    },
    {
      category: 'Dining',
      currentCard: 'Chase Freedom',
      recommendedCard: 'Chase Sapphire',
      currentRate: '1.5%',
      optimizedRate: '3%',
      monthlySpending: 400,
      additionalEarnings: 6.00,
      urgency: 'medium',
      icon: '🍽️'
    },
    {
      category: 'Travel',
      currentCard: 'Chase Freedom',
      recommendedCard: 'Chase Sapphire',
      currentRate: '1.5%',
      optimizedRate: '3%',
      monthlySpending: 300,
      additionalEarnings: 4.50,
      urgency: 'medium',
      icon: '✈️'
    },
    {
      category: 'Gas',
      currentCard: 'Chase Freedom',
      recommendedCard: 'Amex Blue Cash',
      currentRate: '1.5%',
      optimizedRate: '3%',
      monthlySpending: 200,
      additionalEarnings: 3.00,
      urgency: 'low',
      icon: '⛽'
    }
  ];

  const totalAdditionalEarnings = spendingOptimizations.reduce((sum, opt) => sum + opt.additionalEarnings, 0);
  const annualAdditionalEarnings = totalAdditionalEarnings * 12;

  const currentRewards = currentCards.reduce((sum, card) => sum + card.rewardsEarned, 0);
  const potentialRewards = currentCards.reduce((sum, card) => sum + card.potentialRewards, 0);

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
          <Text style={styles.headerTitle}>Card Optimizer</Text>
          <Text style={styles.headerSubtitle}>Maximize your cashback</Text>
        </View>
        <View style={styles.aiIcon}>
          <Text style={styles.aiIconText}>💳</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.section}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>💰 Optimization Potential</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Current Rewards</Text>
                <Text style={styles.summaryValue}>${currentRewards}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Potential Rewards</Text>
                <Text style={[styles.summaryValue, { color: colors.success }]}>
                  ${potentialRewards}
                </Text>
              </View>
            </View>
            <View style={styles.savingsHighlight}>
              <Text style={styles.savingsLabel}>Additional Earnings (Monthly)</Text>
              <Text style={styles.savingsValue}>+${totalAdditionalEarnings.toFixed(2)}</Text>
              <Text style={styles.savingsAnnual}>${annualAdditionalEarnings.toFixed(0)}/year</Text>
            </View>
          </View>
        </View>

        {/* Spending Optimizations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Spending Optimizations</Text>
          <Text style={styles.sectionSubtitle}>
            Use the right card for each category to maximize rewards
          </Text>
          {spendingOptimizations.map((opt, index) => (
            <View key={index} style={styles.optimizationCard}>
              <View style={styles.optimizationHeader}>
                <View style={styles.categoryRow}>
                  <Text style={styles.categoryIcon}>{opt.icon}</Text>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryName}>{opt.category}</Text>
                    <Text style={styles.monthlySpending}>
                      ${opt.monthlySpending}/month
                    </Text>
                  </View>
                </View>
                <View style={[styles.urgencyBadge, { 
                  backgroundColor: getUrgencyColor(opt.urgency) + '20' 
                }]}>
                  <Text style={[styles.urgencyText, { 
                    color: getUrgencyColor(opt.urgency) 
                  }]}>
                    {opt.urgency.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.cardComparison}>
                <View style={styles.comparisonItem}>
                  <Text style={styles.comparisonLabel}>Current</Text>
                  <Text style={styles.cardName}>{opt.currentCard}</Text>
                  <Text style={styles.rate}>{opt.currentRate} back</Text>
                </View>
                <Text style={styles.arrow}>→</Text>
                <View style={styles.comparisonItem}>
                  <Text style={styles.comparisonLabel}>Recommended</Text>
                  <Text style={[styles.cardName, { color: colors.primary }]}>
                    {opt.recommendedCard}
                  </Text>
                  <Text style={[styles.rate, { color: colors.success }]}>
                    {opt.optimizedRate} back
                  </Text>
                </View>
              </View>

              <View style={styles.earningsHighlight}>
                <Text style={styles.earningsText}>
                  💰 Earn +${opt.additionalEarnings.toFixed(2)}/month more
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Your Credit Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Credit Cards</Text>
          {currentCards.map((card) => (
            <View key={card.id} style={styles.cardCard}>
              <View style={styles.cardHeader}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.cardIcon}>{card.icon}</Text>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{card.name}</Text>
                    <Text style={styles.cardNetwork}>{card.network}</Text>
                  </View>
                </View>
                <View style={styles.cashbackBadge}>
                  <Text style={styles.cashbackText}>{card.cashbackRate}%</Text>
                </View>
              </View>

              <View style={styles.cardStats}>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Current Usage:</Text>
                  <Text style={styles.statValue}>{card.currentUsage}%</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Optimal Usage:</Text>
                  <Text style={[styles.statValue, { color: colors.primary }]}>
                    {card.optimalUsage}%
                  </Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Annual Fee:</Text>
                  <Text style={styles.statValue}>
                    {card.annualFee === 0 ? 'None' : `$${card.annualFee}`}
                  </Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Rewards Earned:</Text>
                  <Text style={[styles.statValue, { color: colors.success }]}>
                    ${card.rewardsEarned}
                  </Text>
                </View>
              </View>

              {/* Usage Optimization */}
              {card.currentUsage !== card.optimalUsage && (
                <View style={styles.usageMessage}>
                  <Text style={styles.usageMessageText}>
                    {card.currentUsage > card.optimalUsage 
                      ? `💡 Consider reducing usage by ${card.currentUsage - card.optimalUsage}%`
                      : `📈 Can increase usage by ${card.optimalUsage - card.currentUsage}%`
                    }
                  </Text>
                </View>
              )}

              {/* Strengths */}
              <View style={styles.strengthsContainer}>
                <Text style={styles.strengthsLabel}>✨ Strengths</Text>
                {card.strengths.map((strength, idx) => (
                  <View key={idx} style={styles.strengthItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.strengthText}>{strength}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Action Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>✨ Apply Optimizations</Text>
          </TouchableOpacity>
          <Text style={styles.disclaimer}>
            Optimize card usage across all your transactions
          </Text>
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
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
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
    marginBottom: 2,
  },
  savingsAnnual: {
    fontSize: 14,
    color: '#047857',
  },
  optimizationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  optimizationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  categoryIcon: {
    fontSize: 28,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  monthlySpending: {
    fontSize: 13,
    color: '#6b7280',
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  urgencyText: {
    fontSize: 10,
    fontWeight: '700',
  },
  cardComparison: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 12,
  },
  comparisonItem: {
    flex: 1,
  },
  comparisonLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 4,
  },
  cardName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  rate: {
    fontSize: 12,
    color: '#6b7280',
  },
  arrow: {
    fontSize: 20,
    color: '#9ca3af',
    paddingHorizontal: 8,
  },
  earningsHighlight: {
    backgroundColor: '#dcfce7',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  earningsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#047857',
  },
  cardCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  cardIcon: {
    fontSize: 32,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  cardNetwork: {
    fontSize: 12,
    color: '#6b7280',
  },
  cashbackBadge: {
    backgroundColor: colors.success + '20',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  cashbackText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.success,
  },
  cardStats: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 12,
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
  usageMessage: {
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  usageMessageText: {
    fontSize: 13,
    color: '#1f2937',
    textAlign: 'center',
  },
  strengthsContainer: {
    gap: 6,
  },
  strengthsLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  strengthItem: {
    flexDirection: 'row',
    gap: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  strengthText: {
    flex: 1,
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 18,
  },
  applyButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  applyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});
