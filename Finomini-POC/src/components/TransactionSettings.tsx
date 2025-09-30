import { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Slider } from './ui/slider';

interface TransactionSettingsProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export default function TransactionSettings({ onBack, onNavigate }: TransactionSettingsProps) {
  const [allowEditPending, setAllowEditPending] = useState(false);
  const [showPending, setShowPending] = useState(true);
  const [defaultView, setDefaultView] = useState('all');
  const [showAccountName, setShowAccountName] = useState(true);
  const [showTags, setShowTags] = useState(true);
  const [autoCategorizationConfidence, setAutoCategorizationConfidence] = useState([75]);

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
          
          <h1 className="text-xl font-semibold text-foreground">Transaction Settings</h1>
          
          <div className="w-10" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-lg">⚙️</span>
              General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Allow Edits to Pending Transactions */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Allow Edits to Pending Transactions</Label>
                <p className="text-sm text-muted-foreground">
                  Edits might be lost when transaction posts
                </p>
              </div>
              <Switch
                checked={allowEditPending}
                onCheckedChange={setAllowEditPending}
              />
            </div>

            <Separator />

            {/* Show Pending Transactions */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Show Pending Transactions</Label>
                <p className="text-sm text-muted-foreground">
                  Display pending transactions in main list
                </p>
              </div>
              <Switch
                checked={showPending}
                onCheckedChange={setShowPending}
              />
            </div>

            <Separator />

            {/* Default Transaction View */}
            <div className="space-y-3">
              <Label>Default Transaction View</Label>
              <Select value={defaultView} onValueChange={setDefaultView}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="expenses">Expenses Only</SelectItem>
                  <SelectItem value="income">Income Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Categorization & Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-lg">🏷️</span>
              Categorization & Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Manage Categories & Tags */}
            <Button
              variant="ghost"
              className="w-full justify-between p-0 h-auto"
              onClick={() => onNavigate('categories-tags')}
            >
              <div className="text-left">
                <p className="font-medium">Manage Categories & Tags</p>
                <p className="text-sm text-muted-foreground">
                  Create and organize transaction categories
                </p>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Separator />

            {/* Manage Transaction Rules */}
            <Button
              variant="ghost"
              className="w-full justify-between p-0 h-auto"
              onClick={() => onNavigate('transaction-rules')}
            >
              <div className="text-left">
                <p className="font-medium">Manage Transaction Rules</p>
                <p className="text-sm text-muted-foreground">
                  Automate categorization with custom rules
                </p>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Separator />

            {/* Auto-Categorization Confidence */}
            <div className="space-y-4">
              <div>
                <Label>Auto-Categorization Confidence</Label>
                <p className="text-sm text-muted-foreground">
                  Adjust how aggressively the app auto-categorizes
                </p>
              </div>
              <div className="space-y-2">
                <Slider
                  value={autoCategorizationConfidence}
                  onValueChange={setAutoCategorizationConfidence}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Conservative</span>
                  <span>{autoCategorizationConfidence[0]}%</span>
                  <span>Aggressive</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-lg">👁️</span>
              Display
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Show Account Name in List */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Show Account Name in List</Label>
                <p className="text-sm text-muted-foreground">
                  Display account name for each transaction
                </p>
              </div>
              <Switch
                checked={showAccountName}
                onCheckedChange={setShowAccountName}
              />
            </div>

            <Separator />

            {/* Show Tags in List */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Show Tags in List</Label>
                <p className="text-sm text-muted-foreground">
                  Display tags below transaction details
                </p>
              </div>
              <Switch
                checked={showTags}
                onCheckedChange={setShowTags}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-lg">🗄️</span>
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="ghost"
              className="w-full justify-between p-0 h-auto text-destructive hover:text-destructive"
              onClick={() => onNavigate('delete-historical-data')}
            >
              <div className="text-left">
                <p className="font-medium">Delete Transaction History</p>
                <p className="text-sm text-muted-foreground">
                  Permanently remove transaction data
                </p>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button className="w-full" size="lg">
          Save Settings
        </Button>
      </div>
    </div>
  );
}