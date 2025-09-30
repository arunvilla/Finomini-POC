import { useState } from 'react';
import { ArrowLeft, Info, Bell, Target, Shield, TrendingUp, Gamepad2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';

interface InsightsSettingsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export default function InsightsSettingsScreen({ onBack, onNavigate }: InsightsSettingsScreenProps) {
  const [frequency, setFrequency] = useState('daily');
  const [personalization, setPersonalization] = useState([75]);
  const [gamificationEnabled, setGamificationEnabled] = useState(true);
  const [achievementNotifications, setAchievementNotifications] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  
  const [insightTypes, setInsightTypes] = useState({
    spending: true,
    saving: true,
    debt: false,
    investment: true,
    bills: true,
    security: true
  });

  const [dataSources, setDataSources] = useState({
    checking: true,
    savings: true,
    credit: true,
    investment: false,
    loans: false,
    manual: true
  });

  const handleInsightTypeToggle = (type: string) => {
    setInsightTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleDataSourceToggle = (source: string) => {
    setDataSources(prev => ({
      ...prev,
      [source]: !prev[source]
    }));
  };

  const getPersonalizationText = (value: number) => {
    if (value < 33) return 'More General';
    if (value < 67) return 'Balanced';
    return 'Highly Personalized';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Status Bar */}
      <div className="bg-card flex flex-row items-center justify-between px-4 pt-[21px] pb-0 h-[50px]">
        <div className="text-[17px] text-foreground font-semibold">9:41</div>
        <div className="h-2.5 w-[124px]" />
        <div className="flex items-center gap-[7px]">
          <div className="w-[19.2px] h-[12.226px] bg-foreground rounded-sm" />
          <div className="w-[17.142px] h-[12.328px] bg-foreground rounded-sm" />
          <div className="w-[27.328px] h-[13px] border border-foreground rounded-[3.8px] relative">
            <div className="w-[21px] h-[9px] bg-foreground rounded-[2.5px] absolute left-[2px] top-[2px]" />
            <div className="w-[1.328px] h-[5px] bg-foreground rounded-r absolute right-0 top-[4px]" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <h1 className="text-lg font-semibold text-foreground">Insights Settings</h1>
          
          <div className="w-10" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Insight Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Insight Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Frequency */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Frequency of Insights</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="on-demand">On-demand Only</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                How often you want to receive new insights
              </p>
            </div>

            {/* Personalization Level */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Personalization Level</Label>
              <div className="px-3">
                <Slider
                  value={personalization}
                  onValueChange={setPersonalization}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>General</span>
                  <span className="font-medium">{getPersonalizationText(personalization[0])}</span>
                  <span>Personal</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Higher personalization uses more of your data for tailored insights
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Types of Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Types of Insights</CardTitle>
            <p className="text-sm text-muted-foreground">
              Choose which categories you want to receive insights about
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'spending', label: 'Spending Habits', icon: TrendingUp, description: 'Budget tracking and spending patterns' },
              { key: 'saving', label: 'Saving Opportunities', icon: Target, description: 'Ways to save more money' },
              { key: 'debt', label: 'Debt Management', icon: Shield, description: 'Debt payoff strategies and tips' },
              { key: 'investment', label: 'Investment Performance', icon: TrendingUp, description: 'Portfolio analysis and recommendations' },
              { key: 'bills', label: 'Upcoming Bills & Subscriptions', icon: Bell, description: 'Payment reminders and subscription insights' },
              { key: 'security', label: 'Unusual Activity/Security Alerts', icon: Shield, description: 'Potential fraud and security notifications' }
            ].map((type) => (
              <div key={type.key} className="flex items-start gap-3 p-3 rounded-lg border">
                <type.icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">{type.label}</Label>
                    <Switch
                      checked={insightTypes[type.key]}
                      onCheckedChange={() => handleInsightTypeToggle(type.key)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {type.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Gamification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5" />
              Gamification
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Control game-like features that make insights more engaging
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Enable Gamification</Label>
                <p className="text-xs text-muted-foreground">
                  Turns on streaks, points, badges, and achievements
                </p>
              </div>
              <Switch
                checked={gamificationEnabled}
                onCheckedChange={setGamificationEnabled}
              />
            </div>

            {gamificationEnabled && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Achievement Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Get notified when you earn new badges and rewards
                    </p>
                  </div>
                  <Switch
                    checked={achievementNotifications}
                    onCheckedChange={setAchievementNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Daily Insight Reminders</Label>
                    <p className="text-xs text-muted-foreground">
                      Gentle push notifications to maintain your streak
                    </p>
                  </div>
                  <Switch
                    checked={dailyReminders}
                    onCheckedChange={setDailyReminders}
                  />
                </div>
              </>
            )}

            {!gamificationEnabled && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Gamification is disabled. You'll still receive insights but without points, streaks, or achievements.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Data Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Data Sources</CardTitle>
            <p className="text-sm text-muted-foreground">
              Choose which account types to include in insights generation
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'checking', label: 'Checking Accounts', description: 'Daily spending and income' },
              { key: 'savings', label: 'Savings Accounts', description: 'Savings goals and emergency funds' },
              { key: 'credit', label: 'Credit Cards', description: 'Credit utilization and payments' },
              { key: 'investment', label: 'Investment Accounts', description: 'Portfolio performance and allocation' },
              { key: 'loans', label: 'Loan Accounts', description: 'Debt payoff progress and optimization' },
              { key: 'manual', label: 'Manual Accounts', description: 'Manually entered account data' }
            ].map((source) => (
              <div key={source.key} className="flex items-start justify-between p-3 rounded-lg border">
                <div className="flex-1">
                  <Label className="text-sm font-medium">{source.label}</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    {source.description}
                  </p>
                </div>
                <Switch
                  checked={dataSources[source.key]}
                  onCheckedChange={() => handleDataSourceToggle(source.key)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Privacy & Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Your Data is Secure</h4>
                  <p className="text-sm text-blue-700">
                    All insights are generated locally on your device. Your financial data is encrypted and never shared with third parties.
                  </p>
                </div>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onNavigate('help-support')}
            >
              View Privacy Policy
            </Button>
          </CardContent>
        </Card>

        {/* Reset Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Reset Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Reset to Default Settings
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              This will restore all insight settings to their default values
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}