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

interface AccountsSettingsScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
}

export default function AccountsSettingsScreen({ onBack, onNavigate }: AccountsSettingsScreenProps) {
  const [autoSync, setAutoSync] = useState(true);
  const [showHidden, setShowHidden] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [lowBalanceAlerts, setLowBalanceAlerts] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Synchronization</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔄</Text>
              <View>
                <Text style={styles.settingLabel}>Auto-Sync</Text>
                <Text style={styles.settingDescription}>Automatically sync accounts</Text>
              </View>
            </View>
            <Switch value={autoSync} onValueChange={setAutoSync} />
          </View>

          <TouchableOpacity 
            style={styles.actionRow}
            onPress={() => onNavigate?.('manage-connections')}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔗</Text>
              <View>
                <Text style={styles.settingLabel}>Manage Connections</Text>
                <Text style={styles.settingDescription}>3 connected institutions</Text>
              </View>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>👁️</Text>
              <View>
                <Text style={styles.settingLabel}>Show Hidden Accounts</Text>
                <Text style={styles.settingDescription}>Display hidden accounts in lists</Text>
              </View>
            </View>
            <Switch value={showHidden} onValueChange={setShowHidden} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alerts</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔔</Text>
              <View>
                <Text style={styles.settingLabel}>Account Notifications</Text>
                <Text style={styles.settingDescription}>Get alerts for account changes</Text>
              </View>
            </View>
            <Switch value={notifications} onValueChange={setNotifications} />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>⚠️</Text>
              <View>
                <Text style={styles.settingLabel}>Low Balance Alerts</Text>
                <Text style={styles.settingDescription}>Notify when balance is low</Text>
              </View>
            </View>
            <Switch value={lowBalanceAlerts} onValueChange={setLowBalanceAlerts} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Management</Text>
          
          <TouchableOpacity 
            style={styles.actionRow}
            onPress={() => onNavigate?.('add-account')}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>➕</Text>
              <Text style={styles.settingLabel}>Add New Account</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionRow}
            onPress={() => onNavigate?.('Accounts')}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>📋</Text>
              <Text style={styles.settingLabel}>View All Accounts</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>About Account Sync</Text>
          <Text style={styles.infoText}>
            Your accounts sync automatically every 24 hours. You can manually sync anytime from the accounts list.
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
  actionRow: {
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
  chevron: {
    fontSize: 24,
    color: '#9ca3af',
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
