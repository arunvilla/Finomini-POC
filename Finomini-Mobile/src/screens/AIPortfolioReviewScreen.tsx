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

interface AIPortfolioReviewScreenProps {
  onBack?: () => void;
}

export default function AIPortfolioReviewScreen({ onBack }: AIPortfolioReviewScreenProps) {
  const portfolioScore = 85;

  const insights = [
    {
      icon: '✅',
      type: 'strength',
      title: 'Well Diversified',
      description: 'Your portfolio is spread across multiple asset classes',
      color: '#10b981',
    },
    {
      icon: '⚠️',
      type: 'warning',
      title: 'High Stock Allocation',
      description: 'Consider rebalancing to reduce volatility risk',
      color: '#f59e0b',
    },
    {
      icon: '💡',
      type: 'recommendation',
      title: 'Low Bond Exposure',
      description: 'Adding bonds could improve stability',
      color: '#3b82f6',
    },
    {
      icon: '✅',
      type: 'strength',
      title: 'Low Fees',
      description: 'You\'re using cost-effective index funds',
      color: '#10b981',
    },
  ];

  const recommendations = [
    { action: 'Rebalance Portfolio', impact: 'High', priority: 1 },
    { action: 'Increase Emergency Fund', impact: 'Medium', priority: 2 },
    { action: 'Tax-Loss Harvesting', impact: 'Medium', priority: 3 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Portfolio Review</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Portfolio Health Score</Text>
          <Text style={styles.score}>{portfolioScore}/100</Text>
          <View style={styles.scoreBar}>
            <View style={[styles.scoreBarFill, { width: `${portfolioScore}%` }]} />
          </View>
          <Text style={styles.scoreDescription}>
            {portfolioScore >= 80 ? 'Excellent' : portfolioScore >= 60 ? 'Good' : 'Needs Improvement'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Insights</Text>
          {insights.map((insight, index) => (
            <View key={index} style={styles.insightCard}>
              <View style={[styles.insightIcon, { backgroundColor: `${insight.color}20` }]}>
                <Text style={styles.insightEmoji}>{insight.icon}</Text>
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>{insight.title}</Text>
                <Text style={styles.insightDescription}>{insight.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Actions</Text>
          {recommendations.map((rec, index) => (
            <TouchableOpacity key={index} style={styles.recommendationCard}>
              <View style={styles.recLeft}>
                <View style={styles.priorityBadge}>
                  <Text style={styles.priorityText}>#{rec.priority}</Text>
                </View>
                <View>
                  <Text style={styles.recAction}>{rec.action}</Text>
                  <Text style={styles.recImpact}>Impact: {rec.impact}</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.aiCard}>
          <Text style={styles.aiIcon}>🤖</Text>
          <View style={styles.aiContent}>
            <Text style={styles.aiTitle}>AI Summary</Text>
            <Text style={styles.aiText}>
              Your portfolio is performing well overall. Focus on rebalancing to maintain your target allocation 
              and consider increasing bond exposure to reduce volatility as you approach your goals.
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
  scoreCard: {
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
  scoreLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  score: {
    fontSize: 48,
    fontWeight: '700',
    color: '#10b981',
    marginBottom: 16,
  },
  scoreBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  scoreBarFill: {
    height: '100%',
    backgroundColor: '#10b981',
  },
  scoreDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  insightCard: {
    flexDirection: 'row',
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
  insightIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  insightEmoji: {
    fontSize: 20,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  recommendationCard: {
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
  recLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  priorityBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563eb',
  },
  recAction: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  recImpact: {
    fontSize: 13,
    color: '#6b7280',
  },
  chevron: {
    fontSize: 24,
    color: '#9ca3af',
  },
  aiCard: {
    flexDirection: 'row',
    margin: 16,
    padding: 16,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  aiIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  aiContent: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 4,
  },
  aiText: {
    fontSize: 14,
    color: '#3b82f6',
    lineHeight: 20,
  },
});
