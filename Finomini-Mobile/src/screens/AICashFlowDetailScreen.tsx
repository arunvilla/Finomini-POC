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

interface AICashFlowDetailScreenProps {
  onBack?: () => void;
  alert?: any;
}

export default function AICashFlowDetailScreen({ onBack, alert }: AICashFlowDetailScreenProps) {
  const alertData = alert || {
    type: 'warning',
    icon: '⚠️',
    title: 'Low Balance Alert',
    message: 'Your checking account will drop below $500 in 3 days',
    date: 'Today',
    severity: 'high',
  };

  const timeline = [
    { date: 'Today', event: 'Current Balance', amount: 1245.50, balance: 1245.50 },
    { date: 'Tomorrow', event: 'Gym Membership', amount: -45.00, balance: 1200.50 },
    { date: 'In 2 days', event: 'Rent Payment', amount: -1500.00, balance: -299.50 },
    { date: 'In 3 days', event: 'Paycheck', amount: 2500.00, balance: 2200.50 },
  ];

  const recommendations = [
    '💰 Transfer $500 from savings to checking before rent is due',
    '📅 Consider negotiating your rent due date to align with paycheck',
    '💳 Use credit card for upcoming purchases to preserve cash',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alert Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={[
          styles.alertCard,
          alertData.severity === 'high' && { backgroundColor: '#fee2e2' },
          alertData.severity === 'medium' && { backgroundColor: '#fef3c7' },
          alertData.severity === 'low' && { backgroundColor: '#d1fae5' },
        ]}>
          <Text style={styles.alertIcon}>{alertData.icon}</Text>
          <Text style={styles.alertTitle}>{alertData.title}</Text>
          <Text style={styles.alertMessage}>{alertData.message}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cash Flow Timeline</Text>
          {timeline.map((item, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={[
                  styles.timelineDot,
                  { backgroundColor: item.balance < 0 ? '#ef4444' : '#10b981' }
                ]} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineDate}>{item.date}</Text>
                  <Text style={styles.timelineEvent}>{item.event}</Text>
                </View>
              </View>
              <View style={styles.timelineRight}>
                <Text style={[
                  styles.timelineAmount,
                  { color: item.amount >= 0 ? '#10b981' : '#ef4444' }
                ]}>
                  {item.amount >= 0 ? '+' : ''}${Math.abs(item.amount).toFixed(2)}
                </Text>
                <Text style={[
                  styles.timelineBalance,
                  { color: item.balance < 0 ? '#ef4444' : '#6b7280' }
                ]}>
                  Balance: ${item.balance.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🤖 AI Recommendations</Text>
          {recommendations.map((rec, index) => (
            <View key={index} style={styles.recItem}>
              <Text style={styles.recText}>{rec}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Take Action</Text>
        </TouchableOpacity>
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
  alertCard: {
    margin: 16,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  alertIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  alertMessage: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timelineLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    marginRight: 12,
  },
  timelineContent: {
    flex: 1,
  },
  timelineDate: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 2,
  },
  timelineEvent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  timelineRight: {
    alignItems: 'flex-end',
  },
  timelineAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  timelineBalance: {
    fontSize: 12,
  },
  recItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  recText: {
    fontSize: 14,
    color: '#111827',
    lineHeight: 20,
  },
  actionButton: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
