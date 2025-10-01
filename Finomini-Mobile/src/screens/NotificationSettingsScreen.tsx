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

interface NotificationSettingsScreenProps {
  onBack: () => void;
}

export default function NotificationSettingsScreen({ onBack }: NotificationSettingsScreenProps) {
  const [notifications, setNotifications] = useState({
    allowNotifications: true,
    lowBalance: true,
    billReminders: true,
    newTransactions: false,
    budgetWarnings: true,
    goalMilestones: true,
    largeTransactions: true,
    weeklyReports: false,
    monthlyReports: true,
    fraudAlerts: true,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const notificationTypes = [
    {
      category: 'Main Settings',
      items: [
        {
          key: 'allowNotifications' as const,
          title: 'Allow Notifications',
          description: 'Enable all app notifications',
          icon: '🔔',
        },
      ]
    },
    {
      category: 'Transaction Alerts',
      items: [
        {
          key: 'newTransactions' as const,
          title: 'New Transaction Alerts',
          description: 'Notify me of new transactions',
          icon: '💳',
        },
        {
          key: 'largeTransactions' as const,
          title: 'Large Transaction Alerts',
          description: 'Alert for transactions over $500',
          icon: '💰',
        },
      ]
    },
    {
      category: 'Financial Alerts',
      items: [
        {
          key: 'lowBalance' as const,
          title: 'Low Balance Alerts',
          description: 'Get notified when account balance is low',
          icon: '⚠️',
        },
        {
          key: 'billReminders' as const,
          title: 'Bill Reminders',
          description: 'Remind me of upcoming bill payments',
          icon: '📄',
        },
        {
          key: 'budgetWarnings' as const,
          title: 'Budget Overrun Warnings',
          description: 'Alert when spending exceeds budget',
          icon: '📊',
        },
        {
          key: 'goalMilestones' as const,
          title: 'Goal Milestones',
          description: 'Celebrate when you reach savings goals',
          icon: '🎯',
        },
      ]
    },
    {
      category: 'Reports & Summaries',
      items: [
        {
          key: 'weeklyReports' as const,
          title: 'Weekly Spending Reports',
          description: 'Summary of your spending every week',
          icon: '📈',
        },
        {
          key: 'monthlyReports' as const,
          title: 'Monthly Financial Reports',
          description: 'Comprehensive monthly overview',
          icon: '📋',
        },
      ]
    },
    {
      category: 'Security',
      items: [
        {
          key: 'fraudAlerts' as const,
          title: 'Fraud Detection Alerts',
          description: 'Immediate alerts for suspicious activity',
          icon: '🔒',
        },
      ]
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        {notificationTypes.map((section, sectionIndex) => (
          <View key={section.category} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.category}</Text>

            <View style={styles.settingsCard}>
              {section.items.map((item, itemIndex) => (
                <View key={item.key}>
                  <TouchableOpacity
                    style={styles.settingRow}
                    onPress={() => handleToggle(item.key)}
                  >
                    <Text style={styles.settingIcon}>{item.icon}</Text>
                    <View style={styles.settingContent}>
                      <Text style={styles.settingTitle}>{item.title}</Text>
                      <Text style={styles.settingDescription}>{item.description}</Text>
                    </View>
                    <View style={[styles.toggle, notifications[item.key] && styles.toggleActive]}>
                      <View style={[styles.toggleThumb, notifications[item.key] && styles.toggleThumbActive]} />
                    </View>
                  </TouchableOpacity>
                  {itemIndex < section.items.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.infoSection}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            Notifications help you stay on top of your finances. You can customize which alerts you receive and when.
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
  section: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  settingRow: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
  },
  toggle: {
    width: 51,
    height: 31,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: colors.primary,
  },
  toggleThumb: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: '#ffffff',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginLeft: 52,
  },
  infoSection: {
    flexDirection: 'row',
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    padding: 16,
    margin: 16,
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
