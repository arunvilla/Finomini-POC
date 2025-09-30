import { ArrowLeft, TrendingUp, DollarSign, Calendar, Target, Zap, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface AICashFlowOptimizerScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export default function AICashFlowOptimizerScreen({ onBack, onNavigate }: AICashFlowOptimizerScreenProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-0 h-8 w-8"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-medium">Cash Flow Optimizer</h1>
            <p className="text-sm text-muted-foreground">AI-powered cash flow optimization</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card className="p-4">
          <h3 className="font-medium mb-4">Optimization Results</h3>
          <div className="text-center">
            <div className="text-2xl font-medium mb-2">+$1,250</div>
            <div className="text-sm text-muted-foreground">Potential monthly savings</div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-medium mb-4">Recommendations</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">Payment Timing</span>
              </div>
              <p className="text-sm text-green-700">
                Delay rent payment by 3 days to optimize cash flow balance.
              </p>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800">Transfer Funds</span>
              </div>
              <p className="text-sm text-blue-700">
                Move $500 from savings to checking to maintain buffer.
              </p>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">Income Timing</span>
              </div>
              <p className="text-sm text-yellow-700">
                Follow up on pending freelance payment ($1,200) due this week.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Button onClick={() => alert('Implementing optimizations...')}>
            <Zap className="w-4 h-4 mr-2" />
            Apply Changes
          </Button>
          <Button variant="outline" onClick={() => onNavigate('ai-cash-flow-alert-settings')}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
}