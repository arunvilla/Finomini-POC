import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

interface AIReceiptListScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export default function AIReceiptListScreen({ onBack, onNavigate }: AIReceiptListScreenProps) {
  const [filter, setFilter] = useState<'all' | 'processed' | 'pending'>('all');

  const receipts = [
    {
      id: '1',
      merchant: 'Whole Foods',
      amount: 156.78,
      date: '2025-09-28',
      category: 'Groceries',
      status: 'processed',
      thumbnail: '🧾',
    },
    {
      id: '2',
      merchant: 'Shell Gas Station',
      amount: 45.20,
      date: '2025-09-26',
      category: 'Transportation',
      status: 'processed',
      thumbnail: '🧾',
    },
    {
      id: '3',
      merchant: 'Amazon',
      amount: 89.45,
      date: '2025-09-24',
      category: 'Shopping',
      status: 'pending',
      thumbnail: '🧾',
    },
    {
      id: '4',
      merchant: 'Target',
      amount: 124.50,
      date: '2025-09-22',
      category: 'Shopping',
      status: 'processed',
      thumbnail: '🧾',
    },
    {
      id: '5',
      merchant: 'Starbucks',
      amount: 6.75,
      date: '2025-09-20',
      category: 'Dining',
      status: 'processed',
      thumbnail: '🧾',
    },
  ];

  const filteredReceipts = filter === 'all' 
    ? receipts 
    : receipts.filter(r => r.status === filter);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Receipts</Text>
        <TouchableOpacity 
          style={styles.scanButton}
          onPress={() => onNavigate?.('receipt-scanner')}
        >
          <Text style={styles.scanIcon}>📷</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            All ({receipts.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'processed' && styles.filterButtonActive]}
          onPress={() => setFilter('processed')}
        >
          <Text style={[styles.filterText, filter === 'processed' && styles.filterTextActive]}>
            Processed ({receipts.filter(r => r.status === 'processed').length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'pending' && styles.filterButtonActive]}
          onPress={() => setFilter('pending')}
        >
          <Text style={[styles.filterText, filter === 'pending' && styles.filterTextActive]}>
            Pending ({receipts.filter(r => r.status === 'pending').length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {filteredReceipts.map((receipt) => (
          <TouchableOpacity
            key={receipt.id}
            style={styles.receiptCard}
            onPress={() => onNavigate?.('ai-receipt-details', receipt)}
          >
            <View style={styles.receiptThumbnail}>
              <Text style={styles.thumbnailEmoji}>{receipt.thumbnail}</Text>
            </View>
            <View style={styles.receiptInfo}>
              <Text style={styles.merchantName}>{receipt.merchant}</Text>
              <Text style={styles.category}>{receipt.category}</Text>
              <Text style={styles.date}>{receipt.date}</Text>
            </View>
            <View style={styles.receiptRight}>
              <Text style={styles.amount}>${receipt.amount.toFixed(2)}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: receipt.status === 'processed' ? '#d1fae5' : '#fef3c7' }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: receipt.status === 'processed' ? '#10b981' : '#f59e0b' }
                ]}>
                  {receipt.status === 'processed' ? '✓ Processed' : '⏳ Pending'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>📸</Text>
          <Text style={styles.emptyTitle}>Scan More Receipts</Text>
          <Text style={styles.emptyText}>
            Keep track of your purchases by scanning receipts
          </Text>
          <TouchableOpacity 
            style={styles.scanLargeButton}
            onPress={() => onNavigate?.('receipt-scanner')}
          >
            <Text style={styles.scanLargeButtonText}>Scan Receipt</Text>
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
  scanButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanIcon: {
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  receiptCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  receiptThumbnail: {
    width: 64,
    height: 80,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  thumbnailEmoji: {
    fontSize: 32,
  },
  receiptInfo: {
    flex: 1,
  },
  merchantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: '#9ca3af',
  },
  receiptRight: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
    marginTop: 32,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  scanLargeButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  scanLargeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
