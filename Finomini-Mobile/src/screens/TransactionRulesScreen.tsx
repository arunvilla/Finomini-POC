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

interface TransactionRulesScreenProps {
  onBack: () => void;
}

interface Rule {
  id: string;
  name: string;
  merchantName?: string;
  category: string;
  isActive: boolean;
  matchCount: number;
}

export default function TransactionRulesScreen({ onBack }: TransactionRulesScreenProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [rules, setRules] = useState<Rule[]>([
    {
      id: '1',
      name: 'Starbucks → Coffee',
      merchantName: 'Starbucks',
      category: 'Coffee',
      isActive: true,
      matchCount: 23
    },
    {
      id: '2',
      name: 'Gas Stations → Transportation',
      merchantName: 'Shell, Chevron, BP',
      category: 'Gas',
      isActive: true,
      matchCount: 45
    },
    {
      id: '3',
      name: 'Amazon → Shopping',
      merchantName: 'Amazon',
      category: 'Shopping',
      isActive: false,
      matchCount: 67
    }
  ]);

  const [newRule, setNewRule] = useState({
    name: '',
    merchantName: '',
    category: '',
  });

  const handleToggleRule = (ruleId: string) => {
    setRules(prev => 
      prev.map(rule => 
        rule.id === ruleId 
          ? { ...rule, isActive: !rule.isActive }
          : rule
      )
    );
  };

  const handleCreateRule = () => {
    if (!newRule.merchantName || !newRule.category) {
      Alert.alert('Missing Information', 'Please fill in merchant name and category');
      return;
    }

    if (editingRule) {
      setRules(prev => prev.map(r => r.id === editingRule.id ? {
        ...r,
        name: newRule.name || `${newRule.merchantName} → ${newRule.category}`,
        merchantName: newRule.merchantName,
        category: newRule.category,
      } : r));
      setEditingRule(null);
    } else {
      const rule: Rule = {
        id: Date.now().toString(),
        name: newRule.name || `${newRule.merchantName} → ${newRule.category}`,
        merchantName: newRule.merchantName,
        category: newRule.category,
        isActive: true,
        matchCount: 0
      };
      setRules(prev => [...prev, rule]);
    }

    setNewRule({ name: '', merchantName: '', category: '' });
    setShowCreateForm(false);
  };

  const handleEditRule = (rule: Rule) => {
    setEditingRule(rule);
    setNewRule({
      name: rule.name,
      merchantName: rule.merchantName || '',
      category: rule.category,
    });
    setShowCreateForm(true);
  };

  const handleDeleteRule = (ruleId: string) => {
    Alert.alert(
      'Delete Rule',
      'Are you sure you want to delete this rule?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setRules(prev => prev.filter(r => r.id !== ruleId))
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction Rules</Text>
        <TouchableOpacity
          onPress={() => setShowCreateForm(!showCreateForm)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            Create rules to automatically categorize transactions based on merchant names
          </Text>
        </View>

        {showCreateForm && (
          <View style={styles.createCard}>
            <Text style={styles.createTitle}>{editingRule ? 'Edit Rule' : 'Create New Rule'}</Text>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Rule Name (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Gas Stations"
                value={newRule.name}
                onChangeText={(value) => setNewRule(prev => ({ ...prev, name: value }))}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Merchant Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Starbucks"
                value={newRule.merchantName}
                onChangeText={(value) => setNewRule(prev => ({ ...prev, merchantName: value }))}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Category *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Coffee"
                value={newRule.category}
                onChangeText={(value) => setNewRule(prev => ({ ...prev, category: value }))}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.createButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowCreateForm(false);
                  setEditingRule(null);
                  setNewRule({ name: '', merchantName: '', category: '' });
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreateRule}
              >
                <Text style={styles.createButtonText}>{editingRule ? 'Update Rule' : 'Create Rule'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.rulesSection}>
          <Text style={styles.sectionTitle}>Active Rules ({rules.filter(r => r.isActive).length})</Text>
          {rules.map((rule) => (
            <View key={rule.id} style={styles.ruleCard}>
              <View style={styles.ruleHeader}>
                <Text style={styles.ruleName}>{rule.name}</Text>
                <TouchableOpacity
                  style={[styles.toggle, rule.isActive && styles.toggleActive]}
                  onPress={() => handleToggleRule(rule.id)}
                >
                  <View style={[styles.toggleThumb, rule.isActive && styles.toggleThumbActive]} />
                </TouchableOpacity>
              </View>

              <View style={styles.ruleDetails}>
                <View style={styles.ruleDetail}>
                  <Text style={styles.ruleDetailLabel}>Merchant:</Text>
                  <Text style={styles.ruleDetailValue}>{rule.merchantName}</Text>
                </View>
                <View style={styles.ruleDetail}>
                  <Text style={styles.ruleDetailLabel}>Category:</Text>
                  <Text style={styles.ruleDetailValue}>{rule.category}</Text>
                </View>
              </View>

              <View style={styles.ruleFooter}>
                <Text style={styles.matchCount}>{rule.matchCount} matches</Text>
                <View style={styles.ruleActions}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditRule(rule)}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteRule(rule.id)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          {rules.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No rules created yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Create your first rule to automatically categorize transactions
              </Text>
            </View>
          )}
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
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    gap: 12,
  },
  infoIcon: {
    fontSize: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#1e40af',
    lineHeight: 18,
  },
  createCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    marginTop: 0,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  createTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  field: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 14,
    color: '#1f2937',
  },
  createButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  createButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  rulesSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  ruleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  ruleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ruleName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  toggle: {
    width: 51,
    height: 31,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: colors.primary,
  },
  toggleThumb: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: '#ffffff',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  ruleDetails: {
    marginBottom: 12,
  },
  ruleDetail: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  ruleDetailLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginRight: 8,
  },
  ruleDetailValue: {
    fontSize: 13,
    color: '#1f2937',
    fontWeight: '500',
  },
  ruleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  matchCount: {
    fontSize: 13,
    color: '#6b7280',
  },
  ruleActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#dbeafe',
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e40af',
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#fee2e2',
  },
  deleteButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#dc2626',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
});
