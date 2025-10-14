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

interface BulkEditTransactionsScreenProps {
  onBack: () => void;
}

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  category: string;
}

export default function BulkEditTransactionsScreen({ onBack }: BulkEditTransactionsScreenProps) {
  const [transactions] = useState<Transaction[]>([
    { id: '1', merchant: 'Starbucks', amount: -5.50, date: '2024-10-01', category: 'Coffee' },
    { id: '2', merchant: 'Uber', amount: -18.25, date: '2024-10-01', category: 'Transportation' },
    { id: '3', merchant: 'Amazon', amount: -45.99, date: '2024-09-30', category: 'Shopping' },
    { id: '4', merchant: 'Whole Foods', amount: -127.45, date: '2024-09-30', category: 'Groceries' },
    { id: '5', merchant: 'Netflix', amount: -15.99, date: '2024-09-29', category: 'Entertainment' },
    { id: '6', merchant: 'Shell Gas', amount: -52.00, date: '2024-09-29', category: 'Gas' },
    { id: '7', merchant: 'Target', amount: -89.99, date: '2024-09-28', category: 'Shopping' },
  ]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedIds(transactions.map(t => t.id));
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  const handleBulkCategorize = () => {
    Alert.alert(
      'Bulk Categorize',
      `Change category for ${selectedIds.length} transaction(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Change',
          onPress: () => {
            Alert.alert('Success', `Updated ${selectedIds.length} transactions`);
            clearSelection();
          }
        }
      ]
    );
  };

  const handleBulkTag = () => {
    Alert.alert(
      'Bulk Tag',
      `Add tags to ${selectedIds.length} transaction(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add Tags',
          onPress: () => {
            Alert.alert('Success', `Tagged ${selectedIds.length} transactions`);
            clearSelection();
          }
        }
      ]
    );
  };

  const handleBulkDelete = () => {
    Alert.alert(
      'Delete Transactions',
      `Are you sure you want to delete ${selectedIds.length} transaction(s)? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', `Deleted ${selectedIds.length} transactions`);
            clearSelection();
          }
        }
      ]
    );
  };

  const allSelected = selectedIds.length === transactions.length && transactions.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bulk Edit</Text>
        <TouchableOpacity 
          onPress={allSelected ? clearSelection : selectAll}
          style={styles.selectAllButton}
        >
          <Text style={styles.selectAllText}>{allSelected ? 'Clear' : 'All'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.selectionBar}>
        <Text style={styles.selectionCount}>
          {selectedIds.length} selected
        </Text>
        {selectedIds.length > 0 && (
          <TouchableOpacity onPress={clearSelection}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.transactionsList}>
          {transactions.map((txn) => {
            const isSelected = selectedIds.includes(txn.id);
            return (
              <TouchableOpacity
                key={txn.id}
                style={[styles.transactionCard, isSelected && styles.transactionCardSelected]}
                onPress={() => toggleSelection(txn.id)}
              >
                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                  {isSelected && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.merchant}>{txn.merchant}</Text>
                  <View style={styles.metaRow}>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>{txn.category}</Text>
                    </View>
                    <Text style={styles.date}>{new Date(txn.date).toLocaleDateString()}</Text>
                  </View>
                </View>
                <Text style={styles.amount}>
                  ${Math.abs(txn.amount).toFixed(2)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {selectedIds.length > 0 && (
        <View style={styles.actionBar}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleBulkCategorize}
          >
            <Text style={styles.actionIcon}>🏷️</Text>
            <Text style={styles.actionLabel}>Category</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleBulkTag}
          >
            <Text style={styles.actionIcon}>🔖</Text>
            <Text style={styles.actionLabel}>Tag</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteAction]}
            onPress={handleBulkDelete}
          >
            <Text style={styles.actionIcon}>🗑️</Text>
            <Text style={[styles.actionLabel, styles.deleteLabel]}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
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
  selectAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.primary + '20',
    borderRadius: 8,
  },
  selectAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  selectionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  selectionCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  clearText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  transactionsList: {
    padding: 16,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  transactionCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '05',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionInfo: {
    flex: 1,
  },
  merchant: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryBadge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    color: '#6b7280',
  },
  date: {
    fontSize: 12,
    color: '#9ca3af',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  actionBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  deleteAction: {
    backgroundColor: '#fee2e2',
    borderColor: '#fecaca',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
  },
  deleteLabel: {
    color: '#dc2626',
  },
});
