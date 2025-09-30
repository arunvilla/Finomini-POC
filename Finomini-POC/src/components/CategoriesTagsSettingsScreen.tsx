import { useState } from 'react';
import { ArrowLeft, ChevronRight, Bot, Settings, Database, Eye, Merge } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface CategoriesTagsSettingsScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export default function CategoriesTagsSettingsScreen({ onBack, onNavigate }: CategoriesTagsSettingsScreenProps) {
  const [autoCategorization, setAutoCategorization] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [showSubCategories, setShowSubCategories] = useState(true);
  const [showHiddenItems, setShowHiddenItems] = useState(false);
  const [confidence, setConfidence] = useState([75]);
  const [defaultCategory, setDefaultCategory] = useState('uncategorized');
  const [rolloverBehavior, setRolloverBehavior] = useState('on');

  const settingsSections = [
    {
      id: 'automation',
      title: 'Automation',
      icon: Bot,
      items: [
        {
          id: 'manage-rules',
          title: 'Manage Transaction Rules',
          description: 'Create and edit automatic categorization rules',
          type: 'navigation' as const,
          screen: 'transaction-rules'
        },
        {
          id: 'auto-confidence',
          title: 'Auto-Categorization Confidence',
          description: 'Adjust how aggressively the app auto-categorizes',
          type: 'slider' as const,
          value: confidence,
          onChange: setConfidence,
          min: 0,
          max: 100,
          step: 5
        },
        {
          id: 'ai-suggestions',
          title: 'AI Transaction Clarification',
          description: 'Enable AI suggestions for ambiguous transactions',
          type: 'toggle' as const,
          value: aiSuggestions,
          onChange: setAiSuggestions
        }
      ]
    },
    {
      id: 'defaults',
      title: 'Defaults',
      icon: Settings,
      items: [
        {
          id: 'default-category',
          title: 'Default Uncategorized Category',
          description: 'Category for transactions that can\'t be auto-categorized',
          type: 'select' as const,
          value: defaultCategory,
          onChange: setDefaultCategory,
          options: [
            { value: 'uncategorized', label: 'Uncategorized' },
            { value: 'other', label: 'Other' },
            { value: 'misc', label: 'Miscellaneous' }
          ]
        },
        {
          id: 'rollover-behavior',
          title: 'Default Rollover Behavior',
          description: 'Set global default for new categories',
          type: 'select' as const,
          value: rolloverBehavior,
          onChange: setRolloverBehavior,
          options: [
            { value: 'on', label: 'Rollover On' },
            { value: 'off', label: 'Rollover Off' }
          ]
        }
      ]
    },
    {
      id: 'display',
      title: 'Display',
      icon: Eye,
      items: [
        {
          id: 'show-subcategories',
          title: 'Show Sub-Categories in Main List',
          description: 'Expand/collapse sub-categories by default',
          type: 'toggle' as const,
          value: showSubCategories,
          onChange: setShowSubCategories
        },
        {
          id: 'show-hidden',
          title: 'Show Hidden Categories/Tags',
          description: 'Temporarily reveal hidden items in lists',
          type: 'toggle' as const,
          value: showHiddenItems,
          onChange: setShowHiddenItems
        }
      ]
    },
    {
      id: 'data',
      title: 'Data Management',
      icon: Database,
      items: [
        {
          id: 'merge-categories',
          title: 'Merge Categories',
          description: 'Combine two categories into one',
          type: 'navigation' as const,
          screen: 'merge-categories'
        },
        {
          id: 'archive-unused',
          title: 'Archive Unused Categories/Tags',
          description: 'Move unused items to archive',
          type: 'button' as const,
          action: 'archive'
        }
      ]
    }
  ];

  const handleNavigation = (screen: string) => {
    onNavigate?.(screen);
  };

  const handleArchiveUnused = () => {
    // Show confirmation dialog and archive unused items
    console.log('Archive unused items');
  };

  const renderSettingItem = (item: any) => {
    switch (item.type) {
      case 'toggle':
        return (
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label className="font-medium">{item.title}</Label>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <Switch
              checked={item.value}
              onCheckedChange={item.onChange}
            />
          </div>
        );

      case 'slider':
        return (
          <div className="space-y-3">
            <div>
              <Label className="font-medium">{item.title}</Label>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Conservative</span>
                <span className="font-medium">{item.value[0]}%</span>
                <span>Aggressive</span>
              </div>
              <Slider
                value={item.value}
                onValueChange={item.onChange}
                max={item.max}
                min={item.min}
                step={item.step}
                className="w-full"
              />
            </div>
          </div>
        );

      case 'select':
        return (
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label className="font-medium">{item.title}</Label>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <Select value={item.value} onValueChange={item.onChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {item.options.map((option: any) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'navigation':
        return (
          <div 
            className="flex items-center justify-between cursor-pointer hover:bg-accent/50 rounded-lg p-2 -m-2 transition-colors"
            onClick={() => handleNavigation(item.screen)}
          >
            <div className="flex-1">
              <Label className="font-medium cursor-pointer">{item.title}</Label>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        );

      case 'button':
        return (
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label className="font-medium">{item.title}</Label>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleArchiveUnused}>
              Archive
            </Button>
          </div>
        );

      default:
        return null;
    }
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
          
          <h1 className="text-lg font-semibold text-foreground">Category & Tag Settings</h1>
          
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {settingsSections.map((section) => (
          <Card key={section.id}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <section.icon className="h-5 w-5 text-primary" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {section.items.map((item) => (
                <div key={item.id}>
                  {renderSettingItem(item)}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* AI Features Disclaimer */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">AI-Powered Features</h4>
                <p className="text-sm text-blue-700">
                  Our AI learns from your categorization patterns to provide smarter suggestions. 
                  All processing is done securely and your data remains private.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}