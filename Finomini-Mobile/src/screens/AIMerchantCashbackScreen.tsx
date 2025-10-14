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

interface AIMerchantCashbackScreenProps {
  onBack?: () => void;
}

export default function AIMerchantCashbackScreen({ onBack }: AIMerchantCashbackScreenProps) {
  const totalCashback = 284.50;
  const thisMonth = 42.30;

  const merchants = [
    {
      id: '1',
      name: 'Amazon',
      category: 'Shopping',
      cashbackRate: 5.0,
      earned: 89.45,
      transactions: 12,
      icon: '📦',
    },
    {
      id: '2',
      name: 'Whole Foods',
      category: 'Groceries',
      cashbackRate: 3.0,
      earned: 67.20,
      transactions: 8,
      icon: '🛒',
    },
    {
      id: '3',
      name: 'Shell',
      category: 'Gas',
      cashbackRate: 2.0,
      earned: 45.20,
      transactions: 6,
      icon: '⛽',
    },
    {
      id: '4',
      name: 'Starbucks',
      category: 'Dining',
      cashbackRate: 1.5,
      earned: 24.50,
      transactions: 15,
      icon: '☕',
    },
  ];

  const recommendations = [
    {
      id: '1',
      merchant: 'Target',
      cashbackRate: 5.0,
      reason: 'Higher cashback than your current shopping stores',
      potentialSavings: '$45/month',
      icon: '🎯',
    },
    {
      id: '2',
      merchant: 'Costco Gas',
      cashbackRate: 4.0,
      reason: 'Better gas rewards than Shell',
      potentialSavings: '$15/month',
      icon: '⛽',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cashback Tracker</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.heroIcon}>💰</Text>
          <Text style={styles.heroLabel}>Total Cashback Earned</Text>
          <Text style={styles.heroAmount}>${totalCashback.toFixed(2)}</Text>
          <View style={styles.monthBadge}>
            <Text style={styles.monthText}>+${thisMonth.toFixed(2)} this month</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Cashback Merchants</Text>
          {merchants.map((merchant) => (
            <View key={merchant.id} style={styles.merchantCard}>
              <View style={styles.merchantHeader}>
                <View style={styles.merchantLeft}>
                  <View style={styles.merchantIcon}>
                    <Text style={styles.merchantEmoji}>{merchant.icon}</Text>
                  </View>
                  <View>
                    <Text style={styles.merchantName}>{merchant.name}</Text>
                    <Text style={styles.merchantCategory}>{merchant.category}</Text>
                  </View>
                </View>
                <View style={styles.merchantRight}>
                  <Text style={styles.cashbackRate}>{merchant.cashbackRate}%</Text>
                  <Text style={styles.cashbackLabel}>cashback</Text>
                </View>
              </View>

              <View style={styles.merchantStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>${merchant.earned.toFixed(2)}</Text>
                  <Text style={styles.statLabel}>Earned</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{merchant.transactions}</Text>
                  <Text style={styles.statLabel}>Transactions</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Better Rewards Available</Text>
          {recommendations.map((rec) => (
            <View key={rec.id} style={styles.recCard}>
              <View style={styles.recHeader}>
                <View style={styles.recIcon}>
                  <Text style={styles.recEmoji}>{rec.icon}</Text>
                </View>
                <View style={styles.recContent}>
                  <Text style={styles.recMerchant}>{rec.merchant}</Text>
                  <Text style={styles.recReason}>{rec.reason}</Text>
                  <View style={styles.recFooter}>
                    <Text style={styles.recRate}>{rec.cashbackRate}% cashback</Text>
                    <Text style={styles.recSavings}>Save {rec.potentialSavings}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>🤖</Text>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>AI Tip</Text>
            <Text style={styles.tipText}>
              We track your spending patterns and recommend merchants with better cashback rates. 
              Switch to suggested merchants to maximize your rewards.
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
  heroCard: {
    margin: 16,
    padding: 32,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  heroIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  heroLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  heroAmount: {
    fontSize: 42,
    fontWeight: '700',
    color: '#10b981',
    marginBottom: 12,
  },
  monthBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#d1fae5',
    borderRadius: 16,
  },
  monthText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10b981',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  merchantCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  merchantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  merchantLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  merchantIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  merchantEmoji: {
    fontSize: 24,
  },
  merchantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  merchantCategory: {
    fontSize: 13,
    color: '#6b7280',
  },
  merchantRight: {
    alignItems: 'flex-end',
  },
  cashbackRate: {
    fontSize: 24,
    fontWeight: '700',
    color: '#10b981',
  },
  cashbackLabel: {
    fontSize: 11,
    color: '#6b7280',
  },
  merchantStats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  recCard: {
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  recHeader: {
    flexDirection: 'row',
  },
  recIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recEmoji: {
    fontSize: 24,
  },
  recContent: {
    flex: 1,
  },
  recMerchant: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400e',
    marginBottom: 4,
  },
  recReason: {
    fontSize: 13,
    color: '#b45309',
    marginBottom: 8,
    lineHeight: 18,
  },
  recFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recRate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f59e0b',
  },
  recSavings: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
  },
  tipCard: {
    flexDirection: 'row',
    margin: 16,
    padding: 16,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: '#3b82f6',
    lineHeight: 20,
  },
});
