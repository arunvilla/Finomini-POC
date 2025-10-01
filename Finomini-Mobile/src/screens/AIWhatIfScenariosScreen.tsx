import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';

interface AIWhatIfScenariosScreenProps {
  onBack?: () => void;
}

export default function AIWhatIfScenariosScreen({ onBack }: AIWhatIfScenariosScreenProps) {
  const [incomeChange, setIncomeChange] = useState('0');
  const [expenseReduction, setExpenseReduction] = useState('0');
  const [savingsIncrease, setSavingsIncrease] = useState('0');

  const currentMetrics = {
    monthlyIncome: 5000,
    monthlyExpenses: 3800,
    monthlySavings: 1200,
    netWorth: 45000,
  };

  const calculateScenario = () => {
    const incomeChangeAmount = parseFloat(incomeChange) || 0;
    const expenseReductionAmount = parseFloat(expenseReduction) || 0;
    const savingsIncreaseAmount = parseFloat(savingsIncrease) || 0;

    const newIncome = currentMetrics.monthlyIncome + incomeChangeAmount;
    const newExpenses = currentMetrics.monthlyExpenses - expenseReductionAmount;
    const newSavings = currentMetrics.monthlySavings + savingsIncreaseAmount + incomeChangeAmount - expenseReductionAmount;
    const projectedNetWorth = currentMetrics.netWorth + (newSavings * 12);

    return { newIncome, newExpenses, newSavings, projectedNetWorth };
  };

  const scenario = calculateScenario();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>What-If Scenarios</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.introCard}>
          <Text style={styles.introIcon}>🔮</Text>
          <Text style={styles.introTitle}>Explore Financial Scenarios</Text>
          <Text style={styles.introText}>
            Adjust the variables below to see how changes would impact your financial situation
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Situation</Text>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Monthly Income</Text>
            <Text style={styles.metricValue}>${currentMetrics.monthlyIncome.toLocaleString()}</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Monthly Expenses</Text>
            <Text style={styles.metricValue}>${currentMetrics.monthlyExpenses.toLocaleString()}</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Monthly Savings</Text>
            <Text style={styles.metricValue}>${currentMetrics.monthlySavings.toLocaleString()}</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Net Worth</Text>
            <Text style={styles.metricValue}>${currentMetrics.netWorth.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Adjust Variables</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Income Change</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputPrefix}>$</Text>
              <TextInput
                style={styles.input}
                value={incomeChange}
                onChangeText={setIncomeChange}
                keyboardType="numeric"
                placeholder="0"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Expense Reduction</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputPrefix}>$</Text>
              <TextInput
                style={styles.input}
                value={expenseReduction}
                onChangeText={setExpenseReduction}
                keyboardType="numeric"
                placeholder="0"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Savings Increase</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputPrefix}>$</Text>
              <TextInput
                style={styles.input}
                value={savingsIncrease}
                onChangeText={setSavingsIncrease}
                keyboardType="numeric"
                placeholder="0"
              />
            </View>
          </View>
        </View>

        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Projected Results</Text>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>New Monthly Income</Text>
            <Text style={[styles.resultValue, { color: '#10b981' }]}>
              ${scenario.newIncome.toLocaleString()}
            </Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>New Monthly Expenses</Text>
            <Text style={[styles.resultValue, { color: '#ef4444' }]}>
              ${scenario.newExpenses.toLocaleString()}
            </Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>New Monthly Savings</Text>
            <Text style={[styles.resultValue, { color: '#2563eb' }]}>
              ${scenario.newSavings.toLocaleString()}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.resultRow}>
            <Text style={styles.resultLabelHighlight}>Projected Net Worth (1 Year)</Text>
            <Text style={styles.resultValueHighlight}>
              ${scenario.projectedNetWorth.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.insightCard}>
          <Text style={styles.insightIcon}>💡</Text>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>AI Insight</Text>
            <Text style={styles.insightText}>
              {scenario.newSavings > currentMetrics.monthlySavings
                ? `Great! This scenario increases your monthly savings by $${(scenario.newSavings - currentMetrics.monthlySavings).toFixed(0)}. You'll reach your goals faster.`
                : 'Consider adjusting your variables to increase your savings rate for better financial health.'}
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
  introCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  introIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  introText: {
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
    marginBottom: 12,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  metricLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputPrefix: {
    fontSize: 16,
    color: '#6b7280',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: '#111827',
  },
  resultCard: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 12,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  resultLabel: {
    fontSize: 14,
    color: '#3b82f6',
  },
  resultValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  resultLabelHighlight: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e40af',
  },
  resultValueHighlight: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e40af',
  },
  divider: {
    height: 1,
    backgroundColor: '#bfdbfe',
    marginVertical: 12,
  },
  insightCard: {
    flexDirection: 'row',
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  insightIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#166534',
    marginBottom: 4,
  },
  insightText: {
    fontSize: 14,
    color: '#15803d',
    lineHeight: 20,
  },
});
