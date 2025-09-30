import { useState } from 'react';
import { Switch } from './ui/switch';
import svgPaths from "../imports/svg-qll5vuxvpj";

interface NotificationSettingsProps {
  onBack: () => void;
}

export default function NotificationSettings({ onBack }: NotificationSettingsProps) {
  const [notifications, setNotifications] = useState({
    allowNotifications: true,
    lowBalance: true,
    billReminders: true,
    newTransactions: false,
    budgetWarnings: true
  });

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const notificationSettings = [
    {
      key: 'allowNotifications' as const,
      title: 'Allow Notifications',
      description: 'Enable all app notifications',
      isMain: true
    },
    {
      key: 'lowBalance' as const,
      title: 'Low Balance Alerts',
      description: 'Get notified when account balance is low',
      isMain: false
    },
    {
      key: 'billReminders' as const,
      title: 'Bill Reminders',
      description: 'Remind me of upcoming bill payments',
      isMain: false
    },
    {
      key: 'newTransactions' as const,
      title: 'New Transaction Alerts',
      description: 'Notify me of new transactions',
      isMain: false
    },
    {
      key: 'budgetWarnings' as const,
      title: 'Budget Overrun Warnings',
      description: 'Alert when spending exceeds budget',
      isMain: false
    }
  ];

  const mainSetting = notificationSettings.find(setting => setting.isMain);
  const otherSettings = notificationSettings.filter(setting => !setting.isMain);

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
            <h1 className="font-semibold text-[18px] text-[#18312d]">Notification Settings</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6 overflow-y-auto" style={{ height: 'calc(100vh - 106px)' }}>
        <div className="space-y-6">
          {/* Main Notification Setting */}
          {mainSetting && (
            <div>
              <h3 className="font-semibold text-[18px] text-[#18312d] mb-4">Notification Settings</h3>
              <div className="bg-[#f6f7f9] rounded-2xl py-2">
                <div className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-[16px] text-[#18312d] leading-[24px] font-medium">
                        {mainSetting.title}
                      </p>
                      <p className="text-sm text-[#18312d] opacity-70 leading-[20px]">
                        {mainSetting.description}
                      </p>
                    </div>
                    <Switch
                      checked={notifications[mainSetting.key]}
                      onCheckedChange={() => handleNotificationToggle(mainSetting.key)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other Notification Settings */}
          <div>
            <h3 className="font-semibold text-[18px] text-[#18312d] mb-4">Notification Types</h3>
            <div className="bg-[#f6f7f9] rounded-2xl py-2">
              {otherSettings.map((setting, index) => (
                <div 
                  key={setting.key} 
                  className="px-4 py-4 border-b border-[#bac4c3] last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-[16px] text-[#18312d] leading-[24px] font-medium">
                        {setting.title}
                      </p>
                      <p className="text-sm text-[#18312d] opacity-70 leading-[20px]">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      checked={notifications[setting.key]}
                      onCheckedChange={() => handleNotificationToggle(setting.key)}
                      disabled={!notifications.allowNotifications}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Schedule */}
          <div>
            <h3 className="font-semibold text-[18px] text-[#18312d] mb-4">Notification Schedule</h3>
            <div className="bg-[#f6f7f9] rounded-2xl py-2">
              <div className="px-4 py-4 border-b border-[#bac4c3]">
                <button className="w-full flex items-center gap-4">
                  <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="flex-1 text-left">
                    <p className="text-[16px] text-[#18312d] leading-[24px]">Quiet Hours</p>
                    <p className="text-sm text-[#18312d] opacity-70 leading-[20px]">Set times when notifications are muted</p>
                  </div>
                  <div className="text-sm text-[#18312d] opacity-70">
                    10:00 PM - 8:00 AM
                  </div>
                  <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p3cf14e00} fill="#353945" />
                  </svg>
                </button>
              </div>

              <div className="px-4 py-4">
                <button className="w-full flex items-center gap-4">
                  <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4v16a2 2 0 002 2h6a2 2 0 002-2V4M10 9v6M14 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="flex-1 text-left">
                    <p className="text-[16px] text-[#18312d] leading-[24px]">Weekend Notifications</p>
                    <p className="text-sm text-[#18312d] opacity-70 leading-[20px]">Manage notifications on weekends</p>
                  </div>
                  <div className="text-sm text-[#18312d] opacity-70">
                    Enabled
                  </div>
                  <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p3cf14e00} fill="#353945" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Notification Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-medium text-blue-800 mb-1">Stay Informed</h3>
                <p className="text-sm text-blue-700">
                  Notifications help you stay on top of your finances. You can customize when and how you receive alerts to match your preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}