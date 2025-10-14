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
import { LineChart } from 'react-native-gifted-charts';
import { colors } from '../theme/colors';
import { getChartWidth } from '../utils/dimensions';
import ChartErrorBoundary from '../components/ChartErrorBoundary';

interface AICashFlowForecastScreenProps {
  onBack: () => void;
}

interface CashFlowPrediction {
  month: string;
  startingBalance: number;
  income: number;
  expenses: number;
  endingBalance: number;
  netFlow: number;
  riskLevel: 'low' | 'medium' | 'high';
  events: string[];
}

interface CashFlowAlert {
  id: string;
  type: 'warning' | 'critical' | 'opportunity';
  date: string;
  title: string;
  description: string;
  suggestedAction: string;
  impact: number;
}

export default function AICashFlowForecastScreen({ onBack }: AICashFlowForecastScreenProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');

  const cashFlowPredictions: CashFlowPrediction[] = [
    {
      month: 'Feb',
      startingBalance: 5584,
      income: 4500,
      expenses: 3890,
      endingBalance: 6194,
      netFlow: 610,
      riskLevel: 'low',
      events: ['💰 Salary deposit', '🏠 Regular expenses']
    },
    {
      month: 'Mar',
      startingBalance: 6194,
      income: 4500,
      expenses: 4120,
      endingBalance: 6574,
      netFlow: 380,
      riskLevel: 'low',
      events: ['💰 Salary deposit', '⚡ Higher utilities']
    },
    {
      month: 'Apr',
      startingBalance: 6574,
      income: 4500,
      expenses: 4890,
      endingBalance: 6184,
      netFlow: -390,
      riskLevel: 'medium',
      events: ['💰 Salary deposit', '🚗 Car insurance', '🎂 Birthday expenses']
    },
    {
      month: 'May',
      startingBalance: 6184,
      income: 4500,
      expenses: 3950,
      endingBalance: 6734,
      netFlow: 550,
      riskLevel: 'low',
      events: ['💰 Salary deposit', '📉 Lower spending']
    },
    {
      month: 'Jun',
      startingBalance: 6734,
      income: 4500,
      expenses: 5200,
      endingBalance: 6034,
      netFlow: -700,
      riskLevel: 'high',
      events: ['💰 Salary deposit', '✈️ Vacation', '📱 Subscriptions']
    },
    {
      month: 'Jul',
      startingBalance: 6034,
      income: 4500,
      expenses: 3780,
      endingBalance: 6754,
      netFlow: 720,
      riskLevel: 'low',
      events: ['💰 Salary deposit', '❄️ Lower utilities']
    }
  ];

  const cashFlowAlerts: CashFlowAlert[] = [
    {
      id: '1',
      type: 'critical',
      date: 'May 23',
      title: 'Potential Overdraft Risk',
      description: 'Multiple large expenses could cause balance to go negative',
      suggestedAction: 'Transfer $300 from emergency fund or reschedule payment',
      impact: -234
    },
    {
      id: '2',
      type: 'warning',
      date: 'May 15',
      title: 'Low Balance Alert',
      description: 'Balance will drop to $1,890 due to vacation expenses',
      suggestedAction: 'Consider moving $500 from savings or delay non-essential purchases',
      impact: -1890
    },
    {
      id: '3',
      type: 'opportunity',
      date: 'Jul 10',
      title: 'Surplus Opportunity',
      description: 'Projected $1,200 surplus - great time to boost emergency fund',
      suggestedAction: 'Transfer excess to high-yield savings or investment account',
      impact: 1200
    }
  ];

  const chartData = cashFlowPredictions.map(pred => ({
    label: pred.month,
    value: pred.endingBalance,
  }));

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'opportunity': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return '🚨';
      case 'warning': return '⚠️';
      case 'opportunity': return '💡';
      default: return 'ℹ️';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Cash Flow Forecast</Text>
          <Text style={styles.headerSubtitle}>AI-powered predictions</Text>
        </View>
        <View style={styles.aiIcon}>
          <Text style={styles.aiIconText}>🔮</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.section}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Current Balance</Text>
                <Text style={styles.summaryValue}>$5,584</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>6-Month Projection</Text>
                <Text style={[styles.summaryValue, { color: colors.success }]}>$6,754</Text>
              </View>
            </View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Net Cash Flow</Text>
                <Text style={[styles.summaryValue, { color: colors.success }]}>+$1,170</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Confidence</Text>
                <Text style={styles.summaryValue}>85%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Forecast Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Balance Forecast</Text>
          <View style={styles.chartCard}>
            <ChartErrorBoundary>
              <LineChart
                data={chartData}
                width={getChartWidth()}
                height={200}
                spacing={45}
                color={colors.primary}
                thickness={3}
                startFillColor={colors.chart.area}
                endFillColor={colors.chart.area}
                startOpacity={0.4}
                endOpacity={0.1}
                initialSpacing={10}
                noOfSections={4}
                yAxisColor="#e5e7eb"
                xAxisColor="#e5e7eb"
                yAxisTextStyle={{ color: '#6b7280', fontSize: 10 }}
                xAxisLabelTextStyle={{ color: '#6b7280', fontSize: 11 }}
                hideDataPoints={false}
                dataPointsColor={colors.primary}
                dataPointsRadius={4}
                curved
                areaChart
              />
            </ChartErrorBoundary>
          </View>
        </View>

        {/* Alerts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cash Flow Alerts</Text>
          {cashFlowAlerts.map((alert) => (
            <View key={alert.id} style={[
              styles.alertCard,
              { borderLeftColor: getAlertColor(alert.type) }
            ]}>
              <View style={styles.alertHeader}>
                <View style={styles.alertTitleRow}>
                  <Text style={styles.alertIcon}>{getAlertIcon(alert.type)}</Text>
                  <View style={styles.alertTitleContainer}>
                    <Text style={styles.alertTitle}>{alert.title}</Text>
                    <Text style={styles.alertDate}>{alert.date}</Text>
                  </View>
                </View>
                <View style={[styles.impactBadge, { 
                  backgroundColor: alert.impact < 0 ? '#fee2e2' : '#dcfce7' 
                }]}>
                  <Text style={[styles.impactText, { 
                    color: alert.impact < 0 ? '#dc2626' : '#059669' 
                  }]}>
                    {alert.impact < 0 ? '' : '+'}{alert.impact < 0 ? alert.impact : `$${alert.impact}`}
                  </Text>
                </View>
              </View>
              <Text style={styles.alertDescription}>{alert.description}</Text>
              <View style={styles.alertActionContainer}>
                <Text style={styles.alertActionLabel}>💡 Suggested Action:</Text>
                <Text style={styles.alertAction}>{alert.suggestedAction}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Monthly Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Breakdown</Text>
          {cashFlowPredictions.map((prediction, index) => (
            <View key={index} style={styles.monthCard}>
              <View style={styles.monthHeader}>
                <View>
                  <Text style={styles.monthName}>{prediction.month}</Text>
                  <View style={[styles.riskBadge, { 
                    backgroundColor: getRiskColor(prediction.riskLevel) + '20' 
                  }]}>
                    <Text style={[styles.riskText, { 
                      color: getRiskColor(prediction.riskLevel) 
                    }]}>
                      {prediction.riskLevel.toUpperCase()} RISK
                    </Text>
                  </View>
                </View>
                <View style={styles.monthBalance}>
                  <Text style={styles.balanceLabel}>Ending Balance</Text>
                  <Text style={styles.balanceValue}>${prediction.endingBalance.toLocaleString()}</Text>
                </View>
              </View>
              <View style={styles.flowRow}>
                <View style={styles.flowItem}>
                  <Text style={styles.flowLabel}>Income</Text>
                  <Text style={[styles.flowValue, { color: colors.success }]}>
                    +${prediction.income.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.flowItem}>
                  <Text style={styles.flowLabel}>Expenses</Text>
                  <Text style={[styles.flowValue, { color: colors.danger }]}>
                    -${prediction.expenses.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.flowItem}>
                  <Text style={styles.flowLabel}>Net Flow</Text>
                  <Text style={[styles.flowValue, { 
                    color: prediction.netFlow >= 0 ? colors.success : colors.danger 
                  }]}>
                    {prediction.netFlow >= 0 ? '+' : ''}${prediction.netFlow.toLocaleString()}
                  </Text>
                </View>
              </View>
              <View style={styles.eventsContainer}>
                {prediction.events.map((event, idx) => (
                  <Text key={idx} style={styles.eventText}>{event}</Text>
                ))}
              </View>
            </View>
          ))}
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
  headerContent: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  aiIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiIconText: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  chartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  alertCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderLeftWidth: 4,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  alertTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  alertIcon: {
    fontSize: 24,
  },
  alertTitleContainer: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  alertDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 12,
    fontWeight: '600',
  },
  alertDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  alertActionContainer: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 12,
  },
  alertActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 4,
  },
  alertAction: {
    fontSize: 13,
    color: '#1f2937',
    lineHeight: 18,
  },
  monthCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  monthName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 6,
  },
  riskBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  riskText: {
    fontSize: 10,
    fontWeight: '700',
  },
  monthBalance: {
    alignItems: 'flex-end',
  },
  balanceLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 2,
  },
  balanceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  flowRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 12,
  },
  flowItem: {
    flex: 1,
    alignItems: 'center',
  },
  flowLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 4,
  },
  flowValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  eventsContainer: {
    gap: 4,
  },
  eventText: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
  },
});
