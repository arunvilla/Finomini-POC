import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Switch,
} from 'react-native';
import { colors } from '../theme/colors';

interface AIAssistantScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

interface AIInsight {
  id: string;
  type: 'warning' | 'opportunity' | 'success' | 'info' | 'prediction';
  title: string;
  description: string;
  action?: string;
  impact?: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
}

interface Conversation {
  id: string;
  type: 'user' | 'ai';
  message: string;
  timestamp: Date;
  suggestions?: string[];
}

interface PredictiveInsight {
  id: string;
  title: string;
  description: string;
  type: 'cash_flow' | 'bill_forecast' | 'net_worth' | 'goal_prediction';
  prediction: string;
  confidence: number;
  timeframe: string;
}

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  type: 'savings' | 'budgeting' | 'bill_pay' | 'categorization';
  enabled: boolean;
  frequency: string;
  totalSaved?: number;
}

export default function AIAssistantScreen({ onBack, onNavigate }: AIAssistantScreenProps) {
  const [activeTab, setActiveTab] = useState<'coach' | 'predict' | 'automate' | 'chat'>('coach');
  const [inputMessage, setInputMessage] = useState('');
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Smart Savings Sweeps',
      description: 'Automatically save spare change and extra income',
      type: 'savings',
      enabled: true,
      frequency: 'Daily',
      totalSaved: 247
    },
    {
      id: '2',
      name: 'Budget Rebalancing',
      description: 'Reallocate unused budget to priority categories',
      type: 'budgeting',
      enabled: false,
      frequency: 'Weekly',
      totalSaved: 150
    },
    {
      id: '3',
      name: 'Bill Payment Optimization',
      description: 'Pay bills on optimal dates to maximize cash flow',
      type: 'bill_pay',
      enabled: true,
      frequency: 'As needed'
    },
    {
      id: '4',
      name: 'Transaction Categorization',
      description: 'AI-powered smart categorization of transactions',
      type: 'categorization',
      enabled: true,
      frequency: 'Real-time'
    }
  ]);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      type: 'ai',
      message: "Hi! I'm your AI Financial Assistant. I've analyzed your spending patterns and found opportunities to save money. How can I help you today?",
      timestamp: new Date(),
      suggestions: ['Show savings', 'Analyze spending', 'Budget help', 'Predictions']
    }
  ]);

  const aiInsights: AIInsight[] = [
    {
      id: '1',
      type: 'opportunity',
      title: 'Subscription Optimization',
      description: 'You have 3 streaming services. Could save $25/month by consolidating.',
      action: 'subscription-audit',
      impact: 'Save $300/year',
      confidence: 92,
      priority: 'medium'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Cash Flow Alert',
      description: 'You might run low on funds around the 23rd based on spending patterns.',
      action: 'cash-flow-forecast',
      impact: 'Avoid overdraft fees',
      confidence: 87,
      priority: 'high'
    },
    {
      id: '3',
      type: 'success',
      title: 'Goal Achievement',
      description: "You'll reach your vacation goal 6 weeks early at current savings rate!",
      action: 'adjust-goal',
      impact: 'Reach goal faster',
      confidence: 91,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'info',
      title: 'Auto-Save Triggered',
      description: 'I saved $47 to your emergency fund from last paycheck.',
      impact: 'Emergency fund +3.2%',
      confidence: 100,
      priority: 'low'
    }
  ];

  const predictiveInsights: PredictiveInsight[] = [
    {
      id: '1',
      title: 'Cash Flow Forecast',
      description: 'Based on spending patterns, you might run low on funds around the 23rd',
      type: 'cash_flow',
      prediction: 'Account balance may drop below $200 on March 23rd',
      confidence: 87,
      timeframe: '2 weeks'
    },
    {
      id: '2',
      title: 'Bill Increase Prediction',
      description: 'Electricity usage suggests 15% higher bill next month',
      type: 'bill_forecast',
      prediction: 'Electric bill: $142 (up from $123)',
      confidence: 78,
      timeframe: 'Next month'
    },
    {
      id: '3',
      title: 'Net Worth Trajectory',
      description: 'At current savings rate, net worth will grow 18% this year',
      type: 'net_worth',
      prediction: 'Net worth: $89,500 by December 2025',
      confidence: 82,
      timeframe: '12 months'
    },
    {
      id: '4',
      title: 'Emergency Fund Goal',
      description: "You'll reach 6-month emergency fund target 3 months early",
      type: 'goal_prediction',
      prediction: 'Goal completion: September 2025',
      confidence: 91,
      timeframe: '6 months'
    }
  ];

  const toggleAutomation = (id: string) => {
    setAutomationRules(prev =>
      prev.map(rule =>
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Conversation = {
      id: Date.now().toString(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    const aiResponse: Conversation = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      message: getAIResponse(inputMessage),
      timestamp: new Date(),
      suggestions: ['Show details', 'Tell me more', 'Apply changes', 'Next steps']
    };

    setConversations(prev => [...prev, userMessage, aiResponse]);
    setInputMessage('');
  };

  const getAIResponse = (message: string): string => {
    const lower = message.toLowerCase();
    if (lower.includes('save') || lower.includes('saving')) {
      return "I found 3 ways to save money: 1) Consolidate streaming services ($300/year), 2) Optimize credit card rewards ($200/year), 3) Auto-save spare change ($150/year). Total potential: $650/year!";
    } else if (lower.includes('budget')) {
      return "I analyzed your budget and found $89 in underused categories. I can reallocate this to your emergency fund or vacation goal. Would you like me to apply these changes?";
    } else if (lower.includes('spend')) {
      return "Your spending is 12% higher than last month, mainly from dining out ($342 increase). Consider setting a $400/month limit for restaurants to stay on track.";
    } else {
      return "I'm here to help with savings, budgets, spending analysis, predictions, and more. What would you like to focus on?";
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'warning': return '#ef4444';
      case 'opportunity': return '#f59e0b';
      case 'success': return '#10b981';
      case 'prediction': return '#6366f1';
      default: return '#6b7280';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'opportunity': return '💡';
      case 'success': return '✅';
      case 'prediction': return '🔮';
      default: return 'ℹ️';
    }
  };

  const renderCoachTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => onNavigate('ai-cash-flow-forecast')}
          >
            <Text style={styles.quickActionIcon}>🔮</Text>
            <Text style={styles.quickActionLabel}>Cash Flow</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => onNavigate('ai-budget-optimizer')}
          >
            <Text style={styles.quickActionIcon}>💰</Text>
            <Text style={styles.quickActionLabel}>Budget Optimizer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => onNavigate('ai-subscription-audit')}
          >
            <Text style={styles.quickActionIcon}>🔍</Text>
            <Text style={styles.quickActionLabel}>Subscriptions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => onNavigate('smart-savings')}
          >
            <Text style={styles.quickActionIcon}>🐷</Text>
            <Text style={styles.quickActionLabel}>Smart Savings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => onNavigate('receipt-scanner')}
          >
            <Text style={styles.quickActionIcon}>📸</Text>
            <Text style={styles.quickActionLabel}>Scan Receipt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => onNavigate('fraud-detection')}
          >
            <Text style={styles.quickActionIcon}>🔒</Text>
            <Text style={styles.quickActionLabel}>Fraud Check</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* AI Insights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Insights</Text>
        {aiInsights.map((insight) => (
          <View key={insight.id} style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <View style={styles.insightTitleRow}>
                <Text style={styles.insightIcon}>{getInsightIcon(insight.type)}</Text>
                <View style={styles.insightTitleContainer}>
                  <Text style={styles.insightTitle}>{insight.title}</Text>
                  <View style={[styles.priorityBadge, { 
                    backgroundColor: insight.priority === 'high' ? '#fee2e2' : 
                                   insight.priority === 'medium' ? '#fef3c7' : '#f3f4f6'
                  }]}>
                    <Text style={[styles.priorityText, {
                      color: insight.priority === 'high' ? '#dc2626' :
                             insight.priority === 'medium' ? '#d97706' : '#6b7280'
                    }]}>
                      {insight.priority.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.confidenceBadge, { backgroundColor: getInsightColor(insight.type) + '20' }]}>
                <Text style={[styles.confidenceText, { color: getInsightColor(insight.type) }]}>
                  {insight.confidence}%
                </Text>
              </View>
            </View>
            <Text style={styles.insightDescription}>{insight.description}</Text>
            {insight.impact && (
              <View style={styles.impactContainer}>
                <Text style={styles.impactText}>💰 {insight.impact}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderPredictTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Predictive Insights</Text>
        <Text style={styles.sectionSubtitle}>
          AI-powered predictions based on your financial patterns
        </Text>
        {predictiveInsights.map((insight) => (
          <View key={insight.id} style={styles.predictionCard}>
            <View style={styles.predictionHeader}>
              <View>
                <Text style={styles.predictionTitle}>{insight.title}</Text>
                <Text style={styles.predictionTimeframe}>📅 {insight.timeframe}</Text>
              </View>
              <View style={styles.confidenceBadge}>
                <Text style={[styles.confidenceText, { color: colors.success }]}>
                  {insight.confidence}%
                </Text>
              </View>
            </View>
            <Text style={styles.predictionDescription}>{insight.description}</Text>
            <View style={styles.predictionHighlight}>
              <Text style={styles.predictionText}>🔮 {insight.prediction}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderAutomateTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Automation Rules</Text>
        <Text style={styles.sectionSubtitle}>
          Let AI handle your routine financial tasks
        </Text>
        {automationRules.map((rule) => (
          <View key={rule.id} style={styles.automationCard}>
            <View style={styles.automationHeader}>
              <View style={styles.automationInfo}>
                <Text style={styles.automationName}>{rule.name}</Text>
                <Text style={styles.automationDescription}>{rule.description}</Text>
                <View style={styles.automationMeta}>
                  <Text style={styles.automationFrequency}>⚡ {rule.frequency}</Text>
                  {rule.totalSaved && (
                    <Text style={styles.automationSaved}>
                      💰 Saved ${rule.totalSaved}
                    </Text>
                  )}
                </View>
              </View>
              <Switch
                value={rule.enabled}
                onValueChange={() => toggleAutomation(rule.id)}
                trackColor={{ false: '#d1d5db', true: colors.primary }}
                thumbColor={rule.enabled ? '#ffffff' : '#f3f4f6'}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderChatTab = () => (
    <View style={styles.chatContainer}>
      <ScrollView style={styles.conversationList} showsVerticalScrollIndicator={false}>
        {conversations.map((conv) => (
          <View key={conv.id} style={[
            styles.messageContainer,
            conv.type === 'user' ? styles.userMessage : styles.aiMessage
          ]}>
            <View style={[
              styles.messageBubble,
              conv.type === 'user' ? styles.userBubble : styles.aiBubble
            ]}>
              <Text style={[
                styles.messageText,
                conv.type === 'user' ? styles.userText : styles.aiText
              ]}>
                {conv.message}
              </Text>
            </View>
            {conv.suggestions && (
              <View style={styles.suggestionsContainer}>
                {conv.suggestions.map((suggestion, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.suggestionChip}
                    onPress={() => setInputMessage(suggestion)}
                  >
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask me anything about your finances..."
          placeholderTextColor="#9ca3af"
          value={inputMessage}
          onChangeText={setInputMessage}
          onSubmitEditing={sendMessage}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputMessage.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!inputMessage.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.aiIcon}>
            <Text style={styles.aiIconText}>🤖</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>AI Financial Guru ✨</Text>
            <Text style={styles.headerSubtitle}>Your smart money companion</Text>
          </View>
        </View>
        <View style={styles.liveBadge}>
          <View style={styles.liveIndicator} />
          <Text style={styles.liveText}>Live</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'coach' && styles.activeTab]}
          onPress={() => setActiveTab('coach')}
        >
          <Text style={[styles.tabText, activeTab === 'coach' && styles.activeTabText]}>
            🧠 Coach
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'predict' && styles.activeTab]}
          onPress={() => setActiveTab('predict')}
        >
          <Text style={[styles.tabText, activeTab === 'predict' && styles.activeTabText]}>
            🔮 Predict
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'automate' && styles.activeTab]}
          onPress={() => setActiveTab('automate')}
        >
          <Text style={[styles.tabText, activeTab === 'automate' && styles.activeTabText]}>
            ⚡ Auto
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'chat' && styles.activeTab]}
          onPress={() => setActiveTab('chat')}
        >
          <Text style={[styles.tabText, activeTab === 'chat' && styles.activeTabText]}>
            💬 Chat
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === 'coach' && renderCoachTab()}
      {activeTab === 'predict' && renderPredictTab()}
      {activeTab === 'automate' && renderAutomateTab()}
      {activeTab === 'chat' && renderChatTab()}
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
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    gap: 12,
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 8,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#ffffff',
  },
  tabContent: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  insightCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  insightTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  insightIcon: {
    fontSize: 24,
  },
  insightTitleContainer: {
    flex: 1,
    gap: 4,
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
  },
  confidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 8,
  },
  impactContainer: {
    backgroundColor: '#f0fdf4',
    padding: 8,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#059669',
  },
  predictionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  predictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  predictionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  predictionTimeframe: {
    fontSize: 12,
    color: '#6b7280',
  },
  predictionDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  predictionHighlight: {
    backgroundColor: '#eff6ff',
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
  },
  predictionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
  },
  automationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  automationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  automationInfo: {
    flex: 1,
    marginRight: 12,
  },
  automationName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  automationDescription: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
    marginBottom: 8,
  },
  automationMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  automationFrequency: {
    fontSize: 12,
    color: '#9ca3af',
  },
  automationSaved: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  chatContainer: {
    flex: 1,
  },
  conversationList: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
  },
  userBubble: {
    backgroundColor: colors.primary,
  },
  aiBubble: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userText: {
    color: '#ffffff',
  },
  aiText: {
    color: '#1f2937',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  suggestionChip: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  suggestionText: {
    fontSize: 12,
    color: '#4b5563',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1f2937',
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
