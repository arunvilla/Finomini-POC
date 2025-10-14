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

interface CreateTagScreenProps {
  onBack?: () => void;
}

export default function CreateTagScreen({ onBack }: CreateTagScreenProps) {
  const [tagName, setTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3b82f6');

  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16',
  ];

  const handleSave = () => {
    if (!tagName.trim()) {
      Alert.alert('Error', 'Please enter a tag name');
      return;
    }

    Alert.alert('Success', 'Tag created successfully', [
      { text: 'OK', onPress: onBack }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Tag</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Tag Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter tag name (e.g., work, personal)"
            value={tagName}
            onChangeText={setTagName}
            autoCapitalize="none"
            maxLength={20}
          />
          <Text style={styles.helperText}>
            Tags help you organize and filter your transactions
          </Text>
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

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>About Tags</Text>
          <Text style={styles.infoText}>
            • Use tags to add custom labels to your transactions{'\n'}
            • Multiple tags can be applied to a single transaction{'\n'}
            • Tags make it easier to filter and search for specific transactions{'\n'}
            • Examples: work, personal, business, vacation, recurring
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
  helperText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
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
  infoSection: {
    padding: 16,
    backgroundColor: '#eff6ff',
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#3b82f6',
    lineHeight: 20,
  },
});
