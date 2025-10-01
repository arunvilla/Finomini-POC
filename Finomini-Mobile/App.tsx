import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DashboardScreen from './src/screens/DashboardScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import BudgetsScreen from './src/screens/BudgetsScreen';
import GoalsScreen from './src/screens/GoalsScreen';

type Screen = 'Dashboard' | 'Transactions' | 'Budgets' | 'Goals';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Dashboard');

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
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.content}>{renderScreen()}</View>
        
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabItem, currentScreen === 'Dashboard' && styles.tabItemActive]}
            onPress={() => setCurrentScreen('Dashboard')}
          >
            <Text style={styles.tabIcon}>📊</Text>
            <Text style={[styles.tabLabel, currentScreen === 'Dashboard' && styles.tabLabelActive]}>
              Dashboard
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tabItem, currentScreen === 'Transactions' && styles.tabItemActive]}
            onPress={() => setCurrentScreen('Transactions')}
          >
            <Text style={styles.tabIcon}>💳</Text>
            <Text style={[styles.tabLabel, currentScreen === 'Transactions' && styles.tabLabelActive]}>
              Transactions
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tabItem, currentScreen === 'Budgets' && styles.tabItemActive]}
            onPress={() => setCurrentScreen('Budgets')}
          >
            <Text style={styles.tabIcon}>💰</Text>
            <Text style={[styles.tabLabel, currentScreen === 'Budgets' && styles.tabLabelActive]}>
              Budgets
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tabItem, currentScreen === 'Goals' && styles.tabItemActive]}
            onPress={() => setCurrentScreen('Goals')}
          >
            <Text style={styles.tabIcon}>🎯</Text>
            <Text style={[styles.tabLabel, currentScreen === 'Goals' && styles.tabLabelActive]}>
              Goals
            </Text>
          </TouchableOpacity>
        </View>
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
