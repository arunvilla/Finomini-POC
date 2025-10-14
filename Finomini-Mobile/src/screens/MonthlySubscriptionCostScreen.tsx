import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../theme/colors';

interface MonthlySubscriptionCostScreenProps {
  onBack?: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

export default function MonthlySubscriptionCostScreen({ onBack, onNavigate }: MonthlySubscriptionCostScreenProps) {
  const [activeTab, setActiveTab] = useState<'category' | 'vendor'>('category');

  const categoryData = [
    {
      id: '1',
      name: 'Entertainment',
      percentage: 40,
      amount: 169.00,
      icon: '🎬',
      color: colors.blue[100],
      subscriptions: [
        { id: '1', name: 'Netflix', amount: 10.00 },
        { id: '2', name: 'Youtube', amount: 8.99 },
        { id: '3', name: 'Spotify', amount: 9.99 },
        { id: '4', name: 'Prime', amount: 20.00 },
      ],
    },
    {
      id: '2',
      name: 'Utilities',
      percentage: 60,
      amount: 201.00,
      icon: '💡',
      color: colors.yellow[100],
      subscriptions: [
        { id: '5', name: 'AT&T', amount: 141.00 },
        { id: '6', name: 'Electric Bill', amount: 60.00 },
      ],
    },
  ];

  const vendorData = [
    {
      id: '1',
      name: 'Walmart',
      category: 'Utilities',
      amount: 141.00,
      dueDate: 'Apr 25, 2025',
      icon: '🏪',
      color: colors.blue[100],
    },
    {
      id: '2',
      name: 'Walmart',
      category: 'Utilities',
      amount: 60.00,
      dueDate: 'May 5, 2025',
      icon: '💡',
      color: colors.gray[100],
    },
    {
      id: '3',
      name: 'Netflix',
      category: 'Entertainment',
      amount: 10.00,
      dueDate: 'Apr 20, 2025',
      icon: '🎬',
      color: colors.red[100],
    },
  ];

  const totalAmount = categoryData.reduce((sum, cat) => sum + cat.amount, 0);

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  const handleCategoryClick = (category: any) => {
    onNavigate?.('category-detail', category);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Monthly Cost</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Monthly</Text>
          <Text style={styles.totalAmount}>{formatCurrency(totalAmount)}</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'category' && styles.tabActive]}
            onPress={() => setActiveTab('category')}
          >
            <Text style={[styles.tabText, activeTab === 'category' && styles.tabTextActive]}>
              Category
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'vendor' && styles.tabActive]}
            onPress={() => setActiveTab('vendor')}
          >
            <Text style={[styles.tabText, activeTab === 'vendor' && styles.tabTextActive]}>
              Vendor
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'category' ? (
          <View style={styles.listContainer}>
            {categoryData.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.itemCard}
                onPress={() => handleCategoryClick(category)}
              >
                <View style={[styles.itemIcon, { backgroundColor: category.color }]}>
                  <Text style={styles.itemEmoji}>{category.icon}</Text>
                </View>
                
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{category.name}</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${category.percentage}%` }]} />
                  </View>
                  <Text style={styles.itemCount}>{category.subscriptions.length} subscriptions</Text>
                </View>
                
                <View style={styles.itemRight}>
                  <Text style={styles.itemAmount}>{formatCurrency(category.amount)}</Text>
                  <Text style={styles.itemPercentage}>{category.percentage}%</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.listContainer}>
            {vendorData.map((vendor) => (
              <TouchableOpacity
                key={vendor.id}
                style={styles.itemCard}
                onPress={() => {}}
              >
                <View style={[styles.itemIcon, { backgroundColor: vendor.color }]}>
                  <Text style={styles.itemEmoji}>{vendor.icon}</Text>
                </View>
                
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{vendor.name}</Text>
                  <Text style={styles.itemCategory}>{vendor.category}</Text>
                  <Text style={styles.itemDueDate}>Due {vendor.dueDate}</Text>
                </View>
                
                <Text style={styles.itemAmount}>{formatCurrency(vendor.amount)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: colors.text.primary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  totalCard: {
    margin: 16,
    padding: 24,
    backgroundColor: colors.background,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  totalLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text.primary,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabActive: {
    backgroundColor: colors.background,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  tabTextActive: {
    color: colors.text.primary,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemEmoji: {
    fontSize: 24,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 13,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  itemDueDate: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  itemCount: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.gray[200],
    borderRadius: 3,
    marginVertical: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 2,
  },
  itemPercentage: {
    fontSize: 12,
    color: colors.text.secondary,
  },
});
