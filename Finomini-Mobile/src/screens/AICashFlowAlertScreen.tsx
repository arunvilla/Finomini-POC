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

interface AICashFlowAlertScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export default function AICashFlowAlertScreen({ onBack, onNavigate }: AICashFlowAlertScreenProps) {
  const alerts = [
    {
      id: '1',
      type: 'warning',
      icon: '⚠️',
      title: 'Low Balance Alert',
      message: 'Your checking account will drop below $500 in 3 days',
      date: 'Today',
      severity: 'high',
    },
    {
      id: '2',
      type: 'info',
      icon: '💡',
      title: 'Upcoming Large Expense',
      message: 'Rent payment of $1,500 due in 2 days',
      date: 'Yesterday',
      severity: 'medium',
    },
    {
      id: '3',
      type: 'success',
      icon: '✅',
      title: 'Positive Cash Flow',
      message: 'You\'re on track to save $400 this month',
      date: '2 days ago',
      severity: 'low',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cash Flow Alerts</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => onNavigate?.('ai-cash-flow-alert-settings')}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: '#ef4444' }]}>
                {alerts.filter(a => a.severity === 'high').length}
              </Text>
              <Text style={styles.summaryLabel}>Critical</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: '#f59e0b' }]}>
                {alerts.filter(a => a.severity === 'medium').length}
              </Text>
              <Text style={styles.summaryLabel}>Moderate</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: '#10b981' }]}>
                {alerts.filter(a => a.severity === 'low').length}
              </Text>
              <Text style={styles.summaryLabel}>Info</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Alerts</Text>
          {alerts.map((alert) => (
            <TouchableOpacity
              key={alert.id}
              style={[
                styles.alertCard,
                alert.severity === 'high' && { borderLeftColor: '#ef4444', borderLeftWidth: 4 },
                alert.severity === 'medium' && { borderLeftColor: '#f59e0b', borderLeftWidth: 4 },
                alert.severity === 'low' && { borderLeftColor: '#10b981', borderLeftWidth: 4 },
              ]}
              onPress={() => onNavigate?.('ai-cash-flow-detail', alert)}
            >
              <View style={styles.alertHeader}>
                <View style={[
                  styles.alertIcon,
                  alert.severity === 'high' && { backgroundColor: '#fee2e2' },
                  alert.severity === 'medium' && { backgroundColor: '#fef3c7' },
                  alert.severity === 'low' && { backgroundColor: '#d1fae5' },
                ]}>
                  <Text style={styles.alertEmoji}>{alert.icon}</Text>
                </View>
                <View style={styles.alertContent}>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <Text style={styles.alertMessage}>{alert.message}</Text>
                  <Text style={styles.alertDate}>{alert.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>🤖</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>AI Monitoring</Text>
            <Text style={styles.infoText}>
              We continuously monitor your cash flow and alert you to potential issues before they become problems.
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
  settingsButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 16,
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
    fontSize: 28,
    fontWeight: '700',
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
  alertCard: {
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
  alertHeader: {
    flexDirection: 'row',
  },
  alertIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  alertEmoji: {
    fontSize: 24,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  alertDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  infoCard: {
    flexDirection: 'row',
    margin: 16,
    padding: 16,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#3b82f6',
    lineHeight: 20,
  },
});
