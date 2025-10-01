import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { colors } from '../theme/colors';

interface UpcomingPaymentsScreenProps {
  onBack: () => void;
}

interface Payment {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
  recurring: boolean;
  frequency?: string;
  isPaid: boolean;
  status: 'upcoming' | 'due' | 'overdue';
}

export default function UpcomingPaymentsScreen({ onBack }: UpcomingPaymentsScreenProps) {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      name: 'Rent',
      amount: 1850,
      dueDate: '2024-10-05',
      category: 'Housing',
      recurring: true,
      frequency: 'Monthly',
      isPaid: false,
      status: 'upcoming',
    },
    {
      id: '2',
      name: 'Electric Bill',
      amount: 125.50,
      dueDate: '2024-10-01',
      category: 'Utilities',
      recurring: true,
      frequency: 'Monthly',
      isPaid: false,
      status: 'due',
    },
    {
      id: '3',
      name: 'Netflix',
      amount: 15.99,
      dueDate: '2024-10-08',
      category: 'Entertainment',
      recurring: true,
      frequency: 'Monthly',
      isPaid: false,
      status: 'upcoming',
    },
    {
      id: '4',
      name: 'Car Insurance',
      amount: 245.00,
      dueDate: '2024-10-15',
      category: 'Insurance',
      recurring: true,
      frequency: 'Monthly',
      isPaid: false,
      status: 'upcoming',
    },
    {
      id: '5',
      name: 'Internet',
      amount: 79.99,
      dueDate: '2024-09-30',
      category: 'Utilities',
      recurring: true,
      frequency: 'Monthly',
      isPaid: false,
      status: 'overdue',
    },
  ]);

  const handleMarkPaid = (paymentId: string) => {
    Alert.alert(
      'Mark as Paid',
      'Confirm this payment has been made?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            setPayments(prev =>
              prev.map(p => p.id === paymentId ? { ...p, isPaid: true } : p)
            );
            Alert.alert('Success', 'Payment marked as paid');
          }
        }
      ]
    );
  };

  const unpaidPayments = payments.filter(p => !p.isPaid);
  const totalDue = unpaidPayments.reduce((sum, p) => sum + p.amount, 0);
  const overduePayments = unpaidPayments.filter(p => p.status === 'overdue');
  const duePayments = unpaidPayments.filter(p => p.status === 'due');
  const upcomingPayments = unpaidPayments.filter(p => p.status === 'upcoming');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return '#dc2626';
      case 'due': return '#ea580c';
      default: return colors.primary;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'overdue': return 'OVERDUE';
      case 'due': return 'DUE TODAY';
      default: return 'UPCOMING';
    }
  };

  const getDaysUntil = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    return `in ${diffDays} days`;
  };

  const renderPaymentCard = (payment: Payment) => (
    <View key={payment.id} style={styles.paymentCard}>
      <View style={styles.paymentMain}>
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentName}>{payment.name}</Text>
          <View style={styles.paymentMeta}>
            {payment.recurring && (
              <View style={styles.recurringBadge}>
                <Text style={styles.recurringText}>🔄 {payment.frequency}</Text>
              </View>
            )}
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{payment.category}</Text>
            </View>
          </View>
          <Text style={styles.dueText}>
            Due {getDaysUntil(payment.dueDate)}
          </Text>
        </View>

        <View style={styles.paymentRight}>
          <Text style={styles.paymentAmount}>${payment.amount.toFixed(2)}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(payment.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(payment.status) }]}>
              {getStatusLabel(payment.status)}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.markPaidButton}
        onPress={() => handleMarkPaid(payment.id)}
      >
        <Text style={styles.markPaidText}>Mark as Paid</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upcoming Payments</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Due</Text>
          <Text style={styles.summaryAmount}>${totalDue.toFixed(2)}</Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryStatItem}>
              <Text style={styles.summaryStatValue}>{unpaidPayments.length}</Text>
              <Text style={styles.summaryStatLabel}>Payments</Text>
            </View>
            {overduePayments.length > 0 && (
              <>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryStatItem}>
                  <Text style={[styles.summaryStatValue, styles.overdueValue]}>
                    {overduePayments.length}
                  </Text>
                  <Text style={styles.summaryStatLabel}>Overdue</Text>
                </View>
              </>
            )}
          </View>
        </View>

        {overduePayments.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, styles.overdueTitle]}>
                ⚠️ Overdue
              </Text>
            </View>
            {overduePayments.map(renderPaymentCard)}
          </View>
        )}

        {duePayments.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Due Today</Text>
            </View>
            {duePayments.map(renderPaymentCard)}
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming</Text>
            <Text style={styles.sectionCount}>{upcomingPayments.length}</Text>
          </View>
          {upcomingPayments.map(renderPaymentCard)}
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipText}>
            Set up automatic payments to never miss a due date!
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
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
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryStatItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  summaryStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  overdueValue: {
    color: '#fee2e2',
  },
  summaryStatLabel: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  overdueTitle: {
    color: '#dc2626',
  },
  sectionCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  paymentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  paymentMain: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 6,
  },
  paymentMeta: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 6,
  },
  recurringBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  recurringText: {
    fontSize: 11,
    color: '#1e40af',
    fontWeight: '500',
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
  dueText: {
    fontSize: 13,
    color: '#6b7280',
  },
  paymentRight: {
    alignItems: 'flex-end',
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  markPaidButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  markPaidText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#eff6ff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    gap: 12,
  },
  tipIcon: {
    fontSize: 20,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#1e40af',
    lineHeight: 18,
  },
});
