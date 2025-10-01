import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

interface CategoriesTagsScreenProps {
  onBack?: () => void;
}

export default function CategoriesTagsScreen({ onBack }: CategoriesTagsScreenProps) {
  const categories = [
    { id: '1', name: 'Groceries', icon: '🛒', color: '#10b981', transactions: 45 },
    { id: '2', name: 'Dining', icon: '🍽️', color: '#f59e0b', transactions: 32 },
    { id: '3', name: 'Transportation', icon: '🚗', color: '#3b82f6', transactions: 28 },
    { id: '4', name: 'Entertainment', icon: '🎬', color: '#8b5cf6', transactions: 18 },
    { id: '5', name: 'Shopping', icon: '🛍️', color: '#ec4899', transactions: 24 },
    { id: '6', name: 'Utilities', icon: '💡', color: '#6366f1', transactions: 12 },
    { id: '7', name: 'Healthcare', icon: '⚕️', color: '#ef4444', transactions: 8 },
    { id: '8', name: 'Travel', icon: '✈️', color: '#14b8a6', transactions: 5 },
  ];

  const tags = [
    { id: '1', name: 'work', color: '#3b82f6', count: 23 },
    { id: '2', name: 'personal', color: '#10b981', count: 67 },
    { id: '3', name: 'business', color: '#f59e0b', count: 15 },
    { id: '4', name: 'vacation', color: '#ec4899', count: 8 },
    { id: '5', name: 'gift', color: '#8b5cf6', count: 12 },
    { id: '6', name: 'recurring', color: '#6366f1', count: 34 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories & Tags</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <Text style={styles.sectionCount}>{categories.length}</Text>
          </View>
          <Text style={styles.sectionDescription}>
            Organize your transactions by category
          </Text>

          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <Text style={styles.categoryEmoji}>{category.icon}</Text>
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.transactions} transactions</Text>
                <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tags</Text>
            <Text style={styles.sectionCount}>{tags.length}</Text>
          </View>
          <Text style={styles.sectionDescription}>
            Add custom tags to your transactions
          </Text>

          <View style={styles.tagsContainer}>
            {tags.map((tag) => (
              <TouchableOpacity
                key={tag.id}
                style={[styles.tag, { backgroundColor: tag.color + '20', borderColor: tag.color }]}
              >
                <Text style={[styles.tagText, { color: tag.color }]}>
                  #{tag.name}
                </Text>
                <View style={[styles.tagBadge, { backgroundColor: tag.color }]}>
                  <Text style={styles.tagBadgeText}>{tag.count}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionLeft}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>➕</Text>
              </View>
              <View>
                <Text style={styles.actionTitle}>Create Category</Text>
                <Text style={styles.actionSubtitle}>Add a new spending category</Text>
              </View>
            </View>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionLeft}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>🏷️</Text>
              </View>
              <View>
                <Text style={styles.actionTitle}>Create Tag</Text>
                <Text style={styles.actionSubtitle}>Add a custom tag for filtering</Text>
              </View>
            </View>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionLeft}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>🔄</Text>
              </View>
              <View>
                <Text style={styles.actionTitle}>Auto-Categorize</Text>
                <Text style={styles.actionSubtitle}>Set up automatic rules</Text>
              </View>
            </View>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#7c3aed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  sectionCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    position: 'relative',
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
  },
  categoryDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  tagBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  tagBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  actionCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionEmoji: {
    fontSize: 24,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  actionArrow: {
    fontSize: 20,
    color: '#999',
  },
});
