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

interface SplitTransactionScreenProps {
  onBack: () => void;
  transaction?: any;
}

interface SplitItem {
  id: string;
  amount: string;
  category: string;
  notes: string;
}

const categories = [
  { id: '1', name: 'Food & Dining', icon: '🍽️' },
  { id: '2', name: 'Transportation', icon: '🚗' },
  { id: '3', name: 'Shopping', icon: '🛍️' },
  { id: '4', name: 'Entertainment', icon: '🎬' },
  { id: '5', name: 'Gas', icon: '⛽' },
  { id: '6', name: 'Grocery', icon: '🛒' },
  { id: '7', name: 'Bills & Utilities', icon: '📄' }
];

export default function SplitTransactionScreen({ onBack, transaction }: SplitTransactionScreenProps) {
  const originalAmount = Math.abs(transaction?.amount || 89.99);
  const originalMerchant = transaction?.merchant || 'Target';

  const [splitItems, setSplitItems] = useState<SplitItem[]>([
    { id: '1', amount: '', category: '', notes: '' },
    { id: '2', amount: '', category: '', notes: '' }
  ]);

  const totalSplitAmount = splitItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  const remainingAmount = originalAmount - totalSplitAmount;

  const addSplitItem = () => {
    const newItem: SplitItem = {
      id: Date.now().toString(),
      amount: remainingAmount > 0 ? remainingAmount.toFixed(2) : '',
      category: '',
      notes: ''
    };
    setSplitItems([...splitItems, newItem]);
  };

  const removeSplitItem = (id: string) => {
    if (splitItems.length > 2) {
      setSplitItems(splitItems.filter(item => item.id !== id));
    }
  };

  const updateSplitItem = (id: string, field: keyof SplitItem, value: string) => {
    setSplitItems(splitItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSave = () => {
    const invalidItems = splitItems.filter(item => !item.amount || !item.category);
    if (invalidItems.length > 0) {
      Alert.alert('Incomplete', 'Please fill in amount and category for all split items');
      return;
    }

    if (Math.abs(totalSplitAmount - originalAmount) > 0.01) {
      Alert.alert('Amount Mismatch', 'Split amounts must equal the original transaction amount');
      return;
    }

    Alert.alert('Success', 'Transaction split successfully', [
      { text: 'OK', onPress: onBack }
    ]);
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Split Transaction</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.originalCard}>
          <Text style={styles.originalLabel}>Original Transaction</Text>
          <Text style={styles.originalMerchant}>{originalMerchant}</Text>
          <Text style={styles.originalAmount}>${originalAmount.toFixed(2)}</Text>
        </View>

        <View style={styles.remainingCard}>
          <Text style={styles.remainingLabel}>Remaining to Allocate</Text>
          <Text style={[
            styles.remainingAmount,
            remainingAmount < 0 && styles.remainingAmountNegative
          ]}>
            ${Math.abs(remainingAmount).toFixed(2)}
          </Text>
        </View>

        <View style={styles.splitsSection}>
          <Text style={styles.sectionTitle}>Split Items ({splitItems.length})</Text>
          {splitItems.map((item, index) => (
            <View key={item.id} style={styles.splitCard}>
              <View style={styles.splitHeader}>
                <Text style={styles.splitNumber}>Split {index + 1}</Text>
                {splitItems.length > 2 && (
                  <TouchableOpacity
                    onPress={() => removeSplitItem(item.id)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.splitField}>
                <Text style={styles.fieldLabel}>Amount *</Text>
                <View style={styles.amountInput}>
                  <Text style={styles.dollarSign}>$</Text>
                  <TextInput
                    style={styles.amountText}
                    placeholder="0.00"
                    value={item.amount}
                    onChangeText={(value) => updateSplitItem(item.id, 'amount', value)}
                    keyboardType="decimal-pad"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              <View style={styles.splitField}>
                <Text style={styles.fieldLabel}>Category *</Text>
                <View style={styles.categoryGrid}>
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat.id}
                      style={[
                        styles.categoryButton,
                        item.category === cat.id && styles.categoryButtonActive
                      ]}
                      onPress={() => updateSplitItem(item.id, 'category', cat.id)}
                    >
                      <Text style={styles.categoryIcon}>{cat.icon}</Text>
                      <Text style={styles.categoryName}>{cat.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.splitField}>
                <Text style={styles.fieldLabel}>Notes (Optional)</Text>
                <TextInput
                  style={styles.notesInput}
                  placeholder="Add notes..."
                  value={item.notes}
                  onChangeText={(value) => updateSplitItem(item.id, 'notes', value)}
                  multiline
                  numberOfLines={2}
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.addSplitButton} onPress={addSplitItem}>
            <Text style={styles.addSplitButtonText}>+ Add Another Split</Text>
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
  originalCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  originalLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  originalMerchant: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  originalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  remainingCard: {
    backgroundColor: colors.primary + '10',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  remainingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  remainingAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  remainingAmountNegative: {
    color: '#ef4444',
  },
  splitsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  splitCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  splitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  splitNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    fontSize: 16,
    color: '#dc2626',
    fontWeight: 'bold',
  },
  splitField: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dollarSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6b7280',
    marginRight: 8,
  },
  amountText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  categoryButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1f2937',
    flex: 1,
  },
  notesInput: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 14,
    color: '#1f2937',
    minHeight: 60,
    textAlignVertical: 'top',
  },
  addSplitButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  addSplitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});
