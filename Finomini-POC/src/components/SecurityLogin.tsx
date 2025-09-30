import { useState } from 'react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import svgPaths from "../imports/svg-qll5vuxvpj";

interface SecurityLoginProps {
  onBack: () => void;
}

export default function SecurityLogin({ onBack }: SecurityLoginProps) {
  const [settings, setSettings] = useState({
    biometricLogin: true,
    twoFactorAuth: false,
    loginNotifications: true
  });

  const handleChangePassword = () => {
    console.log('Change password clicked');
  };

  const handleToggleTwoFactor = () => {
    setSettings(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }));
  };

  const handleToggleBiometric = () => {
    setSettings(prev => ({ ...prev, biometricLogin: !prev.biometricLogin }));
  };

  const handleViewActiveSessions = () => {
    console.log('View active sessions clicked');
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
            <h1 className="font-semibold text-[18px] text-[#18312d]">Security &amp; Login</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6 overflow-y-auto" style={{ height: 'calc(100vh - 106px)' }}>
        <div className="space-y-6">
          {/* Password & Authentication */}
          <div>
            <h3 className="font-semibold text-[18px] text-[#18312d] mb-4">Password &amp; Authentication</h3>
            <div className="bg-[#f6f7f9] rounded-2xl py-2">
              {/* Change Password */}
              <div className="px-4 py-4 border-b border-[#bac4c3]">
                <button 
                  onClick={handleChangePassword}
                  className="w-full flex items-center gap-4"
                >
                  <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p12644480} fill="#353945" />
                  </svg>
                  <div className="flex-1 text-left">
                    <p className="text-[16px] text-[#18312d] leading-[24px]">Change Password</p>
                    <p className="text-sm text-[#18312d] opacity-70 leading-[20px]">Update your account password</p>
                  </div>
                  <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p3cf14e00} fill="#353945" />
                  </svg>
                </button>
              </div>

              {/* Two-Factor Authentication */}
              <div className="px-4 py-4">
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p1c01ae00} fill="#353945" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-[16px] text-[#18312d] leading-[24px]">Two-Factor Authentication</p>
                    <p className="text-sm text-[#18312d] opacity-70 leading-[20px]">Add an extra layer of security</p>
                  </div>
                  <Switch 
                    checked={settings.twoFactorAuth} 
                    onCheckedChange={handleToggleTwoFactor}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Biometric Authentication */}
          <div>
            <h3 className="font-semibold text-[18px] text-[#18312d] mb-4">Biometric Authentication</h3>
            <div className="bg-[#f6f7f9] rounded-2xl py-2">
              <div className="px-4 py-4">
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p1c01ae00} fill="#353945" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-[16px] text-[#18312d] leading-[24px]">Face ID</p>
                    <p className="text-sm text-[#18312d] opacity-70 leading-[20px]">Use Face ID to sign in quickly and securely</p>
                  </div>
                  <Switch 
                    checked={settings.biometricLogin} 
                    onCheckedChange={handleToggleBiometric}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Login Activity */}


          {/* Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-medium text-green-800 mb-1">Your Account is Secure</h3>
                <p className="text-sm text-green-700">
                  All your data is protected with 256-bit encryption and industry-standard security measures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}