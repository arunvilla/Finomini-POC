import 'react-native-gesture-handler';
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
import TransactionDetailScreen from './src/screens/TransactionDetailScreen';
import BudgetDetailScreen from './src/screens/BudgetDetailScreen';
import GoalDetailScreen from './src/screens/GoalDetailScreen';
import AccountDetailScreen from './src/screens/AccountDetailScreen';
import NetWorthDetailScreen from './src/screens/NetWorthDetailScreen';
import CategoriesTagsScreen from './src/screens/CategoriesTagsScreen';
import ReceiptScannerScreen from './src/screens/ReceiptScannerScreen';
import SmartSavingsScreen from './src/screens/SmartSavingsScreen';
import FraudDetectionScreen from './src/screens/FraudDetectionScreen';
import AIAssistantScreen from './src/screens/AIAssistantScreen';
import AICashFlowForecastScreen from './src/screens/AICashFlowForecastScreen';
import AIBudgetOptimizerScreen from './src/screens/AIBudgetOptimizerScreen';
import AISubscriptionAuditScreen from './src/screens/AISubscriptionAuditScreen';
import AIInvestmentAdvisorScreen from './src/screens/AIInvestmentAdvisorScreen';
import AIDebtManagementScreen from './src/screens/AIDebtManagementScreen';
import AIGoalForecastScreen from './src/screens/AIGoalForecastScreen';
import AICreditCardOptimizerScreen from './src/screens/AICreditCardOptimizerScreen';
import InsightsScreen from './src/screens/InsightsScreen';
import InsightDetailsScreen from './src/screens/InsightDetailsScreen';
import InsightsSettingsScreen from './src/screens/InsightsSettingsScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import EditTransactionScreen from './src/screens/EditTransactionScreen';
import CreateGoalScreen from './src/screens/CreateGoalScreen';
import EditGoalScreen from './src/screens/EditGoalScreen';
import AddContributionScreen from './src/screens/AddContributionScreen';
import CreateEditBudgetScreen from './src/screens/CreateEditBudgetScreen';
import AddAccountScreen from './src/screens/AddAccountScreen';
import AddManualAccountScreen from './src/screens/AddManualAccountScreen';
import EditAccountScreen from './src/screens/EditAccountScreen';
import CreateCategoryScreen from './src/screens/CreateCategoryScreen';
import EditCategoryScreen from './src/screens/EditCategoryScreen';

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
  | 'help-support'
  | 'transaction-detail'
  | 'budget-detail'
  | 'goal-detail'
  | 'account-detail'
  | 'net-worth-detail'
  | 'categories-tags'
  | 'ai-assistant'
  | 'ai-cash-flow-forecast'
  | 'ai-budget-optimizer'
  | 'ai-subscription-audit'
  | 'ai-investment-advisor'
  | 'ai-debt-management'
  | 'ai-goal-forecast'
  | 'ai-credit-card-optimizer'
  | 'receipt-scanner'
  | 'smart-savings'
  | 'fraud-detection'
  | 'insights'
  | 'insight-details'
  | 'insights-settings'
  | 'add-transaction'
  | 'edit-transaction'
  | 'create-goal'
  | 'edit-goal'
  | 'add-contribution'
  | 'create-edit-budget'
  | 'add-account'
  | 'add-manual-account'
  | 'edit-account'
  | 'create-category'
  | 'edit-category';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Dashboard');
  const [screenStack, setScreenStack] = useState<Screen[]>(['Dashboard']);
  const [screenData, setScreenData] = useState<any>(null);

  const validScreens: Screen[] = [
    'Dashboard', 'Transactions', 'Budgets', 'Goals', 'Profile', 'Accounts',
    'security-login', 'linked-accounts', 'notifications', 'app-preferences', 'help-support',
    'transaction-detail', 'budget-detail', 'goal-detail', 'account-detail',
    'net-worth-detail', 'categories-tags', 'ai-assistant', 'ai-cash-flow-forecast', 
    'ai-budget-optimizer', 'ai-subscription-audit', 'ai-investment-advisor', 'ai-debt-management', 
    'ai-goal-forecast', 'ai-credit-card-optimizer', 'receipt-scanner', 'smart-savings', 'fraud-detection',
    'insights', 'insight-details', 'insights-settings', 'add-transaction', 'edit-transaction',
    'create-goal', 'edit-goal', 'add-contribution', 'create-edit-budget', 'add-account',
    'add-manual-account', 'edit-account', 'create-category', 'edit-category'
  ];

  const isScreen = (s: string): s is Screen => validScreens.includes(s as Screen);

  const navigateToScreen = (screen: string, data?: any) => {
    if (!isScreen(screen)) {
      console.warn(`Unknown screen: ${screen}`);
      return;
    }
    
    setCurrentScreen(screen);
    setScreenStack(prev => [...prev, screen]);
    setScreenData(data ?? null);
  };

  const navigateBack = () => {
    if (screenStack.length > 1) {
      const newStack = [...screenStack];
      newStack.pop();
      const previousScreen = newStack[newStack.length - 1];
      setCurrentScreen(previousScreen);
      setScreenStack(newStack);
      setScreenData(null);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Dashboard':
        return <DashboardScreen onNavigate={navigateToScreen} />;
      case 'Transactions':
        return <TransactionsScreen onNavigate={navigateToScreen} />;
      case 'Budgets':
        return <BudgetsScreen onNavigate={navigateToScreen} />;
      case 'Goals':
        return <GoalsScreen onNavigate={navigateToScreen} />;
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
      case 'transaction-detail':
        return <TransactionDetailScreen transaction={screenData} onBack={navigateBack} />;
      case 'budget-detail':
        return <BudgetDetailScreen budget={screenData} onBack={navigateBack} />;
      case 'goal-detail':
        return <GoalDetailScreen goal={screenData} onBack={navigateBack} />;
      case 'account-detail':
        return <AccountDetailScreen account={screenData} onBack={navigateBack} />;
      case 'net-worth-detail':
        return <NetWorthDetailScreen onBack={navigateBack} />;
      case 'categories-tags':
        return <CategoriesTagsScreen onBack={navigateBack} />;
      case 'ai-assistant':
        return <AIAssistantScreen onBack={navigateBack} onNavigate={navigateToScreen} />;
      case 'ai-cash-flow-forecast':
        return <AICashFlowForecastScreen onBack={navigateBack} />;
      case 'ai-budget-optimizer':
        return <AIBudgetOptimizerScreen onBack={navigateBack} />;
      case 'ai-subscription-audit':
        return <AISubscriptionAuditScreen onBack={navigateBack} />;
      case 'ai-investment-advisor':
        return <AIInvestmentAdvisorScreen onBack={navigateBack} />;
      case 'ai-debt-management':
        return <AIDebtManagementScreen onBack={navigateBack} />;
      case 'ai-goal-forecast':
        return <AIGoalForecastScreen onBack={navigateBack} />;
      case 'ai-credit-card-optimizer':
        return <AICreditCardOptimizerScreen onBack={navigateBack} />;
      case 'receipt-scanner':
        return <ReceiptScannerScreen onBack={navigateBack} />;
      case 'smart-savings':
        return <SmartSavingsScreen onBack={navigateBack} />;
      case 'fraud-detection':
        return <FraudDetectionScreen onBack={navigateBack} />;
      case 'insights':
        return <InsightsScreen onBack={navigateBack} onNavigate={navigateToScreen} />;
      case 'insight-details':
        return <InsightDetailsScreen onBack={navigateBack} insight={screenData} />;
      case 'insights-settings':
        return <InsightsSettingsScreen onBack={navigateBack} />;
      case 'add-transaction':
        return <AddTransactionScreen onBack={navigateBack} />;
      case 'edit-transaction':
        return <EditTransactionScreen onBack={navigateBack} transaction={screenData} />;
      case 'create-goal':
        return <CreateGoalScreen onBack={navigateBack} />;
      case 'edit-goal':
        return <EditGoalScreen onBack={navigateBack} goal={screenData} />;
      case 'add-contribution':
        return <AddContributionScreen onBack={navigateBack} goal={screenData} />;
      case 'create-edit-budget':
        return <CreateEditBudgetScreen onBack={navigateBack} budget={screenData} />;
      case 'add-account':
        return <AddAccountScreen onBack={navigateBack} onNavigate={navigateToScreen} />;
      case 'add-manual-account':
        return <AddManualAccountScreen onBack={navigateBack} />;
      case 'edit-account':
        return <EditAccountScreen onBack={navigateBack} account={screenData} />;
      case 'create-category':
        return <CreateCategoryScreen onBack={navigateBack} />;
      case 'edit-category':
        return <EditCategoryScreen onBack={navigateBack} category={screenData} />;
      default:
        return <DashboardScreen onNavigate={navigateToScreen} />;
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
              <Text style={styles.tabIcon}>⋯</Text>
              <Text style={[styles.tabLabel, currentScreen === 'Profile' && styles.tabLabelActive]}>
                More
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
