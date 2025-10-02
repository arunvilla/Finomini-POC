import { useState, lazy, Suspense } from "react";
import BackgroundShadow from "./imports/BackgroundShadow";

const ProfileOverview = lazy(() => import("./components/ProfileOverview"));
const SecurityLogin = lazy(() => import("./components/SecurityLogin"));
const LinkedAccounts = lazy(() => import("./components/LinkedAccounts"));
const Notifications = lazy(() => import("./components/Notifications"));
const NotificationSettings = lazy(() => import("./components/NotificationSettings"));
const AppPreferences = lazy(() => import("./components/AppPreferences"));
const HelpSupport = lazy(() => import("./components/HelpSupport"));
const CategoriesTags = lazy(() => import("./components/CategoriesTags"));
const CreateCategory = lazy(() => import("./components/CreateCategory"));
const EditCategory = lazy(() => import("./components/EditCategory"));
const CreateTag = lazy(() => import("./components/CreateTag"));
const EditTag = lazy(() => import("./components/EditTag"));
const TransactionRules = lazy(() => import("./components/TransactionRules"));
const EnhancedDashboard = lazy(() => import("./components/EnhancedDashboard"));
const TransactionsScreen = lazy(() => import("./components/TransactionsScreen"));
const GoalsScreen = lazy(() => import("./components/GoalsScreen"));
const MoreScreen = lazy(() => import("./components/MoreScreen"));
const UpcomingPayments = lazy(() => import("./components/UpcomingPayments"));
const DaySubscriptionDetails = lazy(() => import("./components/DaySubscriptionDetails"));
const TransactionDetails = lazy(() => import("./components/TransactionDetails"));
const MonthlySubscriptionCost = lazy(() => import("./components/MonthlySubscriptionCost"));
const CategoryDetail = lazy(() => import("./components/CategoryDetail"));
const UpcomingPaymentsList = lazy(() => import("./components/UpcomingPaymentsList"));
const BudgetsScreen = lazy(() => import("./components/BudgetsScreen"));
const BudgetCategoryDetailScreen = lazy(() => import("./components/BudgetCategoryDetailScreen"));
const BudgetSubcategoryDetailScreen = lazy(() => import("./components/BudgetSubcategoryDetailScreen"));
const CreateEditBudgetScreen = lazy(() => import("./components/CreateEditBudgetScreen"));
const BudgetSettingsScreen = lazy(() => import("./components/BudgetSettingsScreen"));
const InsightsScreen = lazy(() => import("./components/InsightsScreen"));
const InsightDetailsScreen = lazy(() => import("./components/InsightDetailsScreen"));
const InsightsSettingsScreen = lazy(() => import("./components/InsightsSettingsScreen"));
const AchievementsScreen = lazy(() => import("./components/AchievementsScreen"));
const AccountsScreen = lazy(() => import("./components/AccountsScreen"));
const AddAccountScreen = lazy(() => import("./components/AddAccountScreen"));
const AddManualAccountScreen = lazy(() => import("./components/AddManualAccountScreen"));
const AccountDetailsScreen = lazy(() => import("./components/AccountDetailsScreen"));
const ManageConnectionsScreen = lazy(() => import("./components/ManageConnectionsScreen"));
const AccountTransactionDetails = lazy(() => import("./components/AccountTransactionDetails"));
const HoldingDetails = lazy(() => import("./components/HoldingDetails"));
const EditAccount = lazy(() => import("./components/EditAccount"));
const AccountsSettings = lazy(() => import("./components/AccountsSettings"));
const ManageConnectedInstitutions = lazy(() => import("./components/ManageConnectedInstitutions"));
const ManageInstitution = lazy(() => import("./components/ManageInstitution"));
const DeleteHistoricalData = lazy(() => import("./components/DeleteHistoricalData"));
const NetWorthScreen = lazy(() => import("./components/NetWorthScreen"));
const AddManualTransactionScreen = lazy(() => import("./components/AddManualTransactionScreen"));
const SplitTransactionScreen = lazy(() => import("./components/SplitTransactionScreen"));
const TransactionSettings = lazy(() => import("./components/TransactionSettings"));
const MerchantTrendScreen = lazy(() => import("./components/MerchantTrendScreen"));
const TransactionDetailsScreen = lazy(() => import("./components/TransactionDetailsScreen"));
const CreateGoalScreen = lazy(() => import("./components/CreateGoalScreen"));
const GoalDetailsScreen = lazy(() => import("./components/GoalDetailsScreen"));
const CategoriesScreen = lazy(() => import("./components/CategoriesScreen"));
const CategoryDetailScreen = lazy(() => import("./components/CategoryDetailScreen"));
const SubCategoryDetailScreen = lazy(() => import("./components/SubCategoryDetailScreen"));
const BulkEditTransactionsScreen = lazy(() => import("./components/BulkEditTransactionsScreen"));
const AIAssistantScreen = lazy(() => import("./components/AIAssistantScreen"));
const AIReceiptScannerScreen = lazy(() => import("./components/AIReceiptScannerScreen"));
const AIReceiptListScreen = lazy(() => import("./components/AIReceiptListScreen"));
const AIReceiptDetailsScreen = lazy(() => import("./components/AIReceiptDetailsScreen"));
const AIFraudDetectionScreen = lazy(() => import("./components/AIFraudDetectionScreen"));
const AIWhatIfScenariosScreen = lazy(() => import("./components/AIWhatIfScenariosScreen"));
const AISubscriptionAuditScreen = lazy(() => import("./components/AISubscriptionAuditScreen"));
const AIBillAnalysisScreen = lazy(() => import("./components/AIBillAnalysisScreen"));
const AISmartSavingsScreen = lazy(() => import("./components/AISmartSavingsScreen"));
const AIInvestmentAdvisorScreen = lazy(() => import("./components/AIInvestmentAdvisorScreen"));
const AIDebtManagementScreen = lazy(() => import("./components/AIDebtManagementScreen"));
const AIBudgetOptimizerScreen = lazy(() => import("./components/AIBudgetOptimizerScreen"));
const AICashFlowForecastScreen = lazy(() => import("./components/AICashFlowForecastScreen"));
const AICashFlowAlertScreen = lazy(() => import("./components/AICashFlowAlertScreen"));
const AIPortfolioRebalancingScreen = lazy(() => import("./components/AIPortfolioRebalancingScreen"));
const AIMerchantCashbackScreen = lazy(() => import("./components/AIMerchantCashbackScreen"));
const AIAutoSaveScreen = lazy(() => import("./components/AIAutoSaveScreen"));
const AIGoalForecastScreen = lazy(() => import("./components/AIGoalForecastScreen"));
const AICashFlowDetailScreen = lazy(() => import("./components/AICashFlowDetailScreen"));
const AIPortfolioReviewScreen = lazy(() => import("./components/AIPortfolioReviewScreen"));
const AICreditCardOptimizerScreen = lazy(() => import("./components/AICreditCardOptimizerScreen"));
const AICashFlowAlertSettingsScreen = lazy(() => import("./components/AICashFlowAlertSettingsScreen"));
const AICashFlowOptimizerScreen = lazy(() => import("./components/AICashFlowOptimizerScreen"));
const AIOCRDocumentScannerScreen = lazy(() => import("./components/AIOCRDocumentScannerScreen"));
const AIDuplicateDetectionScreen = lazy(() => import("./components/AIDuplicateDetectionScreen"));
const AISubscriptionOptimizerScreen = lazy(() => import("./components/AISubscriptionOptimizerScreen"));

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
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>}>
        {renderScreen()}
      </Suspense>
    </div>
  );
}