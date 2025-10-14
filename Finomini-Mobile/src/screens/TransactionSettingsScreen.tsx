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

interface TransactionSettingsScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
}

export default function TransactionSettingsScreen({ onBack, onNavigate }: TransactionSettingsScreenProps) {
  const [autoCategorize, setAutoCategorize] = useState(true);
  const [showPending, setShowPending] = useState(true);
  const [duplicateDetection, setDuplicateDetection] = useState(true);
  const [merchantEnrichment, setMerchantEnrichment] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Automation</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🤖</Text>
              <View>
                <Text style={styles.settingLabel}>Auto-Categorize</Text>
                <Text style={styles.settingDescription}>Automatically assign categories</Text>
              </View>
            </View>
            <Switch value={autoCategorize} onValueChange={setAutoCategorize} />
          </View>

          <TouchableOpacity 
            style={styles.actionRow}
            onPress={() => onNavigate?.('transaction-rules')}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>📋</Text>
              <View>
                <Text style={styles.settingLabel}>Transaction Rules</Text>
                <Text style={styles.settingDescription}>Manage auto-categorization rules</Text>
              </View>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔍</Text>
              <View>
                <Text style={styles.settingLabel}>Duplicate Detection</Text>
                <Text style={styles.settingDescription}>Identify duplicate transactions</Text>
              </View>
            </View>
            <Switch value={duplicateDetection} onValueChange={setDuplicateDetection} />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🏪</Text>
              <View>
                <Text style={styles.settingLabel}>Merchant Enrichment</Text>
                <Text style={styles.settingDescription}>Enhance merchant information</Text>
              </View>
            </View>
            <Switch value={merchantEnrichment} onValueChange={setMerchantEnrichment} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>⏳</Text>
              <View>
                <Text style={styles.settingLabel}>Show Pending Transactions</Text>
                <Text style={styles.settingDescription}>Display unposted transactions</Text>
              </View>
            </View>
            <Switch value={showPending} onValueChange={setShowPending} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tools</Text>
          
          <TouchableOpacity 
            style={styles.actionRow}
            onPress={() => onNavigate?.('bulk-edit-transactions')}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>✏️</Text>
              <Text style={styles.settingLabel}>Bulk Edit Transactions</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionRow}
            onPress={() => onNavigate?.('merchant-trends')}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>📊</Text>
              <Text style={styles.settingLabel}>Merchant Trends</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionRow}
            onPress={() => onNavigate?.('split-transaction')}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>✂️</Text>
              <Text style={styles.settingLabel}>Split Transaction</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Transaction Processing</Text>
          <Text style={styles.infoText}>
            Transactions are automatically synced from your accounts. Pending transactions may take 1-3 days to clear.
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
