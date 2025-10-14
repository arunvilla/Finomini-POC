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

interface SecurityLoginScreenProps {
  onBack?: () => void;
}

export default function SecurityLoginScreen({ onBack }: SecurityLoginScreenProps) {
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginNotifications, setLoginNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security & Login</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Password & Authentication</Text>
          <View style={styles.card}>
            <TouchableOpacity style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <View style={styles.icon}>
                  <Text style={styles.iconText}>🔑</Text>
                </View>
                <View>
                  <Text style={styles.itemTitle}>Change Password</Text>
                  <Text style={styles.itemSubtitle}>Update your account password</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <View style={styles.icon}>
                  <Text style={styles.iconText}>🔐</Text>
                </View>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Two-Factor Authentication</Text>
                  <Text style={styles.itemSubtitle}>Add an extra layer of security</Text>
                </View>
              </View>
              <Switch
                value={twoFactorEnabled}
                onValueChange={setTwoFactorEnabled}
                trackColor={{ false: '#d1d5db', true: '#6366f1' }}
              />
            </View>

            <View style={styles.item}>
              <View style={styles.itemLeft}>
                <View style={styles.icon}>
                  <Text style={styles.iconText}>👆</Text>
                </View>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Biometric Login</Text>
                  <Text style={styles.itemSubtitle}>Use fingerprint or Face ID</Text>
                </View>
              </View>
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: '#d1d5db', true: '#6366f1' }}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Login Activity</Text>
          <View style={styles.card}>
            <TouchableOpacity style={[styles.item, styles.itemBorder]}>
              <View style={styles.itemLeft}>
                <View style={styles.icon}>
                  <Text style={styles.iconText}>📱</Text>
                </View>
                <View>
                  <Text style={styles.itemTitle}>Active Sessions</Text>
                  <Text style={styles.itemSubtitle}>View all logged-in devices</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.item}>
              <View style={styles.itemLeft}>
                <View style={styles.icon}>
                  <Text style={styles.iconText}>🔔</Text>
                </View>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Login Notifications</Text>
                  <Text style={styles.itemSubtitle}>Alert on new sign-ins</Text>
                </View>
              </View>
              <Switch
                value={loginNotifications}
                onValueChange={setLoginNotifications}
                trackColor={{ false: '#d1d5db', true: '#6366f1' }}
              />
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
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
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
