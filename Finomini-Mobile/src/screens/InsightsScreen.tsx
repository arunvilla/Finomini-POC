import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

interface InsightsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface InsightCard {
  id: string;
  type: 'spending' | 'saving' | 'budgeting' | 'goal' | 'security' | 'investment';
  headline: string;
  keyDataPoint: string;
  description: string;
  icon: string;
  color: string;
  actionText: string;
  priority: 'low' | 'medium' | 'high';
  category?: string;
  relatedData?: any;
}

export default function InsightsScreen({ onBack, onNavigate }: InsightsScreenProps) {
  const [streak, setStreak] = useState(5);
  const [points, setPoints] = useState(1250);

  const insights: InsightCard[] = [
    {
      id: '1',
      type: 'spending',
      headline: "You're Crushing Your Groceries Budget!",
      keyDataPoint: "$50 Under Budget",
      description: "You spent 15% less on groceries this month compared to your average, saving $50. Keep it up!",
      icon: "🛒",
      color: "#22C55E",
      actionText: "View Grocery Trends",
      priority: 'medium',
      category: 'Groceries',
      relatedData: { amount: 50, percentage: 15 }
    },
    {
      id: '2',
      type: 'security',
      headline: "Spotting an Unusual Expense?",
      keyDataPoint: "$127 Coffee Shop",
      description: "You spent $127 at 'Downtown Coffee' yesterday - that's 5x your usual amount. Was this correct?",
      icon: "⚠️",
      color: "#EF4444",
      actionText: "Review Transaction",
      priority: 'high',
      category: 'Dining',
      relatedData: { amount: 127, merchant: 'Downtown Coffee' }
    },
    {
      id: '3',
      type: 'saving',
      headline: "Time to Boost Your Emergency Fund!",
      keyDataPoint: "+$250 Available",
      description: "You're $250 under budget this month. Consider moving this to your emergency fund to reach your $5,000 goal faster.",
      icon: "🏦",
      color: "#3B82F6",
      actionText: "Add to Emergency Fund",
      priority: 'medium',
      category: 'Savings',
      relatedData: { amount: 250, goalProgress: 68 }
    },
    {
      id: '4',
      type: 'budgeting',
      headline: "Entertainment Budget Alert",
      keyDataPoint: "95% Used",
      description: "You've used 95% of your entertainment budget with 8 days left in the month. Consider adjusting spending.",
      icon: "🎬",
      color: "#F59E0B",
      actionText: "Adjust Budget",
      priority: 'high',
      category: 'Entertainment',
      relatedData: { percentage: 95, daysLeft: 8 }
    },
    {
      id: '5',
      type: 'investment',
      headline: "Great Month for Your Portfolio!",
      keyDataPoint: "+$1,247 Growth",
      description: "Your investment portfolio grew by $1,247 this month. Consider increasing your monthly contributions.",
      icon: "📈",
      color: "#10B981",
      actionText: "Review Portfolio",
      priority: 'low',
      category: 'Investments',
      relatedData: { growth: 1247, percentage: 8.2 }
    },
    {
      id: '6',
      type: 'goal',
      headline: "Vacation Fund Progress!",
      keyDataPoint: "72% Complete",
      description: "You're 72% of the way to your vacation goal! At this rate, you'll reach it 2 months early.",
      icon: "✈️",
      color: "#8B5CF6",
      actionText: "View Goal Details",
      priority: 'medium',
      category: 'Goals',
      relatedData: { progress: 72, monthsEarly: 2 }
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return colors.danger;
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return '#6b7280';
    }
  };

  const getPriorityBgColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#fee2e2';
      case 'medium': return '#fef3c7';
      case 'low': return '#dcfce7';
      default: return '#f3f4f6';
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
          <Text style={styles.headerTitle}>Your Coach</Text>
          <Text style={styles.headerSubtitle}>Personalized insights</Text>
        </View>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => onNavigate('insights-settings')}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Bar */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>🔥</Text>
          <View style={styles.statTextContainer}>
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>⭐</Text>
          <View style={styles.statTextContainer}>
            <Text style={styles.statValue}>{points}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>🏆</Text>
          <View style={styles.statTextContainer}>
            <Text style={styles.statValue}>{insights.length}</Text>
            <Text style={styles.statLabel}>Insights</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Priority Insights */}
        {insights.filter(i => i.priority === 'high').length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🚨 High Priority</Text>
            {insights
              .filter(i => i.priority === 'high')
              .map((insight) => (
                <TouchableOpacity
                  key={insight.id}
                  style={[styles.insightCard, { borderLeftColor: insight.color }]}
                  onPress={() => onNavigate('insight-details', insight)}
                  activeOpacity={0.7}
                >
                  <View style={styles.insightHeader}>
                    <Text style={styles.insightIcon}>{insight.icon}</Text>
                    <View style={styles.insightHeaderContent}>
                      <Text style={styles.insightHeadline}>{insight.headline}</Text>
                      <View style={[
                        styles.priorityBadge,
                        { backgroundColor: getPriorityBgColor(insight.priority) }
                      ]}>
                        <Text style={[
                          styles.priorityText,
                          { color: getPriorityColor(insight.priority) }
                        ]}>
                          HIGH PRIORITY
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.keyDataContainer}>
                    <Text style={[styles.keyDataPoint, { color: insight.color }]}>
                      {insight.keyDataPoint}
                    </Text>
                  </View>

                  <Text style={styles.insightDescription}>{insight.description}</Text>

                  <View style={styles.actionRow}>
                    <Text style={[styles.actionText, { color: insight.color }]}>
                      {insight.actionText} →
                    </Text>
                    {insight.category && (
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{insight.category}</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        )}

        {/* Other Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 All Insights</Text>
          {insights
            .filter(i => i.priority !== 'high')
            .map((insight) => (
              <TouchableOpacity
                key={insight.id}
                style={[styles.insightCard, { borderLeftColor: insight.color }]}
                onPress={() => onNavigate('insight-details', insight)}
                activeOpacity={0.7}
              >
                <View style={styles.insightHeader}>
                  <Text style={styles.insightIcon}>{insight.icon}</Text>
                  <View style={styles.insightHeaderContent}>
                    <Text style={styles.insightHeadline}>{insight.headline}</Text>
                    <View style={[
                      styles.priorityBadge,
                      { backgroundColor: getPriorityBgColor(insight.priority) }
                    ]}>
                      <Text style={[
                        styles.priorityText,
                        { color: getPriorityColor(insight.priority) }
                      ]}>
                        {insight.priority.toUpperCase()} PRIORITY
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.keyDataContainer}>
                  <Text style={[styles.keyDataPoint, { color: insight.color }]}>
                    {insight.keyDataPoint}
                  </Text>
                </View>

                <Text style={styles.insightDescription}>{insight.description}</Text>

                <View style={styles.actionRow}>
                  <Text style={[styles.actionText, { color: insight.color }]}>
                    {insight.actionText} →
                  </Text>
                  {insight.category && (
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>{insight.category}</Text>
                    </View>
                  )}
                </View>
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
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 20,
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  statIcon: {
    fontSize: 24,
  },
  statTextContainer: {
    alignItems: 'flex-start',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 11,
    color: '#6b7280',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#e5e7eb',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  insightCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  insightIcon: {
    fontSize: 36,
  },
  insightHeaderContent: {
    flex: 1,
    gap: 6,
  },
  insightHeadline: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    lineHeight: 22,
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
  },
  keyDataContainer: {
    marginBottom: 12,
  },
  keyDataPoint: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  insightDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoryBadge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
});
