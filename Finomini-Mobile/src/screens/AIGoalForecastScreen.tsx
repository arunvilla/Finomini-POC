import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { colors } from '../theme/colors';

interface AIGoalForecastScreenProps {
  onBack: () => void;
}

interface GoalForecast {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  originalDeadline: string;
  forecastedCompletion: string;
  confidence: number;
  status: 'ahead' | 'on_track' | 'at_risk';
  monthlyContribution: number;
  recommendedContribution: number;
  daysAhead?: number;
  daysBehind?: number;
  icon: string;
  insights: string[];
}

export default function AIGoalForecastScreen({ onBack }: AIGoalForecastScreenProps) {
  const goalForecasts: GoalForecast[] = [
    {
      id: '1',
      name: 'Dream Vacation to Japan',
      targetAmount: 5000,
      currentAmount: 2350,
      originalDeadline: 'Jun 15, 2025',
      forecastedCompletion: 'May 28, 2025',
      confidence: 94,
      status: 'ahead',
      monthlyContribution: 425,
      recommendedContribution: 385,
      daysAhead: 18,
      icon: '✈️',
      insights: [
        'Your current savings rate puts you 18 days ahead of schedule',
        'Consider reducing monthly contributions by $40 to free up cash flow',
        'Recent auto-save boosts are accelerating your progress'
      ]
    },
    {
      id: '2',
      name: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 6800,
      originalDeadline: 'Dec 31, 2025',
      forecastedCompletion: 'Oct 15, 2025',
      confidence: 87,
      status: 'ahead',
      monthlyContribution: 650,
      recommendedContribution: 650,
      daysAhead: 77,
      icon: '🛡️',
      insights: [
        'You\'re significantly ahead of pace for this goal',
        'Consider this your highest priority - emergency funds are crucial',
        'Your discipline on this goal is excellent'
      ]
    },
    {
      id: '3',
      name: 'House Down Payment',
      targetAmount: 50000,
      currentAmount: 12500,
      originalDeadline: 'Aug 1, 2026',
      forecastedCompletion: 'Sep 12, 2026',
      confidence: 78,
      status: 'at_risk',
      monthlyContribution: 1200,
      recommendedContribution: 1350,
      daysBehind: 42,
      icon: '🏠',
      insights: [
        'Current pace puts you 6 weeks behind target',
        'Consider increasing monthly contributions by $150',
        'Look for additional income sources or reduce expenses'
      ]
    },
    {
      id: '4',
      name: 'New Car Fund',
      targetAmount: 25000,
      currentAmount: 8750,
      originalDeadline: 'Sep 1, 2025',
      forecastedCompletion: 'Aug 20, 2025',
      confidence: 91,
      status: 'on_track',
      monthlyContribution: 800,
      recommendedContribution: 800,
      daysAhead: 12,
      icon: '🚗',
      insights: [
        'You\'re slightly ahead of schedule',
        'Current contribution rate is optimal',
        'Market conditions favor car purchases in late summer'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return colors.success;
      case 'on_track': return colors.primary;
      case 'at_risk': return colors.danger;
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ahead': return 'AHEAD OF SCHEDULE';
      case 'on_track': return 'ON TRACK';
      case 'at_risk': return 'AT RISK';
      default: return 'UNKNOWN';
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
          <Text style={styles.headerTitle}>Goal Forecast</Text>
          <Text style={styles.headerSubtitle}>AI-powered predictions</Text>
        </View>
        <View style={styles.aiIcon}>
          <Text style={styles.aiIconText}>🎯</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.section}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>📊 Forecast Overview</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Goals Tracked</Text>
                <Text style={styles.summaryValue}>{goalForecasts.length}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Ahead</Text>
                <Text style={[styles.summaryValue, { color: colors.success }]}>
                  {goalForecasts.filter(g => g.status === 'ahead').length}
                </Text>
              </View>
            </View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>On Track</Text>
                <Text style={[styles.summaryValue, { color: colors.primary }]}>
                  {goalForecasts.filter(g => g.status === 'on_track').length}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>At Risk</Text>
                <Text style={[styles.summaryValue, { color: colors.danger }]}>
                  {goalForecasts.filter(g => g.status === 'at_risk').length}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Goal Forecasts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Goals</Text>
          {goalForecasts.map((goal) => {
            const progressPercentage = (goal.currentAmount / goal.targetAmount) * 100;
            return (
              <View key={goal.id} style={styles.goalCard}>
                <View style={styles.goalHeader}>
                  <View style={styles.goalTitleRow}>
                    <Text style={styles.goalIcon}>{goal.icon}</Text>
                    <View style={styles.goalInfo}>
                      <Text style={styles.goalName}>{goal.name}</Text>
                      <View style={[styles.statusBadge, { 
                        backgroundColor: getStatusColor(goal.status) + '20' 
                      }]}>
                        <Text style={[styles.statusText, { 
                          color: getStatusColor(goal.status) 
                        }]}>
                          {getStatusLabel(goal.status)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.confidenceBadge}>
                    <Text style={styles.confidenceText}>{goal.confidence}%</Text>
                  </View>
                </View>

                {/* Progress */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressRow}>
                    <Text style={styles.progressLabel}>
                      ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
                    </Text>
                    <Text style={styles.progressPercentage}>
                      {progressPercentage.toFixed(0)}%
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          width: `${Math.min(progressPercentage, 100)}%`,
                          backgroundColor: getStatusColor(goal.status)
                        }
                      ]} 
                    />
                  </View>
                </View>

                {/* Timeline */}
                <View style={styles.timelineContainer}>
                  <View style={styles.timelineItem}>
                    <Text style={styles.timelineLabel}>Original Deadline</Text>
                    <Text style={styles.timelineValue}>📅 {goal.originalDeadline}</Text>
                  </View>
                  <View style={styles.timelineItem}>
                    <Text style={styles.timelineLabel}>Forecasted Completion</Text>
                    <Text style={[styles.timelineValue, { 
                      color: getStatusColor(goal.status) 
                    }]}>
                      🔮 {goal.forecastedCompletion}
                    </Text>
                  </View>
                </View>

                {/* Status Message */}
                {goal.daysAhead && (
                  <View style={[styles.statusMessage, { backgroundColor: '#dcfce7' }]}>
                    <Text style={[styles.statusMessageText, { color: '#047857' }]}>
                      ✅ You're {goal.daysAhead} days ahead of schedule!
                    </Text>
                  </View>
                )}
                {goal.daysBehind && (
                  <View style={[styles.statusMessage, { backgroundColor: '#fee2e2' }]}>
                    <Text style={[styles.statusMessageText, { color: '#dc2626' }]}>
                      ⚠️ You're {goal.daysBehind} days behind schedule
                    </Text>
                  </View>
                )}

                {/* Contributions */}
                <View style={styles.contributionContainer}>
                  <View style={styles.contributionRow}>
                    <View style={styles.contributionItem}>
                      <Text style={styles.contributionLabel}>Current</Text>
                      <Text style={styles.contributionValue}>
                        ${goal.monthlyContribution}/mo
                      </Text>
                    </View>
                    <Text style={styles.arrow}>→</Text>
                    <View style={styles.contributionItem}>
                      <Text style={styles.contributionLabel}>Recommended</Text>
                      <Text style={[styles.contributionValue, { color: colors.primary }]}>
                        ${goal.recommendedContribution}/mo
                      </Text>
                    </View>
                  </View>
                  {goal.monthlyContribution !== goal.recommendedContribution && (
                    <Text style={styles.contributionNote}>
                      {goal.recommendedContribution > goal.monthlyContribution 
                        ? `💡 Increase by $${goal.recommendedContribution - goal.monthlyContribution}/mo to stay on track`
                        : `💰 You can reduce by $${goal.monthlyContribution - goal.recommendedContribution}/mo`
                      }
                    </Text>
                  )}
                </View>

                {/* AI Insights */}
                <View style={styles.insightsContainer}>
                  <Text style={styles.insightsLabel}>🧠 AI Insights</Text>
                  {goal.insights.map((insight, idx) => (
                    <View key={idx} style={styles.insightItem}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.insightText}>{insight}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
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
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
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
  goalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  goalTitleRow: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  goalIcon: {
    fontSize: 32,
  },
  goalInfo: {
    flex: 1,
    gap: 6,
  },
  goalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  confidenceBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  timelineContainer: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 12,
    gap: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timelineLabel: {
    fontSize: 13,
    color: '#6b7280',
  },
  timelineValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
  },
  statusMessage: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  statusMessageText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  contributionContainer: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  contributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  contributionItem: {
    flex: 1,
  },
  contributionLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  contributionValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  arrow: {
    fontSize: 20,
    color: '#9ca3af',
    paddingHorizontal: 8,
  },
  contributionNote: {
    fontSize: 12,
    color: '#4b5563',
    textAlign: 'center',
  },
  insightsContainer: {
    gap: 8,
  },
  insightsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  insightItem: {
    flexDirection: 'row',
    gap: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  insightText: {
    flex: 1,
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 18,
  },
});
