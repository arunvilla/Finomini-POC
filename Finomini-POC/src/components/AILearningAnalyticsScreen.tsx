// AI Learning Analytics Screen to show categorization performance

import { useState, useEffect } from 'react';
import { ArrowLeft, Brain, Target, Users, BarChart3, PieChart, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useAIFeedback } from '../hooks/useAIFeedback';
import { LearningAnalytics } from '../types';
import { toast } from 'sonner';

interface AILearningAnalyticsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

export default function AILearningAnalyticsScreen({ onBack, onNavigate }: AILearningAnalyticsScreenProps) {
  const [analytics, setAnalytics] = useState<LearningAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { getLearningAnalytics } = useAIFeedback();

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setIsLoading(true);
    try {
      const data = await getLearningAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshAnalytics = async () => {
    setIsRefreshing(true);
    try {
      const data = await getLearningAnalytics();
      setAnalytics(data);
      toast.success('Analytics refreshed');
    } catch (error) {
      console.error('Failed to refresh analytics:', error);
      toast.error('Failed to refresh analytics');
    } finally {
      setIsRefreshing(false);
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 0.8) return 'text-green-600';
    if (accuracy >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracyBadgeVariant = (accuracy: number): "default" | "secondary" | "destructive" | "outline" => {
    if (accuracy >= 0.8) return 'default';
    if (accuracy >= 0.6) return 'secondary';
    return 'destructive';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Status Bar */}
        <div className="bg-card flex flex-row items-center justify-between px-4 pt-[21px] pb-0 h-[50px]">
          <div className="text-[17px] text-foreground font-semibold">9:41</div>
          <div className="h-2.5 w-[124px]" />
          <div className="flex items-center gap-[7px]">
            <div className="w-[19.2px] h-[12.226px] bg-foreground rounded-sm" />
            <div className="w-[17.142px] h-[12.328px] bg-foreground rounded-sm" />
            <div className="w-[27.328px] h-[13px] border border-foreground rounded-[3.8px] relative">
              <div className="w-[21px] h-[9px] bg-foreground rounded-[2.5px] absolute left-[2px] top-[2px]" />
              <div className="w-[1.328px] h-[5px] bg-foreground rounded-r absolute right-0 top-[4px]" />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-card border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={onBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">AI Learning Analytics</h1>
            <div className="w-10" />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Status Bar */}
        <div className="bg-card flex flex-row items-center justify-between px-4 pt-[21px] pb-0 h-[50px]">
          <div className="text-[17px] text-foreground font-semibold">9:41</div>
          <div className="h-2.5 w-[124px]" />
          <div className="flex items-center gap-[7px]">
            <div className="w-[19.2px] h-[12.226px] bg-foreground rounded-sm" />
            <div className="w-[17.142px] h-[12.328px] bg-foreground rounded-sm" />
            <div className="w-[27.328px] h-[13px] border border-foreground rounded-[3.8px] relative">
              <div className="w-[21px] h-[9px] bg-foreground rounded-[2.5px] absolute left-[2px] top-[2px]" />
              <div className="w-[1.328px] h-[5px] bg-foreground rounded-r absolute right-0 top-[4px]" />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-card border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={onBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">AI Learning Analytics</h1>
            <div className="w-10" />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Analytics Available</h3>
            <p className="text-muted-foreground">Start using AI categorization to see analytics.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Status Bar */}
      <div className="bg-card flex flex-row items-center justify-between px-4 pt-[21px] pb-0 h-[50px]">
        <div className="text-[17px] text-foreground font-semibold">9:41</div>
        <div className="h-2.5 w-[124px]" />
        <div className="flex items-center gap-[7px]">
          <div className="w-[19.2px] h-[12.226px] bg-foreground rounded-sm" />
          <div className="w-[17.142px] h-[12.328px] bg-foreground rounded-sm" />
          <div className="w-[27.328px] h-[13px] border border-foreground rounded-[3.8px] relative">
            <div className="w-[21px] h-[9px] bg-foreground rounded-[2.5px] absolute left-[2px] top-[2px]" />
            <div className="w-[1.328px] h-[5px] bg-foreground rounded-r absolute right-0 top-[4px]" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <h1 className="text-xl font-semibold text-foreground">AI Learning Analytics</h1>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={refreshAnalytics}
            disabled={isRefreshing}
            className="p-2"
          >
            <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="merchants">Merchants</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Overall Performance */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Overall Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getAccuracyColor(analytics.accuracy_rate)}`}>
                      {Math.round(analytics.accuracy_rate * 100)}%
                    </div>
                    <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {analytics.total_suggestions}
                    </div>
                    <p className="text-sm text-muted-foreground">Total Suggestions</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Accepted</span>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={analytics.total_suggestions > 0 ? (analytics.accepted_suggestions / analytics.total_suggestions) * 100 : 0} 
                        className="w-20 h-2" 
                      />
                      <span className="text-sm font-medium">{analytics.accepted_suggestions}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Corrected</span>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={analytics.total_suggestions > 0 ? (analytics.corrected_suggestions / analytics.total_suggestions) * 100 : 0} 
                        className="w-20 h-2" 
                      />
                      <span className="text-sm font-medium">{analytics.corrected_suggestions}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rejected</span>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={analytics.total_suggestions > 0 ? (analytics.rejected_suggestions / analytics.total_suggestions) * 100 : 0} 
                        className="w-20 h-2" 
                      />
                      <span className="text-sm font-medium">{analytics.rejected_suggestions}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Progress */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">AI Accuracy Trend</span>
                      <span className={`text-sm ${getAccuracyColor(analytics.accuracy_rate)}`}>
                        {analytics.accuracy_rate >= 0.8 ? 'Excellent' : 
                         analytics.accuracy_rate >= 0.6 ? 'Good' : 'Needs Improvement'}
                      </span>
                    </div>
                    <Progress value={analytics.accuracy_rate * 100} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        {Math.round((analytics.accepted_suggestions / Math.max(analytics.total_suggestions, 1)) * 100)}%
                      </div>
                      <p className="text-xs text-green-700">Acceptance Rate</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">
                        {Object.keys(analytics.merchant_patterns).length}
                      </div>
                      <p className="text-xs text-blue-700">Learned Patterns</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <Button
                  variant="outline"
                  onClick={() => onNavigate('bulk-categorization')}
                  className="w-full flex items-center gap-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  Review Bulk Suggestions
                  {analytics.total_suggestions > analytics.accepted_suggestions + analytics.rejected_suggestions + analytics.corrected_suggestions && (
                    <Badge variant="secondary" className="ml-auto">
                      {analytics.total_suggestions - analytics.accepted_suggestions - analytics.rejected_suggestions - analytics.corrected_suggestions} pending
                    </Badge>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => onNavigate('ai-configuration')}
                  className="w-full flex items-center gap-2"
                >
                  <Brain className="h-4 w-4" />
                  AI Configuration
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    // Export analytics data
                    const dataStr = JSON.stringify(analytics, null, 2);
                    const dataBlob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `ai-analytics-${new Date().toISOString().split('T')[0]}.json`;
                    link.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="w-full flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Export Analytics
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-green-600" />
                  Category Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {Object.keys(analytics.category_accuracy).length === 0 ? (
                  <div className="text-center py-8">
                    <Brain className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No category data available yet.</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Start categorizing transactions to see performance metrics.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Category Performance Summary */}
                    <div className="grid grid-cols-3 gap-4 p-3 bg-muted rounded-lg">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-green-600">
                          {Object.values(analytics.category_accuracy).filter(data => data.accuracy >= 0.8).length}
                        </div>
                        <p className="text-xs text-muted-foreground">High Accuracy</p>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-yellow-600">
                          {Object.values(analytics.category_accuracy).filter(data => data.accuracy >= 0.6 && data.accuracy < 0.8).length}
                        </div>
                        <p className="text-xs text-muted-foreground">Medium Accuracy</p>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-red-600">
                          {Object.values(analytics.category_accuracy).filter(data => data.accuracy < 0.6).length}
                        </div>
                        <p className="text-xs text-muted-foreground">Needs Improvement</p>
                      </div>
                    </div>

                    {/* Individual Category Performance */}
                    <div className="space-y-3">
                      {Object.entries(analytics.category_accuracy)
                        .sort(([,a], [,b]) => b.accuracy - a.accuracy)
                        .map(([category, data]) => (
                          <div key={category} className="p-3 bg-muted rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex-1">
                                <p className="font-medium">{category}</p>
                                <p className="text-sm text-muted-foreground">
                                  {data.correct} correct of {data.total} suggestions
                                </p>
                              </div>
                              <Badge variant={getAccuracyBadgeVariant(data.accuracy)}>
                                {Math.round(data.accuracy * 100)}%
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Progress 
                                value={data.accuracy * 100} 
                                className="flex-1 h-2" 
                              />
                              <span className="text-xs text-muted-foreground">
                                {data.total > 5 ? 'Reliable' : 'More data needed'}
                              </span>
                            </div>
                            
                            {data.accuracy < 0.6 && data.total > 3 && (
                              <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-700">
                                💡 This category needs attention. Consider reviewing recent suggestions.
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="merchants" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  Merchant Learning Patterns
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {Object.keys(analytics.merchant_patterns).length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No merchant patterns learned yet.</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      As you categorize transactions, AI will learn merchant patterns.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Merchant Learning Summary */}
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-purple-800">Learning Summary</span>
                        <Badge variant="outline" className="text-purple-700">
                          {Object.keys(analytics.merchant_patterns).length} merchants learned
                        </Badge>
                      </div>
                      <p className="text-xs text-purple-700">
                        AI has learned categorization patterns for {Object.keys(analytics.merchant_patterns).length} merchants 
                        based on your feedback. This enables automatic categorization for future transactions.
                      </p>
                    </div>

                    {/* Top Performing Merchants */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">Most Reliable Patterns</h4>
                      <div className="space-y-3">
                        {Object.entries(analytics.merchant_patterns)
                          .sort(([,a], [,b]) => b.confidence - a.confidence)
                          .slice(0, 10) // Show top 10
                          .map(([merchant, data]) => (
                            <div key={merchant} className="p-3 bg-muted rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium truncate">{merchant}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Auto-categorizes as <strong>{data.category}</strong>
                                  </p>
                                </div>
                                <Badge variant={getAccuracyBadgeVariant(data.confidence)}>
                                  {Math.round(data.confidence * 100)}%
                                </Badge>
                              </div>
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{data.feedback_count} transactions learned</span>
                                <div className="flex items-center gap-1">
                                  {data.confidence >= 0.9 ? (
                                    <span className="text-green-600">🎯 Highly reliable</span>
                                  ) : data.confidence >= 0.7 ? (
                                    <span className="text-yellow-600">✅ Good pattern</span>
                                  ) : (
                                    <span className="text-red-600">⚠️ Needs more data</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Learning Recommendations */}
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Learning Tips</h4>
                      <ul className="text-xs text-blue-700 space-y-1">
                        <li>• Merchants with 5+ transactions provide the most reliable patterns</li>
                        <li>• Consistent categorization helps AI learn faster</li>
                        <li>• Review and correct AI suggestions to improve accuracy</li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}