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
import { goals } from '../data/mockData';

export default function GoalsScreen() {
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalCurrent = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const overallProgress = (totalCurrent / totalTarget) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Goals</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>📊 All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Progress</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.currentAmount}>${totalCurrent.toLocaleString()}</Text>
            <Text style={styles.summaryItemLabel}>Saved</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.targetAmount}>${totalTarget.toLocaleString()}</Text>
            <Text style={styles.summaryItemLabel}>Target</Text>
          </View>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${overallProgress}%` }
              ]}
            />
          </View>
          <Text style={styles.progressLabel}>
            {overallProgress.toFixed(1)}% complete
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Active Goals</Text>
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const remaining = goal.targetAmount - goal.currentAmount;
          const daysUntilDeadline = Math.ceil(
            (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );
          
          return (
            <TouchableOpacity key={goal.id} style={styles.goalCard}>
              <View style={styles.goalHeader}>
                <View style={styles.goalLeft}>
                  <View style={[styles.goalIcon, { backgroundColor: goal.color + '20' }]}>
                    <Text style={styles.goalEmoji}>
                      {goal.category === 'Savings' ? '💰' :
                       goal.category === 'Travel' ? '✈️' : '💻'}
                    </Text>
                  </View>
                  <View style={styles.goalInfo}>
                    <Text style={styles.goalName}>{goal.name}</Text>
                    <Text style={styles.goalCategory}>{goal.category}</Text>
                  </View>
                </View>
                <View style={styles.goalRight}>
                  <Text style={styles.goalProgress}>{progress.toFixed(0)}%</Text>
                </View>
              </View>
              
              <View style={styles.goalProgressBar}>
                <View style={styles.goalProgressBackground}>
                  <View
                    style={[
                      styles.goalProgressFill,
                      { 
                        width: `${progress}%`,
                        backgroundColor: goal.color,
                      }
                    ]}
                  />
                </View>
              </View>

              <View style={styles.goalDetails}>
                <View style={styles.goalAmount}>
                  <Text style={styles.currentText}>
                    ${goal.currentAmount.toLocaleString()}
                  </Text>
                  <Text style={styles.ofText}> of </Text>
                  <Text style={styles.targetText}>
                    ${goal.targetAmount.toLocaleString()}
                  </Text>
                </View>
                <Text style={styles.remainingText}>
                  ${remaining.toLocaleString()} to go
                </Text>
              </View>

              <View style={styles.goalFooter}>
                <View style={styles.deadlineContainer}>
                  <Text style={styles.deadlineLabel}>Deadline</Text>
                  <Text style={styles.deadlineDate}>
                    {new Date(goal.deadline).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </Text>
                  <Text style={[
                    styles.daysRemaining,
                    daysUntilDeadline < 30 && styles.urgentDays
                  ]}>
                    {daysUntilDeadline} days left
                  </Text>
                </View>
                <TouchableOpacity style={styles.contributeButton}>
                  <Text style={styles.contributeButtonText}>+ Add</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Create Goal</Text>
      </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  currentAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  targetAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 4,
  },
  summaryItemLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 20,
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  goalCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  goalEmoji: {
    fontSize: 24,
  },
  goalInfo: {
    flex: 1,
  },
  goalName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  goalCategory: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  goalRight: {
    marginLeft: 12,
  },
  goalProgress: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
  },
  goalProgressBar: {
    marginBottom: 16,
  },
  goalProgressBackground: {
    height: 10,
    backgroundColor: '#e5e7eb',
    borderRadius: 5,
    overflow: 'hidden',
  },
  goalProgressFill: {
    height: '100%',
    borderRadius: 5,
  },
  goalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalAmount: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  ofText: {
    fontSize: 14,
    color: '#6b7280',
  },
  targetText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  remainingText: {
    fontSize: 13,
    color: '#f59e0b',
    fontWeight: '600',
  },
  goalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  deadlineContainer: {
    flex: 1,
  },
  deadlineLabel: {
    fontSize: 11,
    color: '#9ca3af',
    marginBottom: 2,
  },
  deadlineDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  daysRemaining: {
    fontSize: 12,
    color: '#10b981',
  },
  urgentDays: {
    color: '#ef4444',
  },
  contributeButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  contributeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#6366f1',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
