import { Button } from './ui/button';
import svgPaths from "../imports/svg-qll5vuxvpj";

interface HelpSupportProps {
  onBack: () => void;
}

export default function HelpSupport({ onBack }: HelpSupportProps) {
  const supportOptions = [
    {
      icon: '❓',
      title: 'Help Center',
      description: 'Browse our frequently asked questions',
      action: () => console.log('Opening Help Center')
    },
    {
      icon: '💬',
      title: 'Contact Support',
      description: 'Chat with our support team',
      action: () => console.log('Opening chat support')
    },
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Send us an email',
      action: () => window.open('mailto:support@pfmapp.com')
    },
    {
      icon: '📞',
      title: 'Phone Support',
      description: 'Call us at 1-800-PFM-HELP',
      action: () => window.open('tel:1-800-764-4357')
    }
  ];

  const legalOptions = [
    {
      title: 'Terms of Service',
      action: () => console.log('Opening Terms of Service')
    },
    {
      title: 'Privacy Policy',
      action: () => console.log('Opening Privacy Policy')
    },
    {
      title: 'Data Security',
      action: () => console.log('Opening Data Security info')
    },
    {
      title: 'About This App',
      action: () => console.log('Opening About page')
    }
  ];

  const quickAnswers = [
    {
      question: 'How secure is my financial data?',
      answer: 'We use bank-level 256-bit encryption and never store your banking credentials. All data is read-only and secured with industry-standard protocols.'
    },
    {
      question: 'Which banks are supported?',
      answer: 'We support over 12,000 financial institutions through our secure Plaid integration, including all major US banks and credit unions.'
    },
    {
      question: 'How often is my data updated?',
      answer: 'Your account data is automatically refreshed daily. You can also manually refresh anytime from the Linked Accounts section.'
    },
    {
      question: 'Can I export my data?',
      answer: 'Yes, you can export your transaction history and reports in CSV or PDF format from the Reports section.'
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
            <h1 className="font-semibold text-[18px] text-[#18312d]">Help &amp; Support</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6 overflow-y-auto" style={{ height: 'calc(100vh - 106px)' }}>
        <div className="space-y-6">
          {/* Contact Support */}
          <div>
            <h3 className="font-semibold text-[18px] text-[#18312d] mb-4">Get Help</h3>
            <div className="bg-[#f6f7f9] rounded-2xl py-2">
              {supportOptions.map((option, index) => (
                <button 
                  key={index}
                  onClick={option.action}
                  className="w-full px-4 py-4 flex items-center gap-4 border-b border-[#bac4c3] last:border-b-0 hover:bg-white/50 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                    {option.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[16px] text-[#18312d] leading-[24px] font-medium">{option.title}</p>
                    <p className="text-sm text-[#18312d] opacity-70 leading-[20px]">{option.description}</p>
                  </div>
                  <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p3cf14e00} fill="#353945" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Answers */}
          <div>
            <h3 className="font-semibold text-[18px] text-[#18312d] mb-4">Quick Answers</h3>
            <div className="space-y-3">
              {quickAnswers.map((qa, index) => (
                <div key={index} className="bg-[#f6f7f9] rounded-2xl p-4">
                  <h4 className="font-medium text-[#18312d] mb-2">{qa.question}</h4>
                  <p className="text-sm text-[#18312d] opacity-70 leading-relaxed">{qa.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Legal & About */}
          <div>
            <h3 className="font-semibold text-[18px] text-[#18312d] mb-4">Legal &amp; About</h3>
            <div className="bg-[#f6f7f9] rounded-2xl py-2">
              {legalOptions.map((option, index) => (
                <button 
                  key={index}
                  onClick={option.action}
                  className="w-full px-4 py-4 flex items-center justify-between border-b border-[#bac4c3] last:border-b-0 hover:bg-white/50 transition-colors"
                >
                  <p className="text-[16px] text-[#18312d] leading-[24px]">{option.title}</p>
                  <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p3cf14e00} fill="#353945" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* App Info */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="text-center space-y-2">
              <h4 className="font-semibold text-[#18312d]">PFM Mobile</h4>
              <p className="text-sm text-[#18312d] opacity-70">Version 2.1.0</p>
              <p className="text-xs text-[#18312d] opacity-50">© 2025 PFM Technologies, Inc.</p>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-medium text-red-800 mb-1">Suspicious Activity?</h3>
                <p className="text-sm text-red-700 mb-2">
                  If you notice unauthorized transactions, contact us immediately.
                </p>
                <Button variant="destructive" size="sm">
                  Report Fraud
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}