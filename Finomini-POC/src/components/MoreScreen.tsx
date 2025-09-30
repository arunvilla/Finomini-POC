import { Screen } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import svgPaths from "../imports/svg-qll5vuxvpj";
import AIGameModal from './AIGameModal';
import { useState } from 'react';
import { 
  ChevronRight, 
  Calendar, 
  Settings, 
  HelpCircle, 
  Bell, 
  Target,
  PieChart,
  BarChart3,
  FileText,
  CreditCard,
  Smartphone,
  Wallet,
  Receipt,
  Brain,
  Trophy,
  TrendingUp,
  DollarSign,
  Users,
  Shield,
  Tag,
  Bot,
  Gamepad2,
  Star
} from 'lucide-react';

interface MoreScreenProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

export default function MoreScreen({ onBack, onNavigate }: MoreScreenProps) {
  const [showGameModal, setShowGameModal] = useState(false);
  
  const menuSections = [
    {
      title: "Core Features",
      items: [
        {
          id: 'accounts',
          title: 'My Accounts',
          description: 'View all your connected accounts and balances',
          icon: Wallet,
          screen: 'accounts' as Screen,
          color: 'bg-blue-600'
        },
        {
          id: 'transactions',
          title: 'Transactions',
          description: 'View, search, and manage all transactions',
          icon: Receipt,
          screen: 'transactions' as Screen,
          color: 'bg-green-600'
        },
        {
          id: 'categories',
          title: 'Categories',
          description: 'Organize and track spending by category',
          icon: Tag,
          screen: 'categories' as Screen,
          color: 'bg-purple-600'
        },
        {
          id: 'goals',
          title: 'Financial Goals',
          description: 'Set and track your savings objectives',
          icon: Target,
          screen: 'goals' as Screen,
          color: 'bg-orange-600'
        }
      ]
    },
    {
      title: "Analysis & Insights",
      items: [
        {
          id: 'ai-assistant',
          title: 'AI Pro Assistant',
          description: 'Advanced AI-powered financial guidance and automation',
          icon: Bot,
          screen: 'ai-assistant' as Screen,
          color: 'bg-gradient-to-r from-blue-500 to-purple-600'
        },
        {
          id: 'insights',
          title: 'Your Coach',
          description: 'Personalized financial insights and tips',
          icon: Brain,
          screen: 'insights' as Screen,
          color: 'bg-indigo-600'
        },
        {
          id: 'achievements',
          title: 'Achievements',
          description: 'View your financial milestones and rewards',
          icon: Trophy,
          screen: 'achievements' as Screen,
          color: 'bg-yellow-600'
        },
        {
          id: 'budgets',
          title: 'Budgets & Spending',
          description: 'Monitor budgets and spending patterns',
          icon: PieChart,
          screen: 'budgets' as Screen,
          color: 'bg-teal-600'
        },
        {
          id: 'net-worth',
          title: 'Net Worth',
          description: 'Track your overall financial health',
          icon: TrendingUp,
          screen: 'net-worth' as Screen,
          color: 'bg-emerald-600'
        }
      ]
    },
    {
      title: "Payments & Planning",
      items: [
        {
          id: 'upcoming-payments',
          title: 'Upcoming Payments',
          description: 'View bills and scheduled payments',
          icon: Calendar,
          screen: 'upcoming-payments' as Screen,
          color: 'bg-red-600'
        }
      ]
    },
    {
      title: "Settings & Support",
      items: [
        {
          id: 'profile',
          title: 'Profile & Settings',
          description: 'Manage your account and preferences',
          icon: Settings,
          screen: 'profile' as Screen,
          color: 'bg-gray-600'
        },
        {
          id: 'notifications',
          title: 'Notifications',
          description: 'Customize notification settings',
          icon: Bell,
          screen: 'notifications' as Screen,
          color: 'bg-slate-600'
        },
        {
          id: 'help-support',
          title: 'Help & Support',
          description: 'Get help and contact support',
          icon: HelpCircle,
          screen: 'help-support' as Screen,
          color: 'bg-cyan-600'
        }
      ]
    }
  ];

  return (
    <div className="relative size-full bg-white">
      {/* Status Bar */}
      <div className="bg-white flex flex-row items-center justify-between px-4 pt-[21px] pb-0 h-[50px]">
        <div className="font-semibold text-[17px] text-black">9:41</div>
        <div className="h-2.5 w-[124px]" />
        <div className="flex items-center gap-[7px]">
          <div className="w-[19.2px] h-[12.226px] bg-black rounded-sm" />
          <div className="w-[17.142px] h-[12.328px] bg-black rounded-sm" />
          <div className="w-[27.328px] h-[13px] border border-black rounded-[3.8px] relative">
            <div className="w-[21px] h-[9px] bg-black rounded-[2.5px] absolute left-[2px] top-[2px]" />
            <div className="w-[1.328px] h-[5px] bg-black rounded-r absolute right-0 top-[4px]" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white relative w-full">
        <div className="flex flex-row items-center p-4">
          <button onClick={onBack} className="w-[72px] flex items-center">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path d={svgPaths.p1c45f500} fill="#353945" />
            </svg>
          </button>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="font-semibold text-[18px] text-[#18312d]">More</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6 overflow-y-auto" style={{ height: 'calc(100vh - 106px)' }}>
        <div className="space-y-6">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="font-semibold text-[18px] text-[#18312d] mb-4">{section.title}</h3>
              <div className="bg-[#f6f7f9] rounded-2xl py-2">
                {section.items.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`px-4 py-4 ${index < section.items.length - 1 ? 'border-b border-[#bac4c3]' : ''}`}
                  >
                    <button 
                      className="w-full flex items-center gap-4 hover:bg-white/50 rounded-lg p-2 -m-2 transition-colors"
                      onClick={() => onNavigate(item.screen)}
                    >
                      <div className={`w-10 h-10 ${item.color || 'bg-[#20413c]'} rounded-lg flex items-center justify-center shadow-sm`}>
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-[16px] text-[#18312d] leading-[24px] font-medium">
                          {item.title}
                        </p>
                        <p className="text-sm text-[#18312d] opacity-70 leading-[20px]">
                          {item.description}
                        </p>
                      </div>
                      <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                        <path d={svgPaths.p3cf14e00} fill="#353945" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* AI Game Special Button */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-4">
            <button 
              className="w-full flex items-center gap-4 hover:bg-white/50 rounded-lg p-2 -m-2 transition-colors"
              onClick={() => setShowGameModal(true)}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-sm">
                <Gamepad2 className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[16px] text-[#18312d] leading-[24px] font-medium">
                  🎮 AI Money Game
                </p>
                <p className="text-sm text-[#18312d] opacity-70 leading-[20px]">
                  Level up your finances with gamified AI guidance
                </p>
              </div>
              <div className="text-purple-600">
                <Star className="w-6 h-6" />
              </div>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-800 mb-1">Quick Overview</h3>
                <p className="text-sm text-blue-700 mb-2">
                  Your financial dashboard at a glance
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-600">Net Worth: $85,000</span>
                  <span className="text-green-600">↑ 6.1% this month</span>
                </div>
              </div>
            </div>
          </div>

          {/* App Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-800 mb-1">FinanceManager</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Version 2.1.0 • Your personal finance companion
                </p>
                <p className="text-xs text-gray-600">
                  Made with ❤️ to help you achieve your financial goals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Game Modal */}
      <AIGameModal 
        isOpen={showGameModal}
        onClose={() => setShowGameModal(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
}