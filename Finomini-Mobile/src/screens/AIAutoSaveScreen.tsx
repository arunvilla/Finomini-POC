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
  Alert,
} from 'react-native';

interface AIAutoSaveScreenProps {
  onBack?: () => void;
}

export default function AIAutoSaveScreen({ onBack }: AIAutoSaveScreenProps) {
  const [roundUpEnabled, setRoundUpEnabled] = useState(true);
  const [smartSaveEnabled, setSmartSaveEnabled] = useState(true);
  const [paydaySaveEnabled, setPaydaySaveEnabled] = useState(false);

  const savingsData = {
    thisMonth: 284.50,
    thisYear: 2856.00,
    roundUp: 42.50,
    smartSave: 192.00,
    payday: 50.00,
  };

  const handleSetupRule = (ruleType: string) => {
    Alert.alert('Setup Rule', `Configure ${ruleType} automation`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Auto-Save</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.heroIcon}>💰</Text>
          <Text style={styles.heroTitle}>Automatic Savings</Text>
          <Text style={styles.heroAmount}>${savingsData.thisMonth.toFixed(2)}</Text>
          <Text style={styles.heroLabel}>Saved this month</Text>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>${savingsData.thisYear.toLocaleString()}</Text>
              <Text style={styles.statLabel}>This Year</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>${(savingsData.thisYear / 12).toFixed(0)}</Text>
              <Text style={styles.statLabel}>Avg/Month</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Savings Rules</Text>
          
          <View style={styles.ruleCard}>
            <View style={styles.ruleHeader}>
              <View style={styles.ruleLeft}>
                <Text style={styles.ruleIcon}>🪙</Text>
                <View>
                  <Text style={styles.ruleTitle}>Round-Up Savings</Text>
                  <Text style={styles.ruleDescription}>Round purchases to nearest dollar</Text>
                  <Text style={styles.ruleSaved}>Saved: ${savingsData.roundUp.toFixed(2)} this month</Text>
                </View>
              </View>
              <Switch value={roundUpEnabled} onValueChange={setRoundUpEnabled} />
            </View>
          </View>

          <View style={styles.ruleCard}>
            <View style={styles.ruleHeader}>
              <View style={styles.ruleLeft}>
                <Text style={styles.ruleIcon}>🤖</Text>
                <View>
                  <Text style={styles.ruleTitle}>Smart Save</Text>
                  <Text style={styles.ruleDescription}>AI saves when you can afford it</Text>
                  <Text style={styles.ruleSaved}>Saved: ${savingsData.smartSave.toFixed(2)} this month</Text>
                </View>
              </View>
              <Switch value={smartSaveEnabled} onValueChange={setSmartSaveEnabled} />
            </View>
          </View>

          <View style={styles.ruleCard}>
            <View style={styles.ruleHeader}>
              <View style={styles.ruleLeft}>
                <Text style={styles.ruleIcon}>💵</Text>
                <View>
                  <Text style={styles.ruleTitle}>Payday Savings</Text>
                  <Text style={styles.ruleDescription}>Auto-save on paycheck deposit</Text>
                  <Text style={styles.ruleSaved}>Not active</Text>
                </View>
              </View>
              <Switch value={paydaySaveEnabled} onValueChange={setPaydaySaveEnabled} />
            </View>
            {paydaySaveEnabled && (
              <TouchableOpacity 
                style={styles.setupButton}
                onPress={() => handleSetupRule('Payday Savings')}
              >
                <Text style={styles.setupButtonText}>Configure Amount</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.insightCard}>
          <Text style={styles.insightIcon}>💡</Text>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>AI Insight</Text>
            <Text style={styles.insightText}>
              Based on your spending patterns, you could comfortably save an additional $150/month. 
              Consider increasing your auto-save rules.
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.addRuleButton} onPress={() => handleSetupRule('New')}>
          <Text style={styles.addRuleText}>+ Add New Rule</Text>
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
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  heroCard: {
    margin: 16,
    padding: 32,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  heroIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  heroAmount: {
    fontSize: 42,
    fontWeight: '700',
    color: '#10b981',
    marginBottom: 8,
  },
  heroLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  statsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statRow: {
    flexDirection: 'row',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
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
  ruleCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  ruleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ruleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ruleIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  ruleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  ruleDescription: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
  },
  ruleSaved: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10b981',
  },
  setupButton: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    alignItems: 'center',
  },
  setupButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
  insightCard: {
    flexDirection: 'row',
    margin: 16,
    padding: 16,
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  insightIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#166534',
    marginBottom: 4,
  },
  insightText: {
    fontSize: 14,
    color: '#15803d',
    lineHeight: 20,
  },
  addRuleButton: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#d1d5db',
    alignItems: 'center',
  },
  addRuleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
});
