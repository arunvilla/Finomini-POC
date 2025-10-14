import React, { useState } from 'react';
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

interface AIOCRDocumentScannerScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export default function AIOCRDocumentScannerScreen({ onBack, onNavigate }: AIOCRDocumentScannerScreenProps) {
  const [scanning, setScanning] = useState(false);

  const documentTypes = [
    { id: 'receipt', icon: '🧾', title: 'Receipt', description: 'Scan purchase receipts' },
    { id: 'invoice', icon: '📄', title: 'Invoice', description: 'Scan bills and invoices' },
    { id: 'statement', icon: '📊', title: 'Bank Statement', description: 'Scan financial statements' },
    { id: 'contract', icon: '📝', title: 'Contract', description: 'Scan agreements and contracts' },
  ];

  const recentScans = [
    { id: '1', type: 'Receipt', merchant: 'Whole Foods', amount: 156.78, date: '2025-09-28' },
    { id: '2', type: 'Invoice', merchant: 'PG&E', amount: 124.30, date: '2025-09-27' },
    { id: '3', type: 'Receipt', merchant: 'Amazon', amount: 89.45, date: '2025-09-26' },
  ];

  const handleScan = (type: string) => {
    Alert.alert(
      'Scan Document',
      'Camera will open to scan your document',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Camera', onPress: () => setScanning(true) },
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
        <Text style={styles.headerTitle}>Document Scanner</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.heroIcon}>📸</Text>
          <Text style={styles.heroTitle}>AI-Powered OCR</Text>
          <Text style={styles.heroText}>
            Scan documents and let AI extract data automatically
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Document Type</Text>
          {documentTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={styles.typeCard}
              onPress={() => handleScan(type.id)}
            >
              <View style={styles.typeLeft}>
                <View style={styles.typeIcon}>
                  <Text style={styles.typeEmoji}>{type.icon}</Text>
                </View>
                <View>
                  <Text style={styles.typeTitle}>{type.title}</Text>
                  <Text style={styles.typeDescription}>{type.description}</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Scans</Text>
          {recentScans.map((scan) => (
            <TouchableOpacity
              key={scan.id}
              style={styles.scanCard}
              onPress={() => onNavigate?.('scan-detail', scan)}
            >
              <View style={styles.scanLeft}>
                <View style={styles.scanIcon}>
                  <Text style={styles.scanEmoji}>📄</Text>
                </View>
                <View>
                  <Text style={styles.scanMerchant}>{scan.merchant}</Text>
                  <Text style={styles.scanType}>{scan.type}</Text>
                  <Text style={styles.scanDate}>{scan.date}</Text>
                </View>
              </View>
              <Text style={styles.scanAmount}>${scan.amount.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>Features</Text>
          <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Auto-extract merchant, amount, and date</Text>
          </View>
          <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Categorize transactions automatically</Text>
          </View>
          <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Match with existing transactions</Text>
          </View>
          <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Store digitally for easy access</Text>
          </View>
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
  heroCard: {
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
  heroIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  heroText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  typeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  typeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  typeEmoji: {
    fontSize: 24,
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  typeDescription: {
    fontSize: 13,
    color: '#6b7280',
  },
  chevron: {
    fontSize: 24,
    color: '#9ca3af',
  },
  scanCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  scanLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  scanIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  scanEmoji: {
    fontSize: 20,
  },
  scanMerchant: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  scanType: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  scanDate: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
  },
  scanAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  featureCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#166534',
    marginBottom: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    fontSize: 16,
    color: '#10b981',
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#15803d',
  },
});
