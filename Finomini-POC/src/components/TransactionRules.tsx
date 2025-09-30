import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import svgPaths from "../imports/svg-qll5vuxvpj";

interface TransactionRulesProps {
  onBack: () => void;
}

interface Rule {
  id: string;
  name: string;
  conditions: {
    merchantName?: string;
    keywords?: string[];
    description?: string;
    amountMin?: number;
    amountMax?: number;
  };
  actions: {
    categoryName?: string;
    tagNames?: string[];
  };
  isActive: boolean;
  priority: number;
  matchCount: number;
}

export default function TransactionRules({ onBack }: TransactionRulesProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [rules, setRules] = useState<Rule[]>([
    {
      id: '1',
      name: 'Starbucks → Coffee',
      conditions: { merchantName: 'Starbucks' },
      actions: { categoryName: 'Coffee', tagNames: ['Business'] },
      isActive: true,
      priority: 1,
      matchCount: 23
    },
    {
      id: '2',
      name: 'Gas Stations → Transportation',
      conditions: { keywords: ['shell', 'chevron', 'bp', 'gas'] },
      actions: { categoryName: 'Gas', tagNames: [] },
      isActive: true,
      priority: 2,
      matchCount: 45
    },
    {
      id: '3',
      name: 'Amazon → Shopping',
      conditions: { merchantName: 'Amazon' },
      actions: { categoryName: 'Shopping', tagNames: ['Online'] },
      isActive: false,
      priority: 3,
      matchCount: 67
    }
  ]);

  const [newRule, setNewRule] = useState({
    name: '',
    merchantName: '',
    keywords: '',
    description: '',
    amountMin: '',
    amountMax: '',
    categoryName: '',
    tagNames: ''
  });

  const categories = ['Groceries', 'Gas', 'Coffee', 'Restaurants', 'Shopping', 'Entertainment'];
  const tags = ['Business', 'Travel', 'Emergency', 'Gift', 'Online', 'Recurring'];

  const handleToggleRule = (ruleId: string) => {
    setRules(prev => 
      prev.map(rule => 
        rule.id === ruleId 
          ? { ...rule, isActive: !rule.isActive }
          : rule
      )
    );
  };

  const handleCreateRule = () => {
    const rule: Rule = {
      id: Date.now().toString(),
      name: newRule.name || `${newRule.merchantName || 'Custom'} Rule`,
      conditions: {
        ...(newRule.merchantName && { merchantName: newRule.merchantName }),
        ...(newRule.keywords && { keywords: newRule.keywords.split(',').map(k => k.trim()) }),
        ...(newRule.description && { description: newRule.description }),
        ...(newRule.amountMin && { amountMin: parseFloat(newRule.amountMin) }),
        ...(newRule.amountMax && { amountMax: parseFloat(newRule.amountMax) })
      },
      actions: {
        ...(newRule.categoryName && { categoryName: newRule.categoryName }),
        ...(newRule.tagNames && { tagNames: newRule.tagNames.split(',').map(t => t.trim()) })
      },
      isActive: true,
      priority: rules.length + 1,
      matchCount: 0
    };

    setRules(prev => [...prev, rule]);
    setNewRule({
      name: '',
      merchantName: '',
      keywords: '',
      description: '',
      amountMin: '',
      amountMax: '',
      categoryName: '',
      tagNames: ''
    });
    setShowCreateForm(false);
  };

  const handleTestRule = (rule: Rule) => {
    alert(`Testing rule "${rule.name}"...\n\nThis would show how the rule applies to your recent transactions.`);
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(prev => prev.filter(rule => rule.id !== ruleId));
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
            <h1 className="font-semibold text-[18px] text-[#18312d]">Transaction Rules</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6 overflow-y-auto" style={{ height: 'calc(100vh - 106px)' }}>
        <div className="space-y-6">
          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-medium text-blue-800 mb-1">Automated Categorization</h3>
                <p className="text-sm text-blue-700">
                  Create rules to automatically categorize and tag your transactions. Rules are applied in priority order.
                </p>
              </div>
            </div>
          </div>

          {/* Add Rule Button */}
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-[18px] text-[#18312d]">
              {rules.length} Active Rules
            </h3>
            <Button onClick={() => setShowCreateForm(!showCreateForm)} size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Add Rule
            </Button>
          </div>

          {/* Create Rule Form */}
          {showCreateForm && (
            <div className="bg-[#f6f7f9] rounded-2xl p-4 space-y-4">
              <h4 className="font-medium text-[#18312d]">Create New Rule</h4>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="ruleName">Rule Name (Optional)</Label>
                  <Input
                    id="ruleName"
                    placeholder="My Custom Rule"
                    value={newRule.name}
                    onChange={(e) => setNewRule(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="merchantName">Merchant Name</Label>
                  <Input
                    id="merchantName"
                    placeholder="e.g., Starbucks, Amazon"
                    value={newRule.merchantName}
                    onChange={(e) => setNewRule(prev => ({ ...prev, merchantName: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                  <Input
                    id="keywords"
                    placeholder="e.g., coffee, gas, restaurant"
                    value={newRule.keywords}
                    onChange={(e) => setNewRule(prev => ({ ...prev, keywords: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="amountMin">Min Amount</Label>
                    <Input
                      id="amountMin"
                      type="number"
                      placeholder="0.00"
                      value={newRule.amountMin}
                      onChange={(e) => setNewRule(prev => ({ ...prev, amountMin: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="amountMax">Max Amount</Label>
                    <Input
                      id="amountMax"
                      type="number"
                      placeholder="100.00"
                      value={newRule.amountMax}
                      onChange={(e) => setNewRule(prev => ({ ...prev, amountMax: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="categoryName">Assign Category</Label>
                  <Select value={newRule.categoryName} onValueChange={(value) => setNewRule(prev => ({ ...prev, categoryName: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category..." />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tagNames">Add Tags (comma-separated)</Label>
                  <Input
                    id="tagNames"
                    placeholder="e.g., business, travel"
                    value={newRule.tagNames}
                    onChange={(e) => setNewRule(prev => ({ ...prev, tagNames: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCreateRule} size="sm">
                  Create Rule
                </Button>
                <Button onClick={() => setShowCreateForm(false)} variant="outline" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Rules List */}
          <div className="space-y-3">
            {rules.map((rule, index) => (
              <div key={rule.id} className="bg-[#f6f7f9] rounded-2xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-[#18312d]">{rule.name}</h4>
                      <Badge variant={rule.isActive ? "default" : "secondary"} className="text-xs">
                        {rule.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Priority {rule.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#18312d] opacity-70">
                      {rule.matchCount} transactions matched
                    </p>
                  </div>
                  <Switch
                    checked={rule.isActive}
                    onCheckedChange={() => handleToggleRule(rule.id)}
                  />
                </div>

                {/* Rule Conditions */}
                <div className="space-y-2 mb-3">
                  <div className="text-sm">
                    <span className="font-medium text-[#18312d]">When:</span>
                    <div className="mt-1 space-y-1">
                      {rule.conditions.merchantName && (
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">Merchant</Badge>
                          <span className="text-sm text-[#18312d] opacity-70">{rule.conditions.merchantName}</span>
                        </div>
                      )}
                      {rule.conditions.keywords && rule.conditions.keywords.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">Keywords</Badge>
                          <span className="text-sm text-[#18312d] opacity-70">{rule.conditions.keywords.join(', ')}</span>
                        </div>
                      )}
                      {(rule.conditions.amountMin || rule.conditions.amountMax) && (
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">Amount</Badge>
                          <span className="text-sm text-[#18312d] opacity-70">
                            ${rule.conditions.amountMin || '0'} - ${rule.conditions.amountMax || '∞'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="font-medium text-[#18312d]">Then:</span>
                    <div className="mt-1 space-y-1">
                      {rule.actions.categoryName && (
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">Category</Badge>
                          <span className="text-sm text-[#18312d] opacity-70">{rule.actions.categoryName}</span>
                        </div>
                      )}
                      {rule.actions.tagNames && rule.actions.tagNames.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">Tags</Badge>
                          <span className="text-sm text-[#18312d] opacity-70">#{rule.actions.tagNames.join(', #')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rule Actions */}
                <div className="flex gap-2">
                  <Button onClick={() => handleTestRule(rule)} variant="outline" size="sm">
                    Test Rule
                  </Button>
                  <Button onClick={() => console.log('Edit rule:', rule.id)} variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteRule(rule.id)} variant="destructive" size="sm">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-medium text-green-800 mb-1">Rule Best Practices</h3>
                <p className="text-sm text-green-700">
                  Start with simple rules for frequently used merchants. Use keywords for broader matching. Test rules before activating to ensure they work as expected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}