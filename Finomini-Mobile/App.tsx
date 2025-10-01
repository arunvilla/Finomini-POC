import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DashboardScreen from './src/screens/DashboardScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import BudgetsScreen from './src/screens/BudgetsScreen';
import GoalsScreen from './src/screens/GoalsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SecurityLoginScreen from './src/screens/SecurityLoginScreen';
import LinkedAccountsScreen from './src/screens/LinkedAccountsScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import AppPreferencesScreen from './src/screens/AppPreferencesScreen';
import HelpSupportScreen from './src/screens/HelpSupportScreen';
import AccountsListScreen from './src/screens/AccountsListScreen';

type Screen = 
  | 'Dashboard' 
  | 'Transactions' 
  | 'Budgets' 
  | 'Goals' 
  | 'Profile'
  | 'Accounts'
  | 'security-login'
  | 'linked-accounts'
  | 'notifications'
  | 'app-preferences'
  | 'help-support';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Dashboard');
  const [screenStack, setScreenStack] = useState<Screen[]>(['Dashboard']);

  const navigateToScreen = (screen: Screen) => {
    // Guard against unknown routes
    const validScreens: Screen[] = [
      'Dashboard', 'Transactions', 'Budgets', 'Goals', 'Profile', 'Accounts',
      'security-login', 'linked-accounts', 'notifications', 'app-preferences', 'help-support'
    ];
    
    if (!validScreens.includes(screen)) {
      console.warn(`Unknown screen: ${screen}`);
      return;
    }
    
    setCurrentScreen(screen);
    setScreenStack(prev => [...prev, screen]);
  };

  const navigateBack = () => {
    if (screenStack.length > 1) {
      const newStack = [...screenStack];
      newStack.pop();
      const previousScreen = newStack[newStack.length - 1];
      setCurrentScreen(previousScreen);
      setScreenStack(newStack);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Dashboard':
        return <DashboardScreen />;
      case 'Transactions':
        return <TransactionsScreen />;
      case 'Budgets':
        return <BudgetsScreen />;
      case 'Goals':
        return <GoalsScreen />;
      case 'Profile':
        return <ProfileScreen onNavigate={navigateToScreen} />;
      case 'Accounts':
        return <AccountsListScreen onNavigate={navigateToScreen} />;
      case 'security-login':
        return <SecurityLoginScreen onBack={navigateBack} />;
      case 'linked-accounts':
        return <LinkedAccountsScreen onBack={navigateBack} />;
      case 'notifications':
        return <NotificationsScreen onBack={navigateBack} />;
      case 'app-preferences':
        return <AppPreferencesScreen onBack={navigateBack} />;
      case 'help-support':
        return <HelpSupportScreen onBack={navigateBack} />;
      default:
        return <DashboardScreen />;
    }
  };

  const isMainTab = ['Dashboard', 'Transactions', 'Budgets', 'Goals', 'Accounts', 'Profile'].includes(currentScreen);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.content}>{renderScreen()}</View>
        
        {isMainTab && (
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[styles.tabItem, currentScreen === 'Dashboard' && styles.tabItemActive]}
              onPress={() => navigateToScreen('Dashboard')}
            >
              <Text style={styles.tabIcon}>📊</Text>
              <Text style={[styles.tabLabel, currentScreen === 'Dashboard' && styles.tabLabelActive]}>
                Home
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.tabItem, currentScreen === 'Transactions' && styles.tabItemActive]}
              onPress={() => navigateToScreen('Transactions')}
            >
              <Text style={styles.tabIcon}>💳</Text>
              <Text style={[styles.tabLabel, currentScreen === 'Transactions' && styles.tabLabelActive]}>
                Transactions
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.tabItem, currentScreen === 'Budgets' && styles.tabItemActive]}
              onPress={() => navigateToScreen('Budgets')}
            >
              <Text style={styles.tabIcon}>💰</Text>
              <Text style={[styles.tabLabel, currentScreen === 'Budgets' && styles.tabLabelActive]}>
                Budgets
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.tabItem, currentScreen === 'Goals' && styles.tabItemActive]}
              onPress={() => navigateToScreen('Goals')}
            >
              <Text style={styles.tabIcon}>🎯</Text>
              <Text style={[styles.tabLabel, currentScreen === 'Goals' && styles.tabLabelActive]}>
                Goals
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabItem, currentScreen === 'Accounts' && styles.tabItemActive]}
              onPress={() => navigateToScreen('Accounts')}
            >
              <Text style={styles.tabIcon}>🏦</Text>
              <Text style={[styles.tabLabel, currentScreen === 'Accounts' && styles.tabLabelActive]}>
                Accounts
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabItem, currentScreen === 'Profile' && styles.tabItemActive]}
              onPress={() => navigateToScreen('Profile')}
            >
              <Text style={styles.tabIcon}>👤</Text>
              <Text style={[styles.tabLabel, currentScreen === 'Profile' && styles.tabLabelActive]}>
                Profile
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingBottom: 20,
    paddingTop: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabItemActive: {
    borderTopWidth: 2,
    borderTopColor: '#6366f1',
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  tabLabelActive: {
    color: '#6366f1',
    fontWeight: '600',
  },
});
