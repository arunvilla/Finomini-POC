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
import { colors } from '../theme/colors';

interface Subscription {
  id: string;
  name: string;
  amount: number;
  icon: string;
  color: string;
}

interface DaySubscriptionDetailsScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string, data?: any) => void;
  selectedDate?: Date;
  subscriptions?: Subscription[];
}

export default function DaySubscriptionDetailsScreen({
  onBack,
  onNavigate,
  selectedDate = new Date(),
  subscriptions = [],
}: DaySubscriptionDetailsScreenProps) {
  const defaultSubscriptions: Subscription[] = [
    {
      id: '1',
      name: 'Netflix',
      amount: 10.00,
      icon: '🎬',
      color: colors.red[600],
    },
    {
      id: '2',
      name: 'Spotify',
      amount: 9.99,
      icon: '🎵',
      color: colors.green[500],
    },
    {
      id: '3',
      name: 'Youtube',
      amount: 8.99,
      icon: '📺',
      color: colors.red[500],
    },
  ];

  const activeSubscriptions = subscriptions.length > 0 ? subscriptions : defaultSubscriptions;

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const total = activeSubscriptions.reduce((sum, sub) => sum + sub.amount, 0);

  const handleSubscriptionClick = (subscription: Subscription) => {
    onNavigate?.('transaction-detail', {
      id: subscription.id,
      name: subscription.name,
      amount: subscription.amount,
      icon: subscription.icon,
      color: subscription.color,
      date: selectedDate,
    });
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
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>{formatCurrency(total)}</Text>
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        </View>

        <View style={styles.subscriptionsList}>
          {activeSubscriptions.map((subscription) => (
            <TouchableOpacity
              key={subscription.id}
              style={styles.subscriptionCard}
              onPress={() => handleSubscriptionClick(subscription)}
            >
              <View style={[styles.subIconContainer, { backgroundColor: subscription.color }]}>
                <Text style={styles.subIcon}>{subscription.icon}</Text>
              </View>
              
              <View style={styles.subInfo}>
                <Text style={styles.subName}>{subscription.name}</Text>
                <Text style={styles.subAmount}>{formatCurrency(subscription.amount)}</Text>
              </View>
              
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: colors.text.primary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  totalCard: {
    margin: 16,
    padding: 32,
    backgroundColor: colors.background,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  totalLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  subscriptionsList: {
    paddingHorizontal: 16,
  },
  subscriptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  subIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  subIcon: {
    fontSize: 24,
  },
  subInfo: {
    flex: 1,
  },
  subName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  subAmount: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  chevron: {
    fontSize: 20,
    color: colors.gray[400],
  },
});
