import { useState } from 'react';
import { ArrowLeft, ArrowRight, Merge } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';

interface MergeCategoriesScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

// Mock categories data
const mockCategories = [
  { id: '1', name: 'Groceries', icon: '🛒', transactionCount: 45 },
  { id: '2', name: 'Food Shopping', icon: '🥘', transactionCount: 12 },
  { id: '3', name: 'Gas', icon: '⛽', transactionCount: 20 },
  { id: '4', name: 'Fuel', icon: '🚗', transactionCount: 8 },
  { id: '5', name: 'Coffee Shop A', icon: '☕', transactionCount: 15 },
  { id: '6', name: 'Coffee Shop B', icon: '☕', transactionCount: 7 }
];

export default function MergeCategoriesScreen({ onBack }: MergeCategoriesScreenProps) {
  const [sourceCategory, setSourceCategory] = useState('');
  const [targetCategory, setTargetCategory] = useState('');

  const getSelectedCategory = (id: string) => {
    return mockCategories.find(cat => cat.id === id);
  };

  const canMerge = sourceCategory && targetCategory && sourceCategory !== targetCategory;
  
  const source = getSelectedCategory(sourceCategory);
  const target = getSelectedCategory(targetCategory);

  const handleMerge = () => {
    if (!canMerge) return;
    
    // Show confirmation dialog and perform merge
    console.log(`Merging ${source?.name} into ${target?.name}`);
    // After successful merge, go back
    onBack();
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
          
          <h1 className="text-lg font-semibold text-foreground">Merge Categories</h1>
          
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Instructions */}
        <Alert>
          <Merge className="h-4 w-4" />
          <AlertDescription>
            Merge two categories into one. All transactions from the source category will be moved to the target category.
          </AlertDescription>
        </Alert>

        {/* Source Category Selection */}
        <Card>
          <CardHeader>
            <CardTitle>From (Source Category)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="source">Select category to merge from</Label>
              <Select value={sourceCategory} onValueChange={setSourceCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose source category" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories
                    .filter(cat => cat.id !== targetCategory)
                    .map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      <div className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({cat.transactionCount} transactions)
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {source && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{source.icon}</span>
                  <div>
                    <h4 className="font-medium">{source.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {source.transactionCount} transactions will be moved
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Merge Arrow */}
        {source && target && (
          <div className="flex justify-center">
            <div className="flex items-center gap-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
              <ArrowRight className="h-4 w-4" />
              <span className="text-sm font-medium">Merge Into</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        )}

        {/* Target Category Selection */}
        <Card>
          <CardHeader>
            <CardTitle>To (Target Category)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="target">Select category to merge into</Label>
              <Select value={targetCategory} onValueChange={setTargetCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose target category" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories
                    .filter(cat => cat.id !== sourceCategory)
                    .map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      <div className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({cat.transactionCount} transactions)
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {target && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{target.icon}</span>
                  <div>
                    <h4 className="font-medium">{target.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Currently has {target.transactionCount} transactions
                      {source && ` • Will have ${target.transactionCount + source.transactionCount} after merge`}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Warning */}
        {canMerge && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertDescription className="text-yellow-800">
              <strong>Warning:</strong> This action cannot be undone. The "{source?.name}" category will be permanently deleted and all its transactions will be moved to "{target?.name}".
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Merge Button */}
      <div className="p-4 bg-card border-t border-border">
        <Button 
          onClick={handleMerge}
          disabled={!canMerge}
          className="w-full"
          variant={canMerge ? "destructive" : "secondary"}
        >
          <Merge className="h-4 w-4 mr-2" />
          {canMerge ? `Merge "${source?.name}" into "${target?.name}"` : 'Select categories to merge'}
        </Button>
      </div>
    </div>
  );
}