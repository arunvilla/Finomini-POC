import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Switch } from './ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Category } from '../types';
import svgPaths from "../imports/svg-qll5vuxvpj";

interface EditCategoryProps {
  onBack: () => void;
  category: Category | null;
}

export default function EditCategory({ onBack, category }: EditCategoryProps) {
  const [formData, setFormData] = useState({
    name: '',
    group: '',
    newGroup: '',
    icon: '💰',
    color: '#2196F3',
    type: 'expense' as 'income' | 'expense',
    isArchived: false
  });

  const [isCreatingNewGroup, setIsCreatingNewGroup] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        group: category.group,
        newGroup: '',
        icon: category.icon,
        color: category.color,
        type: category.type,
        isArchived: category.isArchived
      });
    }
  }, [category]);

  const existingGroups = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Health & Fitness',
    'Travel',
    'Business',
    'Income'
  ];

  const commonIcons = [
    '💰', '🛒', '🍕', '⛽', '🏠', '🎬', '💊', '✈️', '📱', '💻',
    '🎓', '🎮', '☕', '🚗', '🏋️', '💳', '🎯', '📚', '🍔', '🛍️',
    '🎵', '💡', '🔧', '🎨', '🏥', '💼', '🧳', '🎪', '🏦', '🎭'
  ];

  const commonColors = [
    '#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0', '#607D8B',
    '#E91E63', '#00BCD4', '#8BC34A', '#FFC107', '#795548', '#3F51B5',
    '#CDDC39', '#FF5722', '#009688', '#673AB7'
  ];

  const handleSaveChanges = () => {
    console.log('Saving category changes:', formData);
    onBack();
  };

  const handleDeleteCategory = () => {
    console.log('Deleting category:', category?.id);
    onBack();
  };

  const handleArchiveCategory = () => {
    setFormData(prev => ({ ...prev, isArchived: !prev.isArchived }));
    setHasChanges(true);
  };

  const groupToUse = isCreatingNewGroup ? formData.newGroup : formData.group;
  const isValid = formData.name.trim() && groupToUse.trim() && formData.icon && formData.color;

  if (!category) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Category not found</p>
      </div>
    );
  }

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
            <h1 className="font-semibold text-[18px] text-[#18312d]">Edit: {category.name}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6 overflow-y-auto" style={{ height: 'calc(100vh - 106px)' }}>
        <div className="space-y-6">
          {/* Live Preview */}
          <div className="bg-[#f6f7f9] rounded-2xl p-4">
            <h3 className="font-medium text-[#18312d] mb-3">Preview</h3>
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                style={{ backgroundColor: formData.color + '20' }}
              >
                {formData.icon}
              </div>
              <div>
                <p className="font-medium text-[#18312d]">
                  {formData.name || 'Category Name'}
                </p>
                <p className="text-sm text-[#18312d] opacity-70">
                  {groupToUse || 'Group'} • {formData.type}
                  {formData.isArchived && ' • Archived'}
                </p>
              </div>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <h3 className="font-medium text-blue-800 mb-2">Usage Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-blue-700">Total Transactions</p>
                <p className="text-xl font-semibold text-blue-800">{category.usageCount}</p>
              </div>
              <div>
                <p className="text-sm text-blue-700">Category Type</p>
                <p className="text-xl font-semibold text-blue-800">{category.isSystemDefault ? 'System' : 'Custom'}</p>
              </div>
            </div>
          </div>

          {/* Archive Toggle */}
          <div className="bg-[#f6f7f9] rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-[#18312d]">Archive Category</h3>
                <p className="text-sm text-[#18312d] opacity-70">
                  Archived categories won't appear in selection lists
                </p>
              </div>
              <Switch
                checked={formData.isArchived}
                onCheckedChange={handleArchiveCategory}
              />
            </div>
          </div>

          {/* Category Name */}
          <div className="space-y-2">
            <Label htmlFor="categoryName">Category Name</Label>
            <Input
              id="categoryName"
              placeholder="Enter category name..."
              value={formData.name}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, name: e.target.value }));
                setHasChanges(true);
              }}
            />
          </div>

          {/* Category Group */}
          <div className="space-y-2">
            <Label>Category Group</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="existing-group"
                  checked={!isCreatingNewGroup}
                  onChange={() => setIsCreatingNewGroup(false)}
                  className="w-4 h-4"
                />
                <Label htmlFor="existing-group">Use existing group</Label>
              </div>
              {!isCreatingNewGroup && (
                <Select 
                  value={formData.group} 
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, group: value }));
                    setHasChanges(true);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a group..." />
                  </SelectTrigger>
                  <SelectContent>
                    {existingGroups.map((group) => (
                      <SelectItem key={group} value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="new-group"
                  checked={isCreatingNewGroup}
                  onChange={() => setIsCreatingNewGroup(true)}
                  className="w-4 h-4"
                />
                <Label htmlFor="new-group">Create new group</Label>
              </div>
              {isCreatingNewGroup && (
                <Input
                  placeholder="Enter new group name..."
                  value={formData.newGroup}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, newGroup: e.target.value }));
                    setHasChanges(true);
                  }}
                />
              )}
            </div>
          </div>

          {/* Category Type */}
          <div className="space-y-2">
            <Label>Category Type</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value: 'income' | 'expense') => {
                setFormData(prev => ({ ...prev, type: value }));
                setHasChanges(true);
              }}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="expense" id="expense" />
                <Label htmlFor="expense">Expense</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="income" id="income" />
                <Label htmlFor="income">Income</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Icon Picker */}
          <div className="space-y-2">
            <Label>Choose Icon</Label>
            <div className="grid grid-cols-6 gap-2">
              {commonIcons.map((icon) => (
                <button
                  key={icon}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, icon }));
                    setHasChanges(true);
                  }}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl border-2 transition-colors ${
                    formData.icon === icon 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div className="space-y-2">
            <Label>Choose Color</Label>
            <div className="grid grid-cols-8 gap-2">
              {commonColors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, color }));
                    setHasChanges(true);
                  }}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    formData.color === color 
                      ? 'border-gray-400 scale-110' 
                      : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleSaveChanges}
              disabled={!isValid}
              className="w-full"
            >
              Save Changes
            </Button>

            {!category.isSystemDefault && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    Delete Category
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Category</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{category.name}"? This action cannot be undone and will affect {category.usageCount} existing transactions.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteCategory}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          {/* System Default Warning */}
          {category.isSystemDefault && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-medium text-yellow-800 mb-1">System Default Category</h3>
                  <p className="text-sm text-yellow-700">
                    This is a system-provided category. You can modify it but cannot delete it. Consider archiving if not needed.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}