import { Screen } from '../App';
import svgPaths from "../imports/svg-qll5vuxvpj";
import imgDepth5Frame2 from "figma:asset/dced20ee7198c91005d34d154b2594e6f3ebd377.png";

interface ProfileOverviewProps {
  onNavigate: (screen: Screen) => void;
}

export default function ProfileOverview({ onNavigate }: ProfileOverviewProps) {
  const menuItems = [
    {
      id: 'dashboard' as Screen,
      icon: svgPaths.p648a870,
      title: 'Back to Dashboard',
      section: 'Navigation'
    },
    {
      id: 'personal-info' as Screen,
      icon: svgPaths.pbc0d500,
      title: 'Personal Info',
      section: 'Account'
    },
    {
      id: 'security-login' as Screen,
      icon: svgPaths.p12644480,
      title: 'Security & Login',
      section: 'Account'
    },
    {
      id: 'linked-accounts' as Screen,
      icon: svgPaths.p31f8ad00,
      title: 'Linked Accounts',
      section: 'Account'
    },
    {
      id: 'categories-tags' as Screen,
      icon: svgPaths.p648a870,
      title: 'Categories & Tags',
      section: 'Account'
    },
    {
      id: 'notifications' as Screen,
      icon: svgPaths.p5671dc0,
      title: 'Notifications',
      section: 'Account'
    },
    {
      id: 'app-preferences' as Screen,
      icon: svgPaths.p648a870,
      title: 'App Preferences',
      section: 'Finance & Preferences'
    },
    {
      id: 'help-support' as Screen,
      icon: svgPaths.p5671dc0,
      title: 'Help & Support',
      section: 'Finance & Preferences'
    }
  ];

  const navigationItems = menuItems.filter(item => item.section === 'Navigation');
  const accountItems = menuItems.filter(item => item.section === 'Account');
  const financeItems = menuItems.filter(item => item.section === 'Finance & Preferences');

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
          <div className="w-[72px] flex items-center">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="p-2 -ml-2"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p1c45f500} fill="#353945" />
              </svg>
            </button>
          </div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="font-semibold text-[18px] text-[#18312d]">User Settings</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6 overflow-y-auto" style={{ height: 'calc(100vh - 106px)' }}>
        {/* Navigation Section */}
        <div className="mb-4">
          <div className="bg-[#f6f7f9] rounded-2xl py-2">
            {navigationItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="w-full p-4 flex items-center gap-4 hover:bg-white/50 transition-colors"
                style={{ borderBottom: index < navigationItems.length - 1 ? '1px solid #bac4c3' : 'none' }}
              >
                <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                  <path d={item.icon} fill="#353945" />
                </svg>
                <div className="flex-1 text-left">
                  <p className="text-[16px] text-[#18312d] leading-[24px]">{item.title}</p>
                </div>
                <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p3cf14e00} fill="#353945" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-4 mb-6">
          <div className="flex flex-col items-center gap-2">
            <div 
              className="w-32 h-32 rounded-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${imgDepth5Frame2}')` }}
            />
            <h2 className="font-semibold text-[18px] text-[#18312d] leading-[24px]">Taylor Saver</h2>
            <p className="text-[16px] text-[#18312d] opacity-70 leading-[24px]">taylorsaver@gmail.com</p>
          </div>
        </div>

        {/* Account Section */}
        <div className="mb-4">
          <h3 className="font-semibold text-[18px] text-[#18312d] mb-4 leading-[24px]">Account</h3>
          <div className="bg-[#f6f7f9] rounded-2xl py-2">
            {accountItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="w-full p-4 flex items-center gap-4 hover:bg-white/50 transition-colors"
                style={{ borderBottom: index < accountItems.length - 1 ? '1px solid #bac4c3' : 'none' }}
              >
                <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                  <path d={item.icon} fill="#353945" />
                </svg>
                <div className="flex-1 text-left">
                  <p className="text-[16px] text-[#18312d] leading-[24px]">{item.title}</p>
                </div>
                <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p3cf14e00} fill="#353945" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Finance & Preferences Section */}
        <div>
          <h3 className="font-semibold text-[18px] text-[#18312d] mb-4 leading-[24px]">Finance &amp; Preferences</h3>
          <div className="bg-[#f6f7f9] rounded-2xl py-2">
            {financeItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="w-full p-4 flex items-center gap-4 hover:bg-white/50 transition-colors"
                style={{ borderBottom: index < financeItems.length - 1 ? '1px solid #bac4c3' : 'none' }}
              >
                <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                  <path d={item.icon} fill="#353945" />
                </svg>
                <div className="flex-1 text-left">
                  <p className="text-[16px] text-[#18312d] leading-[24px]">{item.title}</p>
                </div>
                <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p3cf14e00} fill="#353945" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="mt-8">
          <button className="w-full bg-[#d4183d] text-white rounded-2xl p-4 font-semibold text-[16px] leading-[24px] hover:bg-[#b8142f] transition-colors">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}