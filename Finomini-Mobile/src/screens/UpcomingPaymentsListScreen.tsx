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

interface UpcomingPaymentsListScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

interface Payment {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  category: string;
}

export default function UpcomingPaymentsListScreen({ onBack, onNavigate }: UpcomingPaymentsListScreenProps) {
  const upcomingPayments: Payment[] = [
    {
      id: '1',
      name: 'Netflix',
      amount: 10.00,
      dueDate: 'Apr 20',
      icon: 'N',
      iconBg: colors.red[100],
      iconColor: colors.red[600],
      category: 'Entertainment',
    },
    {
      id: '2',
      name: 'Youtube',
      amount: 8.99,
      dueDate: 'Apr 25',
      icon: '▶',
      iconBg: colors.red[100],
      iconColor: colors.red[600],
      category: 'Entertainment',
    },
    {
      id: '3',
      name: 'AT&T',
      amount: 141.00,
      dueDate: 'Apr 25',
      icon: '≈',
      iconBg: colors.blue[100],
      iconColor: colors.blue[600],
      category: 'Utilities',
    },
    {
      id: '4',
      name: 'Spotify',
      amount: 9.99,
      dueDate: 'Apr 25',
      icon: '♪',
      iconBg: colors.green[100],
      iconColor: colors.green[600],
      category: 'Entertainment',
    },
    {
      id: '5',
      name: 'Prime',
      amount: 20.00,
      dueDate: 'May 2',
      icon: 'P',
      iconBg: colors.blue[100],
      iconColor: colors.blue[600],
      category: 'Shopping',
    },
    {
      id: '6',
      name: 'Enbridge',
      amount: 60.00,
      dueDate: 'May 5',
      icon: '⚡',
      iconBg: colors.gray[100],
      iconColor: colors.gray[600],
      category: 'Utilities',
    },
  ];

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  const handlePaymentClick = (payment: Payment) => {
    onNavigate?.('transaction-detail', {
      id: payment.id,
      name: payment.name,
      amount: payment.amount,
      icon: payment.icon,
      color: payment.iconBg,
      category: payment.category,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upcoming Payments</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {upcomingPayments.map((payment) => (
          <TouchableOpacity
            key={payment.id}
            style={styles.paymentCard}
            onPress={() => handlePaymentClick(payment)}
          >
            <View style={[styles.iconContainer, { backgroundColor: payment.iconBg }]}>
              <Text style={[styles.iconText, { color: payment.iconColor }]}>{payment.icon}</Text>
            </View>
            
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentName}>{payment.name}</Text>
              <Text style={styles.paymentCategory}>{payment.category}</Text>
            </View>
            
            <View style={styles.paymentRight}>
              <Text style={styles.paymentAmount}>{formatCurrency(payment.amount)}</Text>
              <Text style={styles.paymentDueDate}>Due {payment.dueDate}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
    padding: 16,
  },
  paymentCard: {
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 24,
    fontWeight: '600',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  paymentCategory: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  paymentRight: {
    alignItems: 'flex-end',
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 2,
  },
  paymentDueDate: {
    fontSize: 12,
    color: colors.text.secondary,
  },
});
