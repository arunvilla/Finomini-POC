import { useState } from 'react';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Screen } from '../types';
import svgPaths from "../imports/svg-qll5vuxvpj";

interface AppPreferencesProps {
  onBack: () => void;
  onNavigate: (screen: Screen | string, data?: any) => void;
}

export default function AppPreferences({ onBack, onNavigate }: AppPreferencesProps) {
  const [preferences, setPreferences] = useState({
    appearance: {
      darkMode: false,
      textSize: 'medium'
    },
    data: {
      currency: 'USD',
      language: 'English'
    }
  });

  const handleAppearanceChange = (key: keyof typeof preferences.appearance, value: any) => {
    setPreferences(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [key]: value
      }
    }));
  };

  const handleDataChange = (key: keyof typeof preferences.data, value: string) => {
    setPreferences(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [key]: value
      }
    }));
  };

  const handleCustomizeDashboard = () => {
    console.log('Customize dashboard clicked');
  };

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
            <h1 className="font-semibold text-[18px] text-[#18312d]">App Preferences</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6 overflow-y-auto" style={{ height: 'calc(100vh - 106px)' }}>
        <div className="space-y-6">
          {/* Appearance */}
          <div>
            <h3 className="font-semibold text-[18px] text-[#18312d] mb-4">Appearance</h3>
            <div className="bg-[#f6f7f9] rounded-2xl py-2">
              <div className="px-4 py-4 border-b border-[#bac4c3]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[16px] text-[#18312d] leading-[24px] font-medium">Dark Mode</p>
                    <p className="text-sm text-[#18312d] opacity-70 leading-[20px]">Switch to dark theme</p>
                  </div>
                  <Switch
                    checked={preferences.appearance.darkMode}
                    onCheckedChange={(checked) => handleAppearanceChange('darkMode', checked)}
                  />
                </div>
              </div>
              
              <div className="px-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="textSize">Text Size</Label>
                  <Select value={preferences.appearance.textSize} onValueChange={(value) => handleAppearanceChange('textSize', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="xl">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Data & Language */}
          <div>
            <h3 className="font-semibold text-[18px] text-[#18312d] mb-4">Data &amp; Language</h3>
            <div className="bg-[#f6f7f9] rounded-2xl py-2">
              <div className="px-4 py-4 border-b border-[#bac4c3]">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency Format</Label>
                  <Select value={preferences.data.currency} onValueChange={(value) => handleDataChange('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="GBP">British Pound (£)</SelectItem>
                      <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="px-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="language">App Language</Label>
                  <Select value={preferences.data.language} onValueChange={(value) => handleDataChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Customization */}
          <div>
            <h3 className="font-semibold text-[18px] text-[#18312d] mb-4">Dashboard</h3>
            <div className="bg-[#f6f7f9] rounded-2xl py-2">
              <div className="px-4 py-4">
                <button onClick={handleCustomizeDashboard} className="w-full flex items-center gap-4">
                  <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="flex-1 text-left">
                    <p className="text-[16px] text-[#18312d] leading-[24px]">Customize Dashboard</p>
                    <p className="text-sm text-[#18312d] opacity-70 leading-[20px]">Rearrange widgets and tiles</p>
                  </div>
                  <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p3cf14e00} fill="#353945" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div>
            <h3 className="font-semibold text-[18px] text-[#18312d] mb-4">Data Management</h3>
            <div className="bg-[#f6f7f9] rounded-2xl py-2">
              <div className="px-4 py-4 border-b border-[#bac4c3]">
                <button onClick={() => console.log('Export data clicked')} className="w-full flex items-center gap-4">
                  <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="flex-1 text-left">
                    <p className="text-[16px] text-[#18312d] leading-[24px]">Export Data</p>
                    <p className="text-sm text-[#18312d] opacity-70 leading-[20px]">Download your financial data</p>
                  </div>
                  <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p3cf14e00} fill="#353945" />
                  </svg>
                </button>
              </div>

              <div className="px-4 py-4">
                <button onClick={() => console.log('Delete history clicked')} className="w-full flex items-center gap-4">
                  <svg className="w-6 h-6 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="flex-1 text-left">
                    <p className="text-[16px] text-[#18312d] leading-[24px]">Delete Transaction History</p>
                    <p className="text-sm text-[#18312d] opacity-70 leading-[20px]">Remove old transaction data</p>
                  </div>
                  <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p3cf14e00} fill="#353945" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-medium text-blue-800 mb-1">Data Privacy</h3>
                <p className="text-sm text-blue-700">
                  Your preferences are stored locally and synced securely across your devices. We never share your settings with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}