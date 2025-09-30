import { useState } from 'react';
import { ArrowLeft, Calculator, TrendingUp, TrendingDown, DollarSign, Calendar, Target, Home, Car, GraduationCap, Baby, Heart, Brain, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface AIWhatIfScenariosScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface ScenarioResult {
  monthlyImpact: number;
  yearlyImpact: number;
  goalAchievementChange: number;
  timeToGoalChange: number;
  budgetImpact: {
    category: string;
    change: number;
  }[];
  recommendations: string[];
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  inputType: 'amount' | 'percentage' | 'selection';
  defaultValue?: number;
  options?: string[];
}

export default function AIWhatIfScenariosScreen({ onBack, onNavigate }: AIWhatIfScenariosScreenProps) {
  const [activeTab, setActiveTab] = useState('popular');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<ScenarioResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const popularScenarios: Scenario[] = [
    {
      id: '1',
      title: 'Increase 401k Contribution',
      description: 'See the impact of increasing your retirement contribution',
      icon: <TrendingUp className="w-5 h-5 text-green-600" />,
      category: 'Retirement',
      inputType: 'percentage',
      defaultValue: 2
    },
    {
      id: '2',
      title: 'Get a Raise',
      description: 'Calculate the effect of a salary increase',
      icon: <DollarSign className="w-5 h-5 text-blue-600" />,
      category: 'Income',
      inputType: 'amount',
      defaultValue: 5000
    },
    {
      id: '3',
      title: 'Pay Off Credit Card Early',
      description: 'See savings from extra credit card payments',
      icon: <Target className="w-5 h-5 text-purple-600" />,
      category: 'Debt',
      inputType: 'amount',
      defaultValue: 200
    },
    {
      id: '4',
      title: 'Move to Cheaper Apartment',
      description: 'Impact of reducing housing costs',
      icon: <Home className="w-5 h-5 text-orange-600" />,
      category: 'Housing',
      inputType: 'amount',
      defaultValue: 300
    }
  ];

  const lifestyleScenarios: Scenario[] = [
    {
      id: '5',
      title: 'Buy a New Car',
      description: 'Financial impact of a new car purchase',
      icon: <Car className="w-5 h-5 text-red-600" />,
      category: 'Transportation',
      inputType: 'amount',
      defaultValue: 25000
    },
    {
      id: '6',
      title: 'Go Back to School',
      description: 'Cost and benefit analysis of education',
      icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
      category: 'Education',
      inputType: 'amount',
      defaultValue: 15000
    },
    {
      id: '7',
      title: 'Have a Baby',
      description: 'Estimate costs of a new family member',
      icon: <Baby className="w-5 h-5 text-pink-600" />,
      category: 'Family',
      inputType: 'selection',
      options: ['First child', 'Second child', 'Third+ child']
    },
    {
      id: '8',
      title: 'Take Extended Vacation',
      description: 'Impact of a major vacation expense',
      icon: <Heart className="w-5 h-5 text-cyan-600" />,
      category: 'Lifestyle',
      inputType: 'amount',
      defaultValue: 5000
    }
  ];

  const mockResult: ScenarioResult = {
    monthlyImpact: 167,
    yearlyImpact: 2000,
    goalAchievementChange: 15,
    timeToGoalChange: -3,
    budgetImpact: [
      { category: 'Emergency Fund', change: 12 },
      { category: 'Vacation Savings', change: 8 },
      { category: 'Dining Out', change: -5 }
    ],
    recommendations: [
      'Your emergency fund will reach the target 3 months earlier',
      'Consider automating the additional contribution',
      'This change aligns well with your long-term financial goals'
    ]
  };

  const handleCalculateScenario = () => {
    if (!selectedScenario) return;
    
    setIsCalculating(true);
    
    // Simulate AI calculation
    setTimeout(() => {
      setResult(mockResult);
      setIsCalculating(false);
    }, 2000);
  };

  const resetScenario = () => {
    setSelectedScenario(null);
    setResult(null);
    setInputValue(0);
  };

  if (selectedScenario) {
    return (
      <div className="min-h-screen bg-[#f9fbfa]">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[#f1f5f1] z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={resetScenario} className="text-[#18312d] hover:text-[#0f1f1b]">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-[#18312d]">{selectedScenario.title}</h1>
                <p className="text-sm text-[#788c78]">What-if analysis</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-[#e6f1fc] text-[#0056ac] border-[#b0d4f7]">{selectedScenario.category}</Badge>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Input Section */}
          <Card className="border-[#eef8ee] shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#18312d]">
                {selectedScenario.icon}
                Scenario Input
              </CardTitle>
              <CardDescription className="text-[#788c78]">{selectedScenario.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedScenario.inputType === 'amount' && (
                <div>
                  <Label>Amount ($)</Label>
                  <Input
                    type="number"
                    value={inputValue || selectedScenario.defaultValue}
                    onChange={(e) => setInputValue(Number(e.target.value))}
                    placeholder="Enter amount"
                  />
                </div>
              )}
              
              {selectedScenario.inputType === 'percentage' && (
                <div className="space-y-3">
                  <Label>Percentage Increase (%)</Label>
                  <Slider
                    value={[inputValue || selectedScenario.defaultValue || 0]}
                    onValueChange={(value) => setInputValue(value[0])}
                    max={20}
                    min={0}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="text-center font-medium">
                    {inputValue || selectedScenario.defaultValue}%
                  </div>
                </div>
              )}
              
              {selectedScenario.inputType === 'selection' && (
                <div>
                  <Label>Select Option</Label>
                  <Select onValueChange={(value) => setInputValue(Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedScenario.options?.map((option, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <Button 
                className="w-full bg-[#18312d] hover:bg-[#1a3430] text-white" 
                onClick={handleCalculateScenario}
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <Calculator className="w-4 h-4 mr-2 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Calculate Impact
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          {result && (
            <div className="space-y-4">
              {/* Financial Impact */}
              <Card className="border-[#eef8ee] shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#18312d]">
                    <Zap className="w-5 h-5 text-[#f06e06]" />
                    Financial Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-[#eef8ee] rounded-xl border border-[#c8e9c8]">
                      <div className="text-2xl font-bold text-[#0b733c]">
                        +${result.monthlyImpact}
                      </div>
                      <p className="text-sm text-[#788c78]">Monthly Impact</p>
                    </div>
                    <div className="text-center p-4 bg-[#e6f1fc] rounded-xl border border-[#b0d4f7]">
                      <div className="text-2xl font-bold text-[#0056ac]">
                        +${result.yearlyImpact}
                      </div>
                      <p className="text-sm text-[#788c78]">Yearly Impact</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Goal Impact */}
              <Card className="border-[#eef8ee] shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#18312d]">
                    <Target className="w-5 h-5 text-[#8c4a86]" />
                    Goal Achievement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[#788c78]">Goal Progress Boost</span>
                    <span className="font-bold text-[#0b733c]">
                      +{result.goalAchievementChange}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#788c78]">Time to Goal</span>
                    <span className="font-bold text-[#0056ac]">
                      {result.timeToGoalChange} months earlier
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Budget Impact */}
              <Card>
                <CardHeader>
                  <CardTitle>Budget Category Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {result.budgetImpact.map((impact, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{impact.category}</span>
                      <div className="flex items-center gap-2">
                        {impact.change > 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`font-medium ${
                          impact.change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {impact.change > 0 ? '+' : ''}{impact.change}%
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card className="bg-[#f5eef4] border-[#e0cedd] shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#18312d]">
                    <Brain className="w-5 h-5 text-[#8c4a86]" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#8c4a86] rounded-full mt-2"></div>
                      <p className="text-sm text-[#18312d]">{rec}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-[#18312d] hover:bg-[#1a3430] text-white">
                  Apply This Scenario
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-[#c8e9c8] hover:bg-[#f7fcf7] hover:border-[#0f9950]" 
                  onClick={resetScenario}
                >
                  Try Another Scenario
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fbfa]">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[#f1f5f1] z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-[#18312d] hover:text-[#0f1f1b]">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-[#18312d]">
                📊 What-If Scenarios
              </h1>
              <p className="text-sm text-[#788c78]">AI-powered financial modeling</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#f7fcf7]">
            <TabsTrigger value="popular" className="text-xs">Popular</TabsTrigger>
            <TabsTrigger value="lifestyle" className="text-xs">Lifestyle</TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold text-[#18312d] mb-2">Popular Scenarios</h3>
              <p className="text-sm text-[#788c78] mb-4">
                Common financial decisions analyzed by AI
              </p>
            </div>

            <div className="space-y-3">
              {popularScenarios.map((scenario) => (
                <Card key={scenario.id} className="cursor-pointer hover:border-[#c8e9c8] transition-colors shadow-sm border-[#eef8ee]">
                  <CardContent 
                    className="p-4"
                    onClick={() => setSelectedScenario(scenario)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#e6f1fc] rounded-xl text-[#0056ac]">
                        {scenario.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#18312d]">{scenario.title}</h4>
                        <p className="text-sm text-[#788c78]">
                          {scenario.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-[#f5eef4] text-[#8c4a86] border-[#e0cedd]">{scenario.category}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lifestyle" className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold text-[#18312d] mb-2">Lifestyle Changes</h3>
              <p className="text-sm text-[#788c78] mb-4">
                Major life decisions and their financial impact
              </p>
            </div>

            <div className="space-y-3">
              {lifestyleScenarios.map((scenario) => (
                <Card key={scenario.id} className="cursor-pointer hover:border-[#c8e9c8] transition-colors shadow-sm border-[#eef8ee]">
                  <CardContent 
                    className="p-4"
                    onClick={() => setSelectedScenario(scenario)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#f5eef4] rounded-xl text-[#8c4a86]">
                        {scenario.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{scenario.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {scenario.description}
                        </p>
                      </div>
                      <Badge variant="outline">{scenario.category}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Tips */}
        <Card className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800 mb-2">AI-Powered Analysis</h4>
                <p className="text-sm text-amber-700">
                  Our AI considers your spending patterns, income trends, and financial goals to provide accurate projections for each scenario.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}