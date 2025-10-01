import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

interface ReceiptScannerScreenProps {
  onBack?: () => void;
}

export default function ReceiptScannerScreen({ onBack }: ReceiptScannerScreenProps) {
  const [scannedReceipts, setScannedReceipts] = useState([
    {
      id: '1',
      merchant: 'Whole Foods Market',
      amount: 127.45,
      date: '2024-10-15',
      items: 15,
      category: 'Groceries',
      status: 'processed',
    },
    {
      id: '2',
      merchant: 'Shell Gas Station',
      amount: 52.30,
      date: '2024-10-14',
      items: 2,
      category: 'Transportation',
      status: 'processed',
    },
    {
      id: '3',
      merchant: 'Target',
      amount: 89.99,
      date: '2024-10-12',
      items: 8,
      category: 'Shopping',
      status: 'reviewing',
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Receipt Scanner</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.scannerCard}>
          <View style={styles.scannerIcon}>
            <Text style={styles.scannerEmoji}>📸</Text>
          </View>
          <Text style={styles.scannerTitle}>AI-Powered Receipt Scanner</Text>
          <Text style={styles.scannerDescription}>
            Take a photo of your receipt and let our AI automatically extract and categorize the transaction details
          </Text>
          
          <TouchableOpacity style={styles.scanButton}>
            <Text style={styles.scanButtonIcon}>📷</Text>
            <Text style={styles.scanButtonText}>Scan New Receipt</Text>
          </TouchableOpacity>
          
          <View style={styles.features}>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>✨</Text>
              <Text style={styles.featureText}>Auto-categorize</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🔍</Text>
              <Text style={styles.featureText}>Extract details</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>💾</Text>
              <Text style={styles.featureText}>Store digitally</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Scans</Text>
            <Text style={styles.sectionCount}>{scannedReceipts.length}</Text>
          </View>

          {scannedReceipts.map((receipt) => (
            <TouchableOpacity key={receipt.id} style={styles.receiptCard}>
              <View style={styles.receiptLeft}>
                <View style={[
                  styles.receiptIcon,
                  receipt.status === 'processed' ? styles.processedIcon : styles.reviewingIcon
                ]}>
                  <Text style={styles.receiptIconText}>
                    {receipt.status === 'processed' ? '✓' : '⟳'}
                  </Text>
                </View>
                <View style={styles.receiptInfo}>
                  <Text style={styles.receiptMerchant}>{receipt.merchant}</Text>
                  <Text style={styles.receiptDate}>
                    {new Date(receipt.date).toLocaleDateString()} • {receipt.items} items
                  </Text>
                  <View style={styles.receiptCategory}>
                    <Text style={styles.categoryText}>{receipt.category}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.receiptRight}>
                <Text style={styles.receiptAmount}>${receipt.amount.toFixed(2)}</Text>
                <Text style={[
                  styles.receiptStatus,
                  receipt.status === 'processed' ? styles.statusProcessed : styles.statusReviewing
                ]}>
                  {receipt.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tipsCard}>
          <Text style={styles.tipsIcon}>💡</Text>
          <View style={styles.tipsContent}>
            <Text style={styles.tipsTitle}>Tips for Best Results</Text>
            <View style={styles.tipsList}>
              <Text style={styles.tipItem}>• Ensure receipt is well-lit and flat</Text>
              <Text style={styles.tipItem}>• Capture entire receipt in frame</Text>
              <Text style={styles.tipItem}>• Avoid shadows and glare</Text>
              <Text style={styles.tipItem}>• Hold camera steady for clarity</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>127</Text>
              <Text style={styles.statLabel}>Total Scans</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>$3,456</Text>
              <Text style={styles.statLabel}>Total Amount</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>98%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
          </View>
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
  scannerCard: {
    backgroundColor: 'white',
    padding: 24,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  scannerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ede9fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  scannerEmoji: {
    fontSize: 40,
  },
  scannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  scannerDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7c3aed',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  scanButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  features: {
    flexDirection: 'row',
    gap: 20,
  },
  feature: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: '#666',
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
  sectionCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  receiptCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  receiptLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  receiptIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  processedIcon: {
    backgroundColor: '#dcfce7',
  },
  reviewingIcon: {
    backgroundColor: '#fef3c7',
  },
  receiptIconText: {
    fontSize: 24,
  },
  receiptInfo: {
    flex: 1,
  },
  receiptMerchant: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  receiptDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  receiptCategory: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  receiptRight: {
    alignItems: 'flex-end',
  },
  receiptAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  receiptStatus: {
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusProcessed: {
    backgroundColor: '#dcfce7',
    color: '#059669',
  },
  statusReviewing: {
    backgroundColor: '#fef3c7',
    color: '#d97706',
  },
  tipsCard: {
    backgroundColor: '#eff6ff',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    flexDirection: 'row',
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  tipsIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tipsContent: {
    flex: 1,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  tipsList: {
    gap: 4,
  },
  tipItem: {
    fontSize: 13,
    color: '#1e3a8a',
    lineHeight: 18,
  },
  statsCard: {
    backgroundColor: 'white',
    padding: 20,
    margin: 16,
    borderRadius: 12,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
});
