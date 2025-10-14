import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { colors } from '../theme/colors';
import ChartErrorBoundary from '../components/ChartErrorBoundary';

const { width } = Dimensions.get('window');

interface InsightDetailsScreenProps {
  onBack: () => void;
  insight: any;
}

export default function InsightDetailsScreen({ onBack, insight }: InsightDetailsScreenProps) {
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null);

  const spendingTrend = [
    { value: 450, label: 'Jan' },
    { value: 520, label: 'Feb' },
    { value: 480, label: 'Mar' },
    { value: 410, label: 'Apr' },
    { value: 380, label: 'May' },
    { value: 350, label: 'Jun' }
  ];

  const relatedTransactions = [
    {
      id: '1',
      date: 'Jan 25',
      merchant: 'Whole Foods Market',
      amount: 67.43,
      category: 'Groceries',
      icon: '🛒'
    },
    {
      id: '2',
      date: 'Jan 23',
      merchant: "Trader Joe's",
      amount: 42.18,
      category: 'Groceries',
      icon: '🛒'
    },
    {
      id: '3',
      date: 'Jan 21',
      merchant: 'Safeway',
      amount: 78.92,
      category: 'Groceries',
      icon: '🛒'
    }
  ];

  const getDetailedExplanation = () => {
    switch (insight?.type) {
      case 'spending':
        return `Great job staying under budget! Your consistent effort in managing grocery expenses has really paid off. By spending $350 instead of your usual $400 this month, you've demonstrated excellent financial discipline.\n\nThis $50 savings represents a 12.5% reduction from your average monthly grocery spending. This kind of consistent saving can add up to $600 per year - enough for a nice vacation or emergency fund boost.\n\nThe key factors contributing to this success appear to be better meal planning and taking advantage of sales and discounts. Keep up this momentum!`;
      
      case 'security':
        return `We noticed an unusually large transaction at Downtown Coffee that's significantly higher than your typical spending pattern there. Your average purchase at coffee shops is around $8-12, but this transaction was $127.\n\nThis could be legitimate - perhaps you bought coffee for the office or hosted a meeting. However, it's always good to verify large or unusual transactions to ensure your account security.\n\nIf this transaction seems incorrect, you should contact your bank immediately to report potential fraud.`;
      
      case 'saving':
        return `You're in a great position to boost your emergency fund! Having $250 under budget this month shows strong spending discipline.\n\nYour emergency fund is currently at 68% of your $5,000 goal. Adding this $250 would bring you to 73%, putting you well on track to reach your goal.\n\nExperts recommend having 3-6 months of expenses in an emergency fund. You're making excellent progress!`;
      
      case 'budgeting':
        return `With 95% of your entertainment budget used and 8 days remaining in the month, it's time to be mindful of discretionary spending.\n\nConsider free or low-cost entertainment options for the rest of the month, such as outdoor activities, home movie nights, or exploring local parks.\n\nIf you consistently hit your entertainment budget early, consider adjusting it upward or reviewing your spending patterns.`;
      
      case 'investment':
        return `Your investment portfolio grew by $1,247 (8.2%) this month! This strong performance shows your investment strategy is working.\n\nWith this positive momentum, consider increasing your monthly contributions to accelerate wealth building. Even an additional $100/month can make a significant difference over time.\n\nRemember to maintain a diversified portfolio and stick to your long-term investment strategy.`;
      
      case 'goal':
        return `You're 72% of the way to your vacation goal! At your current savings rate of $425/month, you're projected to reach your $5,000 target 2 months ahead of schedule.\n\nThis is fantastic progress! Your consistent contributions and discipline are paying off. Consider what you'll do with the extra time - maybe extend your vacation or save the surplus for another goal.`;
      
      default:
        return insight?.description || 'No additional details available for this insight.';
    }
  };

  const chartWidth = width - 64;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Insight Details</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Main Insight Card */}
        <View style={styles.section}>
          <View style={[styles.mainCard, { borderLeftColor: insight?.color || colors.primary }]}>
            <View style={styles.mainHeader}>
              <Text style={styles.mainIcon}>{insight?.icon}</Text>
              <View style={styles.mainContent}>
                <Text style={styles.mainHeadline}>{insight?.headline}</Text>
                <Text style={[styles.mainKeyData, { color: insight?.color || colors.primary }]}>
                  {insight?.keyDataPoint}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Detailed Explanation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Detailed Analysis</Text>
          <View style={styles.card}>
            <Text style={styles.explanationText}>{getDetailedExplanation()}</Text>
          </View>
        </View>

        {/* Trend Chart (for spending type) */}
        {insight?.type === 'spending' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📊 6-Month Trend</Text>
            <View style={styles.card}>
              <ChartErrorBoundary>
                <LineChart
                  data={spendingTrend}
                  width={chartWidth}
                  height={180}
                  color={insight?.color || colors.primary}
                  thickness={3}
                  startFillColor={insight?.color || colors.primary}
                  endFillColor={insight?.color || colors.primary}
                  startOpacity={0.3}
                  endOpacity={0.1}
                  spacing={chartWidth / (spendingTrend.length + 1)}
                  initialSpacing={10}
                  endSpacing={10}
                  noOfSections={4}
                  yAxisColor="#e5e7eb"
                  xAxisColor="#e5e7eb"
                  yAxisTextStyle={{ color: '#6b7280', fontSize: 10 }}
                  xAxisLabelTextStyle={{ color: '#6b7280', fontSize: 10 }}
                  curved
                  areaChart
                />
              </ChartErrorBoundary>
              <Text style={styles.chartCaption}>
                Your spending has decreased by 22% over the past 6 months
              </Text>
            </View>
          </View>
        )}

        {/* Related Transactions */}
        {insight?.type === 'spending' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🧾 Related Transactions</Text>
            {relatedTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionCard}>
                <View style={styles.transactionLeft}>
                  <Text style={styles.transactionIcon}>{transaction.icon}</Text>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionMerchant}>{transaction.merchant}</Text>
                    <Text style={styles.transactionDate}>{transaction.date}</Text>
                  </View>
                </View>
                <Text style={styles.transactionAmount}>${transaction.amount.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Action Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ Action Tips</Text>
          <View style={styles.card}>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Continue your current spending habits</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Set up automatic savings transfers</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>Review your progress weekly</Text>
            </View>
          </View>
        </View>

        {/* Feedback */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Was this insight helpful?</Text>
          <View style={styles.feedbackRow}>
            <TouchableOpacity
              style={[
                styles.feedbackButton,
                feedback === 'helpful' && styles.feedbackButtonActive
              ]}
              onPress={() => setFeedback('helpful')}
            >
              <Text style={styles.feedbackIcon}>👍</Text>
              <Text style={styles.feedbackText}>Helpful</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.feedbackButton,
                feedback === 'not-helpful' && styles.feedbackButtonActive
              ]}
              onPress={() => setFeedback('not-helpful')}
            >
              <Text style={styles.feedbackIcon}>👎</Text>
              <Text style={styles.feedbackText}>Not Helpful</Text>
            </TouchableOpacity>
          </View>
          {feedback && (
            <View style={styles.feedbackConfirmation}>
              <Text style={styles.feedbackConfirmationText}>
                ✅ Thank you for your feedback!
              </Text>
            </View>
          )}
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
  placeholder: {
    width: 40,
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
    color: '#1f2937',
    marginBottom: 12,
  },
  mainCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  mainIcon: {
    fontSize: 48,
  },
  mainContent: {
    flex: 1,
  },
  mainHeadline: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  mainKeyData: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  explanationText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 22,
  },
  chartCaption: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 12,
  },
  transactionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  transactionIcon: {
    fontSize: 24,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionMerchant: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  transactionDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  tipItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  tipBullet: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  feedbackRow: {
    flexDirection: 'row',
    gap: 12,
  },
  feedbackButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  feedbackButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  feedbackIcon: {
    fontSize: 24,
  },
  feedbackText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  feedbackConfirmation: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#dcfce7',
    borderRadius: 12,
    alignItems: 'center',
  },
  feedbackConfirmationText: {
    fontSize: 13,
    color: '#047857',
    fontWeight: '600',
  },
});
