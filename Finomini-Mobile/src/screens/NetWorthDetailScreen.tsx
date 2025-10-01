import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { netWorthData } from '../data/mockData';

interface NetWorthDetailScreenProps {
  onBack?: () => void;
}

export default function NetWorthDetailScreen({ onBack }: NetWorthDetailScreenProps) {
  const [timePeriod, setTimePeriod] = useState<'week' | 'month' | '3month' | 'year'>('month');

  const chartData = [
    { month: 'Jul', value: -240000 },
    { month: 'Aug', value: -230000 },
    { month: 'Sep', value: -225000 },
    { month: 'Oct', value: -219576 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Net Worth</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareIcon}>📤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.label}>Current Net Worth</Text>
          <Text style={styles.netWorthAmount}>
            ${Math.abs(netWorthData.netWorth).toLocaleString()}
          </Text>
          <View style={styles.changeRow}>
            <Text style={[styles.changeText, netWorthData.change > 0 && styles.positiveChange]}>
              {netWorthData.change > 0 ? '↗' : '↘'} {netWorthData.changePercent}% 
              ({netWorthData.change > 0 ? '+' : ''}${Math.abs(netWorthData.change).toLocaleString()})
            </Text>
            <Text style={styles.periodText}>last month</Text>
          </View>
        </View>

        <View style={styles.periodSelector}>
          <TouchableOpacity
            style={[styles.periodButton, timePeriod === 'week' && styles.periodButtonActive]}
            onPress={() => setTimePeriod('week')}
          >
            <Text style={[styles.periodButtonText, timePeriod === 'week' && styles.periodButtonTextActive]}>
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, timePeriod === 'month' && styles.periodButtonActive]}
            onPress={() => setTimePeriod('month')}
          >
            <Text style={[styles.periodButtonText, timePeriod === 'month' && styles.periodButtonTextActive]}>
              Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, timePeriod === '3month' && styles.periodButtonActive]}
            onPress={() => setTimePeriod('3month')}
          >
            <Text style={[styles.periodButtonText, timePeriod === '3month' && styles.periodButtonTextActive]}>
              3M
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, timePeriod === 'year' && styles.periodButtonActive]}
            onPress={() => setTimePeriod('year')}
          >
            <Text style={[styles.periodButtonText, timePeriod === 'year' && styles.periodButtonTextActive]}>
              Year
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Net Worth Trend</Text>
          <View style={styles.chart}>
            {chartData.map((item, index) => {
              const maxValue = Math.max(...chartData.map(d => Math.abs(d.value)));
              const height = (Math.abs(item.value) / maxValue) * 100;
              
              return (
                <View key={index} style={styles.chartColumn}>
                  <View style={styles.chartBarContainer}>
                    <View style={[styles.chartBar, { height: `${height}%` }]} />
                  </View>
                  <Text style={styles.chartLabel}>{item.month}</Text>
                  <Text style={styles.chartValue}>
                    ${(Math.abs(item.value) / 1000).toFixed(0)}k
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.breakdownSection}>
          <Text style={styles.sectionTitle}>Breakdown</Text>
          
          <View style={styles.breakdownCard}>
            <View style={styles.breakdownHeader}>
              <View style={styles.breakdownLeft}>
                <View style={[styles.breakdownIcon, styles.assetIcon]}>
                  <Text style={styles.iconText}>📈</Text>
                </View>
                <Text style={styles.breakdownLabel}>Assets</Text>
              </View>
              <Text style={styles.assetAmount}>${netWorthData.assets.toLocaleString()}</Text>
            </View>
            
            <View style={styles.breakdownItems}>
              <View style={styles.breakdownItem}>
                <Text style={styles.itemLabel}>Cash & Checking</Text>
                <Text style={styles.itemValue}>$8,432</Text>
              </View>
              <View style={styles.breakdownItem}>
                <Text style={styles.itemLabel}>Savings</Text>
                <Text style={styles.itemValue}>$25,000</Text>
              </View>
              <View style={styles.breakdownItem}>
                <Text style={styles.itemLabel}>Investments</Text>
                <Text style={styles.itemValue}>$33,819</Text>
              </View>
            </View>
          </View>

          <View style={styles.breakdownCard}>
            <View style={styles.breakdownHeader}>
              <View style={styles.breakdownLeft}>
                <View style={[styles.breakdownIcon, styles.liabilityIcon]}>
                  <Text style={styles.iconText}>📉</Text>
                </View>
                <Text style={styles.breakdownLabel}>Liabilities</Text>
              </View>
              <Text style={styles.liabilityAmount}>${netWorthData.liabilities.toLocaleString()}</Text>
            </View>
            
            <View style={styles.breakdownItems}>
              <View style={styles.breakdownItem}>
                <Text style={styles.itemLabel}>Credit Cards</Text>
                <Text style={styles.itemValue}>$3,456</Text>
              </View>
              <View style={styles.breakdownItem}>
                <Text style={styles.itemLabel}>Student Loans</Text>
                <Text style={styles.itemValue}>$45,000</Text>
              </View>
              <View style={styles.breakdownItem}>
                <Text style={styles.itemLabel}>Car Loan</Text>
                <Text style={styles.itemValue}>$18,372</Text>
              </View>
              <View style={styles.breakdownItem}>
                <Text style={styles.itemLabel}>Mortgage</Text>
                <Text style={styles.itemValue}>$220,000</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.insightCard}>
          <Text style={styles.insightIcon}>💡</Text>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Insight</Text>
            <Text style={styles.insightText}>
              Your net worth has improved by 6.1% over the last month. 
              Consider increasing your emergency fund to reach 6 months of expenses.
            </Text>
          </View>
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
  shareButton: {
    padding: 8,
  },
  shareIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: 'white',
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  netWorthAmount: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
    marginRight: 8,
  },
  positiveChange: {
    color: '#10b981',
  },
  periodText: {
    fontSize: 14,
    color: '#666',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    gap: 8,
    marginBottom: 16,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#7c3aed',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  periodButtonTextActive: {
    color: 'white',
  },
  chartCard: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 180,
    alignItems: 'flex-end',
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  chartBarContainer: {
    width: '80%',
    height: 120,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  chartBar: {
    backgroundColor: '#7c3aed',
    borderRadius: 4,
    width: '100%',
  },
  chartLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  chartValue: {
    fontSize: 11,
    color: '#999',
  },
  breakdownSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  breakdownCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breakdownIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  assetIcon: {
    backgroundColor: '#dcfce7',
  },
  liabilityIcon: {
    backgroundColor: '#fee2e2',
  },
  iconText: {
    fontSize: 20,
  },
  breakdownLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  assetAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
  },
  liabilityAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  breakdownItems: {
    gap: 12,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemLabel: {
    fontSize: 14,
    color: '#666',
  },
  itemValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  insightCard: {
    backgroundColor: '#fef3c7',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    flexDirection: 'row',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  insightIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 4,
  },
  insightText: {
    fontSize: 14,
    color: '#78350f',
    lineHeight: 20,
  },
});
