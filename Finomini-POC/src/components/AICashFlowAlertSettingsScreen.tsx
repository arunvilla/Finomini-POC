import { ArrowLeft, Bell, DollarSign, Clock, AlertTriangle, Settings, Smartphone, Mail, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { useState } from 'react';

interface AICashFlowAlertSettingsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export default function AICashFlowAlertSettingsScreen({ onBack, onNavigate }: AICashFlowAlertSettingsScreenProps) {
  const [settings, setSettings] = useState({
    lowBalanceAlerts: true,
    lowBalanceThreshold: 500,
    surplusAlerts: true,
    surplusThreshold: 1000,
    unusualSpendingAlerts: true,
    spendingThreshold: 30,
    forecastRange: 7,
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: true,
    quietHours: true,
    quietStart: 22,
    quietEnd: 7,
    smartTiming: true,
    locationBasedAlerts: true,
    merchantAlerts: true
  });

  const alertTypes = [
    {
      id: 'low_balance',
      name: 'Low Balance Warnings',
      description: 'Alert when account balance will drop below threshold',
      enabled: settings.lowBalanceAlerts,
      threshold: settings.lowBalanceThreshold,
      thresholdType: 'amount',
      icon: <AlertTriangle className="w-4 h-4 text-red-500" />,
      priority: 'High'
    },
    {
      id: 'surplus',
      name: 'Surplus Detection',
      description: 'Notify when you have excess cash available',
      enabled: settings.surplusAlerts,
      threshold: settings.surplusThreshold,
      thresholdType: 'amount',
      icon: <DollarSign className="w-4 h-4 text-green-500" />,
      priority: 'Medium'
    },
    {
      id: 'unusual_spending',
      name: 'Unusual Spending Patterns',
      description: 'Alert when spending deviates from normal patterns',
      enabled: settings.unusualSpendingAlerts,
      threshold: settings.spendingThreshold,
      thresholdType: 'percentage',
      icon: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
      priority: 'Low'
    }
  ];

  const notificationChannels = [
    {
      id: 'push',
      name: 'Push Notifications',
      description: 'Instant alerts on your device',
      enabled: settings.pushNotifications,
      icon: <Smartphone className="w-4 h-4" />
    },
    {
      id: 'email',
      name: 'Email Notifications',
      description: 'Detailed reports via email',
      enabled: settings.emailNotifications,
      icon: <Mail className="w-4 h-4" />
    },
    {
      id: 'sms',
      name: 'SMS Alerts',
      description: 'Critical alerts via text message',
      enabled: settings.smsNotifications,
      icon: <Smartphone className="w-4 h-4" />
    }
  ];

  const advancedFeatures = [
    {
      id: 'smart_timing',
      name: 'Smart Timing',
      description: 'AI optimizes notification timing based on your behavior',
      enabled: settings.smartTiming
    },
    {
      id: 'location_based',
      name: 'Location-Based Alerts',
      description: 'Context-aware alerts based on your location',
      enabled: settings.locationBasedAlerts
    },
    {
      id: 'merchant_alerts',
      name: 'Merchant-Specific Alerts',
      description: 'Custom alerts for specific merchants or categories',
      enabled: settings.merchantAlerts
    }
  ];

  const handleToggleSetting = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleThresholdChange = (key: string, value: number[]) => {
    setSettings(prev => ({
      ...prev,
      [key]: value[0]
    }));
  };

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
    // Implementation would save settings to backend
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
            <h1 className="font-medium">Alert Settings</h1>
            <p className="text-sm text-muted-foreground">Configure your cash flow alerts</p>
          </div>
          <Button size="sm" onClick={handleSaveSettings}>
            Save
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Forecast Settings */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="font-medium">Forecast Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Forecast Range</span>
                <span className="text-sm text-muted-foreground">{settings.forecastRange} days</span>
              </div>
              <Slider
                value={[settings.forecastRange]}
                onValueChange={(value) => handleThresholdChange('forecastRange', value)}
                max={30}
                min={3}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>3 days</span>
                <span>30 days</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Alert Types */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="font-medium">Alert Types</h3>
          </div>
          
          <div className="space-y-4">
            {alertTypes.map((alert) => (
              <div key={alert.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {alert.icon}
                    <div>
                      <div className="font-medium">{alert.name}</div>
                      <div className="text-sm text-muted-foreground">{alert.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(alert.priority)} variant="secondary">
                      {alert.priority}
                    </Badge>
                    <Switch
                      checked={alert.enabled}
                      onCheckedChange={() => handleToggleSetting(alert.id === 'low_balance' ? 'lowBalanceAlerts' : 
                                                                alert.id === 'surplus' ? 'surplusAlerts' : 'unusualSpendingAlerts')}
                    />
                  </div>
                </div>
                
                {alert.enabled && (
                  <div className="ml-7 p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Threshold: {alert.thresholdType === 'amount' ? '$' : ''}{alert.threshold}{alert.thresholdType === 'percentage' ? '%' : ''}
                      </span>
                    </div>
                    <Slider
                      value={[alert.threshold]}
                      onValueChange={(value) => handleThresholdChange(
                        alert.id === 'low_balance' ? 'lowBalanceThreshold' :
                        alert.id === 'surplus' ? 'surplusThreshold' : 'spendingThreshold',
                        value
                      )}
                      max={alert.thresholdType === 'amount' ? 2000 : 100}
                      min={alert.thresholdType === 'amount' ? 100 : 10}
                      step={alert.thresholdType === 'amount' ? 50 : 5}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Notification Channels */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="w-5 h-5 text-primary" />
            <h3 className="font-medium">Notification Channels</h3>
          </div>
          
          <div className="space-y-3">
            {notificationChannels.map((channel) => (
              <div key={channel.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  {channel.icon}
                  <div>
                    <div className="font-medium">{channel.name}</div>
                    <div className="text-sm text-muted-foreground">{channel.description}</div>
                  </div>
                </div>
                <Switch
                  checked={channel.enabled}
                  onCheckedChange={() => handleToggleSetting(
                    channel.id === 'push' ? 'pushNotifications' :
                    channel.id === 'email' ? 'emailNotifications' : 'smsNotifications'
                  )}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Quiet Hours */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="font-medium">Quiet Hours</h3>
            </div>
            <Switch
              checked={settings.quietHours}
              onCheckedChange={() => handleToggleSetting('quietHours')}
            />
          </div>
          
          {settings.quietHours && (
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Start Time</span>
                  <span className="text-sm text-muted-foreground">{settings.quietStart}:00</span>
                </div>
                <Slider
                  value={[settings.quietStart]}
                  onValueChange={(value) => handleThresholdChange('quietStart', value)}
                  max={23}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">End Time</span>
                  <span className="text-sm text-muted-foreground">{settings.quietEnd}:00</span>
                </div>
                <Slider
                  value={[settings.quietEnd]}
                  onValueChange={(value) => handleThresholdChange('quietEnd', value)}
                  max={23}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </Card>

        {/* Advanced Features */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-primary" />
            <h3 className="font-medium">Advanced Features</h3>
          </div>
          
          <div className="space-y-3">
            {advancedFeatures.map((feature) => (
              <div key={feature.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">{feature.name}</div>
                  <div className="text-sm text-muted-foreground">{feature.description}</div>
                </div>
                <Switch
                  checked={feature.enabled}
                  onCheckedChange={() => handleToggleSetting(
                    feature.id === 'smart_timing' ? 'smartTiming' :
                    feature.id === 'location_based' ? 'locationBasedAlerts' : 'merchantAlerts'
                  )}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Test Alerts */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-primary" />
            <h3 className="font-medium">Test & Preview</h3>
          </div>
          
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full">
              Send Test Low Balance Alert
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              Send Test Surplus Alert
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              Preview Alert Templates
            </Button>
          </div>
        </Card>

        {/* Save Button */}
        <div className="pt-4">
          <Button onClick={handleSaveSettings} className="w-full">
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
}