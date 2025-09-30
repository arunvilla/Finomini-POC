import { useState } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import svgPaths from '../imports/svg-andkyf65ak';

interface TransactionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: any;
  onSave: (updatedTransaction: any) => void;
  onNavigate?: (screen: string, data?: any) => void;
}

// SVG Components from Figma
function KeyboardArrowDown() {
  return (
    <div className="relative shrink-0 size-5">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <path
          d={svgPaths.p11d13340}
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function KeyboardArrowRight() {
  return (
    <div className="relative shrink-0 size-5">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <path
          d={svgPaths.p3cf14e00}
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

const categories = [
  'Grocery', 'Food & Dining', 'Transportation', 'Shopping', 
  'Entertainment', 'Gas', 'Transfer', 'Income', 'Bills & Utilities'
];

const tags = [
  'Work', 'Personal', 'Emergency', 'Subscription', 'One-time', 'Recurring'
];

export default function TransactionEditModal({ isOpen, onClose, transaction, onSave, onNavigate }: TransactionEditModalProps) {
  const [editedTransaction, setEditedTransaction] = useState({
    merchant: transaction?.merchant || '',
    account: transaction?.account || '',
    category: transaction?.category || '',
    date: transaction?.date ? new Date(transaction.date).toISOString().split('T')[0] : '',
    notes: transaction?.notes || '',
    tags: transaction?.tags || [],
    isHidden: transaction?.isHidden || false,
    amount: transaction?.amount || 0
  });

  const handleSave = () => {
    onSave({
      ...transaction,
      ...editedTransaction,
      date: new Date(editedTransaction.date)
    });
    onClose();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto rounded-2xl border-0 shadow-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="text-xl font-semibold text-foreground">Transaction Details</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-2">
            Edit transaction information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-0">
          {/* Merchant */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex-1">
              <Label className="text-base font-semibold text-foreground">Merchant</Label>
            </div>
            <div className="flex-1 text-right">
              <Input
                value={editedTransaction.merchant}
                onChange={(e) => setEditedTransaction({ ...editedTransaction, merchant: e.target.value })}
                className="border-none bg-transparent text-right p-0 h-auto focus:ring-0 text-base"
                placeholder="Enter merchant"
              />
            </div>
          </div>

          {/* Account */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex-1">
              <Label className="text-base font-semibold text-foreground">Account</Label>
            </div>
            <div className="flex-1 text-right">
              <span className="text-base text-foreground">{editedTransaction.account}</span>
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex-1">
              <Label className="text-base font-semibold text-foreground">Category</Label>
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={editedTransaction.category}
                onValueChange={(value) => setEditedTransaction({ ...editedTransaction, category: value })}
              >
                <SelectTrigger className="border-none bg-transparent text-right p-0 h-auto focus:ring-0 text-base w-auto">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <KeyboardArrowDown />
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex-1">
              <Label className="text-base font-semibold text-foreground">Date</Label>
            </div>
            <div className="flex-1 text-right">
              <Input
                type="date"
                value={editedTransaction.date}
                onChange={(e) => setEditedTransaction({ ...editedTransaction, date: e.target.value })}
                className="border-none bg-transparent text-right p-0 h-auto focus:ring-0 text-base w-auto"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex-1">
              <Label className="text-base font-semibold text-foreground">Notes</Label>
            </div>
            <div className="flex-1 text-right">
              <Input
                value={editedTransaction.notes}
                onChange={(e) => setEditedTransaction({ ...editedTransaction, notes: e.target.value })}
                className="border-none bg-transparent text-right p-0 h-auto focus:ring-0 text-base"
                placeholder="Add"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex-1">
              <Label className="text-base font-semibold text-foreground">Tags</Label>
            </div>
            <div className="flex items-center gap-2">
              <Select
                onValueChange={(value) => {
                  if (value && !editedTransaction.tags.includes(value)) {
                    setEditedTransaction({
                      ...editedTransaction,
                      tags: [...editedTransaction.tags, value]
                    });
                  }
                }}
              >
                <SelectTrigger className="border-none bg-transparent text-right p-0 h-auto focus:ring-0 text-base w-auto">
                  <span className="text-muted-foreground">
                    {editedTransaction.tags.length > 0 ? editedTransaction.tags.join(', ') : 'Add'}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {tags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <KeyboardArrowDown />
            </div>
          </div>

          {/* Hide */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex-1">
              <Label className="text-base font-semibold text-foreground">Hide</Label>
            </div>
            <div className="flex items-center">
              <Switch
                checked={editedTransaction.isHidden}
                onCheckedChange={(checked) => setEditedTransaction({ ...editedTransaction, isHidden: checked })}
              />
            </div>
          </div>

          {/* Merchant Trend */}
          <div className="flex items-center justify-between p-4">
            <div className="flex-1">
              <Label className="text-base font-semibold text-foreground">Merchant Trend</Label>
            </div>
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="p-0 h-auto"
                onClick={() => {
                  if (onNavigate && transaction?.merchant) {
                    onClose();
                    onNavigate('merchant-trend', { merchant: transaction.merchant });
                  }
                }}
              >
                <KeyboardArrowRight />
              </Button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}