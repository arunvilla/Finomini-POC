// Plaid Connection Management Screen

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import PlaidAccountManager from './PlaidAccountManager';

interface PlaidConnectionScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export default function PlaidConnectionScreen({ onBack, onNavigate }: PlaidConnectionScreenProps) {
  const handleAccountConnected = () => {
    console.log('New account connected');
    // Optionally show a success message or refresh data
  };

  const handleAccountDisconnected = () => {
    console.log('Account disconnected');
    // Optionally show a confirmation message
  };

  const handleSyncComplete = () => {
    console.log('Sync completed');
    // Optionally show a success message or update UI
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Status Bar */}
      <div className="bg-white flex flex-row items-center justify-between px-4 pt-[21px] pb-0 h-[50px]">
        <div className="text-[17px] text-black font-semibold">9:41</div>
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
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-center">Bank Connections</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <PlaidAccountManager
          onAccountConnected={handleAccountConnected}
          onAccountDisconnected={handleAccountDisconnected}
          onSyncComplete={handleSyncComplete}
        />
      </div>
    </div>
  );
}