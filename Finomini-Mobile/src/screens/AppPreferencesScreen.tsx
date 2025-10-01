import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Switch,
} from 'react-native';

interface AppPreferencesScreenProps {
  onBack?: () => void;
}

export default function AppPreferencesScreen({ onBack }: AppPreferencesScreenProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('English');
  const [autoSync, setAutoSync] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App Preferences</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>
          <View style={styles.card}>
            <View style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>🌙</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Dark Mode</Text>
                  <Text style={styles.itemSubtitle}>Use dark theme</Text>
                </View>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#d1d5db', true: '#6366f1' }}
              />
            </View>

            <TouchableOpacity style={styles.item}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>🌍</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Language</Text>
                  <Text style={styles.itemSubtitle}>{language}</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial</Text>
          <View style={styles.card}>
            <TouchableOpacity style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>💱</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Default Currency</Text>
                  <Text style={styles.itemSubtitle}>{currency}</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>📅</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Date Format</Text>
                  <Text style={styles.itemSubtitle}>MM/DD/YYYY</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>📊</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>First Day of Week</Text>
                  <Text style={styles.itemSubtitle}>Sunday</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sync & Data</Text>
          <View style={styles.card}>
            <View style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>🔄</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Auto-Sync</Text>
                  <Text style={styles.itemSubtitle}>Sync accounts automatically</Text>
                </View>
              </View>
              <Switch
                value={autoSync}
                onValueChange={setAutoSync}
                trackColor={{ false: '#d1d5db', true: '#6366f1' }}
              />
            </View>

            <TouchableOpacity style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>☁️</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Backup & Restore</Text>
                  <Text style={styles.itemSubtitle}>Manage your data backup</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>📥</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Export Data</Text>
                  <Text style={styles.itemSubtitle}>Download your data</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          <View style={styles.card}>
            <View style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>👆</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Biometric Login</Text>
                  <Text style={styles.itemSubtitle}>Use fingerprint/Face ID</Text>
                </View>
              </View>
              <Switch
                value={biometricAuth}
                onValueChange={setBiometricAuth}
                trackColor={{ false: '#d1d5db', true: '#6366f1' }}
              />
            </View>

            <TouchableOpacity style={styles.item}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemIcon}>🔐</Text>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Privacy Settings</Text>
                  <Text style={styles.itemSubtitle}>Control your data</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
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
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 4,
  },
  backText: {
    fontSize: 18,
    color: '#6366f1',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: 50,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    color: '#9ca3af',
  },
});
