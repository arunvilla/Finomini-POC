// Bulk categorization review screen for AI suggestions

import { useState, useEffect } from 'react';
import { ArrowLeft, Check, X, Brain, Filter, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useAppStore } from '../stores';
import { useAIFeedback, useQuickFeedback } from '../hooks/useAIFeedback';
import { BulkCategorizationItem } from '../types';
import { toast } from 'sonner';

interface BulkCategorizationScreenProps {
    onBack: () => void;
    onNavigate?: (screen: string, data?: any) => void;
}

const categories = [
    { id: '1', name: 'Food & Dining', icon: '🍽️' },
    { id: '2', name: 'Transportation', icon: '🚗' },
    { id: '3', name: 'Shopping', icon: '🛍️' },
    { id: '4', name: 'Entertainment', icon: '🎬' },
    { id: '5', name: 'Gas', icon: '⛽' },
    { id: '6', name: 'Grocery', icon: '🛒' },
    { id: '7', name: 'Income', icon: '💰' },
    { id: '8', name: 'Bills & Utilities', icon: '📄' },
    { id: '9', name: 'Transfer', icon: '↔️' }
];

export default function BulkCategorizationScreen({ onBack }: BulkCategorizationScreenProps) {
    const [items, setItems] = useState<BulkCategorizationItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<BulkCategorizationItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [confidenceFilter, setConfidenceFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    // Store and hooks
    const { transactions } = useAppStore();
    const { getImprovedSuggestion } = useAIFeedback();
    const { acceptSuggestion, correctSuggestion } = useQuickFeedback();

    // Load transactions and generate AI suggestions
    useEffect(() => {
        loadTransactionsForReview();
    }, []);

    // Filter items based on search and filters
    useEffect(() => {
        let filtered = items;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.merchant?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Confidence filter
        if (confidenceFilter !== 'all') {
            switch (confidenceFilter) {
                case 'high':
                    filtered = filtered.filter(item => item.confidence >= 0.8);
                    break;
                case 'medium':
                    filtered = filtered.filter(item => item.confidence >= 0.6 && item.confidence < 0.8);
                    break;
                case 'low':
                    filtered = filtered.filter(item => item.confidence < 0.6);
                    break;
            }
        }

        // Category filter
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(item => item.suggested_category === categoryFilter);
        }

        setFilteredItems(filtered);
    }, [items, searchTerm, confidenceFilter, categoryFilter]);

    const loadTransactionsForReview = async () => {
        setIsLoading(true);
        try {
            // Get recent transactions that might need review
            const recentTransactions = transactions
                .filter(t => !t.is_hidden && t.is_manual)
                .slice(0, 50); // Limit to 50 most recent

            const reviewItems: BulkCategorizationItem[] = [];

            for (const transaction of recentTransactions) {
                try {
                    const suggestion = await getImprovedSuggestion(
                        transaction.description,
                        transaction.merchant,
                        Math.abs(transaction.amount)
                    );

                    // Only include if AI has a different suggestion than current category
                    if (suggestion.category !== transaction.category && suggestion.confidence > 0.5) {
                        reviewItems.push({
                            transaction_id: transaction.id,
                            description: transaction.description,
                            merchant: transaction.merchant,
                            amount: Math.abs(transaction.amount),
                            current_category: transaction.category,
                            suggested_category: suggestion.category,
                            confidence: suggestion.confidence,
                            selected: false
                        });
                    }
                } catch (error) {
                    console.warn('Failed to get suggestion for transaction:', transaction.id, error);
                }
            }

            setItems(reviewItems);
        } catch (error) {
            console.error('Failed to load transactions for review:', error);
            toast.error('Failed to load transactions for review');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleItemSelection = (transactionId: string) => {
        setItems(prev => prev.map(item =>
            item.transaction_id === transactionId
                ? { ...item, selected: !item.selected }
                : item
        ));
    };

    const toggleAllSelection = () => {
        const allSelected = filteredItems.every(item => item.selected);
        setItems(prev => prev.map(item => {
            const isInFiltered = filteredItems.some(f => f.transaction_id === item.transaction_id);
            return isInFiltered ? { ...item, selected: !allSelected } : item;
        }));
    };

    const applySelectedSuggestions = async () => {
        const selectedItems = items.filter(item => item.selected);
        if (selectedItems.length === 0) {
            toast.error('No items selected');
            return;
        }

        setIsProcessing(true);
        try {
            let successCount = 0;
            let errorCount = 0;

            for (const item of selectedItems) {
                try {
                    // Record feedback as accepted suggestion
                    await acceptSuggestion(
                        item.transaction_id,
                        item.suggested_category,
                        item.confidence,
                        item.merchant,
                        item.amount,
                        item.description
                    );

                    // Update transaction category in store
                    // This would typically be done through the store action
                    // For now, we'll just record the feedback

                    successCount++;
                } catch (error) {
                    console.error('Failed to apply suggestion for transaction:', item.transaction_id, error);
                    errorCount++;
                }
            }

            if (successCount > 0) {
                toast.success(`Applied ${successCount} suggestions successfully`);
            }
            if (errorCount > 0) {
                toast.error(`Failed to apply ${errorCount} suggestions`);
            }

            // Reload the list
            await loadTransactionsForReview();
        } catch (error) {
            console.error('Failed to apply suggestions:', error);
            toast.error('Failed to apply suggestions');
        } finally {
            setIsProcessing(false);
        }
    };

    const rejectSelectedSuggestions = async () => {
        const selectedItems = items.filter(item => item.selected);
        if (selectedItems.length === 0) {
            toast.error('No items selected');
            return;
        }

        setIsProcessing(true);
        try {
            let successCount = 0;
            let errorCount = 0;

            for (const item of selectedItems) {
                try {
                    // Record feedback as rejected suggestion
                    await correctSuggestion(
                        item.transaction_id,
                        item.suggested_category,
                        item.confidence,
                        item.current_category || 'Other',
                        'User rejected bulk suggestion',
                        item.merchant,
                        item.amount,
                        item.description
                    );

                    successCount++;
                } catch (error) {
                    console.error('Failed to reject suggestion for transaction:', item.transaction_id, error);
                    errorCount++;
                }
            }

            if (successCount > 0) {
                toast.success(`Rejected ${successCount} suggestions`);
            }
            if (errorCount > 0) {
                toast.error(`Failed to reject ${errorCount} suggestions`);
            }

            // Reload the list
            await loadTransactionsForReview();
        } catch (error) {
            console.error('Failed to reject suggestions:', error);
            toast.error('Failed to reject suggestions');
        } finally {
            setIsProcessing(false);
        }
    };

    const toggleItemExpansion = (transactionId: string) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(transactionId)) {
                newSet.delete(transactionId);
            } else {
                newSet.add(transactionId);
            }
            return newSet;
        });
    };

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 0.8) return 'text-green-600 bg-green-100';
        if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
    };

    const getConfidenceLabel = (confidence: number) => {
        if (confidence >= 0.8) return 'High';
        if (confidence >= 0.6) return 'Medium';
        return 'Low';
    };

    const selectedCount = items.filter(item => item.selected).length;

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

                    <h1 className="text-xl font-semibold text-foreground">Review AI Suggestions</h1>

                    <div className="w-10" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Enhanced Summary with Statistics */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Brain className="h-5 w-5 text-blue-600" />
                            <span className="font-semibold">AI Categorization Review</span>
                            {!isLoading && (
                                <Badge variant="outline" className="ml-auto">
                                    {items.length} suggestions
                                </Badge>
                            )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                            Review and approve AI category suggestions for your transactions.
                            This helps improve future categorization accuracy.
                        </p>
                        
                        {!isLoading && items.length > 0 && (
                            <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                                <div className="text-center">
                                    <div className="text-lg font-semibold text-green-600">
                                        {items.filter(item => item.confidence >= 0.8).length}
                                    </div>
                                    <p className="text-xs text-muted-foreground">High Confidence</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-semibold text-yellow-600">
                                        {items.filter(item => item.confidence >= 0.6 && item.confidence < 0.8).length}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Medium Confidence</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-semibold text-red-600">
                                        {items.filter(item => item.confidence < 0.6).length}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Low Confidence</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Filters */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-4">
                        <div className="flex items-center gap-2">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search transactions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Confidence</label>
                                <Select value={confidenceFilter} onValueChange={setConfidenceFilter}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Confidence</SelectItem>
                                        <SelectItem value="high">High (80%+)</SelectItem>
                                        <SelectItem value="medium">Medium (60-80%)</SelectItem>
                                        <SelectItem value="low">Low (&lt;60%)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Category</label>
                                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {categories.map(cat => (
                                            <SelectItem key={cat.id} value={cat.name}>
                                                {cat.icon} {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Bulk Actions */}
                {filteredItems.length > 0 && (
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={filteredItems.length > 0 && filteredItems.every(item => item.selected)}
                                        onCheckedChange={toggleAllSelection}
                                    />
                                    <span className="text-sm font-medium">
                                        Select All ({selectedCount} selected)
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={applySelectedSuggestions}
                                        disabled={selectedCount === 0 || isProcessing}
                                        className="flex items-center gap-2"
                                    >
                                        <Check className="h-4 w-4" />
                                        Apply ({selectedCount})
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={rejectSelectedSuggestions}
                                        disabled={selectedCount === 0 || isProcessing}
                                        className="flex items-center gap-2"
                                    >
                                        <X className="h-4 w-4" />
                                        Reject ({selectedCount})
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Loading State */}
                {isLoading && (
                    <Card>
                        <CardContent className="p-8 text-center">
                            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-muted-foreground">Loading AI suggestions...</p>
                        </CardContent>
                    </Card>
                )}

                {/* Empty State */}
                {!isLoading && filteredItems.length === 0 && (
                    <Card>
                        <CardContent className="p-8 text-center">
                            <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No Suggestions Available</h3>
                            <p className="text-muted-foreground">
                                {items.length === 0
                                    ? "All your transactions are already well-categorized!"
                                    : "No transactions match your current filters."
                                }
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Transaction List */}
                {filteredItems.map((item) => {
                    const isExpanded = expandedItems.has(item.transaction_id);

                    return (
                        <Card key={item.transaction_id} className={item.selected ? 'ring-2 ring-blue-500' : ''}>
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    <Checkbox
                                        checked={item.selected}
                                        onCheckedChange={() => toggleItemSelection(item.transaction_id)}
                                        className="mt-1"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold truncate">{item.merchant || item.description}</p>
                                                <p className="text-sm text-muted-foreground">${item.amount.toFixed(2)}</p>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleItemExpansion(item.transaction_id)}
                                                className="p-1"
                                            >
                                                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                            </Button>
                                        </div>

                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="outline" className="text-xs">
                                                Current: {item.current_category}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">→</span>
                                            <Badge variant="default" className="text-xs">
                                                Suggested: {item.suggested_category}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant="secondary"
                                                className={`text-xs ${getConfidenceColor(item.confidence)}`}
                                            >
                                                {getConfidenceLabel(item.confidence)} ({Math.round(item.confidence * 100)}%)
                                            </Badge>
                                        </div>

                                        {isExpanded && (
                                            <div className="mt-3 pt-3 border-t border-border">
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    <strong>Description:</strong> {item.description}
                                                </p>
                                                {item.merchant && item.merchant !== item.description && (
                                                    <p className="text-sm text-muted-foreground mb-2">
                                                        <strong>Merchant:</strong> {item.merchant}
                                                    </p>
                                                )}

                                                <div className="flex gap-2 mt-3">
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        onClick={async () => {
                                                            try {
                                                                await acceptSuggestion(
                                                                    item.transaction_id,
                                                                    item.suggested_category,
                                                                    item.confidence,
                                                                    item.merchant,
                                                                    item.amount,
                                                                    item.description
                                                                );
                                                                toast.success('Suggestion accepted');
                                                                await loadTransactionsForReview();
                                                            } catch (error) {
                                                                toast.error('Failed to accept suggestion');
                                                            }
                                                        }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                        Accept
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={async () => {
                                                            try {
                                                                await correctSuggestion(
                                                                    item.transaction_id,
                                                                    item.suggested_category,
                                                                    item.confidence,
                                                                    item.current_category || 'Other',
                                                                    'User rejected individual suggestion',
                                                                    item.merchant,
                                                                    item.amount,
                                                                    item.description
                                                                );
                                                                toast.success('Suggestion rejected');
                                                                await loadTransactionsForReview();
                                                            } catch (error) {
                                                                toast.error('Failed to reject suggestion');
                                                            }
                                                        }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <X className="h-4 w-4" />
                                                        Reject
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}