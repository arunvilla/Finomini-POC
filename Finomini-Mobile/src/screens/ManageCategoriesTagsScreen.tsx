import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';

interface ManageCategoriesTagsScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export default function ManageCategoriesTagsScreen({ onBack, onNavigate }: ManageCategoriesTagsScreenProps) {
  const [activeTab, setActiveTab] = useState<'categories' | 'tags'>('categories');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: '1', name: 'Groceries', icon: '🛒', color: '#10b981', transactions: 45, active: true },
    { id: '2', name: 'Dining', icon: '🍽️', color: '#f59e0b', transactions: 32, active: true },
    { id: '3', name: 'Transportation', icon: '🚗', color: '#3b82f6', transactions: 28, active: true },
    { id: '4', name: 'Entertainment', icon: '🎬', color: '#8b5cf6', transactions: 18, active: false },
    { id: '5', name: 'Shopping', icon: '🛍️', color: '#ec4899', transactions: 24, active: true },
    { id: '6', name: 'Utilities', icon: '💡', color: '#6366f1', transactions: 12, active: true },
    { id: '7', name: 'Healthcare', icon: '⚕️', color: '#ef4444', transactions: 8, active: false },
    { id: '8', name: 'Travel', icon: '✈️', color: '#14b8a6', transactions: 5, active: true },
  ];

  const tags = [
    { id: '1', name: 'work', color: '#3b82f6', count: 23, active: true },
    { id: '2', name: 'personal', color: '#10b981', count: 67, active: true },
    { id: '3', name: 'business', color: '#f59e0b', count: 15, active: true },
    { id: '4', name: 'vacation', color: '#ec4899', count: 8, active: false },
    { id: '5', name: 'gift', color: '#8b5cf6', count: 12, active: true },
    { id: '6', name: 'recurring', color: '#6366f1', count: 34, active: true },
  ];

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'categories' && styles.tabActive]}
          onPress={() => setActiveTab('categories')}
        >
          <Text style={[styles.tabText, activeTab === 'categories' && styles.tabTextActive]}>
            Categories
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'tags' && styles.tabActive]}
          onPress={() => setActiveTab('tags')}
        >
          <Text style={[styles.tabText, activeTab === 'tags' && styles.tabTextActive]}>
            Tags
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${activeTab}...`}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'categories' ? (
          <>
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderText}>{filteredCategories.length} Categories</Text>
              <TouchableOpacity onPress={() => onNavigate?.('create-category')}>
                <Text style={styles.createButton}>+ Create</Text>
              </TouchableOpacity>
            </View>

            {filteredCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.itemCard}
                onPress={() => onNavigate?.('category-detail', category)}
              >
                <View style={styles.itemLeft}>
                  <View style={[styles.iconCircle, { backgroundColor: category.color + '20' }]}>
                    <Text style={styles.itemIcon}>{category.icon}</Text>
                  </View>
                  <View>
                    <Text style={styles.itemName}>{category.name}</Text>
                    <Text style={styles.itemMeta}>{category.transactions} transactions</Text>
                  </View>
                </View>
                <View style={styles.itemRight}>
                  <View style={[styles.statusBadge, { backgroundColor: category.active ? '#d1fae5' : '#fee2e2' }]}>
                    <Text style={[styles.statusText, { color: category.active ? '#10b981' : '#ef4444' }]}>
                      {category.active ? 'Active' : 'Inactive'}
                    </Text>
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <>
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderText}>{filteredTags.length} Tags</Text>
              <TouchableOpacity onPress={() => onNavigate?.('create-tag')}>
                <Text style={styles.createButton}>+ Create</Text>
              </TouchableOpacity>
            </View>

            {filteredTags.map((tag) => (
              <TouchableOpacity
                key={tag.id}
                style={styles.itemCard}
                onPress={() => onNavigate?.('edit-tag', tag)}
              >
                <View style={styles.itemLeft}>
                  <View style={[styles.tagDot, { backgroundColor: tag.color }]} />
                  <View>
                    <Text style={styles.itemName}>{tag.name}</Text>
                    <Text style={styles.itemMeta}>{tag.count} uses</Text>
                  </View>
                </View>
                <View style={styles.itemRight}>
                  <View style={[styles.statusBadge, { backgroundColor: tag.active ? '#d1fae5' : '#fee2e2' }]}>
                    <Text style={[styles.statusText, { color: tag.active ? '#10b981' : '#ef4444' }]}>
                      {tag.active ? 'Active' : 'Inactive'}
                    </Text>
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: 32,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#2563eb',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
  },
  tabTextActive: {
    color: '#2563eb',
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  listHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  createButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemIcon: {
    fontSize: 24,
  },
  tagDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  itemMeta: {
    fontSize: 13,
    color: '#6b7280',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 24,
    color: '#9ca3af',
  },
});
