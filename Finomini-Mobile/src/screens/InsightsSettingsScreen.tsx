import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Switch,
} from 'react-native';
import { colors } from '../theme/colors';

interface InsightsSettingsScreenProps {
  onBack: () => void;
}

export default function InsightsSettingsScreen({ onBack }: InsightsSettingsScreenProps) {
  const [frequency, setFrequency] = useState('daily');
  const [gamificationEnabled, setGamificationEnabled] = useState(true);
  const [achievementNotifications, setAchievementNotifications] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  
  const [insightTypes, setInsightTypes] = useState({
    spending: true,
    saving: true,
    debt: false,
    investment: true,
    bills: true,
    security: true
  });

  const [dataSources, setDataSources] = useState({
    checking: true,
    savings: true,
    credit: true,
    investment: false,
    loans: false,
    manual: true
  });

  const toggleInsightType = (type: keyof typeof insightTypes) => {
    setInsightTypes(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const toggleDataSource = (source: keyof typeof dataSources) => {
    setDataSources(prev => ({ ...prev, [source]: !prev[source] }));
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
          <Text style={styles.headerTitle}>Insights Settings</Text>
          <Text style={styles.headerSubtitle}>Customize your experience</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Frequency */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Insight Frequency</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={[styles.frequencyOption, frequency === 'daily' && styles.frequencyOptionActive]}
              onPress={() => setFrequency('daily')}
            >
              <View style={styles.radioButton}>
                {frequency === 'daily' && <View style={styles.radioButtonInner} />}
              </View>
              <View style={styles.frequencyContent}>
                <Text style={styles.frequencyLabel}>Daily</Text>
                <Text style={styles.frequencyDescription}>Get new insights every day</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.frequencyOption, frequency === 'weekly' && styles.frequencyOptionActive]}
              onPress={() => setFrequency('weekly')}
            >
              <View style={styles.radioButton}>
                {frequency === 'weekly' && <View style={styles.radioButtonInner} />}
              </View>
              <View style={styles.frequencyContent}>
                <Text style={styles.frequencyLabel}>Weekly</Text>
                <Text style={styles.frequencyDescription}>Get insights once a week</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.frequencyOption, frequency === 'monthly' && styles.frequencyOptionActive]}
              onPress={() => setFrequency('monthly')}
            >
              <View style={styles.radioButton}>
                {frequency === 'monthly' && <View style={styles.radioButtonInner} />}
              </View>
              <View style={styles.frequencyContent}>
                <Text style={styles.frequencyLabel}>Monthly</Text>
                <Text style={styles.frequencyDescription}>Get insights once a month</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Gamification */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎮 Gamification</Text>
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingLabel}>Enable Gamification</Text>
                <Text style={styles.settingDescription}>Earn points and achievements</Text>
              </View>
              <Switch
                value={gamificationEnabled}
                onValueChange={setGamificationEnabled}
                trackColor={{ false: '#e5e7eb', true: colors.primary + '50' }}
                thumbColor={gamificationEnabled ? colors.primary : '#f4f3f4'}
              />
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingLabel}>Achievement Notifications</Text>
                <Text style={styles.settingDescription}>Get notified of new achievements</Text>
              </View>
              <Switch
                value={achievementNotifications}
                onValueChange={setAchievementNotifications}
                trackColor={{ false: '#e5e7eb', true: colors.primary + '50' }}
                thumbColor={achievementNotifications ? colors.primary : '#f4f3f4'}
              />
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingLabel}>Daily Reminders</Text>
                <Text style={styles.settingDescription}>Remind me to check insights</Text>
              </View>
              <Switch
                value={dailyReminders}
                onValueChange={setDailyReminders}
                trackColor={{ false: '#e5e7eb', true: colors.primary + '50' }}
                thumbColor={dailyReminders ? colors.primary : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* Insight Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Insight Types</Text>
          <Text style={styles.sectionDescription}>
            Choose which types of insights you want to see
          </Text>
          <View style={styles.card}>
            {Object.entries({
              spending: { icon: '💳', label: 'Spending Insights' },
              saving: { icon: '🏦', label: 'Saving Opportunities' },
              debt: { icon: '💰', label: 'Debt Management' },
              investment: { icon: '📈', label: 'Investment Tips' },
              bills: { icon: '📄', label: 'Bill Reminders' },
              security: { icon: '🔒', label: 'Security Alerts' }
            }).map(([key, value], index) => (
              <View key={key}>
                {index > 0 && <View style={styles.divider} />}
                <View style={styles.settingRow}>
                  <View style={styles.settingLeft}>
                    <View style={styles.typeRow}>
                      <Text style={styles.typeIcon}>{value.icon}</Text>
                      <Text style={styles.settingLabel}>{value.label}</Text>
                    </View>
                  </View>
                  <Switch
                    value={insightTypes[key as keyof typeof insightTypes]}
                    onValueChange={() => toggleInsightType(key as keyof typeof insightTypes)}
                    trackColor={{ false: '#e5e7eb', true: colors.primary + '50' }}
                    thumbColor={insightTypes[key as keyof typeof insightTypes] ? colors.primary : '#f4f3f4'}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Data Sources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Data Sources</Text>
          <Text style={styles.sectionDescription}>
            Select which accounts to analyze for insights
          </Text>
          <View style={styles.card}>
            {Object.entries({
              checking: { icon: '💵', label: 'Checking Accounts' },
              savings: { icon: '🏦', label: 'Savings Accounts' },
              credit: { icon: '💳', label: 'Credit Cards' },
              investment: { icon: '📈', label: 'Investment Accounts' },
              loans: { icon: '🏠', label: 'Loans & Mortgages' },
              manual: { icon: '✍️', label: 'Manual Entries' }
            }).map(([key, value], index) => (
              <View key={key}>
                {index > 0 && <View style={styles.divider} />}
                <View style={styles.settingRow}>
                  <View style={styles.settingLeft}>
                    <View style={styles.typeRow}>
                      <Text style={styles.typeIcon}>{value.icon}</Text>
                      <Text style={styles.settingLabel}>{value.label}</Text>
                    </View>
                  </View>
                  <Switch
                    value={dataSources[key as keyof typeof dataSources]}
                    onValueChange={() => toggleDataSource(key as keyof typeof dataSources)}
                    trackColor={{ false: '#e5e7eb', true: colors.primary + '50' }}
                    thumbColor={dataSources[key as keyof typeof dataSources] ? colors.primary : '#f4f3f4'}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.section}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <Text style={styles.infoText}>
              Your settings will be saved automatically. Insights are generated based on your transaction history and spending patterns.
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
  placeholder: {
    width: 40,
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
    marginBottom: 6,
  },
  sectionDescription: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  frequencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
  },
  frequencyOptionActive: {
    backgroundColor: colors.primary + '10',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  frequencyContent: {
    flex: 1,
  },
  frequencyLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  frequencyDescription: {
    fontSize: 13,
    color: '#6b7280',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingLeft: {
    flex: 1,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: '#6b7280',
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeIcon: {
    fontSize: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  infoIcon: {
    fontSize: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#1e40af',
    lineHeight: 18,
  },
});
