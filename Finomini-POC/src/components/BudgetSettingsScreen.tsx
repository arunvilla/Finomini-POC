import { useState } from 'react';
import { ArrowLeft, Settings, Users, Trash2, RotateCcw, AlertTriangle, Bell, Zap, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Badge } from './ui/badge';

interface BudgetSettingsScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export default function BudgetSettingsScreen({ onBack, onNavigate }: BudgetSettingsScreenProps) {
  const [budgetStartDay, setBudgetStartDay] = useState('1');
  const [defaultBudgetType, setDefaultBudgetType] = useState('fixed');
  const [showBudgetOnDashboard, setShowBudgetOnDashboard] = useState(true);
  const [autoAdjustBudgets, setAutoAdjustBudgets] = useState(false);
  const [showHiddenBudgets, setShowHiddenBudgets] = useState(false);
  const [showUnbudgetedCategories, setShowUnbudgetedCategories] = useState(true);
  const [budgetViewDensity, setBudgetViewDensity] = useState('standard');
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleResetBudgets = () => {
    console.log('Reset all budgets');
    setShowResetDialog(false);
  };

  const handleDeleteHistory = () => {
    console.log('Delete all budget history');
    setShowDeleteDialog(false);
  };

  return (
    <div className="min-h-screen bg-white">
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
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>
          <h1 className="text-[18px] font-semibold text-gray-900">Budget Settings</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="px-4 pb-6">
        <div className="space-y-6 mt-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="budgetStartDay">Budget Start Day</Label>
                  <p className="text-sm text-gray-500">Day of the month when budget period starts</p>
                </div>
                <Select value={budgetStartDay} onValueChange={setBudgetStartDay}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st of month</SelectItem>
                    <SelectItem value="15">15th of month</SelectItem>
                    <SelectItem value="payday">Payday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="defaultBudgetType">Default Budget Type</Label>
                  <p className="text-sm text-gray-500">Default type for new budget categories</p>
                </div>
                <Select value={defaultBudgetType} onValueChange={setDefaultBudgetType}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Monthly</SelectItem>
                    <SelectItem value="rollover">Rollover</SelectItem>
                    <SelectItem value="flex">Flex Budget</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showBudgetOnDashboard">Show Budget Progress on Dashboard</Label>
                  <p className="text-sm text-gray-500">Display budget widget on main dashboard</p>
                </div>
                <Switch
                  id="showBudgetOnDashboard"
                  checked={showBudgetOnDashboard}
                  onCheckedChange={setShowBudgetOnDashboard}
                />
              </div>
            </CardContent>
          </Card>

          {/* Automation Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Automation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="manageBudgetRules">Manage Budget Rules</Label>
                  <p className="text-sm text-gray-500">Set up automated budget-related actions</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onNavigate?.('budget-rules')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Manage
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoAdjustBudgets">Auto-Adjust Budgets</Label>
                  <p className="text-sm text-gray-500">Allow AI to suggest budget adjustments</p>
                  <Badge variant="secondary" className="mt-1">Beta</Badge>
                </div>
                <Switch
                  id="autoAdjustBudgets"
                  checked={autoAdjustBudgets}
                  onCheckedChange={setAutoAdjustBudgets}
                />
              </div>
              
              {autoAdjustBudgets && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Bell className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">AI Budget Assistant Enabled</p>
                      <p className="text-xs text-blue-700">
                        The app will analyze your spending patterns and suggest budget adjustments monthly.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Display Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Display
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showHiddenBudgets">Show Hidden Budgets</Label>
                  <p className="text-sm text-gray-500">Temporarily reveal hidden budget categories</p>
                </div>
                <Switch
                  id="showHiddenBudgets"
                  checked={showHiddenBudgets}
                  onCheckedChange={setShowHiddenBudgets}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showUnbudgetedCategories">Show Unbudgeted Categories</Label>
                  <p className="text-sm text-gray-500">Display categories without assigned budgets</p>
                </div>
                <Switch
                  id="showUnbudgetedCategories"
                  checked={showUnbudgetedCategories}
                  onCheckedChange={setShowUnbudgetedCategories}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="budgetViewDensity">Budget View Density</Label>
                  <p className="text-sm text-gray-500">Adjust spacing between budget items</p>
                </div>
                <Select value={budgetViewDensity} onValueChange={setBudgetViewDensity}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Collaboration Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Collaboration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="manageSharedBudgets">Manage Shared Budgets</Label>
                  <p className="text-sm text-gray-500">Invite household members for shared budgeting</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onNavigate?.('shared-budgets')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Manage
                </Button>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">No shared budgets</p>
                    <p className="text-xs text-gray-500">Invite family members to collaborate on budgets</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="resetBudgets">Reset All Budgets</Label>
                  <p className="text-sm text-gray-500">Clear all budget amounts for current period</p>
                </div>
                <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Reset All Budgets</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to reset all budget amounts for the current period? This will set all budgets to zero but keep your budget categories.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleResetBudgets} className="bg-orange-600 hover:bg-orange-700">
                        Reset Budgets
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="deleteBudgetHistory">Delete All Budget History</Label>
                  <p className="text-sm text-gray-500">Permanently delete all past budget data</p>
                </div>
                <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Budget History</AlertDialogTitle>
                      <AlertDialogDescription>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span className="font-medium text-red-900">This action cannot be undone.</span>
                          </div>
                          <p>This will permanently delete all historical budget data including:</p>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Past budget amounts and spending</li>
                            <li>Budget trend data</li>
                            <li>Budget achievement history</li>
                          </ul>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteHistory} className="bg-red-600 hover:bg-red-700">
                        Delete History
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Danger Zone</p>
                    <p className="text-xs text-red-700">
                      These actions are irreversible and will permanently delete your budget data.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}