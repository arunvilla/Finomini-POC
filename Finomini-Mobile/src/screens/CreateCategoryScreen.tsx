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
  Alert,
} from 'react-native';
import { colors } from '../theme/colors';

interface CreateCategoryScreenProps {
  onBack: () => void;
}

const categoryIcons = ['🍽️', '🚗', '🛍️', '🎬', '⛽', '🛒', '💰', '📄', '🏥', '🎓', '✈️', '🏠'];
const categoryColors = [colors.primary, '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'];

export default function CreateCategoryScreen({ onBack }: CreateCategoryScreenProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [selectedIcon, setSelectedIcon] = useState('🍽️');
  const [selectedColor, setSelectedColor] = useState(colors.primary);

  const handleSave = () => {
    if (!name) {
      Alert.alert('Missing Information', 'Please enter a category name');
      return;
    }

    Alert.alert('Success', 'Category created successfully', [
      { text: 'OK', onPress: onBack }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Category</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Dining Out, Gas, Shopping"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category Type</Text>
          <View style={styles.typeRow}>
            <TouchableOpacity
              style={[styles.typeButton, type === 'expense' && styles.typeButtonActive]}
              onPress={() => setType('expense')}
            >
              <Text style={[styles.typeButtonText, type === 'expense' && styles.typeButtonTextActive]}>
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeButton, type === 'income' && styles.typeButtonActive]}
              onPress={() => setType('income')}
            >
              <Text style={[styles.typeButtonText, type === 'income' && styles.typeButtonTextActive]}>
                Income
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Icon</Text>
          <View style={styles.iconGrid}>
            {categoryIcons.map((icon) => (
              <TouchableOpacity
                key={icon}
                style={[styles.iconButton, selectedIcon === icon && styles.iconButtonActive]}
                onPress={() => setSelectedIcon(icon)}
              >
                <Text style={styles.iconText}>{icon}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Color</Text>
          <View style={styles.colorRow}>
            {categoryColors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  selectedColor === color && styles.colorButtonActive
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>
        </View>

        <View style={styles.previewCard}>
          <Text style={styles.previewLabel}>Preview</Text>
          <View style={[styles.previewItem, { backgroundColor: selectedColor + '20', borderLeftColor: selectedColor }]}>
            <Text style={styles.previewIcon}>{selectedIcon}</Text>
            <Text style={styles.previewName}>{name || 'Category Name'}</Text>
          </View>
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
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 14,
    color: '#1f2937',
  },
  typeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  typeButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  typeButtonTextActive: {
    color: colors.primary,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  iconButton: {
    width: 60,
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  iconButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  iconText: {
    fontSize: 32,
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorButtonActive: {
    borderColor: '#1f2937',
  },
  previewCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  previewLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
  },
  previewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  previewIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  previewName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
});
