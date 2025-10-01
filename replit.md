# Finomini Project

## Overview
Finomini is a comprehensive financial management application available in both web and mobile versions. The project consists of:

1. **Finomini-POC**: React web application (87+ screens) designed in Figma
2. **Finomini-Mobile**: React Native mobile app (proof of concept with 4 core screens)

Both applications share the same data structure and provide features for tracking net worth, managing transactions, budgets, goals, and AI-powered financial insights.

## Project Architecture

### Technology Stack
- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 6.3.5
- **Language**: TypeScript
- **UI Components**: Radix UI (various components for accessible UI)
- **Styling**: Tailwind CSS (custom theme with globals.css)
- **Charts**: Recharts 2.15.2
- **Form Management**: React Hook Form 7.55.0
- **Additional Libraries**: 
  - Lucide React (icons)
  - Motion (animations)
  - Next Themes (theme switching)
  - Sonner (notifications)

### Project Structure
```
Finomini-POC/
├── src/
│   ├── assets/           # Static image assets
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components (buttons, cards, etc.)
│   │   └── [screens]    # Screen components for different app views
│   ├── imports/          # Imported Figma components
│   ├── styles/           # Global styles (globals.css)
│   ├── App.tsx           # Main app component with routing
│   ├── main.tsx          # Application entry point
│   └── index.css         # CSS entry point
├── index.html            # HTML template
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── tsconfig.node.json    # TypeScript config for Vite
└── vite.config.ts        # Vite configuration
```

## Development Setup

### Configuration Details
- **Dev Server**: Runs on `0.0.0.0:5000` (configured for Replit environment)
- **Build Output**: `build/` directory
- **Module Type**: ES Module
- **Host Configuration**: Configured to accept connections from Replit's proxy

### Running Locally
```bash
cd Finomini-POC
npm install
npm run dev
```

The development server will start on port 5000.

### Building for Production
```bash
cd Finomini-POC
npm run build
```

## Deployment
- **Target**: Autoscale (stateless frontend application)
- **Build Command**: `npm run build --prefix Finomini-POC`
- **Run Command**: `npx serve -s Finomini-POC/build -l 5000`

## Key Features
- Dashboard with net worth overview
- Transaction management and categorization
- Budget tracking and management
- Financial goals tracking
- AI-powered features:
  - Receipt scanner
  - Fraud detection
  - Smart savings recommendations
  - Investment advisor
  - Cash flow forecasting
  - Budget optimizer
- Account management
- Insights and achievements
- Multiple screen navigation system

---

# Finomini-Mobile (React Native)

## Overview
React Native mobile application built with Expo, providing a mobile-optimized version of the core Finomini features. This is a proof of concept focusing on the 4 main screens.

## Technology Stack
- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript
- **Navigation**: State-based tab navigation
- **Styling**: React Native StyleSheet (native styling)
- **Libraries**:
  - react-native-safe-area-context
  - react-native-screens

## Project Structure
```
Finomini-Mobile/
├── src/
│   ├── screens/          # Main app screens
│   │   ├── DashboardScreen.tsx
│   │   ├── TransactionsScreen.tsx
│   │   ├── BudgetsScreen.tsx
│   │   └── GoalsScreen.tsx
│   ├── data/             # Mock data
│   │   └── mockData.ts
│   └── types/            # TypeScript type definitions
│       └── index.ts
├── App.tsx               # Main app entry with tab navigation
├── app.json              # Expo configuration
└── package.json          # Dependencies
```

## Running the Mobile App

### Prerequisites
1. Install Expo Go app on your mobile device:
   - iOS: Download from App Store
   - Android: Download from Google Store

### Development
The mobile app is configured to run on port 8080:
```bash
cd Finomini-Mobile
npm install
RCT_METRO_PORT=8080 npx expo start --port 8080
```

### Testing on Device
1. Run the Expo development server (already configured in workflow)
2. Scan the QR code displayed in the console with:
   - iOS: Camera app
   - Android: Expo Go app
3. The app will load on your device

## Core Screens

### 1. Dashboard
- Net worth overview with assets/liabilities breakdown
- Account balances with icons
- Recent transactions list
- Color-coded positive/negative amounts

### 2. Transactions
- Full transaction history grouped by date
- Income vs Expenses summary
- Transaction details with merchant, category, account
- Add transaction button

### 3. Budgets
- Monthly budget overview
- Category-based budget tracking with progress bars
- Visual indicators for over-budget categories
- Remaining budget calculations

### 4. Goals
- Financial goals with progress tracking
- Deadline countdown
- Target vs current amount visualization
- Quick contribution buttons

## Data Structure
All screens use shared TypeScript types:
- Transaction
- Budget
- Goal
- Account
- NetWorthData

Mock data is defined in `src/data/mockData.ts` and matches the web app's data structure.

## Recent Changes (October 1, 2025)
- **Web App (Finomini-POC)**:
  - Initial import from GitHub repository
  - Configured for Replit environment
  - Fixed Tailwind CSS v4 styling issues
  - Set up TypeScript configuration
  - Configured Vite for Replit's proxy environment (0.0.0.0:5000)
  - Set up development workflow on port 5000
  
- **Mobile App (Finomini-Mobile)** - Priority-Based Conversion:
  - Created new Expo React Native project with TypeScript
  - Converted 20 screens from web to React Native:
    * **Core Features (4)**: Dashboard, Transactions, Budgets, Goals
    * **Detail Screens (5)**: Transaction Details, Budget Details, Goal Details, Account Details, Net Worth Detail
    * **Profile & Settings (6)**: Profile Menu, Security & Login, Linked Accounts, Notifications, App Preferences, Help & Support
    * **Accounts (1)**: Accounts List with asset/liability summary
    * **Categories (1)**: Categories & Tags management
    * **AI Features (3)**: Receipt Scanner, Smart Savings, Fraud Detection
  - Implemented 6-tab bottom navigation with stack-based sub-navigation
  - Full drill-down navigation: tap any transaction/budget/goal/account to view details
  - AI features accessible from Profile menu
  - Tab bar automatically hides on detail screens
  - Navigation guard prevents unknown routes and stale data bugs
  - Shared TypeScript data types and navigation data passing
  - Full QR code testing with Expo Go ready
  - Configured Expo workflow on port 8080

## Notes
- The application uses a custom theme system defined in `src/styles/globals.css`
- TypeScript is configured with strict mode
- Some TypeScript type mismatches exist in component props but don't affect functionality
- The app uses a screen-based navigation system managed in App.tsx
