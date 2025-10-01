import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { colors } from '../theme/colors';

interface BudgetSettingsScreenProps {
  onBack: () => void;
}

export default function BudgetSettingsScreen({ onBack }: BudgetSettingsScreenProps) {
  const [budgetStartDay, setBudgetStartDay] = useState('1st of month');
  const [defaultBudgetType, setDefaultBudgetType] = useState('fixed');
  const [showBudgetOnDashboard, setShowBudgetOnDashboard] = useState(true);
  const [autoAdjustBudgets, setAutoAdjustBudgets] = useState(false);
  const [showHiddenBudgets, setShowHiddenBudgets] = useState(false);
  const [rolloverUnusedFunds, setRolloverUnusedFunds] = useState(true);

  const handleResetBudgets = () => {
    Alert.alert(
      'Reset All Budgets',
      'This will reset all budget amounts and progress. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'All budgets have been reset')
        }
      ]
    );
  };

  const handleDeleteHistory = () => {
    Alert.alert(
      'Delete Budget History',
      'This will permanently delete all budget history data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'Budget history deleted')
        }
      ]
    );
  };

  const startDayOptions = ['1st of month', '15th of month', 'Payday'];
  const budgetTypeOptions = [
    { id: 'fixed', name: 'Fixed Monthly', description: 'Same amount each month' },
    { id: 'rollover', name: 'Rollover', description: 'Unused funds carry over' },
    { id: 'flex', name: 'Flex Budget', description: 'Adjusts based on income' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Budget Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingTitle}>Budget Start Day</Text>
                <Text style={styles.settingDescription}>Day of the month when budget period starts</Text>
              </View>
            </View>
            <View style={styles.optionList}>
              {startDayOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    budgetStartDay === option && styles.optionButtonActive
                  ]}
                  onPress={() => setBudgetStartDay(option)}
                >
                  <Text style={[
                    styles.optionButtonText,
                    budgetStartDay === option && styles.optionButtonTextActive
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingTitle}>Default Budget Type</Text>
                <Text style={styles.settingDescription}>Default type for new budget categories</Text>
              </View>
            </View>
            <View style={styles.optionList}>
              {budgetTypeOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.budgetTypeOption,
                    defaultBudgetType === option.id && styles.budgetTypeOptionActive
                  ]}
                  onPress={() => setDefaultBudgetType(option.id)}
                >
                  <View style={styles.optionContent}>
                    <Text style={styles.optionName}>{option.name}</Text>
                    <Text style={styles.optionDescription}>{option.description}</Text>
                  </View>
                  {defaultBudgetType === option.id && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>

          <View style={styles.settingCard}>
            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => setShowBudgetOnDashboard(!showBudgetOnDashboard)}
            >
              <View style={styles.settingLeft}>
                <Text style={styles.settingTitle}>Show Budget Progress on Dashboard</Text>
                <Text style={styles.settingDescription}>Display budget widget on main dashboard</Text>
              </View>
              <View style={[styles.toggle, showBudgetOnDashboard && styles.toggleActive]}>
                <View style={[styles.toggleThumb, showBudgetOnDashboard && styles.toggleThumbActive]} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.settingCard}>
            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => setShowHiddenBudgets(!showHiddenBudgets)}
            >
              <View style={styles.settingLeft}>
                <Text style={styles.settingTitle}>Show Hidden Budgets</Text>
                <Text style={styles.settingDescription}>Display budgets marked as hidden</Text>
              </View>
              <View style={[styles.toggle, showHiddenBudgets && styles.toggleActive]}>
                <View style={[styles.toggleThumb, showHiddenBudgets && styles.toggleThumbActive]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Behavior</Text>

          <View style={styles.settingCard}>
            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => setRolloverUnusedFunds(!rolloverUnusedFunds)}
            >
              <View style={styles.settingLeft}>
                <Text style={styles.settingTitle}>Rollover Unused Funds</Text>
                <Text style={styles.settingDescription}>Carry over unspent budget to next period</Text>
              </View>
              <View style={[styles.toggle, rolloverUnusedFunds && styles.toggleActive]}>
                <View style={[styles.toggleThumb, rolloverUnusedFunds && styles.toggleThumbActive]} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.settingCard}>
            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => setAutoAdjustBudgets(!autoAdjustBudgets)}
            >
              <View style={styles.settingLeft}>
                <Text style={styles.settingTitle}>Auto-Adjust Budgets</Text>
                <Text style={styles.settingDescription}>Automatically adjust based on spending patterns</Text>
              </View>
              <View style={[styles.toggle, autoAdjustBudgets && styles.toggleActive]}>
                <View style={[styles.toggleThumb, autoAdjustBudgets && styles.toggleThumbActive]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>

          <TouchableOpacity style={styles.dangerButton} onPress={handleResetBudgets}>
            <Text style={styles.dangerButtonIcon}>🔄</Text>
            <View style={styles.dangerButtonContent}>
              <Text style={styles.dangerButtonTitle}>Reset All Budgets</Text>
              <Text style={styles.dangerButtonDescription}>Clear all budget amounts and progress</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dangerButton} onPress={handleDeleteHistory}>
            <Text style={styles.dangerButtonIcon}>🗑️</Text>
            <View style={styles.dangerButtonContent}>
              <Text style={styles.dangerButtonTitle}>Delete Budget History</Text>
              <Text style={styles.dangerButtonDescription}>Permanently remove all historical data</Text>
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
  settingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  settingRow: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
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
  optionList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  optionButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    textAlign: 'center',
  },
  optionButtonTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  budgetTypeOption: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  budgetTypeOptionActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  optionContent: {
    flex: 1,
  },
  optionName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  checkmark: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
  },
  dangerButton: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
    alignItems: 'center',
  },
  dangerButtonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  dangerButtonContent: {
    flex: 1,
  },
  dangerButtonTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 2,
  },
  dangerButtonDescription: {
    fontSize: 13,
    color: '#991b1b',
  },
});
