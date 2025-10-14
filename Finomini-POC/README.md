
  # Finomini-POC

  This is a code bundle for Finomini-POC. The original project is available at https://www.figma.com/design/vDH9WHzx0AWcFiX3ckNFFR/Finomini-POC.
  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  
  ## Tech stack
  
  - **Framework**: React 18 + TypeScript + Vite (`vite`)
  - **Styling**: Tailwind CSS v4 (`tailwindcss`, `@tailwindcss/vite`, `tailwindcss-animate`)
  - **UI Primitives**: Radix UI (`@radix-ui/*`), `lucide-react`
  - **State/Form/Charts**: `react-hook-form`, `recharts`
  - **Other**: `cmdk`, `embla-carousel-react`, `react-dnd`, `sonner`
  
  
  ## Features and status
  
  Below is the list of app areas inferred from `src/App.tsx` screen routing and available components in `src/components/`. Status reflects whether a dedicated screen is implemented and wired in navigation.
  
  - **Dashboard**
    - Enhanced Dashboard (`EnhancedDashboard`): Implemented
  - **Profile & Settings**
    - Profile overview (`ProfileOverview`): Implemented
    - Security & login (`SecurityLogin`): Implemented
    - Linked accounts (`LinkedAccounts`): Implemented
    - Notifications (`Notifications`): Implemented
    - Notification settings (`NotificationSettings`): Implemented
    - App preferences (`AppPreferences`): Implemented
    - Help & support (`HelpSupport`): Implemented
    - Personal info (`personal-info`): Not implemented as a dedicated screen (routes to `imports/BackgroundShadow` placeholder)
  - **Categories & Tags**
    - Categories & tags hub (`CategoriesTags`): Implemented
    - Create category (`CreateCategory`): Implemented
    - Edit category (`EditCategory`): Implemented
    - Create tag (`CreateTag`): Implemented
    - Edit tag (`EditTag`): Implemented
    - Transaction rules (`TransactionRules`): Implemented
    - Categories list (`CategoriesScreen`): Implemented
    - Category details (`CategoryDetailScreen`): Implemented
    - Subcategory details (`SubCategoryDetailScreen`): Implemented
    - Category-level subscription detail (`CategoryDetail`): Implemented
    - Categories/Tags settings (`CategoriesTagsSettingsScreen`): Present but Not integrated
    - Manage categories/tags (`ManageCategoriesTagsScreen`): Present but Not integrated
    - Filter categories (`FilterCategoriesScreen`): Present but Not integrated
    - Merge categories (`MergeCategoriesScreen`): Present but Not integrated
  - **Transactions**
    - Transactions list (`TransactionsScreen`): Implemented
    - Transaction settings (`TransactionSettings`): Implemented
    - Add manual transaction (`AddManualTransactionScreen`): Implemented
    - Split transaction (`SplitTransactionScreen`): Implemented
    - Merchant spend trend (`MerchantTrendScreen`): Implemented
    - Transaction details (inline) (`TransactionDetailsScreen`): Implemented
    - Bulk edit transactions (`BulkEditTransactionsScreen`): Implemented
    - Create rule screen id (`create-rule`): Routes to `TransactionRules` (no separate screen)
  - **Goals**
    - Goals hub (`GoalsScreen`): Implemented
    - Create goal (`CreateGoalScreen`): Implemented
    - Goal details / edit (`GoalDetailsScreen`): Implemented
    - Goal settings (`goal-settings`): Routes to `GoalsScreen` (no separate screen)
    - Add contribution (`add-contribution`): Routes to `GoalDetailsScreen` (no separate screen)
  - **Budgets**
    - Budgets hub (`BudgetsScreen`): Implemented
    - Budget category detail (`BudgetCategoryDetailScreen`): Implemented
    - Budget subcategory detail (`BudgetSubcategoryDetailScreen`): Implemented
    - Create/Edit budget (`CreateEditBudgetScreen`): Implemented
    - Budget settings (`BudgetSettingsScreen`): Implemented
    - Budget rules (`budget-rules`): Routes to `TransactionRules` (no separate screen)
    - Shared budgets (`shared-budgets`): Routes to `BudgetSettingsScreen` (no separate screen)
    - Manage subcategories (`manage-subcategories`): Routes to `BudgetCategoryDetailScreen` (no separate screen)
  - **Insights & Achievements**
    - Insights hub (`InsightsScreen`): Implemented
    - Insight details (`InsightDetailsScreen`): Implemented
    - Insights settings (`InsightsSettingsScreen`): Implemented
    - Achievements (`AchievementsScreen`): Implemented
  - **Accounts & Institutions**
    - Accounts hub (`AccountsScreen`): Implemented
    - Add account (`AddAccountScreen`): Implemented
    - Add manual account (`AddManualAccountScreen`): Implemented
    - Account details (`AccountDetailsScreen`): Implemented
    - Account transaction details (`AccountTransactionDetails`): Implemented
    - Holding details (`HoldingDetails`): Implemented
    - Edit account (`EditAccount`): Implemented
    - Accounts settings (`AccountsSettings`): Implemented
    - Manage connections (`ManageConnectionsScreen`): Implemented
    - Manage connected institutions (`ManageConnectedInstitutions`): Implemented
    - Manage institution (`ManageInstitution`): Implemented
    - Delete historical data (`DeleteHistoricalData`): Implemented
    - Plaid link (`plaid-link` in type): Not implemented (no render case / component)
  - **Net Worth**
    - Net worth overview (`NetWorthScreen`): Implemented
  - **Upcoming Payments & Subscriptions**
    - Upcoming payments hub (`UpcomingPayments`): Implemented
    - Daily subscription details (`DaySubscriptionDetails`): Implemented
    - Upcoming payments list (`UpcomingPaymentsList`): Implemented
    - Transaction details (subscription) (`TransactionDetails`): Implemented
    - Monthly subscription cost (`MonthlySubscriptionCost`): Implemented
    - Category detail (`CategoryDetail`): Implemented
    - Upcoming payments list view (`UpcomingPaymentsListView`): Present but Not integrated
  - **AI-powered features**
    - AI Assistant hub (`AIAssistantScreen`): Implemented
    - Receipt scanner (`AIReceiptScannerScreen`): Implemented
    - Receipt list (`AIReceiptListScreen`): Implemented
    - Receipt details (`AIReceiptDetailsScreen`): Implemented
    - Fraud detection (`AIFraudDetectionScreen`): Implemented
    - What-if scenarios (`AIWhatIfScenariosScreen`): Implemented
    - Subscription audit (`AISubscriptionAuditScreen`): Implemented
    - Bill analysis (`AIBillAnalysisScreen`): Implemented
    - Smart savings (`AISmartSavingsScreen`): Implemented
    - Budget optimizer (`AIBudgetOptimizerScreen`): Implemented
    - Cash-flow forecast (`AICashFlowForecastScreen`): Implemented
    - cash-flow alert (`AICashFlowAlertScreen`): Implemented
    - cash-flow alert settings (`AICashFlowAlertSettingsScreen`): Implemented
    - cash-flow optimizer (`AICashFlowOptimizerScreen`): Implemented
    - cash-flow detail (`AICashFlowDetailScreen`): Implemented
    - Investment advisor (`AIInvestmentAdvisorScreen`): Implemented
    - Portfolio rebalancing (`AIPortfolioRebalancingScreen`): Implemented
    - Portfolio review (`AIPortfolioReviewScreen`): Implemented
    - Merchant cashback (`AIMerchantCashbackScreen`): Implemented
    - Auto save (`AIAutoSaveScreen`): Implemented
    - Goal forecast (`AIGoalForecastScreen`): Implemented
    - Credit card optimizer (`AICreditCardOptimizerScreen`): Implemented
    - OCR document scanner (`AIOCRDocumentScannerScreen`): Implemented
    - Duplicate detection (`AIDuplicateDetectionScreen`): Implemented
    - Subscription optimizer (`AISubscriptionOptimizerScreen`): Implemented
    - Smart savings (enhanced) (`AISmartSavingsEnhancedScreen`): Present but Not integrated
    - AI game modal (`AIGameModal`): Present but Not integrated
  - **More**
    - More menu (`MoreScreen`): Implemented
  
  
  ## Notes
  
  - Some screen IDs in `App.tsx` intentionally route to existing screens instead of dedicated pages (e.g., `create-rule` → `TransactionRules`, `goal-settings` → `GoalsScreen`). These are considered implemented via the target screen, but no separate screen exists.
  - Several components exist but are not wired into the `App` router (marked "Present but Not integrated"). They may be prototypes or future work.
  - The `plaid-link` screen type is defined in the `Screen` union but has no render case and no dedicated component, so it is currently not implemented.