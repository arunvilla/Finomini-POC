import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';

interface AISubscriptionOptimizerScreenProps {
  onBack?: () => void;
}

export default function AISubscriptionOptimizerScreen({ onBack }: AISubscriptionOptimizerScreenProps) {
  const subscriptions = [
    {
      id: '1',
      name: 'Netflix',
      category: 'Entertainment',
      amount: 15.99,
      frequency: 'Monthly',
      lastCharged: '2025-09-25',
      nextCharge: '2025-10-25',
      status: 'active',
      usage: 'high',
      icon: '🎬',
    },
    {
      id: '2',
      name: 'Spotify Premium',
      category: 'Entertainment',
      amount: 10.99,
      frequency: 'Monthly',
      lastCharged: '2025-09-20',
      nextCharge: '2025-10-20',
      status: 'active',
      usage: 'high',
      icon: '🎵',
    },
    {
      id: '3',
      name: 'Adobe Creative Cloud',
      category: 'Software',
      amount: 52.99,
      frequency: 'Monthly',
      lastCharged: '2025-09-15',
      nextCharge: '2025-10-15',
      status: 'active',
      usage: 'low',
      icon: '🎨',
    },
    {
      id: '4',
      name: 'Gym Membership',
      category: 'Health',
      amount: 45.00,
      frequency: 'Monthly',
      lastCharged: '2025-09-01',
      nextCharge: '2025-10-01',
      status: 'active',
      usage: 'low',
      icon: '💪',
    },
  ];

  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);
  const totalYearly = totalMonthly * 12;
  const lowUsageCount = subscriptions.filter(s => s.usage === 'low').length;

  const handleCancelSuggestion = (subName: string) => {
    Alert.alert(
      'Cancel Subscription',
      `Consider canceling ${subName} to save money`,
      [
        { text: 'Keep', style: 'cancel' },
        { text: 'Review', onPress: () => {} },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscriptions</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>${totalMonthly.toFixed(2)}</Text>
              <Text style={styles.summaryLabel}>Monthly</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>${totalYearly.toFixed(0)}</Text>
              <Text style={styles.summaryLabel}>Yearly</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: '#ef4444' }]}>{lowUsageCount}</Text>
              <Text style={styles.summaryLabel}>Low Usage</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Subscriptions</Text>
          {subscriptions.map((sub) => (
            <View key={sub.id} style={styles.subCard}>
              <View style={styles.subHeader}>
                <View style={styles.subLeft}>
                  <View style={styles.subIcon}>
                    <Text style={styles.subEmoji}>{sub.icon}</Text>
                  </View>
                  <View>
                    <Text style={styles.subName}>{sub.name}</Text>
                    <Text style={styles.subCategory}>{sub.category}</Text>
                  </View>
                </View>
                <View style={styles.subRight}>
                  <Text style={styles.subAmount}>${sub.amount.toFixed(2)}</Text>
                  <Text style={styles.subFrequency}>{sub.frequency}</Text>
                </View>
              </View>

              <View style={styles.subDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Next Charge</Text>
                  <Text style={styles.detailValue}>{sub.nextCharge}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Usage</Text>
                  <View style={[
                    styles.usageBadge,
                    { backgroundColor: sub.usage === 'high' ? '#d1fae5' : '#fef3c7' }
                  ]}>
                    <Text style={[
                      styles.usageText,
                      { color: sub.usage === 'high' ? '#10b981' : '#f59e0b' }
                    ]}>
                      {sub.usage === 'high' ? 'High' : 'Low'}
                    </Text>
                  </View>
                </View>
              </View>

              {sub.usage === 'low' && (
                <View style={styles.suggestionBox}>
                  <Text style={styles.suggestionIcon}>💡</Text>
                  <Text style={styles.suggestionText}>
                    Low usage detected. Consider canceling to save ${sub.amount.toFixed(2)}/month
                  </Text>
                  <TouchableOpacity
                    style={styles.suggestionButton}
                    onPress={() => handleCancelSuggestion(sub.name)}
                  >
                    <Text style={styles.suggestionButtonText}>Review</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.savingsCard}>
          <Text style={styles.savingsIcon}>💰</Text>
          <View style={styles.savingsContent}>
            <Text style={styles.savingsTitle}>Potential Savings</Text>
            <Text style={styles.savingsText}>
              By canceling {lowUsageCount} low-usage subscription{lowUsageCount !== 1 ? 's' : ''}, 
              you could save ${subscriptions.filter(s => s.usage === 'low').reduce((sum, s) => sum + s.amount, 0).toFixed(2)}/month 
              (${(subscriptions.filter(s => s.usage === 'low').reduce((sum, s) => sum + s.amount, 0) * 12).toFixed(0)}/year)
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
  summaryCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6b7280',
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
  subCard: {
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
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  subLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  subIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  subEmoji: {
    fontSize: 24,
  },
  subName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  subCategory: {
    fontSize: 13,
    color: '#6b7280',
  },
  subRight: {
    alignItems: 'flex-end',
  },
  subAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  subFrequency: {
    fontSize: 12,
    color: '#6b7280',
  },
  subDetails: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  usageBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  usageText: {
    fontSize: 12,
    fontWeight: '600',
  },
  suggestionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
  },
  suggestionIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  suggestionText: {
    flex: 1,
    fontSize: 13,
    color: '#b45309',
    lineHeight: 18,
  },
  suggestionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ffffff',
    borderRadius: 6,
  },
  suggestionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f59e0b',
  },
  savingsCard: {
    flexDirection: 'row',
    margin: 16,
    padding: 16,
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  savingsIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  savingsContent: {
    flex: 1,
  },
  savingsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#166534',
    marginBottom: 4,
  },
  savingsText: {
    fontSize: 14,
    color: '#15803d',
    lineHeight: 20,
  },
});
