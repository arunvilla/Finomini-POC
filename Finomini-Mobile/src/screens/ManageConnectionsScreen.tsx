import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';

interface ManageConnectionsScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export default function ManageConnectionsScreen({ onBack, onNavigate }: ManageConnectionsScreenProps) {
  const connections = [
    {
      id: '1',
      institution: 'Chase Bank',
      logo: '🏦',
      accounts: 2,
      lastSync: '2 mins ago',
      status: 'connected',
      needsAttention: false,
    },
    {
      id: '2',
      institution: 'Fidelity Investments',
      logo: '📈',
      accounts: 1,
      lastSync: '1 hour ago',
      status: 'connected',
      needsAttention: false,
    },
    {
      id: '3',
      institution: 'American Express',
      logo: '💳',
      accounts: 1,
      lastSync: '5 hours ago',
      status: 'needs_attention',
      needsAttention: true,
    },
  ];

  const handleSync = (institutionName: string) => {
    Alert.alert('Syncing', `Syncing ${institutionName}...`);
  };

  const handleReconnect = (institutionName: string) => {
    Alert.alert('Reconnect', `Please re-enter your credentials for ${institutionName}`);
  };

  const handleRemove = (institutionName: string) => {
    Alert.alert(
      'Remove Connection',
      `Are you sure you want to remove ${institutionName}? This will hide all associated accounts.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Connections</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => onNavigate?.('add-account')}
        >
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{connections.length}</Text>
              <Text style={styles.summaryLabel}>Institutions</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>
                {connections.reduce((sum, c) => sum + c.accounts, 0)}
              </Text>
              <Text style={styles.summaryLabel}>Accounts</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: '#ef4444' }]}>
                {connections.filter(c => c.needsAttention).length}
              </Text>
              <Text style={styles.summaryLabel}>Need Attention</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connected Institutions</Text>
          
          {connections.map((connection) => (
            <View key={connection.id} style={styles.connectionCard}>
              <View style={styles.connectionHeader}>
                <View style={styles.connectionLeft}>
                  <View style={styles.institutionLogo}>
                    <Text style={styles.logoEmoji}>{connection.logo}</Text>
                  </View>
                  <View>
                    <Text style={styles.institutionName}>{connection.institution}</Text>
                    <Text style={styles.accountCount}>{connection.accounts} accounts</Text>
                  </View>
                </View>
                {connection.needsAttention && (
                  <View style={styles.warningBadge}>
                    <Text style={styles.warningText}>!</Text>
                  </View>
                )}
              </View>

              <View style={styles.connectionStatus}>
                <View style={[styles.statusDot, { 
                  backgroundColor: connection.status === 'connected' ? '#10b981' : '#ef4444' 
                }]} />
                <Text style={styles.statusText}>
                  {connection.status === 'connected' ? 'Connected' : 'Needs Attention'}
                </Text>
                <Text style={styles.lastSync}> • Last sync {connection.lastSync}</Text>
              </View>

              <View style={styles.actionButtons}>
                {connection.needsAttention ? (
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.reconnectButton]}
                    onPress={() => handleReconnect(connection.institution)}
                  >
                    <Text style={styles.reconnectButtonText}>Reconnect</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.syncButton]}
                    onPress={() => handleSync(connection.institution)}
                  >
                    <Text style={styles.syncButtonText}>Sync Now</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity 
                  style={[styles.actionButton, styles.removeButton]}
                  onPress={() => handleRemove(connection.institution)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.addConnectionButton}
          onPress={() => onNavigate?.('add-account')}
        >
          <Text style={styles.addConnectionText}>+ Add New Institution</Text>
        </TouchableOpacity>
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
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  summaryCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  section: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  connectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  connectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  connectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  institutionLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoEmoji: {
    fontSize: 24,
  },
  institutionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  accountCount: {
    fontSize: 13,
    color: '#6b7280',
  },
  warningBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fef3c7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  lastSync: {
    fontSize: 13,
    color: '#6b7280',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  syncButton: {
    backgroundColor: '#eff6ff',
  },
  syncButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
  reconnectButton: {
    backgroundColor: '#fef3c7',
  },
  reconnectButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f59e0b',
  },
  removeButton: {
    backgroundColor: '#fee2e2',
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
  },
  addConnectionButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#d1d5db',
    alignItems: 'center',
  },
  addConnectionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
});
