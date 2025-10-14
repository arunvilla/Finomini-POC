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

interface AICashFlowOptimizerScreenProps {
  onBack?: () => void;
}

export default function AICashFlowOptimizerScreen({ onBack }: AICashFlowOptimizerScreenProps) {
  const cashFlowData = {
    monthlyIncome: 5000,
    fixedExpenses: 2800,
    variableExpenses: 1000,
    discretionary: 800,
    savings: 400,
  };

  const optimizations = [
    {
      id: '1',
      title: 'Move Due Dates',
      description: 'Align bill due dates with income schedule',
      impact: '+$150/month buffer',
      priority: 'high',
      icon: '📅',
    },
    {
      id: '2',
      title: 'Automate Savings',
      description: 'Set up automatic transfers on payday',
      impact: '+$200/month saved',
      priority: 'high',
      icon: '💰',
    },
    {
      id: '3',
      title: 'Reduce Subscriptions',
      description: 'Cancel unused streaming services',
      impact: '+$45/month',
      priority: 'medium',
      icon: '✂️',
    },
    {
      id: '4',
      title: 'Refinance Loans',
      description: 'Lower interest rates available',
      impact: '+$85/month',
      priority: 'medium',
      icon: '📊',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cash Flow Optimizer</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.heroIcon}>💡</Text>
          <Text style={styles.heroTitle}>Optimize Your Cash Flow</Text>
          <Text style={styles.heroText}>
            AI-powered recommendations to improve your monthly cash management
          </Text>
        </View>

        <View style={styles.currentCard}>
          <Text style={styles.cardTitle}>Current Cash Flow</Text>
          <View style={styles.flowRow}>
            <Text style={styles.flowLabel}>Monthly Income</Text>
            <Text style={[styles.flowValue, { color: '#10b981' }]}>
              +${cashFlowData.monthlyIncome}
            </Text>
          </View>
          <View style={styles.flowRow}>
            <Text style={styles.flowLabel}>Fixed Expenses</Text>
            <Text style={[styles.flowValue, { color: '#ef4444' }]}>
              -${cashFlowData.fixedExpenses}
            </Text>
          </View>
          <View style={styles.flowRow}>
            <Text style={styles.flowLabel}>Variable Expenses</Text>
            <Text style={[styles.flowValue, { color: '#ef4444' }]}>
              -${cashFlowData.variableExpenses}
            </Text>
          </View>
          <View style={styles.flowRow}>
            <Text style={styles.flowLabel}>Discretionary</Text>
            <Text style={[styles.flowValue, { color: '#ef4444' }]}>
              -${cashFlowData.discretionary}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.flowRow}>
            <Text style={styles.flowLabelBold}>Net Cash Flow</Text>
            <Text style={[styles.flowValueBold, { color: '#10b981' }]}>
              +${cashFlowData.savings}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Optimization Opportunities</Text>
          {optimizations.map((opt) => (
            <TouchableOpacity key={opt.id} style={styles.optCard}>
              <View style={styles.optLeft}>
                <View style={styles.optIcon}>
                  <Text style={styles.optEmoji}>{opt.icon}</Text>
                </View>
                <View style={styles.optContent}>
                  <Text style={styles.optTitle}>{opt.title}</Text>
                  <Text style={styles.optDescription}>{opt.description}</Text>
                  <Text style={styles.optImpact}>{opt.impact}</Text>
                </View>
              </View>
              <View style={[
                styles.priorityBadge,
                { backgroundColor: opt.priority === 'high' ? '#fef3c7' : '#eff6ff' }
              ]}>
                <Text style={[
                  styles.priorityText,
                  { color: opt.priority === 'high' ? '#f59e0b' : '#3b82f6' }
                ]}>
                  {opt.priority === 'high' ? 'High' : 'Medium'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.projectionCard}>
          <Text style={styles.projectionTitle}>Projected Impact</Text>
          <Text style={styles.projectionSubtitle}>If you implement all recommendations:</Text>
          <View style={styles.projectionRow}>
            <Text style={styles.projectionLabel}>New Net Cash Flow</Text>
            <Text style={[styles.projectionValue, { color: '#10b981' }]}>
              +${cashFlowData.savings + 480}/month
            </Text>
          </View>
          <View style={styles.projectionRow}>
            <Text style={styles.projectionLabel}>Annual Increase</Text>
            <Text style={[styles.projectionValue, { color: '#10b981' }]}>
              +${(480 * 12).toLocaleString()}
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
  heroIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  heroText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  currentCard: {
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
  flowRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  flowLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  flowValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  flowLabelBold: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  flowValueBold: {
    fontSize: 18,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
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
  optCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  optLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  optIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optEmoji: {
    fontSize: 20,
  },
  optContent: {
    flex: 1,
  },
  optTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  optDescription: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
  },
  optImpact: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  projectionCard: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  projectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#166534',
    marginBottom: 4,
  },
  projectionSubtitle: {
    fontSize: 13,
    color: '#15803d',
    marginBottom: 12,
  },
  projectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  projectionLabel: {
    fontSize: 14,
    color: '#15803d',
  },
  projectionValue: {
    fontSize: 16,
    fontWeight: '700',
  },
});
