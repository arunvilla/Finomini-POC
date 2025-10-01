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

interface AIDuplicateDetectionScreenProps {
  onBack?: () => void;
}

export default function AIDuplicateDetectionScreen({ onBack }: AIDuplicateDetectionScreenProps) {
  const duplicates = [
    {
      id: '1',
      merchant: 'Amazon',
      amount: 89.45,
      date1: '2025-09-24',
      date2: '2025-09-24',
      confidence: 98,
      account1: 'Chase Checking',
      account2: 'Chase Credit Card',
    },
    {
      id: '2',
      merchant: 'Shell Gas',
      amount: 45.20,
      date1: '2025-09-26',
      date2: '2025-09-27',
      confidence: 85,
      account1: 'Chase Checking',
      account2: 'Chase Checking',
    },
    {
      id: '3',
      merchant: 'Starbucks',
      amount: 6.75,
      date1: '2025-09-20',
      date2: '2025-09-20',
      confidence: 92,
      account1: 'Amex',
      account2: 'Amex',
    },
  ];

  const handleMergeDuplicate = (duplicateId: string) => {
    Alert.alert(
      'Merge Transactions',
      'This will merge these duplicate transactions into one. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Merge', onPress: () => Alert.alert('Success', 'Transactions merged successfully') },
      ]
    );
  };

  const handleKeepBoth = (duplicateId: string) => {
    Alert.alert('Success', 'Both transactions will be kept');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Duplicate Detection</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryIcon}>🔍</Text>
          <Text style={styles.summaryTitle}>Potential Duplicates Found</Text>
          <Text style={styles.summaryCount}>{duplicates.length} matches</Text>
          <Text style={styles.summaryText}>
            Review these transactions that may be duplicates
          </Text>
        </View>

        {duplicates.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>✨</Text>
            <Text style={styles.emptyTitle}>No Duplicates Found</Text>
            <Text style={styles.emptyText}>
              Your transactions are clean! We'll notify you if we detect any duplicates.
            </Text>
          </View>
        ) : (
          duplicates.map((duplicate) => (
            <View key={duplicate.id} style={styles.duplicateCard}>
              <View style={styles.confidenceBadge}>
                <Text style={styles.confidenceText}>{duplicate.confidence}% match</Text>
              </View>

              <View style={styles.merchantRow}>
                <Text style={styles.merchantIcon}>🏪</Text>
                <Text style={styles.merchantName}>{duplicate.merchant}</Text>
              </View>

              <View style={styles.amountRow}>
                <Text style={styles.amountLabel}>Amount</Text>
                <Text style={styles.amountValue}>${duplicate.amount.toFixed(2)}</Text>
              </View>

              <View style={styles.transactionComparison}>
                <View style={styles.transactionBox}>
                  <Text style={styles.transactionLabel}>Transaction 1</Text>
                  <Text style={styles.transactionDetail}>{duplicate.date1}</Text>
                  <Text style={styles.transactionDetail}>{duplicate.account1}</Text>
                </View>
                <Text style={styles.vsText}>vs</Text>
                <View style={styles.transactionBox}>
                  <Text style={styles.transactionLabel}>Transaction 2</Text>
                  <Text style={styles.transactionDetail}>{duplicate.date2}</Text>
                  <Text style={styles.transactionDetail}>{duplicate.account2}</Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.mergeButton]}
                  onPress={() => handleMergeDuplicate(duplicate.id)}
                >
                  <Text style={styles.mergeButtonText}>Merge</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.keepButton]}
                  onPress={() => handleKeepBoth(duplicate.id)}
                >
                  <Text style={styles.keepButtonText}>Keep Both</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>How It Works</Text>
          <Text style={styles.infoText}>
            Our AI compares transaction amounts, merchants, dates, and accounts to identify potential duplicates. 
            Merging duplicates helps maintain accurate spending insights.
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
  summaryCard: {
    margin: 16,
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  summaryCount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#f59e0b',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  duplicateCard: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  confidenceBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    marginBottom: 12,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f59e0b',
  },
  merchantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  merchantIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  merchantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  amountLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  amountValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  transactionComparison: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  transactionBox: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  transactionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  transactionDetail: {
    fontSize: 13,
    color: '#111827',
    marginBottom: 4,
  },
  vsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9ca3af',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  mergeButton: {
    backgroundColor: '#2563eb',
  },
  mergeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  keepButton: {
    backgroundColor: '#f3f4f6',
  },
  keepButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  emptyState: {
    alignItems: 'center',
    padding: 48,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  infoCard: {
    margin: 16,
    marginTop: 0,
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
