import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { colors } from '../theme/colors';

interface FilterCategoriesScreenProps {
  onBack: () => void;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  type: 'expense' | 'income';
  transactionCount: number;
  totalAmount: number;
  parentCategory?: string;
}

export default function FilterCategoriesScreen({ onBack }: FilterCategoriesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'expense' | 'income'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'usage' | 'amount'>('name');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories: Category[] = [
    { id: '1', name: 'Groceries', icon: '🛒', type: 'expense', transactionCount: 24, totalAmount: 1245.50 },
    { id: '2', name: 'Restaurants', icon: '🍽️', type: 'expense', transactionCount: 18, totalAmount: 567.80 },
    { id: '3', name: 'Transportation', icon: '🚗', type: 'expense', transactionCount: 15, totalAmount: 340.20 },
    { id: '4', name: 'Entertainment', icon: '🎬', type: 'expense', transactionCount: 12, totalAmount: 256.99 },
    { id: '5', name: 'Shopping', icon: '🛍️', type: 'expense', transactionCount: 9, totalAmount: 892.45 },
    { id: '6', name: 'Utilities', icon: '💡', type: 'expense', transactionCount: 6, totalAmount: 312.50 },
    { id: '7', name: 'Healthcare', icon: '⚕️', type: 'expense', transactionCount: 5, totalAmount: 450.00 },
    { id: '8', name: 'Salary', icon: '💰', type: 'income', transactionCount: 2, totalAmount: 8500.00 },
    { id: '9', name: 'Freelance', icon: '💼', type: 'income', transactionCount: 4, totalAmount: 1200.00 },
    { id: '10', name: 'Gas', icon: '⛽', type: 'expense', transactionCount: 8, totalAmount: 280.00 },
    { id: '11', name: 'Coffee', icon: '☕', type: 'expense', transactionCount: 32, totalAmount: 176.00 },
    { id: '12', name: 'Subscriptions', icon: '📱', type: 'expense', transactionCount: 7, totalAmount: 89.93 },
  ];

  const filteredCategories = categories
    .filter(cat => {
      const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || cat.type === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'usage':
          return b.transactionCount - a.transactionCount;
        case 'amount':
          return b.totalAmount - a.totalAmount;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id)
        ? prev.filter(catId => catId !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedCategories(filteredCategories.map(c => c.id));
  };

  const clearSelection = () => {
    setSelectedCategories([]);
  };

  const expenseCategories = filteredCategories.filter(c => c.type === 'expense');
  const incomeCategories = filteredCategories.filter(c => c.type === 'income');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filter Categories</Text>
        <TouchableOpacity
          onPress={selectedCategories.length > 0 ? clearSelection : selectAll}
          style={styles.selectButton}
        >
          <Text style={styles.selectText}>
            {selectedCategories.length > 0 ? 'Clear' : 'All'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search categories..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filtersRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeFilters}>
          {(['all', 'expense', 'income'] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                selectedType === type && styles.typeButtonActive
              ]}
              onPress={() => setSelectedType(type)}
            >
              <Text style={[
                styles.typeText,
                selectedType === type && styles.typeTextActive
              ]}>
                {type === 'all' ? 'All' : type === 'expense' ? 'Expenses' : 'Income'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <View style={styles.sortButtons}>
          {(['name', 'usage', 'amount'] as const).map((sort) => (
            <TouchableOpacity
              key={sort}
              style={[
                styles.sortButton,
                sortBy === sort && styles.sortButtonActive
              ]}
              onPress={() => setSortBy(sort)}
            >
              <Text style={[
                styles.sortText,
                sortBy === sort && styles.sortTextActive
              ]}>
                {sort === 'name' ? 'Name' : sort === 'usage' ? 'Usage' : 'Amount'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.selectionBar}>
          <Text style={styles.selectionCount}>
            {selectedCategories.length} of {filteredCategories.length} selected
          </Text>
        </View>

        {(selectedType === 'all' || selectedType === 'expense') && expenseCategories.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Expense Categories ({expenseCategories.length})</Text>
            {expenseCategories.map((category) => {
              const isSelected = selectedCategories.includes(category.id);
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
                  onPress={() => toggleCategory(category.id)}
                >
                  <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryMeta}>
                      {category.transactionCount} transactions • ${category.totalAmount.toFixed(0)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {(selectedType === 'all' || selectedType === 'income') && incomeCategories.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Income Categories ({incomeCategories.length})</Text>
            {incomeCategories.map((category) => {
              const isSelected = selectedCategories.includes(category.id);
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
                  onPress={() => toggleCategory(category.id)}
                >
                  <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryMeta}>
                      {category.transactionCount} transactions • ${category.totalAmount.toFixed(0)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {filteredCategories.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>No categories found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        )}
      </ScrollView>

      {selectedCategories.length > 0 && (
        <View style={styles.actionBar}>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>
              Apply Filter ({selectedCategories.length})
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#1f2937',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  selectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1f2937',
  },
  clearIcon: {
    fontSize: 16,
    color: '#9ca3af',
    padding: 4,
  },
  filtersRow: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  typeFilters: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  typeTextActive: {
    color: '#ffffff',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 6,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sortButtonActive: {
    backgroundColor: colors.primary + '20',
    borderColor: colors.primary,
  },
  sortText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  sortTextActive: {
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  selectionBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  selectionCount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  categoryCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '05',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  categoryMeta: {
    fontSize: 12,
    color: '#6b7280',
  },
  emptyState: {
    padding: 48,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  actionBar: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  applyButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
