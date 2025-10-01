import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

interface HoldingDetailsScreenProps {
  onBack?: () => void;
  holding?: any;
}

export default function HoldingDetailsScreen({ onBack, holding }: HoldingDetailsScreenProps) {
  const holdingData = holding || {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 25,
    costBasis: 140.50,
    currentPrice: 178.25,
    marketValue: 4456.25,
    totalGain: 943.75,
    gainPercent: 26.8,
    account: 'Fidelity 401(k)',
  };

  const performance = [
    { period: '1 Day', change: '+2.5%', amount: '+$111.39' },
    { period: '1 Week', change: '+5.2%', amount: '+$231.72' },
    { period: '1 Month', change: '+12.8%', amount: '+$506.40' },
    { period: '3 Months', change: '+18.5%', amount: '+$696.98' },
    { period: '1 Year', change: '+26.8%', amount: '+$943.75' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Holding Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.symbol}>{holdingData.symbol}</Text>
          <Text style={styles.name}>{holdingData.name}</Text>
          <Text style={styles.marketValue}>
            ${holdingData.marketValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </Text>
          <View style={styles.gainRow}>
            <Text style={[styles.gainText, { color: holdingData.totalGain >= 0 ? '#10b981' : '#ef4444' }]}>
              {holdingData.totalGain >= 0 ? '+' : ''}${Math.abs(holdingData.totalGain).toFixed(2)}
            </Text>
            <Text style={[styles.gainPercent, { color: holdingData.gainPercent >= 0 ? '#10b981' : '#ef4444' }]}>
              ({holdingData.gainPercent >= 0 ? '+' : ''}{holdingData.gainPercent}%)
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Position</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Shares</Text>
            <Text style={styles.infoValue}>{holdingData.shares.toFixed(2)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Cost Basis</Text>
            <Text style={styles.infoValue}>${holdingData.costBasis.toFixed(2)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Current Price</Text>
            <Text style={styles.infoValue}>${holdingData.currentPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Market Value</Text>
            <Text style={styles.infoValue}>${holdingData.marketValue.toFixed(2)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Account</Text>
            <Text style={styles.infoValue}>{holdingData.account}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Performance</Text>
          {performance.map((item, index) => (
            <View key={index} style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>{item.period}</Text>
              <View style={styles.performanceRight}>
                <Text style={[
                  styles.performanceChange,
                  { color: item.change.startsWith('+') ? '#10b981' : '#ef4444' }
                ]}>
                  {item.change}
                </Text>
                <Text style={[
                  styles.performanceAmount,
                  { color: item.amount.startsWith('+') ? '#10b981' : '#ef4444' }
                ]}>
                  {item.amount}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.insightCard}>
          <Text style={styles.insightIcon}>💡</Text>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Investment Insight</Text>
            <Text style={styles.insightText}>
              Your {holdingData.symbol} position has gained {holdingData.gainPercent}% since purchase. 
              Consider rebalancing if it exceeds your target allocation.
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
  heroCard: {
    margin: 16,
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  symbol: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 16,
  },
  marketValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  gainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gainText: {
    fontSize: 18,
    fontWeight: '600',
  },
  gainPercent: {
    fontSize: 16,
    fontWeight: '600',
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
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  performanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  performanceLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  performanceRight: {
    flexDirection: 'row',
    gap: 12,
  },
  performanceChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  performanceAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  insightCard: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    flexDirection: 'row',
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
});
