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
  TextInput,
} from 'react-native';

interface AICashFlowAlertSettingsScreenProps {
  onBack?: () => void;
}

export default function AICashFlowAlertSettingsScreen({ onBack }: AICashFlowAlertSettingsScreenProps) {
  const [lowBalanceEnabled, setLowBalanceEnabled] = useState(true);
  const [upcomingBillsEnabled, setUpcomingBillsEnabled] = useState(true);
  const [unusualSpendingEnabled, setUnusualSpendingEnabled] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [lowBalanceThreshold, setLowBalanceThreshold] = useState('500');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alert Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alert Types</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>⚠️</Text>
              <View>
                <Text style={styles.settingLabel}>Low Balance Alerts</Text>
                <Text style={styles.settingDescription}>Notify when balance is low</Text>
              </View>
            </View>
            <Switch value={lowBalanceEnabled} onValueChange={setLowBalanceEnabled} />
          </View>

          {lowBalanceEnabled && (
            <View style={styles.thresholdBox}>
              <Text style={styles.thresholdLabel}>Alert Threshold</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputPrefix}>$</Text>
                <TextInput
                  style={styles.input}
                  value={lowBalanceThreshold}
                  onChangeText={setLowBalanceThreshold}
                  keyboardType="numeric"
                />
              </View>
            </View>
          )}

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>📅</Text>
              <View>
                <Text style={styles.settingLabel}>Upcoming Bills</Text>
                <Text style={styles.settingDescription}>Alert for large payments</Text>
              </View>
            </View>
            <Switch value={upcomingBillsEnabled} onValueChange={setUpcomingBillsEnabled} />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔍</Text>
              <View>
                <Text style={styles.settingLabel}>Unusual Spending</Text>
                <Text style={styles.settingDescription}>Detect abnormal patterns</Text>
              </View>
            </View>
            <Switch value={unusualSpendingEnabled} onValueChange={setUnusualSpendingEnabled} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Preferences</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔔</Text>
              <View>
                <Text style={styles.settingLabel}>Push Notifications</Text>
                <Text style={styles.settingDescription}>Receive instant alerts</Text>
              </View>
            </View>
            <Switch value={pushNotifications} onValueChange={setPushNotifications} />
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Smart Alerts</Text>
          <Text style={styles.infoText}>
            Our AI analyzes your spending patterns and account balances to provide timely, 
            actionable alerts that help you avoid overdrafts and manage cash flow effectively.
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
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: '#6b7280',
  },
  thresholdBox: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    marginLeft: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  thresholdLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputPrefix: {
    fontSize: 16,
    color: '#6b7280',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: '#111827',
  },
  infoCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#3b82f6',
    lineHeight: 20,
  },
});
