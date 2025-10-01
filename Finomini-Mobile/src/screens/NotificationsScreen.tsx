import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Switch,
} from 'react-native';

interface NotificationsScreenProps {
  onBack?: () => void;
}

export default function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  const [settings, setSettings] = useState({
    transactionAlerts: true,
    budgetAlerts: true,
    goalMilestones: true,
    billReminders: true,
    unusualActivity: true,
    weeklyReport: false,
    monthlyReport: true,
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alerts</Text>
          <View style={styles.card}>
            <View style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>💳</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Transaction Alerts</Text>
                  <Text style={styles.itemSubtitle}>Get notified of new transactions</Text>
                </View>
              </View>
              <Switch
                value={settings.transactionAlerts}
                onValueChange={() => toggleSetting('transactionAlerts')}
                trackColor={{ false: '#d1d5db', true: '#6366f1' }}
              />
            </View>

            <View style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>💰</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Budget Alerts</Text>
                  <Text style={styles.itemSubtitle}>Alert when nearing budget limits</Text>
                </View>
              </View>
              <Switch
                value={settings.budgetAlerts}
                onValueChange={() => toggleSetting('budgetAlerts')}
                trackColor={{ false: '#d1d5db', true: '#6366f1' }}
              />
            </View>

            <View style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>🎯</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Goal Milestones</Text>
                  <Text style={styles.itemSubtitle}>Celebrate goal achievements</Text>
                </View>
              </View>
              <Switch
                value={settings.goalMilestones}
                onValueChange={() => toggleSetting('goalMilestones')}
                trackColor={{ false: '#d1d5db', true: '#6366f1' }}
              />
            </View>

            <View style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>📅</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Bill Reminders</Text>
                  <Text style={styles.itemSubtitle}>Upcoming bill notifications</Text>
                </View>
              </View>
              <Switch
                value={settings.billReminders}
                onValueChange={() => toggleSetting('billReminders')}
                trackColor={{ false: '#d1d5db', true: '#6366f1' }}
              />
            </View>

            <View style={styles.item}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>🚨</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Unusual Activity</Text>
                  <Text style={styles.itemSubtitle}>Fraud and security alerts</Text>
                </View>
              </View>
              <Switch
                value={settings.unusualActivity}
                onValueChange={() => toggleSetting('unusualActivity')}
                trackColor={{ false: '#d1d5db', true: '#6366f1' }}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reports</Text>
          <View style={styles.card}>
            <View style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>📊</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Weekly Report</Text>
                  <Text style={styles.itemSubtitle}>Summary of your week</Text>
                </View>
              </View>
              <Switch
                value={settings.weeklyReport}
                onValueChange={() => toggleSetting('weeklyReport')}
                trackColor={{ false: '#d1d5db', true: '#6366f1' }}
              />
            </View>

            <View style={styles.item}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>📈</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Monthly Report</Text>
                  <Text style={styles.itemSubtitle}>Detailed monthly analysis</Text>
                </View>
              </View>
              <Switch
                value={settings.monthlyReport}
                onValueChange={() => toggleSetting('monthlyReport')}
                trackColor={{ false: '#d1d5db', true: '#6366f1' }}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Methods</Text>
          <View style={styles.card}>
            <View style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>🔔</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Push Notifications</Text>
                  <Text style={styles.itemSubtitle}>In-app notifications</Text>
                </View>
              </View>
              <Switch
                value={settings.pushNotifications}
                onValueChange={() => toggleSetting('pushNotifications')}
                trackColor={{ false: '#d1d5db', true: '#6366f1' }}
              />
            </View>

            <View style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>📧</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Email Notifications</Text>
                  <Text style={styles.itemSubtitle}>Receive emails</Text>
                </View>
              </View>
              <Switch
                value={settings.emailNotifications}
                onValueChange={() => toggleSetting('emailNotifications')}
                trackColor={{ false: '#d1d5db', true: '#6366f1' }}
              />
            </View>

            <View style={styles.item}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>📱</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>SMS Notifications</Text>
                  <Text style={styles.itemSubtitle}>Text message alerts</Text>
                </View>
              </View>
              <Switch
                value={settings.smsNotifications}
                onValueChange={() => toggleSetting('smsNotifications')}
                trackColor={{ false: '#d1d5db', true: '#6366f1' }}
              />
            </View>
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
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 4,
  },
  backText: {
    fontSize: 18,
    color: '#6366f1',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  settingsButton: {
    padding: 4,
  },
  settingsIcon: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
});
