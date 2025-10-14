import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';

interface EditTagScreenProps {
  onBack?: () => void;
  tag?: any;
}

export default function EditTagScreen({ onBack, tag }: EditTagScreenProps) {
  const existingTag = tag || {
    id: '1',
    name: 'work',
    color: '#3b82f6',
    transactionCount: 45,
  };

  const [tagName, setTagName] = useState(existingTag.name);
  const [selectedColor, setSelectedColor] = useState(existingTag.color);

  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16',
  ];

  const handleSave = () => {
    if (!tagName.trim()) {
      Alert.alert('Error', 'Please enter a tag name');
      return;
    }

    Alert.alert('Success', 'Tag updated successfully', [
      { text: 'OK', onPress: onBack }
    ]);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Tag',
      `Are you sure you want to delete the "${existingTag.name}" tag? This will remove it from ${existingTag.transactionCount} transactions.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Tag deleted successfully', [
              { text: 'OK', onPress: onBack }
            ]);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Tag</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Tag Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter tag name"
            value={tagName}
            onChangeText={setTagName}
            autoCapitalize="none"
            maxLength={20}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Color</Text>
          <View style={styles.colorGrid}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  selectedColor === color && styles.colorButtonSelected,
                ]}
                onPress={() => setSelectedColor(color)}
              >
                {selectedColor === color && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.previewSection}>
          <Text style={styles.previewLabel}>Preview</Text>
          <View style={styles.previewContainer}>
            <View style={[styles.tagPreview, { backgroundColor: selectedColor + '20', borderColor: selectedColor }]}>
              <Text style={[styles.tagPreviewText, { color: selectedColor }]}>
                {tagName || 'Tag Name'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Transactions Tagged</Text>
            <Text style={styles.statValue}>{existingTag.transactionCount}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete Tag</Text>
        </TouchableOpacity>
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
  cancelButton: {
    padding: 8,
  },
  cancelText: {
    fontSize: 16,
    color: '#6b7280',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  saveButton: {
    padding: 8,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#ffffff',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorButtonSelected: {
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  checkmark: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  previewSection: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 8,
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  previewContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
  },
  tagPreview: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
  tagPreviewText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsSection: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 8,
  },
  statCard: {
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  deleteButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
});
