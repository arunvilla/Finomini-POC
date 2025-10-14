import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Switch,
} from 'react-native';

interface CategoriesTagsSettingsScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
}

export default function CategoriesTagsSettingsScreen({ onBack, onNavigate }: CategoriesTagsSettingsScreenProps) {
  const [autoSuggest, setAutoSuggest] = useState(true);
  const [showSubcategories, setShowSubcategories] = useState(true);
  const [requireCategory, setRequireCategory] = useState(false);
  const [multipleCategories, setMultipleCategories] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories & Tags</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category Settings</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>💡</Text>
              <View>
                <Text style={styles.settingLabel}>Auto-Suggest Categories</Text>
                <Text style={styles.settingDescription}>AI suggests categories automatically</Text>
              </View>
            </View>
            <Switch value={autoSuggest} onValueChange={setAutoSuggest} />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>📂</Text>
              <View>
                <Text style={styles.settingLabel}>Show Subcategories</Text>
                <Text style={styles.settingDescription}>Display subcategory breakdown</Text>
              </View>
            </View>
            <Switch value={showSubcategories} onValueChange={setShowSubcategories} />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>⚠️</Text>
              <View>
                <Text style={styles.settingLabel}>Require Category</Text>
                <Text style={styles.settingDescription}>Force category selection</Text>
              </View>
            </View>
            <Switch value={requireCategory} onValueChange={setRequireCategory} />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔀</Text>
              <View>
                <Text style={styles.settingLabel}>Multiple Categories</Text>
                <Text style={styles.settingDescription}>Assign multiple categories per transaction</Text>
              </View>
            </View>
            <Switch value={multipleCategories} onValueChange={setMultipleCategories} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Management</Text>
          
          <TouchableOpacity 
            style={styles.actionRow}
            onPress={() => onNavigate?.('manage-categories-tags')}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🏷️</Text>
              <View>
                <Text style={styles.settingLabel}>Manage Categories & Tags</Text>
                <Text style={styles.settingDescription}>Edit, create, or delete</Text>
              </View>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionRow}
            onPress={() => onNavigate?.('filter-categories')}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔍</Text>
              <View>
                <Text style={styles.settingLabel}>Filter Categories</Text>
                <Text style={styles.settingDescription}>Advanced filtering options</Text>
              </View>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Default Categories</Text>
          <Text style={styles.sectionDescription}>
            Set default categories for common transactions
          </Text>

          <View style={styles.defaultCard}>
            <Text style={styles.defaultLabel}>Grocery Stores</Text>
            <Text style={styles.defaultValue}>Groceries 🛒</Text>
          </View>

          <View style={styles.defaultCard}>
            <Text style={styles.defaultLabel}>Gas Stations</Text>
            <Text style={styles.defaultValue}>Transportation 🚗</Text>
          </View>

          <View style={styles.defaultCard}>
            <Text style={styles.defaultLabel}>Restaurants</Text>
            <Text style={styles.defaultValue}>Dining 🍽️</Text>
          </View>

          <TouchableOpacity style={styles.editDefaultsButton}>
            <Text style={styles.editDefaultsText}>Edit Defaults</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Smart Categorization</Text>
          <Text style={styles.infoText}>
            Categories are automatically suggested based on merchant name, transaction amount, and your past behavior. 
            You can always override suggestions manually.
          </Text>
        </View>
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
  content: {
    flex: 1,
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: '#6b7280',
  },
  chevron: {
    fontSize: 24,
    color: '#9ca3af',
  },
  defaultCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  defaultLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  defaultValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  editDefaultsButton: {
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  editDefaultsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
  infoCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#3b82f6',
    lineHeight: 20,
  },
});
