import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { colors } from '../theme/colors';

interface AIInvestmentAdvisorScreenProps {
  onBack: () => void;
}

interface PortfolioAnalysis {
  id: string;
  type: 'drift' | 'fee_alert' | 'tax_optimization' | 'diversification';
  title: string;
  description: string;
  impact: string;
  recommendation: string;
  urgency: 'high' | 'medium' | 'low';
  confidence: number;
  potentialSavings?: number;
}

interface InvestmentOpportunity {
  id: string;
  title: string;
  description: string;
  type: 'etf' | 'stock' | 'bond';
  expectedReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
  minInvestment: number;
  aiScore: number;
  reasoning: string[];
}

export default function AIInvestmentAdvisorScreen({ onBack }: AIInvestmentAdvisorScreenProps) {
  const portfolioAnalyses: PortfolioAnalysis[] = [
    {
      id: '1',
      type: 'drift',
      title: 'Portfolio Drift Detected',
      description: 'Your asset allocation has drifted 12% from target due to strong tech stock performance',
      impact: 'Risk level higher than intended',
      recommendation: 'Rebalance by selling 8% of tech holdings and buying bonds',
      urgency: 'medium',
      confidence: 87
    },
    {
      id: '2',
      type: 'fee_alert',
      title: 'High Expense Ratio Alert',
      description: 'Your REIT fund (VNQI) has a 0.32% expense ratio vs market average of 0.18%',
      impact: 'Costing $240/year in extra fees',
      recommendation: 'Switch to Vanguard Global ex-U.S. Real Estate ETF (VXUS)',
      urgency: 'low',
      confidence: 95,
      potentialSavings: 240
    },
    {
      id: '3',
      type: 'tax_optimization',
      title: 'Tax Loss Harvesting Opportunity',
      description: 'You have $3,200 in unrealized losses that could offset capital gains',
      impact: 'Potential $800 tax savings',
      recommendation: 'Harvest losses before year-end and reinvest in similar assets',
      urgency: 'high',
      confidence: 92,
      potentialSavings: 800
    },
    {
      id: '4',
      type: 'diversification',
      title: 'Sector Concentration Risk',
      description: 'Technology sector represents 45% of your portfolio vs recommended 25%',
      impact: 'High correlation risk during tech downturns',
      recommendation: 'Diversify into healthcare, financials, and international markets',
      urgency: 'medium',
      confidence: 89
    }
  ];

  const investmentOpportunities: InvestmentOpportunity[] = [
    {
      id: '1',
      title: 'Vanguard Total Stock Market ETF (VTI)',
      description: 'Broad market exposure with ultra-low fees',
      type: 'etf',
      expectedReturn: 7.2,
      riskLevel: 'medium',
      minInvestment: 100,
      aiScore: 92,
      reasoning: [
        'Aligns with your moderate risk tolerance',
        'Extremely low 0.03% expense ratio',
        'Provides instant diversification across 4,000+ stocks',
        'Strong historical performance over 10+ years'
      ]
    },
    {
      id: '2',
      title: 'iShares Core MSCI International ETF (IEFA)',
      description: 'International developed market exposure',
      type: 'etf',
      expectedReturn: 6.8,
      riskLevel: 'medium',
      minInvestment: 100,
      aiScore: 88,
      reasoning: [
        'Adds geographic diversification',
        'Low 0.07% expense ratio',
        'Reduces U.S. market concentration risk',
        'Access to 2,500+ international stocks'
      ]
    },
    {
      id: '3',
      title: 'Vanguard Total Bond Market ETF (BND)',
      description: 'Broad exposure to U.S. investment-grade bonds',
      type: 'bond',
      expectedReturn: 4.5,
      riskLevel: 'low',
      minInvestment: 100,
      aiScore: 85,
      reasoning: [
        'Provides portfolio stability',
        'Low 0.03% expense ratio',
        'Balances equity risk',
        'Income generation through dividends'
      ]
    }
  ];

  const totalPotentialSavings = portfolioAnalyses
    .filter(a => a.potentialSavings)
    .reduce((sum, a) => sum + (a.potentialSavings || 0), 0);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return colors.danger;
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return '#6b7280';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return colors.danger;
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'etf': return '📊';
      case 'stock': return '📈';
      case 'bond': return '🏦';
      default: return '💼';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Investment Advisor</Text>
          <Text style={styles.headerSubtitle}>AI-powered portfolio guidance</Text>
        </View>
        <View style={styles.aiIcon}>
          <Text style={styles.aiIconText}>📈</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.section}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>💰 Optimization Summary</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Potential Savings</Text>
                <Text style={[styles.summaryValue, { color: colors.success }]}>
                  ${totalPotentialSavings}/year
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Opportunities</Text>
                <Text style={styles.summaryValue}>{investmentOpportunities.length}</Text>
              </View>
            </View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Issues Found</Text>
                <Text style={styles.summaryValue}>{portfolioAnalyses.length}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>High Priority</Text>
                <Text style={[styles.summaryValue, { color: colors.danger }]}>
                  {portfolioAnalyses.filter(a => a.urgency === 'high').length}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Portfolio Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Portfolio Analysis</Text>
          {portfolioAnalyses.map((analysis) => (
            <View key={analysis.id} style={styles.analysisCard}>
              <View style={styles.analysisHeader}>
                <View style={styles.analysisTitleRow}>
                  <View style={styles.analysisTitleContainer}>
                    <Text style={styles.analysisTitle}>{analysis.title}</Text>
                    <View style={[styles.urgencyBadge, { 
                      backgroundColor: getUrgencyColor(analysis.urgency) + '20' 
                    }]}>
                      <Text style={[styles.urgencyText, { 
                        color: getUrgencyColor(analysis.urgency) 
                      }]}>
                        {analysis.urgency.toUpperCase()} PRIORITY
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.confidenceBadge}>
                  <Text style={styles.confidenceText}>{analysis.confidence}%</Text>
                </View>
              </View>
              
              <Text style={styles.analysisDescription}>{analysis.description}</Text>
              
              <View style={styles.impactContainer}>
                <Text style={styles.impactLabel}>📊 Impact:</Text>
                <Text style={styles.impactText}>{analysis.impact}</Text>
              </View>

              {analysis.potentialSavings && (
                <View style={styles.savingsHighlight}>
                  <Text style={styles.savingsLabel}>💰 Potential Savings</Text>
                  <Text style={styles.savingsValue}>${analysis.potentialSavings}/year</Text>
                </View>
              )}

              <View style={styles.recommendationContainer}>
                <Text style={styles.recommendationLabel}>💡 Recommendation:</Text>
                <Text style={styles.recommendationText}>{analysis.recommendation}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Investment Opportunities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Investment Recommendations</Text>
          {investmentOpportunities.map((opportunity) => (
            <View key={opportunity.id} style={styles.opportunityCard}>
              <View style={styles.opportunityHeader}>
                <View style={styles.opportunityTitleRow}>
                  <Text style={styles.typeIcon}>{getTypeIcon(opportunity.type)}</Text>
                  <View style={styles.opportunityInfo}>
                    <Text style={styles.opportunityTitle}>{opportunity.title}</Text>
                    <Text style={styles.opportunityDescription}>{opportunity.description}</Text>
                  </View>
                </View>
                <View style={styles.scoreBadge}>
                  <Text style={styles.scoreValue}>{opportunity.aiScore}</Text>
                  <Text style={styles.scoreLabel}>AI Score</Text>
                </View>
              </View>

              <View style={styles.opportunityStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Expected Return</Text>
                  <Text style={[styles.statValue, { color: colors.success }]}>
                    {opportunity.expectedReturn}%
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Risk Level</Text>
                  <View style={[styles.riskBadge, { 
                    backgroundColor: getRiskColor(opportunity.riskLevel) + '20' 
                  }]}>
                    <Text style={[styles.riskText, { 
                      color: getRiskColor(opportunity.riskLevel) 
                    }]}>
                      {opportunity.riskLevel.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Min Investment</Text>
                  <Text style={styles.statValue}>${opportunity.minInvestment}</Text>
                </View>
              </View>

              <View style={styles.reasoningContainer}>
                <Text style={styles.reasoningLabel}>Why AI recommends this:</Text>
                {opportunity.reasoning.map((reason, idx) => (
                  <View key={idx} style={styles.reasonItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.reasonText}>{reason}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
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
  headerContent: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  aiIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiIconText: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  analysisCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  analysisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  analysisTitleRow: {
    flex: 1,
  },
  analysisTitleContainer: {
    flex: 1,
    gap: 6,
  },
  analysisTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  urgencyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  urgencyText: {
    fontSize: 10,
    fontWeight: '700',
  },
  confidenceBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  analysisDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  impactContainer: {
    backgroundColor: '#fef3c7',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  impactLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#d97706',
    marginBottom: 4,
  },
  impactText: {
    fontSize: 13,
    color: '#92400e',
  },
  savingsHighlight: {
    backgroundColor: '#dcfce7',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savingsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  savingsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#047857',
  },
  recommendationContainer: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 10,
  },
  recommendationLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 13,
    color: '#1f2937',
    lineHeight: 18,
  },
  opportunityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  opportunityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  opportunityTitleRow: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  typeIcon: {
    fontSize: 32,
  },
  opportunityInfo: {
    flex: 1,
  },
  opportunityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  opportunityDescription: {
    fontSize: 13,
    color: '#6b7280',
  },
  scoreBadge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  scoreLabel: {
    fontSize: 10,
    color: '#ffffff',
    opacity: 0.9,
  },
  opportunityStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  riskText: {
    fontSize: 10,
    fontWeight: '700',
  },
  reasoningContainer: {
    gap: 8,
  },
  reasoningLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  reasonItem: {
    flexDirection: 'row',
    gap: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  reasonText: {
    flex: 1,
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 18,
  },
});
