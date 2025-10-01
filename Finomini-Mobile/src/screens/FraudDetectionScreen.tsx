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

interface FraudDetectionScreenProps {
  onBack?: () => void;
}

export default function FraudDetectionScreen({ onBack }: FraudDetectionScreenProps) {
  const alerts = [
    {
      id: '1',
      type: 'suspicious',
      title: 'Unusual Location Detected',
      description: 'Transaction made in New York while your phone was in California',
      merchant: 'Online Electronics Store',
      amount: 1299.99,
      date: '2024-10-15 14:32',
      riskLevel: 'high',
      status: 'pending',
    },
    {
      id: '2',
      type: 'warning',
      title: 'Duplicate Charge',
      description: 'Same merchant charged twice within 5 minutes',
      merchant: 'Coffee Shop',
      amount: 4.50,
      date: '2024-10-14 08:15',
      riskLevel: 'medium',
      status: 'reviewing',
    },
  ];

  const recentActivity = [
    {
      id: '1',
      merchant: 'Amazon',
      amount: 45.99,
      date: '2024-10-15',
      status: 'verified',
      score: 95,
    },
    {
      id: '2',
      merchant: 'Whole Foods',
      amount: 127.45,
      date: '2024-10-15',
      status: 'verified',
      score: 98,
    },
    {
      id: '3',
      merchant: 'Shell Gas',
      amount: 52.30,
      date: '2024-10-14',
      status: 'verified',
      score: 97,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fraud Detection</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Text style={styles.statusEmoji}>🛡️</Text>
          </View>
          <Text style={styles.statusTitle}>Account Protection Active</Text>
          <Text style={styles.statusDescription}>
            AI-powered fraud detection is monitoring your transactions 24/7
          </Text>
          
          <View style={styles.protectionStats}>
            <View style={styles.protectionStat}>
              <Text style={styles.protectionValue}>127</Text>
              <Text style={styles.protectionLabel}>Transactions</Text>
              <Text style={styles.protectionSubtext}>Monitored</Text>
            </View>
            <View style={styles.protectionDivider} />
            <View style={styles.protectionStat}>
              <Text style={styles.protectionValue}>2</Text>
              <Text style={styles.protectionLabel}>Alerts</Text>
              <Text style={styles.protectionSubtext}>This Month</Text>
            </View>
            <View style={styles.protectionDivider} />
            <View style={styles.protectionStat}>
              <Text style={styles.protectionValue}>$1.3k</Text>
              <Text style={styles.protectionLabel}>Protected</Text>
              <Text style={styles.protectionSubtext}>Amount</Text>
            </View>
          </View>
        </View>

        {alerts.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Alerts</Text>
              <View style={styles.alertBadge}>
                <Text style={styles.alertBadgeText}>{alerts.length}</Text>
              </View>
            </View>

            {alerts.map((alert) => (
              <View
                key={alert.id}
                style={[
                  styles.alertCard,
                  alert.riskLevel === 'high' ? styles.alertHigh : styles.alertMedium
                ]}
              >
                <View style={styles.alertHeader}>
                  <View style={[
                    styles.alertIcon,
                    alert.riskLevel === 'high' ? styles.alertIconHigh : styles.alertIconMedium
                  ]}>
                    <Text style={styles.alertIconText}>
                      {alert.riskLevel === 'high' ? '⚠️' : '⚡'}
                    </Text>
                  </View>
                  <View style={styles.alertInfo}>
                    <Text style={styles.alertTitle}>{alert.title}</Text>
                    <Text style={styles.alertDescription}>{alert.description}</Text>
                  </View>
                </View>

                <View style={styles.alertDetails}>
                  <View style={styles.alertDetailRow}>
                    <Text style={styles.alertDetailLabel}>Merchant</Text>
                    <Text style={styles.alertDetailValue}>{alert.merchant}</Text>
                  </View>
                  <View style={styles.alertDetailRow}>
                    <Text style={styles.alertDetailLabel}>Amount</Text>
                    <Text style={styles.alertDetailValue}>${alert.amount.toFixed(2)}</Text>
                  </View>
                  <View style={styles.alertDetailRow}>
                    <Text style={styles.alertDetailLabel}>Date & Time</Text>
                    <Text style={styles.alertDetailValue}>{alert.date}</Text>
                  </View>
                  <View style={styles.alertDetailRow}>
                    <Text style={styles.alertDetailLabel}>Risk Level</Text>
                    <View style={[
                      styles.riskBadge,
                      alert.riskLevel === 'high' ? styles.riskHigh : styles.riskMedium
                    ]}>
                      <Text style={styles.riskText}>{alert.riskLevel.toUpperCase()}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.alertActions}>
                  <TouchableOpacity style={styles.reportButton}>
                    <Text style={styles.reportButtonText}>🚨 Report Fraud</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.verifyButton}>
                    <Text style={styles.verifyButtonText}>✓ It's Me</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Text style={styles.sectionDescription}>
            All transactions verified by AI
          </Text>

          {recentActivity.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={styles.activityLeft}>
                <View style={styles.verifiedIcon}>
                  <Text style={styles.verifiedIconText}>✓</Text>
                </View>
                <View>
                  <Text style={styles.activityMerchant}>{activity.merchant}</Text>
                  <Text style={styles.activityDate}>
                    {new Date(activity.date).toLocaleDateString()}
                  </Text>
                </View>
              </View>
              <View style={styles.activityRight}>
                <Text style={styles.activityAmount}>${activity.amount.toFixed(2)}</Text>
                <View style={styles.scoreContainer}>
                  <Text style={styles.scoreText}>Score: </Text>
                  <Text style={[styles.scoreValue, { color: activity.score > 90 ? '#10b981' : '#f59e0b' }]}>
                    {activity.score}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Protection Features</Text>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🌍</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Location Monitoring</Text>
              <Text style={styles.featureDescription}>
                Tracks unusual geographic patterns in your transactions
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>⏰</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Time-based Analysis</Text>
              <Text style={styles.featureDescription}>
                Detects suspicious transaction timing and frequency
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>💳</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Duplicate Detection</Text>
              <Text style={styles.featureDescription}>
                Identifies duplicate or excessive charges automatically
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🔒</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Real-time Alerts</Text>
              <Text style={styles.featureDescription}>
                Instant notifications for suspicious activity
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.settingsCard}>
          <Text style={styles.settingsTitle}>Protection Settings</Text>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Alert Sensitivity</Text>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>High</Text>
              <Text style={styles.settingArrow}>→</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Notification Preferences</Text>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>All</Text>
              <Text style={styles.settingArrow}>→</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Travel Notifications</Text>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>Enabled</Text>
              <Text style={styles.settingArrow}>→</Text>
            </View>
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  statusCard: {
    backgroundColor: 'white',
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  statusIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  statusEmoji: {
    fontSize: 40,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  statusDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  protectionStats: {
    flexDirection: 'row',
    width: '100%',
  },
  protectionStat: {
    flex: 1,
    alignItems: 'center',
  },
  protectionValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  protectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  protectionSubtext: {
    fontSize: 11,
    color: '#666',
  },
  protectionDivider: {
    width: 1,
    height: 50,
    backgroundColor: '#e0e0e0',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  sectionDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  alertBadge: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  alertBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  alertCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  alertHigh: {
    borderLeftColor: '#ef4444',
  },
  alertMedium: {
    borderLeftColor: '#f59e0b',
  },
  alertHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  alertIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  alertIconHigh: {
    backgroundColor: '#fee2e2',
  },
  alertIconMedium: {
    backgroundColor: '#fef3c7',
  },
  alertIconText: {
    fontSize: 24,
  },
  alertInfo: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  alertDetails: {
    marginBottom: 16,
  },
  alertDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  alertDetailLabel: {
    fontSize: 13,
    color: '#666',
  },
  alertDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  riskBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  riskHigh: {
    backgroundColor: '#fee2e2',
  },
  riskMedium: {
    backgroundColor: '#fef3c7',
  },
  riskText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#666',
  },
  alertActions: {
    flexDirection: 'row',
    gap: 8,
  },
  reportButton: {
    flex: 1,
    backgroundColor: '#ef4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  reportButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  verifyButton: {
    flex: 1,
    backgroundColor: '#10b981',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  verifyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  activityCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  verifiedIconText: {
    fontSize: 18,
    color: '#10b981',
  },
  activityMerchant: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: '#666',
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activityAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  scoreContainer: {
    flexDirection: 'row',
  },
  scoreText: {
    fontSize: 11,
    color: '#666',
  },
  scoreValue: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  featuresSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  settingsCard: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 14,
    color: '#333',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  settingArrow: {
    fontSize: 16,
    color: '#999',
  },
});
