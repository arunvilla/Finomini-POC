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

interface GoalDetailScreenProps {
  goal?: any;
  onBack?: () => void;
}

export default function GoalDetailScreen({ goal, onBack }: GoalDetailScreenProps) {
  const goalData = goal || {
    name: 'Emergency Fund',
    target: 10000,
    current: 6500,
    deadline: '2024-12-31',
    icon: '🛡️',
    category: 'Safety Net',
    monthlyContribution: 500,
    startDate: '2024-01-01',
    contributions: [
      { id: '1', amount: 500, date: '2024-10-01', note: 'Monthly automatic deposit' },
      { id: '2', amount: 200, date: '2024-09-15', note: 'Bonus contribution' },
      { id: '3', amount: 500, date: '2024-09-01', note: 'Monthly automatic deposit' },
      { id: '4', amount: 300, date: '2024-08-20', note: 'Extra savings' },
    ],
  };

  const percentage = (goalData.current / goalData.target) * 100;
  const remaining = goalData.target - goalData.current;
  const daysLeft = Math.ceil((new Date(goalData.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const monthlyNeeded = daysLeft > 0 ? remaining / (daysLeft / 30) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Goal Details</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.goalIcon}>{goalData.icon}</Text>
          <Text style={styles.goalName}>{goalData.name}</Text>
          <Text style={styles.categoryText}>{goalData.category}</Text>
          
          <View style={styles.progressCircle}>
            <Text style={styles.percentageText}>{percentage.toFixed(0)}%</Text>
            <Text style={styles.progressLabel}>Complete</Text>
          </View>

          <View style={styles.amountRow}>
            <View style={styles.amountBox}>
              <Text style={styles.amountLabel}>Current</Text>
              <Text style={styles.amountValue}>${goalData.current.toLocaleString()}</Text>
            </View>
            <View style={styles.amountBox}>
              <Text style={styles.amountLabel}>Target</Text>
              <Text style={styles.amountValue}>${goalData.target.toLocaleString()}</Text>
            </View>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(percentage, 100)}%` },
              ]}
            />
          </View>

          <Text style={styles.remainingText}>
            ${remaining.toLocaleString()} remaining
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📅</Text>
            <Text style={styles.statValue}>{daysLeft}</Text>
            <Text style={styles.statLabel}>Days Left</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>💵</Text>
            <Text style={styles.statValue}>${monthlyNeeded.toFixed(0)}</Text>
            <Text style={styles.statLabel}>Monthly Needed</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📊</Text>
            <Text style={styles.statValue}>${goalData.monthlyContribution}</Text>
            <Text style={styles.statLabel}>Monthly Plan</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Goal Information</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Start Date</Text>
            <Text style={styles.infoValue}>{new Date(goalData.startDate).toLocaleDateString()}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Target Date</Text>
            <Text style={styles.infoValue}>{new Date(goalData.deadline).toLocaleDateString()}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Time Elapsed</Text>
            <Text style={styles.infoValue}>
              {Math.floor((new Date().getTime() - new Date(goalData.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Contributions</Text>
            <Text style={styles.contributionCount}>{goalData.contributions.length}</Text>
          </View>
          
          {goalData.contributions.map((contribution: any) => (
            <View key={contribution.id} style={styles.contributionItem}>
              <View style={styles.contributionLeft}>
                <Text style={styles.contributionAmount}>+${contribution.amount.toFixed(2)}</Text>
                <Text style={styles.contributionDate}>
                  {new Date(contribution.date).toLocaleDateString()}
                </Text>
                {contribution.note && (
                  <Text style={styles.contributionNote}>{contribution.note}</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>💰 Add Contribution</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>📈 View Progress History</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.secondaryButton, styles.dangerButton]}>
            <Text style={[styles.secondaryButtonText, styles.dangerButtonText]}>🗑️ Delete Goal</Text>
          </TouchableOpacity>
        </View>
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
  editButton: {
    padding: 8,
  },
  editIcon: {
    fontSize: 20,
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
  goalIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  goalName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  progressCircle: {
    alignItems: 'center',
    marginBottom: 24,
  },
  percentageText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#7c3aed',
  },
  progressLabel: {
    fontSize: 14,
    color: '#666',
  },
  amountRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  amountBox: {
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7c3aed',
    borderRadius: 4,
  },
  remainingText: {
    fontSize: 14,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  contributionCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  contributionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contributionLeft: {
    flex: 1,
  },
  contributionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 4,
  },
  contributionDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  contributionNote: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  actionButtons: {
    padding: 16,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#7c3aed',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  dangerButton: {
    borderColor: '#fecaca',
    backgroundColor: '#fef2f2',
  },
  dangerButtonText: {
    color: '#dc2626',
  },
});
