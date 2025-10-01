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

interface MerchantTrendsScreenProps {
  onBack: () => void;
}

interface MerchantData {
  id: string;
  name: string;
  totalSpent: number;
  transactionCount: number;
  avgTransaction: number;
  category: string;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
}

export default function MerchantTrendsScreen({ onBack }: MerchantTrendsScreenProps) {
  const [timeFrame, setTimeFrame] = useState<'month' | 'quarter' | 'year'>('month');
  
  const merchants: MerchantData[] = [
    {
      id: '1',
      name: 'Amazon',
      totalSpent: 845.32,
      transactionCount: 12,
      avgTransaction: 70.44,
      category: 'Shopping',
      trend: 'up',
      trendPercent: 23,
    },
    {
      id: '2',
      name: 'Starbucks',
      totalSpent: 234.50,
      transactionCount: 42,
      avgTransaction: 5.58,
      category: 'Coffee',
      trend: 'stable',
      trendPercent: 2,
    },
    {
      id: '3',
      name: 'Whole Foods',
      totalSpent: 612.88,
      transactionCount: 8,
      avgTransaction: 76.61,
      category: 'Groceries',
      trend: 'down',
      trendPercent: 15,
    },
    {
      id: '4',
      name: 'Shell Gas',
      totalSpent: 298.00,
      transactionCount: 6,
      avgTransaction: 49.67,
      category: 'Gas',
      trend: 'up',
      trendPercent: 8,
    },
    {
      id: '5',
      name: 'Netflix',
      totalSpent: 15.99,
      transactionCount: 1,
      avgTransaction: 15.99,
      category: 'Entertainment',
      trend: 'stable',
      trendPercent: 0,
    },
  ];

  const totalSpent = merchants.reduce((sum, m) => sum + m.totalSpent, 0);
  const topMerchant = merchants[0];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#dc2626';
      case 'down': return '#16a34a';
      default: return '#6b7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Merchant Trends</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.timeFrameSelector}>
        {(['month', 'quarter', 'year'] as const).map((frame) => (
          <TouchableOpacity
            key={frame}
            style={[
              styles.timeFrameButton,
              timeFrame === frame && styles.timeFrameButtonActive
            ]}
            onPress={() => setTimeFrame(frame)}
          >
            <Text style={[
              styles.timeFrameText,
              timeFrame === frame && styles.timeFrameTextActive
            ]}>
              {frame === 'month' ? 'Month' : frame === 'quarter' ? 'Quarter' : 'Year'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Spent This {timeFrame}</Text>
          <Text style={styles.summaryAmount}>${totalSpent.toFixed(2)}</Text>
          <View style={styles.summaryMeta}>
            <Text style={styles.summaryMetaText}>
              Across {merchants.length} merchants
            </Text>
          </View>
        </View>

        <View style={styles.topMerchantCard}>
          <View style={styles.topMerchantBadge}>
            <Text style={styles.topMerchantBadgeText}>🏆 Top Merchant</Text>
          </View>
          <Text style={styles.topMerchantName}>{topMerchant.name}</Text>
          <Text style={styles.topMerchantAmount}>${topMerchant.totalSpent.toFixed(2)}</Text>
          <View style={styles.topMerchantStats}>
            <View style={styles.topMerchantStat}>
              <Text style={styles.topMerchantStatLabel}>Transactions</Text>
              <Text style={styles.topMerchantStatValue}>{topMerchant.transactionCount}</Text>
            </View>
            <View style={styles.topMerchantStat}>
              <Text style={styles.topMerchantStatLabel}>Avg Amount</Text>
              <Text style={styles.topMerchantStatValue}>${topMerchant.avgTransaction.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Merchants</Text>
          
          {merchants.map((merchant, index) => (
            <TouchableOpacity key={merchant.id} style={styles.merchantCard}>
              <View style={styles.merchantRank}>
                <Text style={styles.merchantRankText}>#{index + 1}</Text>
              </View>
              
              <View style={styles.merchantInfo}>
                <Text style={styles.merchantName}>{merchant.name}</Text>
                <View style={styles.merchantMeta}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{merchant.category}</Text>
                  </View>
                  <Text style={styles.transactionCount}>
                    {merchant.transactionCount} transactions
                  </Text>
                </View>
              </View>

              <View style={styles.merchantStats}>
                <Text style={styles.merchantAmount}>${merchant.totalSpent.toFixed(2)}</Text>
                <View style={styles.trendBadge}>
                  <Text style={styles.trendIcon}>{getTrendIcon(merchant.trend)}</Text>
                  <Text style={[styles.trendText, { color: getTrendColor(merchant.trend) }]}>
                    {merchant.trendPercent}%
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.insightsCard}>
          <Text style={styles.insightsTitle}>💡 Insights</Text>
          <View style={styles.insightItem}>
            <Text style={styles.insightText}>
              • Your spending at Amazon increased 23% compared to last month
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightText}>
              • You visit Starbucks an average of 10 times per week
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightText}>
              • Groceries spending is down 15% - great job!
            </Text>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  placeholder: {
    width: 40,
  },
  timeFrameSelector: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  timeFrameButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
  },
  timeFrameButtonActive: {
    backgroundColor: colors.primary,
  },
  timeFrameText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  timeFrameTextActive: {
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: colors.primary,
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  summaryMeta: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  summaryMetaText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  topMerchantCard: {
    backgroundColor: '#fff7ed',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fed7aa',
  },
  topMerchantBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fb923c',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  topMerchantBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  topMerchantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  topMerchantAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ea580c',
    marginBottom: 12,
  },
  topMerchantStats: {
    flexDirection: 'row',
    gap: 16,
  },
  topMerchantStat: {
    flex: 1,
  },
  topMerchantStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  topMerchantStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
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
  merchantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  merchantRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  merchantRankText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  merchantInfo: {
    flex: 1,
  },
  merchantName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  merchantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryBadge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    color: '#6b7280',
  },
  transactionCount: {
    fontSize: 11,
    color: '#9ca3af',
  },
  merchantStats: {
    alignItems: 'flex-end',
  },
  merchantAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendIcon: {
    fontSize: 12,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightsCard: {
    backgroundColor: '#eff6ff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 12,
  },
  insightItem: {
    marginBottom: 8,
  },
  insightText: {
    fontSize: 13,
    color: '#1e40af',
    lineHeight: 18,
  },
});
