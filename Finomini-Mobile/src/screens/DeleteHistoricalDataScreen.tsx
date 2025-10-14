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

interface DeleteHistoricalDataScreenProps {
  onBack?: () => void;
}

export default function DeleteHistoricalDataScreen({ onBack }: DeleteHistoricalDataScreenProps) {
  const [selectedRange, setSelectedRange] = useState<string | null>(null);

  const dataRanges = [
    { id: '30-days', label: 'Last 30 Days', description: 'Delete transactions from the last month' },
    { id: '90-days', label: 'Last 90 Days', description: 'Delete transactions from the last quarter' },
    { id: '6-months', label: 'Last 6 Months', description: 'Delete transactions from the last 6 months' },
    { id: '1-year', label: 'Last Year', description: 'Delete transactions from the last 12 months' },
    { id: 'all', label: 'All Historical Data', description: 'Delete all transactions and data' },
  ];

  const handleDelete = () => {
    if (!selectedRange) {
      Alert.alert('No Selection', 'Please select a time range to delete');
      return;
    }

    const range = dataRanges.find(r => r.id === selectedRange);
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete ${range?.label.toLowerCase()}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Historical data deleted successfully', [
              { text: 'OK', onPress: onBack }
            ]);
          },
        },
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
        <Text style={styles.headerTitle}>Delete Data</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.warningCard}>
          <Text style={styles.warningIcon}>⚠️</Text>
          <View style={styles.warningContent}>
            <Text style={styles.warningTitle}>Warning</Text>
            <Text style={styles.warningText}>
              Deleting historical data is permanent and cannot be undone. 
              We recommend exporting your data before deletion.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time Range</Text>
          <Text style={styles.sectionDescription}>
            Choose the time period you want to delete
          </Text>

          {dataRanges.map((range) => (
            <TouchableOpacity
              key={range.id}
              style={[
                styles.rangeCard,
                selectedRange === range.id && styles.rangeCardSelected,
              ]}
              onPress={() => setSelectedRange(range.id)}
            >
              <View style={styles.rangeLeft}>
                <View style={[
                  styles.radioButton,
                  selectedRange === range.id && styles.radioButtonSelected,
                ]}>
                  {selectedRange === range.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <View>
                  <Text style={styles.rangeLabel}>{range.label}</Text>
                  <Text style={styles.rangeDescription}>{range.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>What Gets Deleted?</Text>
          <Text style={styles.infoText}>
            • Transaction history{'\n'}
            • Category assignments{'\n'}
            • Transaction notes and tags{'\n'}
            • Split transaction data{'\n'}
            • Associated receipts and documents
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>What's Preserved?</Text>
          <Text style={styles.infoText}>
            • Account connections{'\n'}
            • Budget settings{'\n'}
            • Financial goals{'\n'}
            • Categories and tags{'\n'}
            • Transaction rules
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.deleteButton, !selectedRange && styles.deleteButtonDisabled]}
          onPress={handleDelete}
          disabled={!selectedRange}
        >
          <Text style={styles.deleteButtonText}>Delete Selected Data</Text>
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
  warningCard: {
    flexDirection: 'row',
    margin: 16,
    padding: 16,
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  warningIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400e',
    marginBottom: 4,
  },
  warningText: {
    fontSize: 14,
    color: '#b45309',
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  rangeCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  rangeCardSelected: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  rangeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#ef4444',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ef4444',
  },
  rangeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  rangeDescription: {
    fontSize: 13,
    color: '#6b7280',
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
  deleteButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
