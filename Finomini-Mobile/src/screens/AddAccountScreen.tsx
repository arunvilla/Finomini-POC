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

interface AddAccountScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

const bankOptions = [
  { id: 'chase', name: 'Chase', icon: '🏦', supported: true },
  { id: 'bofa', name: 'Bank of America', icon: '🏦', supported: true },
  { id: 'wells', name: 'Wells Fargo', icon: '🏦', supported: true },
  { id: 'citi', name: 'Citibank', icon: '🏦', supported: true },
  { id: 'capital', name: 'Capital One', icon: '💳', supported: true },
  { id: 'amex', name: 'American Express', icon: '💳', supported: true },
  { id: 'other', name: 'Other Bank', icon: '🏛️', supported: true },
];

export default function AddAccountScreen({ onBack, onNavigate }: AddAccountScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleBankSelect = (bank: typeof bankOptions[0]) => {
    if (bank.supported) {
      Alert.alert(
        'Connect Bank',
        `Would you like to connect your ${bank.name} account?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Connect',
            onPress: () => {
              Alert.alert('Demo Mode', 'This would open Plaid Link to connect your bank account securely.');
              onBack();
            }
          }
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Account</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Banks</Text>
          {bankOptions.map((bank) => (
            <TouchableOpacity
              key={bank.id}
              style={styles.bankCard}
              onPress={() => handleBankSelect(bank)}
            >
              <View style={styles.bankLeft}>
                <Text style={styles.bankIcon}>{bank.icon}</Text>
                <Text style={styles.bankName}>{bank.name}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.manualButton}
            onPress={() => onNavigate('add-manual-account')}
          >
            <Text style={styles.manualIcon}>✍️</Text>
            <View style={styles.manualContent}>
              <Text style={styles.manualTitle}>Add Manual Account</Text>
              <Text style={styles.manualDescription}>
                Track cash, crypto, or other accounts manually
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>🔒</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Your data is secure</Text>
            <Text style={styles.infoText}>
              We use bank-level encryption and never store your credentials
            </Text>
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
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  bankCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  bankLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  bankIcon: {
    fontSize: 28,
  },
  bankName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1f2937',
  },
  chevron: {
    fontSize: 24,
    color: '#9ca3af',
  },
  manualButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  manualIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  manualContent: {
    flex: 1,
  },
  manualTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  manualDescription: {
    fontSize: 13,
    color: '#6b7280',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    gap: 12,
  },
  infoIcon: {
    fontSize: 24,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#1e40af',
    lineHeight: 18,
  },
});
