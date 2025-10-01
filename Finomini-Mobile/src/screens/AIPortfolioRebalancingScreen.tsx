import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';

interface AIPortfolioRebalancingScreenProps {
  onBack?: () => void;
}

export default function AIPortfolioRebalancingScreen({ onBack }: AIPortfolioRebalancingScreenProps) {
  const currentAllocation = [
    { asset: 'Stocks', current: 65, target: 60, action: 'Sell $2,250', color: '#3b82f6' },
    { asset: 'Bonds', current: 20, target: 25, action: 'Buy $2,250', color: '#10b981' },
    { asset: 'Real Estate', current: 10, target: 10, action: 'Hold', color: '#f59e0b' },
    { asset: 'Cash', current: 5, target: 5, action: 'Hold', color: '#6b7280' },
  ];

  const portfolioValue = 45000;

  const handleRebalance = () => {
    Alert.alert(
      'Rebalance Portfolio',
      'This will execute the recommended trades. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Rebalance', onPress: () => Alert.alert('Success', 'Portfolio rebalanced successfully') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Portfolio Rebalancing</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.valueCard}>
          <Text style={styles.valueLabel}>Total Portfolio Value</Text>
          <Text style={styles.valueAmount}>${portfolioValue.toLocaleString()}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current vs Target Allocation</Text>
          {currentAllocation.map((item, index) => (
            <View key={index} style={styles.allocationRow}>
              <View style={styles.allocationLeft}>
                <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                <Text style={styles.assetName}>{item.asset}</Text>
              </View>
              <View style={styles.allocationRight}>
                <View style={styles.percentBox}>
                  <Text style={styles.percentLabel}>Current</Text>
                  <Text style={styles.percentValue}>{item.current}%</Text>
                </View>
                <Text style={styles.arrow}>→</Text>
                <View style={styles.percentBox}>
                  <Text style={styles.percentLabel}>Target</Text>
                  <Text style={[
                    styles.percentValue,
                    { color: item.current !== item.target ? '#2563eb' : '#111827' }
                  ]}>
                    {item.target}%
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recommended Actions</Text>
          {currentAllocation.map((item, index) => (
            <View key={index} style={styles.actionRow}>
              <View style={styles.actionLeft}>
                <View style={[styles.actionIconCircle, { 
                  backgroundColor: item.action.startsWith('Sell') 
                    ? '#fee2e2' 
                    : item.action.startsWith('Buy') 
                    ? '#d1fae5' 
                    : '#f3f4f6' 
                }]}>
                  <Text style={styles.actionIcon}>
                    {item.action.startsWith('Sell') ? '📉' : item.action.startsWith('Buy') ? '📈' : '⏸️'}
                  </Text>
                </View>
                <View>
                  <Text style={styles.assetName}>{item.asset}</Text>
                  <Text style={styles.actionDescription}>{item.action}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.insightCard}>
          <Text style={styles.insightIcon}>🤖</Text>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>AI Recommendation</Text>
            <Text style={styles.insightText}>
              Your portfolio has drifted from your target allocation due to market gains. 
              Rebalancing now will help maintain your desired risk profile and lock in gains from stocks.
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.rebalanceButton} onPress={handleRebalance}>
          <Text style={styles.rebalanceButtonText}>Execute Rebalancing</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.customizeButton}>
          <Text style={styles.customizeButtonText}>Customize Targets</Text>
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
  valueCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  valueLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  valueAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
  },
  card: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  allocationRow: {
    marginBottom: 16,
  },
  allocationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  assetName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  allocationRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
  },
  percentBox: {
    flex: 1,
    alignItems: 'center',
  },
  percentLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 4,
  },
  percentValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  arrow: {
    fontSize: 16,
    color: '#9ca3af',
    marginHorizontal: 12,
  },
  actionRow: {
    marginBottom: 12,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionIcon: {
    fontSize: 20,
  },
  actionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  insightCard: {
    flexDirection: 'row',
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  insightIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 4,
  },
  insightText: {
    fontSize: 14,
    color: '#3b82f6',
    lineHeight: 20,
  },
  rebalanceButton: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    alignItems: 'center',
  },
  rebalanceButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  customizeButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  customizeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
});
