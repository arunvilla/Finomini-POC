import React, { useMemo, useCallback, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { VirtualList } from './ui/virtual-list';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useLazyLoading } from '../hooks/useLazyLoading';
import {
    MoreHorizontal,
    Edit3,
    Receipt,
    CheckSquare,
    Square,
    RefreshCw
} from 'lucide-react';

interface Transaction {
    id: string;
    amount: number;
    date: Date | string;
    description: string;
    merchant?: string;
    category: string;
    account_id?: string;
    status?: string;
    receipt_image?: string;
    receipt_images?: string[];
    tags?: string[];
    notes?: string;
    is_hidden?: boolean;
}

interface OptimizedTransactionListProps {
    transactions: Transaction[];
    onTransactionClick?: (transaction: Transaction) => void;
    onNavigate?: (screen: string, data?: any) => void;
    isSelectionMode?: boolean;
    selectedTransactions?: string[];
    onToggleSelection?: (transactionId: string) => void;
    formatCurrency?: (amount: number) => string;
    getAccountDisplayName?: (accountId?: string) => string;
    enableVirtualScrolling?: boolean;
    enableInfiniteScroll?: boolean;
    pageSize?: number;
    containerHeight?: number;
    itemHeight?: number;
}

const ITEM_HEIGHT = 120; // Approximate height of each transaction item
const CONTAINER_HEIGHT = 600; // Default container height
const PAGE_SIZE = 50; // Default page size for pagination

export function OptimizedTransactionList({
    transactions,
    onTransactionClick,
    onNavigate,
    isSelectionMode = false,
    selectedTransactions = [],
    onToggleSelection,
    formatCurrency = (amount) => `$${Math.abs(amount).toFixed(2)}`,
    getAccountDisplayName = (accountId) => accountId ? `Account ${accountId.slice(-4)}` : 'Manual Entry',
    enableVirtualScrolling = true,
    enableInfiniteScroll = true,
    pageSize = PAGE_SIZE,
    containerHeight = CONTAINER_HEIGHT,
    itemHeight = ITEM_HEIGHT
}: OptimizedTransactionListProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Group transactions by date for better organization
    const groupedTransactions = useMemo(() => {
        const groups: { [key: string]: Transaction[] } = {};

        transactions.forEach(transaction => {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const transactionDate = new Date(transaction.date);

            let dateKey: string;
            if (transactionDate.toDateString() === today.toDateString()) {
                dateKey = 'Today';
            } else if (transactionDate.toDateString() === yesterday.toDateString()) {
                dateKey = 'Yesterday';
            } else {
                dateKey = transactionDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: transactionDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
                });
            }

            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(transaction);
        });

        return groups;
    }, [transactions]);

    // Flatten grouped transactions for virtual scrolling
    const flattenedTransactions = useMemo(() => {
        const flattened: (Transaction | { type: 'header'; dateKey: string; count: number })[] = [];

        Object.entries(groupedTransactions).forEach(([dateKey, dateTransactions]) => {
            flattened.push({ type: 'header', dateKey, count: dateTransactions.length });
            flattened.push(...dateTransactions);
        });

        return flattened;
    }, [groupedTransactions]);

    // Lazy loading for historical data
    const loadMoreTransactions = useCallback(async (_page: number, _size: number) => {
        // This would typically fetch from an API or load from storage
        // For now, we'll simulate loading more data
        await new Promise(resolve => setTimeout(resolve, 500));
        return []; // Return empty array as we're working with existing data
    }, []);

    const {
        data: lazyTransactions,
        isLoading: isLazyLoading,
        hasMore,
        loadMore,
        checkScrollPosition
    } = useLazyLoading({
        initialData: enableInfiniteScroll ? transactions.slice(0, pageSize) : transactions,
        loadMoreData: loadMoreTransactions,
        pageSize
    });

    // Infinite scroll setup
    const { loadingRef, isFetching } = useInfiniteScroll({
        hasNextPage: hasMore && enableInfiniteScroll,
        fetchNextPage: loadMore
    });

    // Handle scroll for lazy loading
    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        if (!enableInfiniteScroll) return;

        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        checkScrollPosition(scrollTop, scrollHeight, clientHeight);
    }, [enableInfiniteScroll, checkScrollPosition]);

    // Helper functions
    const getTransactionIcon = (transaction: Transaction) => {
        const category = transaction.category.toLowerCase();
        if (category.includes('food') || category.includes('dining')) return '🍽️';
        if (category.includes('shopping') || category.includes('retail')) return '🛍️';
        if (category.includes('transport') || category.includes('gas')) return '🚗';
        if (category.includes('entertainment')) return '🎬';
        if (category.includes('income') || category.includes('salary')) return '💰';
        if (category.includes('grocery')) return '🛒';
        if (category.includes('utilities')) return '💡';
        return '💳';
    };

    const getTransactionIconColor = (transaction: Transaction) => {
        const category = transaction.category.toLowerCase();
        if (category.includes('food') || category.includes('dining')) return 'bg-amber-500';
        if (category.includes('shopping') || category.includes('retail')) return 'bg-orange-500';
        if (category.includes('transport') || category.includes('gas')) return 'bg-gray-900';
        if (category.includes('entertainment')) return 'bg-red-500';
        if (category.includes('income') || category.includes('salary')) return 'bg-green-500';
        if (category.includes('grocery')) return 'bg-green-600';
        if (category.includes('utilities')) return 'bg-yellow-500';
        return 'bg-blue-500';
    };

    // Render individual transaction item
    const renderTransactionItem = useCallback((item: Transaction | { type: 'header'; dateKey: string; count: number }, _index: number) => {
        if ('type' in item && item.type === 'header') {
            return (
                <div key={`header-${item.dateKey}`} className="flex items-center justify-between px-2 py-3">
                    <h3 className="font-semibold text-foreground">{item.dateKey}</h3>
                    <span className="text-sm text-muted-foreground">
                        {item.count} transaction{item.count !== 1 ? 's' : ''}
                    </span>
                </div>
            );
        }

        const transaction = item as Transaction;

        return (
            <Card
                key={transaction.id}
                className={`border-border hover:bg-accent/50 transition-colors mb-2 ${isSelectionMode && selectedTransactions.includes(transaction.id) ? 'ring-2 ring-primary' : ''
                    }`}
            >
                <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                        {/* Selection Checkbox */}
                        {isSelectionMode && onToggleSelection && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onToggleSelection(transaction.id)}
                                className="h-8 w-8 p-0"
                            >
                                {selectedTransactions.includes(transaction.id) ? (
                                    <CheckSquare className="h-5 w-5 text-primary" />
                                ) : (
                                    <Square className="h-5 w-5" />
                                )}
                            </Button>
                        )}

                        {/* Transaction Icon */}
                        <div className={`w-12 h-12 rounded-full ${getTransactionIconColor(transaction)} flex items-center justify-center text-white text-lg flex-shrink-0`}>
                            {getTransactionIcon(transaction)}
                        </div>

                        {/* Transaction Details */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <h3
                                    className="font-semibold text-foreground truncate cursor-pointer hover:text-primary"
                                    onClick={() => onTransactionClick?.(transaction)}
                                >
                                    {transaction.merchant || transaction.description}
                                </h3>
                                <div className="flex items-center gap-2">
                                    {transaction.status === 'pending' && (
                                        <Badge variant="outline" className="text-xs">
                                            Pending
                                        </Badge>
                                    )}
                                    {(transaction.receipt_image || transaction.receipt_images?.length) && (
                                        <Receipt className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    <span className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-foreground'
                                        }`}>
                                        {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-1 text-sm text-muted-foreground">
                                <span className="truncate">{transaction.category} • {getAccountDisplayName(transaction.account_id)}</span>
                                <span className="flex-shrink-0">
                                    {new Date(transaction.date).toLocaleTimeString('en-US', {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true
                                    })}
                                </span>
                            </div>

                            {/* Tags */}
                            {transaction.tags && transaction.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {transaction.tags.map((tag: string) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            #{tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {/* Notes */}
                            {transaction.notes && (
                                <div className="mt-1 text-xs text-muted-foreground italic">
                                    {transaction.notes}
                                </div>
                            )}
                        </div>

                        {/* Action Menu - Only show if not in selection mode */}
                        {!isSelectionMode && onNavigate && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        onClick={() => onNavigate('transaction-details-screen', { transaction })}
                                        className="flex items-center gap-2"
                                    >
                                        <Edit3 className="h-4 w-4" />
                                        Edit Transaction
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => onNavigate('split-transaction', { transaction })}
                                        className="flex items-center gap-2"
                                    >
                                        Split Transaction
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => onNavigate('transaction-details-screen', { transaction })}
                                        className="flex items-center gap-2"
                                    >
                                        View Details
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }, [
        isSelectionMode,
        selectedTransactions,
        onToggleSelection,
        onTransactionClick,
        formatCurrency,
        getAccountDisplayName,
        onNavigate
    ]);

    const dataToRender = enableInfiniteScroll ? lazyTransactions : transactions;
    const itemsToRender = enableVirtualScrolling ? flattenedTransactions : dataToRender;

    if (dataToRender.length === 0) {
        return (
            <Card className="border-border">
                <CardContent className="py-8 text-center">
                    <div className="text-muted-foreground">
                        <div className="text-4xl mb-4">💳</div>
                        <p className="text-lg font-medium mb-2">No transactions yet</p>
                        <p className="text-sm mb-4">Connect your accounts or add transactions manually to get started</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {enableVirtualScrolling && itemsToRender.length > 20 ? (
                <VirtualList
                    items={itemsToRender}
                    itemHeight={itemHeight}
                    containerHeight={containerHeight}
                    renderItem={renderTransactionItem}
                    className="border rounded-lg"
                />
            ) : (
                <div
                    ref={containerRef}
                    className="space-y-2 max-h-[600px] overflow-y-auto"
                    onScroll={handleScroll}
                >
                    {Object.entries(groupedTransactions).map(([dateGroup, transactions]) => (
                        <div key={dateGroup} className="space-y-2">
                            {/* Date Header */}
                            <div className="flex items-center justify-between px-2 py-1">
                                <h3 className="font-semibold text-foreground">{dateGroup}</h3>
                                <span className="text-sm text-muted-foreground">
                                    {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            {/* Transactions for this date */}
                            <div className="space-y-2">
                                {transactions.map((transaction) => renderTransactionItem(transaction, 0))}
                            </div>
                        </div>
                    ))}

                    {/* Infinite scroll loading indicator */}
                    {enableInfiniteScroll && (
                        <div ref={loadingRef} className="py-4">
                            {(isFetching || isLazyLoading) && (
                                <div className="flex items-center justify-center">
                                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                                    <span className="text-sm text-muted-foreground">Loading more transactions...</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default OptimizedTransactionList;