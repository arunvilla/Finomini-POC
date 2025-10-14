import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import { colors } from '../theme/colors';

interface AddContributionScreenProps {
  onBack: () => void;
  goal?: any;
}

const quickAmounts = ['$25', '$50', '$100', '$250', '$500'];

export default function AddContributionScreen({ onBack, goal }: AddContributionScreenProps) {
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const handleQuickAmount = (quickAmount: string) => {
    setAmount(quickAmount.replace('$', ''));
  };

  const handleSave = () => {
    if (!amount) {
      Alert.alert('Missing Information', 'Please enter an amount');
      return;
    }

    Alert.alert('Success', `Added $${amount} to ${goal?.name || 'goal'}`, [
      { text: 'OK', onPress: onBack }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Contribution</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {goal && (
          <View style={[styles.goalCard, { borderLeftColor: goal.color || colors.primary }]}>
            <Text style={styles.goalIcon}>{goal.icon}</Text>
            <Text style={styles.goalName}>{goal.name}</Text>
            <Text style={styles.goalProgress}>
              ${goal.currentAmount?.toFixed(0)} of ${goal.targetAmount?.toFixed(0)}
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contribution Amount *</Text>
          <View style={styles.amountInput}>
            <Text style={styles.dollarSign}>$</Text>
            <TextInput
              style={styles.amountText}
              placeholder="0.00"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Amounts</Text>
          <View style={styles.quickAmountRow}>
            {quickAmounts.map((quickAmount) => (
              <TouchableOpacity
                key={quickAmount}
                style={styles.quickAmountButton}
                onPress={() => handleQuickAmount(quickAmount)}
              >
                <Text style={styles.quickAmountText}>{quickAmount}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes (Optional)</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            placeholder="Add a note about this contribution..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#9ca3af"
          />
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
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  goalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  goalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  goalProgress: {
    fontSize: 14,
    color: '#6b7280',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dollarSign: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6b7280',
    marginRight: 8,
  },
  amountText: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  quickAmountRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAmountButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 14,
    color: '#1f2937',
  },
  notesInput: {
    height: 100,
    paddingTop: 16,
  },
});
