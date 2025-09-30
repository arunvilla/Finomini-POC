import { useState } from "react";
import ProfileOverview from "./components/ProfileOverview";
import BackgroundShadow from "./imports/BackgroundShadow";
import SecurityLogin from "./components/SecurityLogin";
import LinkedAccounts from "./components/LinkedAccounts";
import Notifications from "./components/Notifications";
import NotificationSettings from "./components/NotificationSettings";
import AppPreferences from "./components/AppPreferences";
import HelpSupport from "./components/HelpSupport";
import CategoriesTags from "./components/CategoriesTags";
import CreateCategory from "./components/CreateCategory";
import EditCategory from "./components/EditCategory";
import CreateTag from "./components/CreateTag";
import EditTag from "./components/EditTag";
import TransactionRules from "./components/TransactionRules";
import EnhancedDashboard from "./components/EnhancedDashboard";
import TransactionsScreen from "./components/TransactionsScreen";
import GoalsScreen from "./components/GoalsScreen";
import MoreScreen from "./components/MoreScreen";
import UpcomingPayments from "./components/UpcomingPayments";
import DaySubscriptionDetails from "./components/DaySubscriptionDetails";
import TransactionDetails from "./components/TransactionDetails";
import MonthlySubscriptionCost from "./components/MonthlySubscriptionCost";
import CategoryDetail from "./components/CategoryDetail";
import UpcomingPaymentsList from "./components/UpcomingPaymentsList";
import BudgetsScreen from "./components/BudgetsScreen";
import BudgetCategoryDetailScreen from "./components/BudgetCategoryDetailScreen";
import BudgetSubcategoryDetailScreen from "./components/BudgetSubcategoryDetailScreen";
import CreateEditBudgetScreen from "./components/CreateEditBudgetScreen";
import BudgetSettingsScreen from "./components/BudgetSettingsScreen";
import InsightsScreen from "./components/InsightsScreen";
import InsightDetailsScreen from "./components/InsightDetailsScreen";
import InsightsSettingsScreen from "./components/InsightsSettingsScreen";
import AchievementsScreen from "./components/AchievementsScreen";
import AccountsScreen from "./components/AccountsScreen";
import AddAccountScreen from "./components/AddAccountScreen";
import AddManualAccountScreen from "./components/AddManualAccountScreen";
import AccountDetailsScreen from "./components/AccountDetailsScreen";
import ManageConnectionsScreen from "./components/ManageConnectionsScreen";
import AccountTransactionDetails from "./components/AccountTransactionDetails";
import HoldingDetails from "./components/HoldingDetails";
import EditAccount from "./components/EditAccount";
import AccountsSettings from "./components/AccountsSettings";
import ManageConnectedInstitutions from "./components/ManageConnectedInstitutions";
import ManageInstitution from "./components/ManageInstitution";
import DeleteHistoricalData from "./components/DeleteHistoricalData";
import NetWorthScreen from "./components/NetWorthScreen";
import AddManualTransactionScreen from "./components/AddManualTransactionScreen";
import SplitTransactionScreen from "./components/SplitTransactionScreen";
import TransactionSettings from "./components/TransactionSettings";
import MerchantTrendScreen from "./components/MerchantTrendScreen";
import TransactionDetailsScreen from "./components/TransactionDetailsScreen";
import CreateGoalScreen from "./components/CreateGoalScreen";
import GoalDetailsScreen from "./components/GoalDetailsScreen";
import CategoriesScreen from "./components/CategoriesScreen";
import CategoryDetailScreen from "./components/CategoryDetailScreen";
import SubCategoryDetailScreen from "./components/SubCategoryDetailScreen";
import BulkEditTransactionsScreen from "./components/BulkEditTransactionsScreen";
import AIAssistantScreen from "./components/AIAssistantScreen";
import AIReceiptScannerScreen from "./components/AIReceiptScannerScreen";
import AIReceiptListScreen from "./components/AIReceiptListScreen";
import AIReceiptDetailsScreen from "./components/AIReceiptDetailsScreen";
import AIFraudDetectionScreen from "./components/AIFraudDetectionScreen";
import AIWhatIfScenariosScreen from "./components/AIWhatIfScenariosScreen";
import AISubscriptionAuditScreen from "./components/AISubscriptionAuditScreen";
import AIBillAnalysisScreen from "./components/AIBillAnalysisScreen";
import AISmartSavingsScreen from "./components/AISmartSavingsScreen";
import AIInvestmentAdvisorScreen from "./components/AIInvestmentAdvisorScreen";
import AIDebtManagementScreen from "./components/AIDebtManagementScreen";
import AIBudgetOptimizerScreen from "./components/AIBudgetOptimizerScreen";
import AICashFlowForecastScreen from "./components/AICashFlowForecastScreen";
import AICashFlowAlertScreen from "./components/AICashFlowAlertScreen";
import AIPortfolioRebalancingScreen from "./components/AIPortfolioRebalancingScreen";
import AIMerchantCashbackScreen from "./components/AIMerchantCashbackScreen";
import AIAutoSaveScreen from "./components/AIAutoSaveScreen";
import AIGoalForecastScreen from "./components/AIGoalForecastScreen";
import AICashFlowDetailScreen from "./components/AICashFlowDetailScreen";
import AIPortfolioReviewScreen from "./components/AIPortfolioReviewScreen";
import AICreditCardOptimizerScreen from "./components/AICreditCardOptimizerScreen";
import AICashFlowAlertSettingsScreen from "./components/AICashFlowAlertSettingsScreen";
import AICashFlowOptimizerScreen from "./components/AICashFlowOptimizerScreen";
import AIOCRDocumentScannerScreen from "./components/AIOCRDocumentScannerScreen";
import AIDuplicateDetectionScreen from "./components/AIDuplicateDetectionScreen";
import AISubscriptionOptimizerScreen from "./components/AISubscriptionOptimizerScreen";

export type Screen =
  | "dashboard"
  | "profile"
  | "personal-info"
  | "security-login"
  | "linked-accounts"
  | "notifications"
  | "notification-settings"
  | "app-preferences"
  | "help-support"
  | "categories-tags"
  | "create-category"
  | "edit-category"
  | "create-tag"
  | "edit-tag"
  | "transaction-rules"
  | "transactions"
  | "transaction-settings"
  | "add-manual-transaction"
  | "split-transaction"
  | "create-rule"
  | "merchant-trend"
  | "transaction-details-screen"
  | "bulk-edit-transactions"
  | "create-goal"
  | "goal-details"
  | "edit-goal"
  | "goal-settings"
  | "add-contribution"
  | "categories"
  | "category-detail-screen"
  | "subcategory-detail-screen"
  | "accounts"
  | "accounts-settings"
  | "manage-connected-institutions"
  | "manage-institution"
  | "delete-historical-data"
  | "add-account"
  | "add-manual-account"
  | "account-details"
  | "account-transaction-details"
  | "holding-details"
  | "edit-account"
  | "manage-connections"
  | "plaid-link"
  | "goals"
  | "insights"
  | "insight-details"
  | "insights-settings"
  | "achievements"
  | "budgets"
  | "budget-category-detail"
  | "budget-subcategory-detail"
  | "create-budget"
  | "edit-budget"
  | "budget-settings"
  | "budget-rules"
  | "shared-budgets"
  | "manage-subcategories"
  | "net-worth"
  | "more"
  | "upcoming-payments"
  | "upcoming-payments-list"
  | "day-subscription-details"
  | "transaction-details"
  | "monthly-subscription-cost"
  | "category-detail"
  | "ai-assistant"
  | "ai-receipt-scanner"
  | "ai-receipt-list"
  | "ai-receipt-details"
  | "ai-fraud-detection"
  | "ai-what-if-scenarios"
  | "ai-subscription-audit"
  | "ai-bill-analysis"
  | "ai-smart-savings"
  | "ai-investment-advisor"
  | "ai-debt-management"
  | "ai-budget-optimizer"
  | "ai-cash-flow-forecast"
  | "ai-cash-flow-alert"
  | "ai-portfolio-rebalancing"
  | "ai-merchant-cashback"
  | "ai-auto-save"
  | "ai-goal-forecast"
  | "ai-cash-flow-detail"
  | "ai-portfolio-review"
  | "ai-credit-card-optimizer"
  | "ai-cash-flow-alert-settings"
  | "ai-cash-flow-optimizer"
  | "ai-ocr-document-scanner"
  | "ai-duplicate-detection"
  | "ai-subscription-optimizer";

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  group: string;
  type: "income" | "expense";
  isSystemDefault: boolean;
  usageCount: number;
  isArchived: boolean;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
  icon?: string;
  color?: string;
  usageCount: number;
  isArchived: boolean;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  usageCount: number;
  isArchived: boolean;
}

export interface TransactionRule {
  id: string;
  name: string;
  conditions: {
    merchantName?: string;
    keywords?: string[];
    amount?: { min?: number; max?: number };
    description?: string;
  };
  actions: {
    categoryId?: string;
    tagIds?: string[];
  };
  isActive: boolean;
  priority: number;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  icon: string;
  color: string;
}

export interface AccountTransaction {
  id: string;
  date: Date;
  description: string;
  merchant: string;
  amount: number;
  category: string;
  categoryIcon: string;
  subcategory?: string;
  status: "posted" | "pending";
  account?: string;
  tags?: string[];
  notes?: string;
  receipt?: string; // URL or base64 string of the receipt image
}

export interface Holding {
  id: string;
  name: string;
  ticker?: string;
  type:
    | "stock"
    | "crypto"
    | "bond"
    | "etf"
    | "real_estate"
    | "cash";
  quantity: number;
  currentPrice: number;
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  averageCostBasis?: number;
  icon: string;
}

export interface Institution {
  id: string;
  name: string;
  logo: string;
  status: "connected" | "needs_attention" | "disconnected";
  lastSync: Date;
  accountCount: number;
  accounts: string[];
}

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("dashboard");
  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    null,
  );
  const [selectedSubscriptions, setSelectedSubscriptions] =
    useState<Subscription[]>([]);
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] =
    useState<string>("");
  const [
    selectedCategorySubscriptions,
    setSelectedCategorySubscriptions,
  ] = useState<any[]>([]);
  const [selectedAccount, setSelectedAccount] =
    useState<any>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<AccountTransaction | null>(null);
  const [selectedTransactions, setSelectedTransactions] =
    useState<AccountTransaction[]>([]);
  const [selectedHolding, setSelectedHolding] =
    useState<Holding | null>(null);
  const [selectedInstitution, setSelectedInstitution] =
    useState<Institution | null>(null);
  const [selectedMerchant, setSelectedMerchant] =
    useState<string>("");
  const [selectedGoal, setSelectedGoal] = useState<any>(null);
  const [selectedCategoryData, setSelectedCategoryData] =
    useState<any>(null);
  const [selectedSubcategoryData, setSelectedSubcategoryData] =
    useState<any>(null);
  const [selectedInsight, setSelectedInsight] =
    useState<any>(null);
  const [selectedBudgetCategory, setSelectedBudgetCategory] =
    useState<any>(null);
  const [
    selectedBudgetSubcategory,
    setSelectedBudgetSubcategory,
  ] = useState<any>(null);
  const [selectedReceipt, setSelectedReceipt] =
    useState<any>(null);
  const [bulkEditCallback, setBulkEditCallback] = useState<
    ((transactions: AccountTransaction[]) => void) | null
  >(null);
  const [previousScreen, setPreviousScreen] =
    useState<Screen | null>(null);

  const navigateToScreen = (screen: Screen, data?: any) => {
    // Only set previousScreen if we're actually changing screens
    if (screen !== currentScreen) {
      setPreviousScreen(currentScreen);
    }

    // Handle data parameter which can contain various navigation data
    if (data) {
      if (data.category) setSelectedCategory(data.category);
      if (data.tag) setSelectedTag(data.tag);
      if (data.date) setSelectedDate(data.date);
      if (data.subscriptions)
        setSelectedSubscriptions(data.subscriptions);
      if (data.subscription)
        setSelectedSubscription(data.subscription);
      if (data.categoryName)
        setSelectedCategoryName(data.categoryName);
      if (data.categorySubscriptions)
        setSelectedCategorySubscriptions(
          data.categorySubscriptions,
        );
      if (data.account) setSelectedAccount(data.account);
      if (data.transaction)
        setSelectedTransaction(data.transaction);
      if (data.transactions)
        setSelectedTransactions(data.transactions);
      if (data.onSave) {
        // Store the onSave callback for bulk edit
        setBulkEditCallback(() => data.onSave);
      }
      if (data.holding) setSelectedHolding(data.holding);
      if (data.institution)
        setSelectedInstitution(data.institution);
      if (data.merchant) setSelectedMerchant(data.merchant);
      if (data.goal) setSelectedGoal(data.goal);
      if (data.category) setSelectedCategoryData(data.category);
      if (data.subcategory)
        setSelectedSubcategoryData(data.subcategory);
      if (data.insight) setSelectedInsight(data.insight);
      if (data.category)
        setSelectedBudgetCategory(data.category);
      if (data.subcategory)
        setSelectedBudgetSubcategory(data.subcategory);
      if (data.receipt) setSelectedReceipt(data.receipt);
    }

    setCurrentScreen(screen);
  };

  const goBack = () => {
    console.log(
      "Going back from:",
      currentScreen,
      "Previous screen:",
      previousScreen,
    );

    // Smart back navigation with fallbacks to prevent empty screens
    if (
      currentScreen === "create-category" ||
      currentScreen === "edit-category" ||
      currentScreen === "create-tag" ||
      currentScreen === "edit-tag" ||
      currentScreen === "transaction-rules"
    ) {
      setCurrentScreen("categories-tags");
    } else if (currentScreen === "notification-settings") {
      setCurrentScreen("notifications");
    } else if (currentScreen === "accounts-settings") {
      setCurrentScreen("accounts");
    } else if (
      currentScreen === "manage-connected-institutions" ||
      currentScreen === "delete-historical-data"
    ) {
      setCurrentScreen("accounts-settings");
    } else if (currentScreen === "manage-institution") {
      setCurrentScreen("manage-connected-institutions");
    } else if (currentScreen === "upcoming-payments") {
      setCurrentScreen("more");
    } else if (currentScreen === "upcoming-payments-list") {
      setCurrentScreen("transaction-details");
    } else if (currentScreen === "day-subscription-details") {
      setCurrentScreen("upcoming-payments");
    } else if (currentScreen === "monthly-subscription-cost") {
      setCurrentScreen("upcoming-payments");
    } else if (currentScreen === "category-detail") {
      setCurrentScreen("monthly-subscription-cost");
    } else if (currentScreen === "transaction-details") {
      if (previousScreen === "day-subscription-details") {
        setCurrentScreen("day-subscription-details");
      } else if (previousScreen === "category-detail") {
        setCurrentScreen("category-detail");
      } else if (previousScreen === "upcoming-payments-list") {
        setCurrentScreen("dashboard");
      } else {
        setCurrentScreen("day-subscription-details");
      }
    } else if (
      currentScreen === "account-transaction-details"
    ) {
      setCurrentScreen("account-details");
    } else if (currentScreen === "holding-details") {
      setCurrentScreen("account-details");
    } else if (currentScreen === "edit-account") {
      setCurrentScreen("account-details");
    } else if (currentScreen === "account-details") {
      setCurrentScreen("accounts");
    } else if (
      currentScreen === "add-account" ||
      currentScreen === "add-manual-account" ||
      currentScreen === "manage-connections"
    ) {
      setCurrentScreen("accounts");
    } else if (currentScreen === "transaction-settings") {
      setCurrentScreen("transactions");
    } else if (
      currentScreen === "add-manual-transaction" ||
      currentScreen === "split-transaction" ||
      currentScreen === "create-rule" ||
      currentScreen === "merchant-trend" ||
      currentScreen === "transaction-details-screen" ||
      currentScreen === "bulk-edit-transactions"
    ) {
      setCurrentScreen("transactions");
    } else if (
      currentScreen === "create-goal" ||
      currentScreen === "goal-details" ||
      currentScreen === "edit-goal" ||
      currentScreen === "goal-settings" ||
      currentScreen === "add-contribution"
    ) {
      setCurrentScreen("goals");
    } else if (currentScreen === "category-detail-screen") {
      setCurrentScreen("categories");
    } else if (currentScreen === "subcategory-detail-screen") {
      setCurrentScreen("category-detail-screen");
    } else if (
      currentScreen === "insight-details" ||
      currentScreen === "insights-settings" ||
      currentScreen === "achievements"
    ) {
      setCurrentScreen("insights");
    } else if (
      currentScreen === "budget-category-detail" ||
      currentScreen === "budget-subcategory-detail"
    ) {
      setCurrentScreen("budgets");
    } else if (
      currentScreen === "create-budget" ||
      currentScreen === "edit-budget" ||
      currentScreen === "budget-settings" ||
      currentScreen === "budget-rules" ||
      currentScreen === "shared-budgets" ||
      currentScreen === "manage-subcategories"
    ) {
      setCurrentScreen("budgets");
    } else if (currentScreen === "more") {
      setCurrentScreen("dashboard");
    } else if (currentScreen === "ai-assistant") {
      setCurrentScreen("more");
    } else if (
      currentScreen === "ai-receipt-scanner" ||
      currentScreen === "ai-receipt-list" ||
      currentScreen === "ai-receipt-details" ||
      currentScreen === "ai-fraud-detection" ||
      currentScreen === "ai-what-if-scenarios" ||
      currentScreen === "ai-subscription-audit" ||
      currentScreen === "ai-bill-analysis" ||
      currentScreen === "ai-smart-savings" ||
      currentScreen === "ai-investment-advisor" ||
      currentScreen === "ai-debt-management" ||
      currentScreen === "ai-budget-optimizer" ||
      currentScreen === "ai-cash-flow-forecast" ||
      currentScreen === "ai-cash-flow-alert" ||
      currentScreen === "ai-portfolio-rebalancing" ||
      currentScreen === "ai-merchant-cashback" ||
      currentScreen === "ai-auto-save" ||
      currentScreen === "ai-goal-forecast" ||
      currentScreen === "ai-cash-flow-detail" ||
      currentScreen === "ai-portfolio-review" ||
      currentScreen === "ai-credit-card-optimizer" ||
      currentScreen === "ai-cash-flow-alert-settings" ||
      currentScreen === "ai-cash-flow-optimizer" ||
      currentScreen === "ai-ocr-document-scanner" ||
      currentScreen === "ai-duplicate-detection" ||
      currentScreen === "ai-subscription-optimizer"
    ) {
      // Handle specific back navigation for receipt screens
      if (currentScreen === "ai-receipt-details") {
        setCurrentScreen("ai-receipt-list");
      } else if (currentScreen === "ai-receipt-list") {
        setCurrentScreen("ai-assistant");
      } else {
        setCurrentScreen("ai-assistant");
      }
    } else if (currentScreen === "profile") {
      setCurrentScreen("dashboard");
    } else if (currentScreen === "dashboard") {
      return;
    } else {
      setCurrentScreen("dashboard");
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return (
          <EnhancedDashboard onNavigate={navigateToScreen} />
        );
      case "profile":
        return (
          <ProfileOverview onNavigate={navigateToScreen} />
        );
      case "personal-info":
        return <BackgroundShadow onBack={goBack} />;
      case "security-login":
        return <SecurityLogin onBack={goBack} />;
      case "linked-accounts":
        return <LinkedAccounts onBack={goBack} />;
      case "notifications":
        return (
          <Notifications
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "notification-settings":
        return <NotificationSettings onBack={goBack} />;
      case "app-preferences":
        return (
          <AppPreferences
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "help-support":
        return <HelpSupport onBack={goBack} />;
      case "categories-tags":
        return (
          <CategoriesTags
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "create-category":
        return <CreateCategory onBack={goBack} />;
      case "edit-category":
        return (
          <EditCategory
            onBack={goBack}
            category={selectedCategory}
          />
        );
      case "create-tag":
        return <CreateTag onBack={goBack} />;
      case "edit-tag":
        return <EditTag onBack={goBack} tag={selectedTag} />;
      case "transaction-rules":
        return <TransactionRules onBack={goBack} />;
      case "transactions":
        return (
          <TransactionsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "transaction-settings":
        return (
          <TransactionSettings
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "add-manual-transaction":
        return (
          <AddManualTransactionScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "split-transaction":
        return (
          <SplitTransactionScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
            transaction={selectedTransaction}
          />
        );
      case "create-rule":
        return <TransactionRules onBack={goBack} />;
      case "merchant-trend":
        return (
          <MerchantTrendScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
            merchantName={selectedMerchant}
          />
        );
      case "transaction-details-screen":
        return (
          <TransactionDetailsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
            transaction={selectedTransaction}
          />
        );
      case "bulk-edit-transactions":
        return (
          <BulkEditTransactionsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
            transactions={selectedTransactions}
            onSave={bulkEditCallback}
          />
        );
      case "create-goal":
        return (
          <CreateGoalScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "goal-details":
        return (
          <GoalDetailsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
            goal={selectedGoal}
          />
        );
      case "edit-goal":
        return (
          <GoalDetailsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
            goal={selectedGoal}
          />
        );
      case "goal-settings":
        return (
          <GoalsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "add-contribution":
        return (
          <GoalDetailsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
            goal={selectedGoal}
          />
        );
      case "categories":
        return (
          <CategoriesScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "category-detail-screen":
        return (
          <CategoryDetailScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
            category={selectedCategoryData}
          />
        );
      case "subcategory-detail-screen":
        return (
          <SubCategoryDetailScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
            subcategory={selectedSubcategoryData}
            parentCategory={selectedCategoryData}
          />
        );
      case "goals":
        return (
          <GoalsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "budgets":
        return (
          <BudgetsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "budget-category-detail":
        return (
          <BudgetCategoryDetailScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
            category={selectedBudgetCategory}
          />
        );
      case "budget-subcategory-detail":
        return (
          <BudgetSubcategoryDetailScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
            subcategory={selectedBudgetSubcategory}
            parentCategory={selectedBudgetCategory}
          />
        );
      case "create-budget":
        return (
          <CreateEditBudgetScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
            isEditing={false}
          />
        );
      case "edit-budget":
        return (
          <CreateEditBudgetScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
            category={selectedBudgetCategory}
            isEditing={true}
          />
        );
      case "budget-settings":
        return (
          <BudgetSettingsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "budget-rules":
        return <TransactionRules onBack={goBack} />;
      case "shared-budgets":
        return (
          <BudgetSettingsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "manage-subcategories":
        return (
          <BudgetCategoryDetailScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
            category={selectedBudgetCategory}
          />
        );
      case "insights":
        return (
          <InsightsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "insight-details":
        return (
          <InsightDetailsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
            insight={selectedInsight}
          />
        );
      case "insights-settings":
        return (
          <InsightsSettingsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "achievements":
        return (
          <AchievementsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "net-worth":
        return (
          <NetWorthScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "accounts":
        return (
          <AccountsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "accounts-settings":
        return (
          <AccountsSettings
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "manage-connected-institutions":
        return (
          <ManageConnectedInstitutions
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "manage-institution":
        return (
          <ManageInstitution
            onBack={goBack}
            onNavigate={navigateToScreen}
            institution={selectedInstitution}
          />
        );
      case "delete-historical-data":
        return (
          <DeleteHistoricalData
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "add-account":
        return (
          <AddAccountScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "add-manual-account":
        return (
          <AddManualAccountScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "account-details":
        return (
          <AccountDetailsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
            account={selectedAccount}
          />
        );
      case "account-transaction-details":
        return (
          <AccountTransactionDetails
            onBack={goBack}
            onNavigate={navigateToScreen}
            transaction={selectedTransaction}
          />
        );
      case "holding-details":
        return (
          <HoldingDetails
            onBack={goBack}
            onNavigate={navigateToScreen}
            holding={selectedHolding}
          />
        );
      case "edit-account":
        return (
          <EditAccount
            onBack={goBack}
            onNavigate={navigateToScreen}
            account={selectedAccount}
          />
        );
      case "manage-connections":
        return (
          <ManageConnectionsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "more":
        return (
          <MoreScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "upcoming-payments":
        return (
          <UpcomingPayments
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "upcoming-payments-list":
        return (
          <UpcomingPaymentsList
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "day-subscription-details":
        return (
          <DaySubscriptionDetails
            onBack={goBack}
            selectedDate={selectedDate || new Date()}
            subscriptions={selectedSubscriptions}
            onNavigate={navigateToScreen}
          />
        );
      case "transaction-details":
        return (
          <TransactionDetails
            onBack={goBack}
            onNavigate={navigateToScreen}
            subscription={
              selectedSubscription || {
                id: "1",
                name: "Spotify",
                amount: 9.99,
                icon: "🎵",
                color: "bg-green-500",
              }
            }
            transactionDate={selectedDate || new Date()}
          />
        );
      case "monthly-subscription-cost":
        return (
          <MonthlySubscriptionCost
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "category-detail":
        return (
          <CategoryDetail
            onBack={goBack}
            onNavigate={navigateToScreen}
            categoryName={selectedCategoryName}
            subscriptions={selectedCategorySubscriptions}
          />
        );
      case "ai-assistant":
        return (
          <AIAssistantScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-receipt-scanner":
        return (
          <AIReceiptScannerScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-receipt-list":
        return (
          <AIReceiptListScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-receipt-details":
        return (
          <AIReceiptDetailsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
            receipt={selectedReceipt}
          />
        );
      case "ai-fraud-detection":
        return (
          <AIFraudDetectionScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-what-if-scenarios":
        return (
          <AIWhatIfScenariosScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-subscription-audit":
        return (
          <AISubscriptionAuditScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-smart-savings":
        return (
          <AISmartSavingsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-budget-optimizer":
        return (
          <AIBudgetOptimizerScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-cash-flow-forecast":
        return (
          <AICashFlowForecastScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-bill-analysis":
        return (
          <AIBillAnalysisScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-investment-advisor":
        return (
          <AIInvestmentAdvisorScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-debt-management":
        return (
          <AIDebtManagementScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-cash-flow-alert":
        return (
          <AICashFlowAlertScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-portfolio-rebalancing":
        return (
          <AIPortfolioRebalancingScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-merchant-cashback":
        return (
          <AIMerchantCashbackScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-auto-save":
        return (
          <AIAutoSaveScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-goal-forecast":
        return (
          <AIGoalForecastScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-cash-flow-detail":
        return (
          <AICashFlowDetailScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-portfolio-review":
        return (
          <AIPortfolioReviewScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-credit-card-optimizer":
        return (
          <AICreditCardOptimizerScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-cash-flow-alert-settings":
        return (
          <AICashFlowAlertSettingsScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-cash-flow-optimizer":
        return (
          <AICashFlowOptimizerScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-ocr-document-scanner":
        return (
          <AIOCRDocumentScannerScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-duplicate-detection":
        return (
          <AIDuplicateDetectionScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      case "ai-subscription-optimizer":
        return (
          <AISubscriptionOptimizerScreen
            onBack={goBack}
            onNavigate={navigateToScreen}
          />
        );
      default:
        console.warn(
          "Unknown screen:",
          currentScreen,
          "Falling back to dashboard",
        );
        setCurrentScreen("dashboard");
        return (
          <EnhancedDashboard onNavigate={navigateToScreen} />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto relative overflow-hidden">
      {renderScreen()}
    </div>
  );
}