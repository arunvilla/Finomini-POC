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

interface AIBudgetOptimizerScreenProps {
  onBack: () => void;
}

interface BudgetOptimization {
  id: string;
  category: string;
  currentBudget: number;
  suggestedBudget: number;
  actualSpending: number;
  variance: number;
  confidence: number;
  reasoning: string;
  impact: 'positive' | 'neutral' | 'negative';
}

interface CategoryReallocation {
  from: string;
  to: string;
  amount: number;
  reason: string;
  impact: string;
}

export default function AIBudgetOptimizerScreen({ onBack }: AIBudgetOptimizerScreenProps) {
  const budgetOptimizations: BudgetOptimization[] = [
    {
      id: '1',
      category: 'Dining Out',
      currentBudget: 400,
      suggestedBudget: 320,
      actualSpending: 285,
      variance: -20,
      confidence: 92,
      reasoning: 'Your actual spending is consistently 25% below budget. Reallocate excess to savings.',
      impact: 'positive'
    },
    {
      id: '2',
      category: 'Groceries',
      currentBudget: 350,
      suggestedBudget: 380,
      actualSpending: 395,
      variance: 8.6,
      confidence: 87,
      reasoning: 'Recent trends show consistent overages. Small increase recommended to reduce stress.',
      impact: 'neutral'
    },
    {
      id: '3',
      category: 'Transportation',
      currentBudget: 200,
      suggestedBudget: 150,
      actualSpending: 145,
      variance: -25,
      confidence: 78,
      reasoning: 'Remote work has reduced commuting costs. Budget can be safely reduced.',
      impact: 'positive'
    },
    {
      id: '4',
      category: 'Entertainment',
      currentBudget: 150,
      suggestedBudget: 200,
      actualSpending: 180,
      variance: 20,
      confidence: 65,
      reasoning: 'Social activities increased. Consider moderate budget increase for better balance.',
      impact: 'neutral'
    }
  ];

  const reallocations: CategoryReallocation[] = [
    {
      from: 'Dining Out',
      to: 'Emergency Fund',
      amount: 80,
      reason: 'Consistent underspending in dining category',
      impact: 'Boost emergency fund by 8 months'
    },
    {
      from: 'Transportation',
      to: 'Vacation Savings',
      amount: 50,
      reason: 'Reduced commuting expenses',
      impact: 'Accelerate vacation goal by 3 months'
    },
    {
      from: 'Miscellaneous',
      to: 'Investment Account',
      amount: 100,
      reason: 'Optimize long-term wealth building',
      impact: 'Increase retirement savings by 12%'
    }
  ];

  const totalOptimizationSavings = budgetOptimizations
    .filter(opt => opt.variance < 0)
    .reduce((total, opt) => total + Math.abs(opt.variance), 0);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return colors.success;
      case 'negative': return colors.danger;
      default: return colors.primary;
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return colors.danger;
    if (variance < -15) return colors.success;
    return colors.warning;
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
          <Text style={styles.headerTitle}>Budget Optimizer</Text>
          <Text style={styles.headerSubtitle}>AI-powered recommendations</Text>
        </View>
        <View style={styles.aiIcon}>
          <Text style={styles.aiIconText}>🧠</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.section}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>💰 Optimization Summary</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Potential Savings</Text>
                <Text style={[styles.summaryValue, { color: colors.success }]}>
                  ${totalOptimizationSavings.toFixed(0)}/mo
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Annual Impact</Text>
                <Text style={[styles.summaryValue, { color: colors.success }]}>
                  ${(totalOptimizationSavings * 12).toFixed(0)}
                </Text>
              </View>
            </View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Categories Analyzed</Text>
                <Text style={styles.summaryValue}>{budgetOptimizations.length}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Avg Confidence</Text>
                <Text style={styles.summaryValue}>
                  {Math.round(budgetOptimizations.reduce((sum, opt) => sum + opt.confidence, 0) / budgetOptimizations.length)}%
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Optimization Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Optimization Recommendations</Text>
          {budgetOptimizations.map((opt) => (
            <View key={opt.id} style={styles.optimizationCard}>
              <View style={styles.optimizationHeader}>
                <View>
                  <Text style={styles.categoryName}>{opt.category}</Text>
                  <View style={[styles.impactBadge, { 
                    backgroundColor: getImpactColor(opt.impact) + '20' 
                  }]}>
                    <Text style={[styles.impactText, { color: getImpactColor(opt.impact) }]}>
                      {opt.impact.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={styles.confidenceBadge}>
                  <Text style={styles.confidenceText}>{opt.confidence}%</Text>
                </View>
              </View>

              <View style={styles.budgetComparison}>
                <View style={styles.budgetItem}>
                  <Text style={styles.budgetLabel}>Current</Text>
                  <Text style={styles.budgetValue}>${opt.currentBudget}</Text>
                </View>
                <Text style={styles.arrow}>→</Text>
                <View style={styles.budgetItem}>
                  <Text style={styles.budgetLabel}>Suggested</Text>
                  <Text style={[styles.budgetValue, { color: colors.primary }]}>
                    ${opt.suggestedBudget}
                  </Text>
                </View>
                <View style={styles.budgetItem}>
                  <Text style={styles.budgetLabel}>Actual</Text>
                  <Text style={styles.budgetValue}>${opt.actualSpending}</Text>
                </View>
              </View>

              <View style={[styles.varianceContainer, { 
                backgroundColor: getVarianceColor(opt.variance) + '20' 
              }]}>
                <Text style={[styles.varianceText, { color: getVarianceColor(opt.variance) }]}>
                  {opt.variance > 0 ? '+' : ''}{opt.variance.toFixed(1)}% variance
                </Text>
              </View>

              <Text style={styles.reasoning}>{opt.reasoning}</Text>
            </View>
          ))}
        </View>

        {/* Suggested Reallocations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suggested Reallocations</Text>
          <Text style={styles.sectionSubtitle}>
            Smart money moves based on your spending patterns
          </Text>
          {reallocations.map((reallocation, index) => (
            <View key={index} style={styles.reallocationCard}>
              <View style={styles.reallocationFlow}>
                <View style={styles.fromToContainer}>
                  <Text style={styles.fromToLabel}>From</Text>
                  <Text style={styles.fromToValue}>{reallocation.from}</Text>
                </View>
                <View style={styles.amountArrow}>
                  <Text style={styles.amount}>${reallocation.amount}</Text>
                  <Text style={styles.arrowIcon}>→</Text>
                </View>
                <View style={styles.fromToContainer}>
                  <Text style={styles.fromToLabel}>To</Text>
                  <Text style={styles.fromToValue}>{reallocation.to}</Text>
                </View>
              </View>
              <View style={styles.reallocationInfo}>
                <Text style={styles.reallocationReason}>💡 {reallocation.reason}</Text>
                <View style={styles.impactContainer}>
                  <Text style={styles.impactLabel}>Impact:</Text>
                  <Text style={styles.impactValue}>{reallocation.impact}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Action Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>✨ Apply All Optimizations</Text>
          </TouchableOpacity>
          <Text style={styles.disclaimer}>
            Review recommendations carefully before applying
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
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 6,
  },
  impactBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '700',
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
  budgetComparison: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 12,
  },
  budgetItem: {
    alignItems: 'center',
    flex: 1,
  },
  budgetLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 4,
  },
  budgetValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  arrow: {
    fontSize: 20,
    color: '#9ca3af',
  },
  varianceContainer: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  varianceText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  reasoning: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  reallocationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  reallocationFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  fromToContainer: {
    flex: 1,
  },
  fromToLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 4,
  },
  fromToValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  amountArrow: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.success,
    marginBottom: 4,
  },
  arrowIcon: {
    fontSize: 18,
    color: '#9ca3af',
  },
  reallocationInfo: {
    gap: 8,
  },
  reallocationReason: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
  },
  impactContainer: {
    backgroundColor: '#dcfce7',
    padding: 10,
    borderRadius: 10,
  },
  impactLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 2,
  },
  impactValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#047857',
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
