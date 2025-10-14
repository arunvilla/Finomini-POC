import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';

interface ManageConnectedInstitutionsScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export default function ManageConnectedInstitutionsScreen({ onBack, onNavigate }: ManageConnectedInstitutionsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const popularInstitutions = [
    { id: '1', name: 'Chase Bank', logo: '🏦', connected: true },
    { id: '2', name: 'Bank of America', logo: '🏦', connected: false },
    { id: '3', name: 'Wells Fargo', logo: '🏦', connected: false },
    { id: '4', name: 'Citibank', logo: '🏦', connected: false },
  ];

  const investmentInstitutions = [
    { id: '5', name: 'Fidelity', logo: '📈', connected: true },
    { id: '6', name: 'Vanguard', logo: '📈', connected: false },
    { id: '7', name: 'Charles Schwab', logo: '📈', connected: false },
    { id: '8', name: 'E*TRADE', logo: '📈', connected: false },
  ];

  const creditCards = [
    { id: '9', name: 'American Express', logo: '💳', connected: true },
    { id: '10', name: 'Capital One', logo: '💳', connected: false },
    { id: '11', name: 'Discover', logo: '💳', connected: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Institutions</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search institutions..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Banks</Text>
          {popularInstitutions.map((institution) => (
            <TouchableOpacity
              key={institution.id}
              style={styles.institutionCard}
              onPress={() => onNavigate?.('add-account', institution)}
            >
              <View style={styles.institutionLeft}>
                <View style={styles.logoCircle}>
                  <Text style={styles.logoEmoji}>{institution.logo}</Text>
                </View>
                <Text style={styles.institutionName}>{institution.name}</Text>
              </View>
              {institution.connected ? (
                <View style={styles.connectedBadge}>
                  <Text style={styles.connectedText}>✓ Connected</Text>
                </View>
              ) : (
                <View style={styles.connectButton}>
                  <Text style={styles.connectText}>Connect</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investments</Text>
          {investmentInstitutions.map((institution) => (
            <TouchableOpacity
              key={institution.id}
              style={styles.institutionCard}
              onPress={() => onNavigate?.('add-account', institution)}
            >
              <View style={styles.institutionLeft}>
                <View style={styles.logoCircle}>
                  <Text style={styles.logoEmoji}>{institution.logo}</Text>
                </View>
                <Text style={styles.institutionName}>{institution.name}</Text>
              </View>
              {institution.connected ? (
                <View style={styles.connectedBadge}>
                  <Text style={styles.connectedText}>✓ Connected</Text>
                </View>
              ) : (
                <View style={styles.connectButton}>
                  <Text style={styles.connectText}>Connect</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Credit Cards</Text>
          {creditCards.map((institution) => (
            <TouchableOpacity
              key={institution.id}
              style={styles.institutionCard}
              onPress={() => onNavigate?.('add-account', institution)}
            >
              <View style={styles.institutionLeft}>
                <View style={styles.logoCircle}>
                  <Text style={styles.logoEmoji}>{institution.logo}</Text>
                </View>
                <Text style={styles.institutionName}>{institution.name}</Text>
              </View>
              {institution.connected ? (
                <View style={styles.connectedBadge}>
                  <Text style={styles.connectedText}>✓ Connected</Text>
                </View>
              ) : (
                <View style={styles.connectButton}>
                  <Text style={styles.connectText}>Connect</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.manualButton} onPress={() => onNavigate?.('add-manual-account')}>
          <Text style={styles.manualText}>+ Add Manual Account</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  institutionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  institutionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoEmoji: {
    fontSize: 22,
  },
  institutionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  connectedBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#d1fae5',
    borderRadius: 12,
  },
  connectedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
  },
  connectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  connectText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  manualButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#d1d5db',
    alignItems: 'center',
  },
  manualText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
});
