import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Tag } from '../App';
import svgPaths from "../imports/svg-qll5vuxvpj";

interface EditTagProps {
  onBack: () => void;
  tag: Tag | null;
}

export default function EditTag({ onBack, tag }: EditTagProps) {
  const [formData, setFormData] = useState({
    name: '',
    color: '#2196F3',
    isArchived: false
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (tag) {
      setFormData({
        name: tag.name,
        color: tag.color,
        isArchived: tag.isArchived
      });
    }
  }, [tag]);

  const commonColors = [
    '#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0', '#607D8B',
    '#E91E63', '#00BCD4', '#8BC34A', '#FFC107', '#795548', '#3F51B5',
    '#CDDC39', '#FF5722', '#009688', '#673AB7'
  ];

  const handleSaveChanges = () => {
    console.log('Saving tag changes:', formData);
    onBack();
  };

  const handleDeleteTag = () => {
    console.log('Deleting tag:', tag?.id);
    onBack();
  };

  const handleArchiveTag = () => {
    setFormData(prev => ({ ...prev, isArchived: !prev.isArchived }));
    setHasChanges(true);
  };

  const isValid = formData.name.trim() && formData.color;

  if (!tag) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Tag not found</p>
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
            <h1 className="font-semibold text-[18px] text-[#18312d]">Edit: #{tag.name}</h1>
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
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: formData.color }}
              />
              <div>
                <p className="font-medium text-[#18312d]">
                  #{formData.name || 'tagname'}
                </p>
                <p className="text-sm text-[#18312d] opacity-70">
                  Custom tag{formData.isArchived && ' • Archived'}
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
                <p className="text-xl font-semibold text-blue-800">{tag.usageCount}</p>
              </div>
              <div>
                <p className="text-sm text-blue-700">Last Used</p>
                <p className="text-xl font-semibold text-blue-800">
                  {tag.usageCount > 0 ? '2 days ago' : 'Never'}
                </p>
              </div>
            </div>
          </div>

          {/* Archive Toggle */}
          <div className="bg-[#f6f7f9] rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-[#18312d]">Archive Tag</h3>
                <p className="text-sm text-[#18312d] opacity-70">
                  Archived tags won't appear in selection lists
                </p>
              </div>
              <Switch
                checked={formData.isArchived}
                onCheckedChange={handleArchiveTag}
              />
            </div>
          </div>

          {/* Tag Name */}
          <div className="space-y-2">
            <Label htmlFor="tagName">Tag Name</Label>
            <Input
              id="tagName"
              placeholder="Enter tag name..."
              value={formData.name}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, name: e.target.value }));
                setHasChanges(true);
              }}
            />
            <p className="text-sm text-[#18312d] opacity-70">
              Tag names should be short and descriptive
            </p>
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

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  Delete Tag
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Tag</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "#{tag.name}"? This action cannot be undone and will remove the tag from {tag.usageCount} existing transactions.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteTag}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Merge Suggestion */}
          {tag.usageCount > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-medium text-green-800 mb-1">Consider Merging</h3>
                  <p className="text-sm text-green-700">
                    If you have similar tags, consider merging them to keep your organization clean and consistent.
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