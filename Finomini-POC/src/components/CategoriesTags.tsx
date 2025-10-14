import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Screen, Category, Tag } from '../types';
import svgPaths from "../imports/svg-qll5vuxvpj";

interface CategoriesTagsProps {
  onBack: () => void;
  onNavigate: (screen: Screen, category?: Category, tag?: Tag) => void;
}

export default function CategoriesTags({ onBack, onNavigate }: CategoriesTagsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [showUnused, setShowUnused] = useState(false);

  // Mock data - in a real app this would come from state management
  const [categories] = useState<Category[]>([
    { id: '1', name: 'Groceries', icon: '🛒', color: '#4CAF50', group: 'Food & Dining', type: 'expense', isSystemDefault: true, usageCount: 45, isArchived: false },
    { id: '2', name: 'Gas', icon: '⛽', color: '#FF9800', group: 'Transportation', type: 'expense', isSystemDefault: true, usageCount: 23, isArchived: false },
    { id: '3', name: 'Salary', icon: '💰', color: '#2196F3', group: 'Income', type: 'income', isSystemDefault: true, usageCount: 12, isArchived: false },
    { id: '4', name: 'Coffee', icon: '☕', color: '#8D6E63', group: 'Food & Dining', type: 'expense', isSystemDefault: false, usageCount: 67, isArchived: false },
    { id: '5', name: 'Gym', icon: '🏋️', color: '#E91E63', group: 'Health & Fitness', type: 'expense', isSystemDefault: false, usageCount: 8, isArchived: false },
    { id: '6', name: 'Old Category', icon: '📦', color: '#9E9E9E', group: 'Miscellaneous', type: 'expense', isSystemDefault: false, usageCount: 0, isArchived: true }
  ]);

  const [tags] = useState<Tag[]>([
    { id: '1', name: 'Business', color: '#2196F3', usageCount: 34, isArchived: false },
    { id: '2', name: 'Travel', color: '#FF5722', usageCount: 18, isArchived: false },
    { id: '3', name: 'Emergency', color: '#F44336', usageCount: 3, isArchived: false },
    { id: '4', name: 'Gift', color: '#9C27B0', usageCount: 12, isArchived: false },
    { id: '5', name: 'Old Tag', color: '#9E9E9E', usageCount: 0, isArchived: true }
  ]);

  const categoryGroups = Array.from(new Set(categories.map(cat => cat.group)));

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArchived = showArchived ? true : !category.isArchived;
    const matchesUnused = showUnused ? category.usageCount === 0 : true;
    return matchesSearch && matchesArchived && matchesUnused;
  });

  const filteredTags = tags.filter(tag => {
    const matchesSearch = tag.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArchived = showArchived ? true : !tag.isArchived;
    const matchesUnused = showUnused ? tag.usageCount === 0 : true;
    return matchesSearch && matchesArchived && matchesUnused;
  });

  const groupedCategories = categoryGroups.reduce((acc, group) => {
    acc[group] = filteredCategories.filter(cat => cat.group === group);
    return acc;
  }, {} as Record<string, Category[]>);

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
            <h1 className="font-semibold text-[18px] text-[#18312d]">Categories &amp; Tags</h1>
          </div>
          <div className="w-[72px] flex justify-end">
            <button onClick={() => onNavigate('transaction-rules')} className="p-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6 overflow-y-auto" style={{ height: 'calc(100vh - 106px)' }}>
        {/* Search Bar */}
        <div className="mb-4">
          <Input
            placeholder="Search categories and tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Filter Options */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={showArchived ? "default" : "outline"}
            size="sm"
            onClick={() => setShowArchived(!showArchived)}
          >
            {showArchived ? 'Hide Archived' : 'Show Archived'}
          </Button>
          <Button
            variant={showUnused ? "default" : "outline"}
            size="sm"
            onClick={() => setShowUnused(!showUnused)}
          >
            {showUnused ? 'Hide Unused' : 'Show Unused'}
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
          </TabsList>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-[18px] text-[#18312d]">
                {filteredCategories.length} Categories
              </h3>
              <Button onClick={() => onNavigate('create-category')} size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add Category
              </Button>
            </div>

            {Object.entries(groupedCategories).map(([group, groupCategories]) => (
              groupCategories.length > 0 && (
                <div key={group} className="space-y-2">
                  <h4 className="font-medium text-[16px] text-[#18312d] opacity-70">{group}</h4>
                  <div className="bg-[#f6f7f9] rounded-2xl py-2">
                    {groupCategories.map((category, index) => (
                      <div
                        key={category.id}
                        className="px-4 py-3 border-b border-[#bac4c3] last:border-b-0"
                      >
                        <button
                          onClick={() => onNavigate('edit-category', category)}
                          className="w-full flex items-center gap-3"
                        >
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                            style={{ backgroundColor: category.color + '20' }}
                          >
                            {category.icon}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-[16px] text-[#18312d] leading-[24px] font-medium">
                                {category.name}
                              </p>
                              {category.isSystemDefault && (
                                <Badge variant="secondary" className="text-xs">System</Badge>
                              )}
                              {category.isArchived && (
                                <Badge variant="outline" className="text-xs">Archived</Badge>
                              )}
                            </div>
                            <p className="text-sm text-[#18312d] opacity-70">
                              {category.usageCount} transactions • {category.type}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-[#18312d] opacity-40" fill="none" viewBox="0 0 24 24">
                              <path d="M8 9l4-4 4 4M16 15l-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                              <path d={svgPaths.p3cf14e00} fill="#353945" />
                            </svg>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </TabsContent>

          {/* Tags Tab */}
          <TabsContent value="tags" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-[18px] text-[#18312d]">
                {filteredTags.length} Tags
              </h3>
              <Button onClick={() => onNavigate('create-tag')} size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add Tag
              </Button>
            </div>

            <div className="bg-[#f6f7f9] rounded-2xl py-2">
              {filteredTags.map((tag, index) => (
                <div
                  key={tag.id}
                  className="px-4 py-3 border-b border-[#bac4c3] last:border-b-0"
                >
                  <button
                    onClick={() => onNavigate('edit-tag', undefined, tag)}
                    className="w-full flex items-center gap-3"
                  >
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: tag.color }}
                    />
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[16px] text-[#18312d] leading-[24px] font-medium">
                          #{tag.name}
                        </p>
                        {tag.isArchived && (
                          <Badge variant="outline" className="text-xs">Archived</Badge>
                        )}
                      </div>
                      <p className="text-sm text-[#18312d] opacity-70">
                        {tag.usageCount} transactions
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#18312d] opacity-40" fill="none" viewBox="0 0 24 24">
                        <path d="M8 9l4-4 4 4M16 15l-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24">
                        <path d={svgPaths.p3cf14e00} fill="#353945" />
                      </svg>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Usage Insights */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-medium text-blue-800 mb-1">Smart Organization</h3>
              <p className="text-sm text-blue-700">
                Categories help organize your spending while tags add flexible labels. Set up automation rules to categorize transactions automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}