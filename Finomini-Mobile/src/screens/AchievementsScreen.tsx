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
import { colors } from '../theme/colors';

interface AchievementsScreenProps {
  onBack: () => void;
}

interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  unlocked: boolean;
  unlockedDate?: string;
  points: number;
}

export default function AchievementsScreen({ onBack }: AchievementsScreenProps) {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const achievements: Achievement[] = [
    {
      id: '1',
      icon: '🎯',
      title: 'Goal Getter',
      description: 'Reach your first savings goal',
      progress: 1,
      total: 1,
      unlocked: true,
      unlockedDate: '2024-09-15',
      points: 100,
    },
    {
      id: '2',
      icon: '💰',
      title: 'Budget Master',
      description: 'Stay under budget for 3 months in a row',
      progress: 2,
      total: 3,
      unlocked: false,
      points: 200,
    },
    {
      id: '3',
      icon: '📊',
      title: 'Transaction Tracker',
      description: 'Log 100 transactions',
      progress: 87,
      total: 100,
      unlocked: false,
      points: 50,
    },
    {
      id: '4',
      icon: '🔥',
      title: 'Week Streak',
      description: 'Check your finances 7 days in a row',
      progress: 7,
      total: 7,
      unlocked: true,
      unlockedDate: '2024-09-28',
      points: 75,
    },
    {
      id: '5',
      icon: '💎',
      title: 'Savings Champion',
      description: 'Save $10,000',
      progress: 5420,
      total: 10000,
      unlocked: false,
      points: 500,
    },
    {
      id: '6',
      icon: '📱',
      title: 'Early Adopter',
      description: 'Use the app in its first month',
      progress: 1,
      total: 1,
      unlocked: true,
      unlockedDate: '2024-09-01',
      points: 150,
    },
  ];

  const filteredAchievements = achievements.filter(a => {
    if (filter === 'unlocked') return a.unlocked;
    if (filter === 'locked') return !a.unlocked;
    return true;
  });

  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const currentStreak = 7;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Achievements</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalPoints}</Text>
            <Text style={styles.statLabel}>Total Points</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{unlockedCount}/{achievements.length}</Text>
            <Text style={styles.statLabel}>Unlocked</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>🔥 {currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        <View style={styles.filterContainer}>
          {(['all', 'unlocked', 'locked'] as const).map((filterType) => (
            <TouchableOpacity
              key={filterType}
              style={[
                styles.filterButton,
                filter === filterType && styles.filterButtonActive
              ]}
              onPress={() => setFilter(filterType)}
            >
              <Text style={[
                styles.filterText,
                filter === filterType && styles.filterTextActive
              ]}>
                {filterType === 'all' ? 'All' : filterType === 'unlocked' ? 'Unlocked' : 'Locked'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.achievementsList}>
          {filteredAchievements.map((achievement) => {
            const progressPercent = (achievement.progress / achievement.total) * 100;
            
            return (
              <View 
                key={achievement.id} 
                style={[
                  styles.achievementCard,
                  achievement.unlocked && styles.achievementCardUnlocked
                ]}
              >
                <View style={[
                  styles.iconContainer,
                  achievement.unlocked && styles.iconContainerUnlocked
                ]}>
                  <Text style={styles.achievementIcon}>
                    {achievement.unlocked ? achievement.icon : '🔒'}
                  </Text>
                </View>

                <View style={styles.achievementContent}>
                  <View style={styles.achievementHeader}>
                    <Text style={[
                      styles.achievementTitle,
                      !achievement.unlocked && styles.achievementTitleLocked
                    ]}>
                      {achievement.title}
                    </Text>
                    <View style={styles.pointsBadge}>
                      <Text style={styles.pointsText}>{achievement.points} pts</Text>
                    </View>
                  </View>

                  <Text style={styles.achievementDescription}>
                    {achievement.description}
                  </Text>

                  {achievement.unlocked ? (
                    <View style={styles.unlockedBanner}>
                      <Text style={styles.unlockedText}>
                        ✓ Unlocked on {new Date(achievement.unlockedDate!).toLocaleDateString()}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
                      </View>
                      <Text style={styles.progressText}>
                        {achievement.progress} / {achievement.total}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.motivationCard}>
          <Text style={styles.motivationIcon}>🎉</Text>
          <Text style={styles.motivationTitle}>Keep Going!</Text>
          <Text style={styles.motivationText}>
            You're only {achievements.length - unlockedCount} achievements away from completing your collection!
          </Text>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  achievementsList: {
    paddingHorizontal: 16,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  achievementCardUnlocked: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '05',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconContainerUnlocked: {
    backgroundColor: colors.primary + '20',
  },
  achievementIcon: {
    fontSize: 28,
  },
  achievementContent: {
    flex: 1,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  achievementTitleLocked: {
    color: '#9ca3af',
  },
  pointsBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  pointsText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#92400e',
  },
  achievementDescription: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 12,
  },
  unlockedBanner: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  unlockedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    minWidth: 60,
    textAlign: 'right',
  },
  motivationCard: {
    backgroundColor: '#fef3c7',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  motivationIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 8,
  },
  motivationText: {
    fontSize: 14,
    color: '#92400e',
    textAlign: 'center',
    lineHeight: 20,
  },
});
