import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

interface AIBillAnalysisScreenProps {
  onBack?: () => void;
}

export default function AIBillAnalysisScreen({ onBack }: AIBillAnalysisScreenProps) {
  const bills = [
    {
      id: '1',
      name: 'Electricity',
      provider: 'PG&E',
      currentMonth: 124.30,
      lastMonth: 118.50,
      average: 115.20,
      trend: 'up',
      insight: 'Higher than usual - check AC usage',
    },
    {
      id: '2',
      name: 'Internet',
      provider: 'Comcast',
      currentMonth: 79.99,
      lastMonth: 79.99,
      average: 79.99,
      trend: 'stable',
      insight: 'Consistent billing',
    },
    {
      id: '3',
      name: 'Phone',
      provider: 'Verizon',
      currentMonth: 95.00,
      lastMonth: 105.00,
      average: 100.00,
      trend: 'down',
      insight: 'Good! Lower than last month',
    },
  ];

  const totalCurrent = bills.reduce((sum, bill) => sum + bill.currentMonth, 0);
  const totalAverage = bills.reduce((sum, bill) => sum + bill.average, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bill Analysis</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Monthly Bills</Text>
          <Text style={styles.summaryAmount}>${totalCurrent.toFixed(2)}</Text>
          <View style={styles.comparisonRow}>
            <Text style={styles.comparisonLabel}>vs Average</Text>
            <Text style={[
              styles.comparisonValue,
              { color: totalCurrent > totalAverage ? '#ef4444' : '#10b981' }
            ]}>
              {totalCurrent > totalAverage ? '+' : ''}
              ${Math.abs(totalCurrent - totalAverage).toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bill Breakdown</Text>
          {bills.map((bill) => (
            <View key={bill.id} style={styles.billCard}>
              <View style={styles.billHeader}>
                <View>
                  <Text style={styles.billName}>{bill.name}</Text>
                  <Text style={styles.billProvider}>{bill.provider}</Text>
                </View>
                <View style={styles.trendBadge}>
                  <Text style={styles.trendIcon}>
                    {bill.trend === 'up' ? '📈' : bill.trend === 'down' ? '📉' : '➖'}
                  </Text>
                </View>
              </View>

              <View style={styles.billAmounts}>
                <View style={styles.amountBox}>
                  <Text style={styles.amountLabel}>This Month</Text>
                  <Text style={styles.amountValue}>${bill.currentMonth.toFixed(2)}</Text>
                </View>
                <View style={styles.amountBox}>
                  <Text style={styles.amountLabel}>Last Month</Text>
                  <Text style={styles.amountValue}>${bill.lastMonth.toFixed(2)}</Text>
                </View>
                <View style={styles.amountBox}>
                  <Text style={styles.amountLabel}>Average</Text>
                  <Text style={styles.amountValue}>${bill.average.toFixed(2)}</Text>
                </View>
              </View>

              <View style={[
                styles.insightBox,
                { backgroundColor: bill.trend === 'up' ? '#fef3c7' : bill.trend === 'down' ? '#d1fae5' : '#f3f4f6' }
              ]}>
                <Text style={styles.insightIcon}>💡</Text>
                <Text style={[
                  styles.insightText,
                  { color: bill.trend === 'up' ? '#b45309' : bill.trend === 'down' ? '#166534' : '#6b7280' }
                ]}>
                  {bill.insight}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.recommendationCard}>
          <Text style={styles.recIcon}>🤖</Text>
          <View style={styles.recContent}>
            <Text style={styles.recTitle}>AI Recommendations</Text>
            <View style={styles.recItem}>
              <Text style={styles.recBullet}>•</Text>
              <Text style={styles.recText}>
                Your electricity bill is 8% higher than average. Consider adjusting thermostat settings.
              </Text>
            </View>
            <View style={styles.recItem}>
              <Text style={styles.recBullet}>•</Text>
              <Text style={styles.recText}>
                All bills are on track with your budget. No action needed.
              </Text>
            </View>
          </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  summaryCard: {
    margin: 16,
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  comparisonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  comparisonLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  comparisonValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  billCard: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  billHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  billName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  billProvider: {
    fontSize: 14,
    color: '#6b7280',
  },
  trendBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendIcon: {
    fontSize: 20,
  },
  billAmounts: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  amountBox: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  insightBox: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  insightIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  insightText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
  },
  recommendationCard: {
    flexDirection: 'row',
    margin: 16,
    padding: 16,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  recIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  recContent: {
    flex: 1,
  },
  recTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 12,
  },
  recItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  recBullet: {
    fontSize: 16,
    color: '#3b82f6',
    marginRight: 8,
  },
  recText: {
    flex: 1,
    fontSize: 14,
    color: '#3b82f6',
    lineHeight: 20,
  },
});
