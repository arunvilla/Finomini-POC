import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

interface SmartSavingsScreenProps {
  onBack?: () => void;
}

export default function SmartSavingsScreen({ onBack }: SmartSavingsScreenProps) {
  const suggestions = [
    {
      id: '1',
      title: 'Reduce Dining Out',
      description: 'You spent $450 on dining last month, 30% above average',
      potential: 135,
      difficulty: 'Easy',
      icon: '🍽️',
      color: '#f59e0b',
    },
    {
      id: '2',
      title: 'Switch to Better Savings Account',
      description: 'Current rate: 0.5% APY. Better options available at 4.5%',
      potential: 200,
      difficulty: 'Medium',
      icon: '💰',
      color: '#10b981',
    },
    {
      id: '3',
      title: 'Cancel Unused Subscriptions',
      description: 'Found 3 subscriptions you haven\'t used in 2 months',
      potential: 45,
      difficulty: 'Easy',
      icon: '📱',
      color: '#3b82f6',
    },
    {
      id: '4',
      title: 'Optimize Grocery Shopping',
      description: 'Switch to generic brands and use coupons',
      potential: 80,
      difficulty: 'Easy',
      icon: '🛒',
      color: '#8b5cf6',
    },
  ];

  const totalPotential = suggestions.reduce((sum, s) => sum + s.potential, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Smart Savings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Text style={styles.summaryEmoji}>🤖</Text>
          </View>
          <Text style={styles.summaryTitle}>AI-Powered Savings Recommendations</Text>
          <Text style={styles.summaryDescription}>
            Our AI analyzed your spending patterns and found opportunities to save
          </Text>
          
          <View style={styles.potentialCard}>
            <Text style={styles.potentialLabel}>Potential Monthly Savings</Text>
            <Text style={styles.potentialAmount}>${totalPotential}</Text>
            <Text style={styles.potentialYearly}>
              ${(totalPotential * 12).toLocaleString()} per year
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personalized Recommendations</Text>
          
          {suggestions.map((suggestion) => (
            <View key={suggestion.id} style={styles.suggestionCard}>
              <View style={styles.suggestionHeader}>
                <View style={[styles.suggestionIcon, { backgroundColor: suggestion.color + '20' }]}>
                  <Text style={styles.suggestionEmoji}>{suggestion.icon}</Text>
                </View>
                <View style={styles.suggestionInfo}>
                  <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
                  <Text style={styles.suggestionDescription}>{suggestion.description}</Text>
                </View>
              </View>

              <View style={styles.suggestionFooter}>
                <View style={styles.suggestionStats}>
                  <View style={styles.statBadge}>
                    <Text style={[styles.statBadgeText, { color: suggestion.color }]}>
                      +${suggestion.potential}/mo
                    </Text>
                  </View>
                  <View style={[
                    styles.difficultyBadge,
                    suggestion.difficulty === 'Easy' ? styles.difficultyEasy : styles.difficultyMedium
                  ]}>
                    <Text style={styles.difficultyText}>{suggestion.difficulty}</Text>
                  </View>
                </View>
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: suggestion.color }]}>
                  <Text style={styles.actionButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.insightSection}>
          <Text style={styles.sectionTitle}>Spending Insights</Text>
          
          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Text style={styles.insightIcon}>📊</Text>
              <Text style={styles.insightTitle}>Spending Pattern Analysis</Text>
            </View>
            <View style={styles.insightItem}>
              <Text style={styles.insightLabel}>Top Spending Category</Text>
              <Text style={styles.insightValue}>Groceries ($850/mo)</Text>
            </View>
            <View style={styles.insightItem}>
              <Text style={styles.insightLabel}>Average Daily Spending</Text>
              <Text style={styles.insightValue}>$85.50</Text>
            </View>
            <View style={styles.insightItem}>
              <Text style={styles.insightLabel}>Impulse Purchases</Text>
              <Text style={styles.insightValue}>12 transactions ($245)</Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Text style={styles.insightIcon}>🎯</Text>
              <Text style={styles.insightTitle}>Savings Goals Progress</Text>
            </View>
            <Text style={styles.insightDescription}>
              You're on track to reach your Emergency Fund goal 2 months early with these optimizations!
            </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
            <Text style={styles.progressText}>65% to goal</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>🔄 Refresh Recommendations</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: 'white',
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  summaryEmoji: {
    fontSize: 40,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  summaryDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  potentialCard: {
    width: '100%',
    backgroundColor: '#f0fdf4',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#10b981',
  },
  potentialLabel: {
    fontSize: 12,
    color: '#059669',
    marginBottom: 8,
    fontWeight: '600',
  },
  potentialAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  potentialYearly: {
    fontSize: 14,
    color: '#059669',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  suggestionCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  suggestionHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  suggestionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  suggestionEmoji: {
    fontSize: 24,
  },
  suggestionInfo: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  suggestionDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  suggestionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  suggestionStats: {
    flexDirection: 'row',
    gap: 8,
  },
  statBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyEasy: {
    backgroundColor: '#dcfce7',
  },
  difficultyMedium: {
    backgroundColor: '#fef3c7',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  insightSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  insightCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  insightIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  insightItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  insightLabel: {
    fontSize: 14,
    color: '#666',
  },
  insightValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  insightDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  refreshButton: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  refreshButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
