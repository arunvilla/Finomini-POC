# Finomini Project

### Overview
Finomini is a comprehensive financial management application with both web (Finomini-POC) and mobile (Finomini-Mobile) versions. It provides features for tracking net worth, managing transactions, budgets, goals, and leverages AI for financial insights. The project aims to offer a robust and user-friendly experience for personal finance management, with a vision to become a leading platform in financial wellness and intelligent money management.

### User Preferences
- I want iterative development.
- I prefer detailed explanations.
- Ask before making major changes.
- Do not make changes to the folder `Z`.
- Do not make changes to the file `Y`.

### System Architecture

**UI/UX Decisions & Design Patterns:**
- **Web (Finomini-POC):** Utilizes Radix UI for accessible components and Tailwind CSS for custom theming, ensuring a consistent and modern design across 87+ screens.
- **Mobile (Finomini-Mobile):** Employs React Native's StyleSheet for native styling and a 6-tab bottom navigation with stack-based sub-navigation for intuitive mobile user experience across 57 screens. Consistent mobile patterns are applied for CRUD screens (SafeAreaView, forms, alerts).
- **Theming:** A custom theme system is defined for the web app in `src/styles/globals.css`.
- **Error Handling:** Charts on mobile include `ChartErrorBoundary` for graceful degradation and robust data validation to prevent rendering issues.
- **Form Validation:** Comprehensive form validation is implemented, especially for user profile editing and financial inputs.
- **Gamification:** The mobile app incorporates gamification elements with an "Achievements" screen, progress tracking, and a points system to enhance user engagement.

**Technical Implementations:**
- **Frontend Frameworks:** React 18.3.1 (Web), React Native with Expo SDK 54 (Mobile).
- **Language:** TypeScript across both applications, configured with strict mode.
- **Build Tools:** Vite 6.3.5 (Web), Expo (Mobile).
- **State Management & Forms:** React Hook Form (Web) for efficient form handling.
- **Styling & Animation:** Tailwind CSS and Motion (Web), React Native StyleSheet (Mobile).
- **Charts:** Recharts 2.15.2 (Web), react-native-gifted-charts (Mobile) for data visualization.
- **Navigation:** React Router DOM (Web), state-based tab navigation (Mobile) with navigation guards.
- **AI Features:** Integrated AI capabilities include receipt scanning, fraud detection, smart savings recommendations, investment advice, cash flow forecasting, and budget optimization, accessible via a dedicated "AI Pro Assistant" hub on mobile.
- **CRUD Operations:** Full Create, Read, Update, Delete (CRUD) functionality is implemented across key financial entities like Transactions, Goals, Budgets, Accounts, and Categories on both platforms.
- **Data Structure:** Both applications share common TypeScript data types for financial entities (Transaction, Budget, Goal, Account, NetWorthData).

**Feature Specifications:**
- **Core Features:** Dashboard (net worth, account balances), Transaction management (categorization, history, split transactions), Budget tracking, Financial goal tracking.
- **Advanced Tools:** Bulk transaction editing, merchant trend analysis, upcoming payments/bill reminders, advanced category filtering.
- **AI-Powered Insights:** AI Coach, Predictive analytics (cash flow, net worth), Automation (smart savings, budget rebalancing), Conversational AI.
- **Settings:** Comprehensive settings for security, notifications, app preferences, personal info editing, and budget configuration (e.g., rollover, budget types).

### External Dependencies
- **UI Libraries:** Radix UI, Lucide React (icons)
- **Charting Libraries:** Recharts, react-native-gifted-charts, react-native-svg
- **Form Management:** React Hook Form
- **Animation:** Motion
- **Theming:** Next Themes
- **Notifications:** Sonner
- **Mobile Specific:** Expo SDK, react-native-safe-area-context, react-native-screens, expo-linear-gradient