import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import svgPaths from "../imports/svg-8slxfp2tjp";

interface UpcomingPaymentsProps {
  onBack: () => void;
  onNavigate: (screen: any, category?: any, tag?: any, date?: Date, subscriptions?: any[]) => void;
}

// Mock payment data matching the Figma design
const paymentData = [
  { 
    date: 2, 
    amount: 20.00, 
    name: 'Spotify',
    subscriptions: [
      { id: '1', name: 'Spotify', amount: 9.99, icon: '🎵', color: 'bg-green-500' },
      { id: '2', name: 'Netflix', amount: 10.01, icon: '🎬', color: 'bg-red-500' }
    ]
  },
  { 
    date: 5, 
    amount: 9.99, 
    name: 'Netflix',
    subscriptions: [
      { id: '1', name: 'Netflix', amount: 9.99, icon: '🎬', color: 'bg-red-500' }
    ]
  },
  { 
    date: 11, 
    amount: 120.00, 
    name: 'Internet',
    subscriptions: [
      { id: '1', name: 'AT&T', amount: 120.00, icon: '📱', color: 'bg-blue-500' }
    ]
  },
  { 
    date: 20, 
    amount: 10.00, 
    name: 'Netflix',
    subscriptions: [
      { id: '1', name: 'Netflix', amount: 10.00, icon: '🎬', color: 'bg-red-500' }
    ]
  },
  { 
    date: 25, 
    amount: 159.98, 
    name: 'Multiple Subscriptions',
    subscriptions: [
      { id: '1', name: 'YouTube', amount: 8.99, icon: '📺', color: 'bg-red-500' },
      { id: '2', name: 'AT&T', amount: 141.00, icon: '📱', color: 'bg-blue-500' },
      { id: '3', name: 'Spotify', amount: 9.99, icon: '🎵', color: 'bg-green-500' }
    ]
  }
];

const upcomingPaymentsList = [
  { name: 'Youtube', dueDate: 'Apr 25', amount: 15.99 },
  { name: 'AT&T', dueDate: 'Apr 25', amount: 141.00 },
  { name: 'Spotify', dueDate: 'Apr 25', amount: 9.99 }
];

const nextPayment = {
  name: 'Netflix',
  amount: 10.00,
  dueDate: 'Apr 20'
};

export default function UpcomingPayments({ onBack, onNavigate }: UpcomingPaymentsProps) {
  const [selectedMonth, setSelectedMonth] = useState('April');
  const [selectedYear, setSelectedYear] = useState('2025');

  // Generate calendar for April 2025
  const generateCalendar = () => {
    const daysInMonth = 30; // April has 30 days
    const firstDayOfWeek = 2; // April 1, 2025 is a Tuesday (0=Sun, 1=Mon, 2=Tue)
    const calendar = [];
    
    // Add previous month's trailing days
    const prevMonthDays = [31, 30, 29, 28, 27, 26, 25, 24, 23];
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      calendar.push({
        day: prevMonthDays[i],
        isCurrentMonth: false,
        hasPayment: false,
        amount: 0
      });
    }
    
    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const payment = paymentData.find(p => p.date === day);
      calendar.push({
        day,
        isCurrentMonth: true,
        hasPayment: !!payment,
        amount: payment?.amount || 0
      });
    }
    
    // Add next month's leading days
    const remainingCells = 42 - calendar.length; // 6 rows × 7 days = 42 cells
    for (let day = 1; day <= remainingCells; day++) {
      calendar.push({
        day,
        isCurrentMonth: false,
        hasPayment: false,
        amount: 0
      });
    }
    
    return calendar;
  };

  const calendarDays = generateCalendar();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handlePaymentClick = (day: any) => {
    const payment = paymentData.find(p => p.date === day.day);
    if (payment && payment.subscriptions) {
      const selectedDate = new Date(2025, 3, day.day); // April 2025
      onNavigate('day-subscription-details', undefined, undefined, selectedDate, payment.subscriptions);
    }
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
            <h1 className="font-semibold text-[18px] text-[#18312d]">Upcoming Payments</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6 overflow-y-auto" style={{ height: 'calc(100vh - 106px)' }}>
        <div className="space-y-6">
          {/* Calendar */}
          <Card className="bg-white rounded-xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)]">
            <CardContent className="p-3">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" size="icon">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p15284a80} fill="#353945" />
                  </svg>
                </Button>
                <div className="flex items-center">
                  <Button variant="ghost" className="px-4 py-3.5 rounded-lg">
                    <span className="font-semibold text-[16px] text-[#18312d]">{selectedMonth}</span>
                  </Button>
                  <Button variant="ghost" className="px-4 py-3.5 rounded-lg">
                    <span className="font-semibold text-[16px] text-[#18312d]">{selectedYear}</span>
                  </Button>
                </div>
                <Button variant="ghost" size="icon">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p7fe2100} fill="#20413C" fillOpacity="0.3" />
                  </svg>
                </Button>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 mb-0">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="h-11 flex items-center justify-center">
                    <span className="font-semibold text-[16px] text-[#18312d]">{day}</span>
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-0">
                {calendarDays.map((day, index) => (
                  <div key={index} className="h-11 flex items-center justify-center">
                    {day.hasPayment ? (
                      <button 
                        onClick={() => handlePaymentClick(day)}
                        className="bg-[#c8e9c8] rounded-md w-10 h-10 flex flex-col items-center justify-center hover:bg-[#b8d9b8] transition-colors cursor-pointer"
                      >
                        <span className="text-[#18312d] text-[14px] font-normal leading-[20px]">
                          {day.day}
                        </span>
                        <span className="text-[#9b5295] text-[10px] leading-[16px]">
                          ${day.amount}
                        </span>
                      </button>
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center">
                        <span className={`text-[8px] leading-[16px] font-normal ${
                          day.isCurrentMonth ? 'text-[#18312d]' : 'text-[rgba(32,65,60,0.3)]'
                        }`}>
                          {day.day}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Subscription Cost */}
          <Card className="bg-white rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] cursor-pointer hover:shadow-[0px_6px_20px_0px_rgba(0,0,0,0.15)] transition-shadow" onClick={() => onNavigate('monthly-subscription-cost')}>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[16px] text-[#18312d]">Monthly Subscription Cost</h3>
                  <span className="text-[12px] text-[#18312d] opacity-70">As of April 30</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-1">
                    <div className="text-center">
                      <div className="font-semibold text-[18px] text-[#0073e5]">40%</div>
                      <div className="text-[12px] text-black">of Monthly Expenses</div>
                    </div>
                  </div>
                  <div className="flex-1 border-l border-[#20413c]">
                    <div className="pl-2">
                      <div className="font-semibold text-[18px] text-[#0073e5]">$370.00</div>
                      <div className="text-[12px] text-black">6 Subscriptions</div>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="bg-[#b0d4f7] h-2 rounded-l-[30px] flex-1" />
                  <div className="bg-[#ecc9c0] h-2 rounded-r-[30px] flex-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Payment */}
          <Card className="bg-white rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)]">
            <CardContent className="p-4">
              <h3 className="font-semibold text-[18px] text-black mb-2">Next Payment</h3>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-[12px] text-[#18312d] opacity-70 mb-1">Due {nextPayment.dueDate}</div>
                  <div className="font-semibold text-[18px] text-[#18312d] mb-1">{nextPayment.name}</div>
                  <div className="text-[12px] text-[#18312d] opacity-70">{formatCurrency(nextPayment.amount)}</div>
                </div>
                <div className="w-[70px] h-11 bg-[#fbe8ea] rounded flex items-center justify-center">
                  <svg className="w-3 h-[21px]" fill="none" viewBox="0 0 14 23">
                    <g>
                      <path d={svgPaths.p3e4f5a00} fill="#B1060F" stroke="black" strokeWidth="0.0676261" />
                      <path d={svgPaths.p30c58e00} fill="url(#paint0_radial_28_4041)" />
                      <path d={svgPaths.p12e87880} fill="#E50914" />
                      <path d={svgPaths.p3e4f5a00} fill="#B1060F" stroke="black" strokeWidth="0.0676261" />
                      <path d={svgPaths.p30c58e00} fill="url(#paint1_radial_28_4041)" />
                      <path d={svgPaths.p12e87880} fill="#E50914" />
                    </g>
                    <defs>
                      <radialGradient id="paint0_radial_28_4041" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6.79624 11.3724) rotate(-18.4633) scale(0.78722 28.0145)">
                        <stop />
                        <stop offset="1" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="paint1_radial_28_4041" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6.79624 11.3724) rotate(-18.4633) scale(0.78722 28.0145)">
                        <stop />
                        <stop offset="1" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Payments List */}
          <Card className="bg-white rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[18px] text-[#18312d]">Upcoming Payments</h3>
                <button className="text-[12px] text-[#18312d] underline">See all</button>
              </div>
              <div className="space-y-2">
                {upcomingPaymentsList.map((payment, index) => (
                  <div key={index} className="flex items-center gap-6">
                    <div className="flex flex-col items-center w-4">
                      <div className="w-4 h-4 bg-[#20413c] rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full" />
                      </div>
                      {index < upcomingPaymentsList.length - 1 && (
                        <div className="w-0.5 h-8 bg-[#20413c] mt-0.5" />
                      )}
                    </div>
                    <div className="flex-1 font-normal text-[18px] text-black leading-[28px]">
                      {payment.name}
                    </div>
                    <div className="font-semibold text-[14px] text-black leading-[16px]">
                      {payment.dueDate}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}