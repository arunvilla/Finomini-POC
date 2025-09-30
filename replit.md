# Finomini-POC

## Overview
Finomini-POC is a React-based financial management application. This is a proof of concept (POC) application originally designed in Figma and exported as a working codebase. The application provides a comprehensive financial dashboard with features for tracking net worth, managing transactions, budgets, goals, and AI-powered financial insights.

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

## Recent Changes (September 30, 2025)
- Initial import from GitHub repository
- Configured for Replit environment
- Set up TypeScript configuration
- Installed all project dependencies
- Configured Vite for Replit's proxy environment (0.0.0.0:5000)
- Set up development workflow
- Configured deployment settings
- Added .gitignore for Node.js projects

## Notes
- The application uses a custom theme system defined in `src/styles/globals.css`
- TypeScript is configured with strict mode
- Some TypeScript type mismatches exist in component props but don't affect functionality
- The app uses a screen-based navigation system managed in App.tsx
