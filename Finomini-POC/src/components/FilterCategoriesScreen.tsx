import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Badge } from './ui/badge';

interface FilterCategoriesScreenProps {
  onBack: () => void;
  onApplyFilters?: (filters: any) => void;
}

interface FilterState {
  type: string[];
  budgetStatus: string[];
  group: string[];
  usage: string[];
  visibility: string[];
}

const filterOptions = {
  type: ['Income', 'Expense'],
  budgetStatus: ['Over Budget', 'On Track', 'Under Budget', 'No Budget'],
  group: ['Food & Dining', 'Transportation', 'Housing', 'Entertainment', 'Shopping', 'Healthcare', 'Education'],
  usage: ['Most Used', 'Least Used', 'Unused'],
  visibility: ['Visible', 'Hidden']
};

export default function FilterCategoriesScreen({ onBack, onApplyFilters }: FilterCategoriesScreenProps) {
  const [filters, setFilters] = useState<FilterState>({
    type: [],
    budgetStatus: [],
    group: [],
    usage: [],
    visibility: ['Visible']
  });

  const [openSections, setOpenSections] = useState<string[]>(['type', 'budgetStatus']);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      type: [],
      budgetStatus: [],
      group: [],
      usage: [],
      visibility: []
    });
  };

  const applyFilters = () => {
    onApplyFilters?.(filters);
    onBack();
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).reduce((count, filterArray) => count + filterArray.length, 0);
  };

  const FilterSection = ({ 
    title, 
    category, 
    options 
  }: { 
    title: string; 
    category: keyof FilterState; 
    options: string[] 
  }) => (
    <Collapsible
      open={openSections.includes(category)}
      onOpenChange={() => toggleSection(category)}
    >
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-3 cursor-pointer hover:bg-accent/50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{title}</CardTitle>
              <div className="flex items-center gap-2">
                {filters[category].length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {filters[category].length}
                  </Badge>
                )}
                <div className={`transform transition-transform ${
                  openSections.includes(category) ? 'rotate-180' : ''
                }`}>
                  ▼
                </div>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${category}-${option}`}
                    checked={filters[category].includes(option)}
                    onCheckedChange={() => toggleFilter(category, option)}
                  />
                  <label
                    htmlFor={`${category}-${option}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );

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
          
          <h1 className="text-lg font-semibold text-foreground">Filter Categories</h1>
          
          <Button variant="ghost" onClick={clearAllFilters} className="text-sm">
            Clear All
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Active Filters Summary */}
        {getActiveFilterCount() > 0 && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900">
                  {getActiveFilterCount()} filter{getActiveFilterCount() !== 1 ? 's' : ''} active
                </span>
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-blue-700">
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filter Sections */}
        <div className="space-y-4">
          <FilterSection 
            title="Type" 
            category="type" 
            options={filterOptions.type} 
          />
          
          <FilterSection 
            title="Budget Status" 
            category="budgetStatus" 
            options={filterOptions.budgetStatus} 
          />
          
          <FilterSection 
            title="Group" 
            category="group" 
            options={filterOptions.group} 
          />
          
          <FilterSection 
            title="Usage" 
            category="usage" 
            options={filterOptions.usage} 
          />
          
          <FilterSection 
            title="Visibility" 
            category="visibility" 
            options={filterOptions.visibility} 
          />
        </div>
      </div>

      {/* Apply Button */}
      <div className="p-4 bg-card border-t border-border">
        <Button 
          onClick={applyFilters} 
          className="w-full flex items-center gap-2"
          disabled={getActiveFilterCount() === 0}
        >
          <Check className="h-4 w-4" />
          Apply Filters
          {getActiveFilterCount() > 0 && ` (${getActiveFilterCount()})`}
        </Button>
      </div>
    </div>
  );
}