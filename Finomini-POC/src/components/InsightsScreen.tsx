import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Settings, Trophy, Heart, X, RotateCcw, TrendingUp, TrendingDown, Target, AlertTriangle, Lightbulb, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';

interface InsightsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface InsightCard {
  id: string;
  type: 'spending' | 'saving' | 'budgeting' | 'goal' | 'security' | 'investment';
  headline: string;
  keyDataPoint: string;
  description: string;
  icon: string;
  color: string;
  bgGradient: string;
  actionText: string;
  priority: 'low' | 'medium' | 'high';
  category?: string;
  relatedData?: any;
}

// Mock insights data
const mockInsights: InsightCard[] = [
  {
    id: '1',
    type: 'spending',
    headline: "You're Crushing Your Groceries Budget!",
    keyDataPoint: "$50 Under Budget",
    description: "You spent 15% less on groceries this month compared to your average, saving $50. Keep it up!",
    icon: "🛒",
    color: "#22C55E",
    bgGradient: "from-green-100 to-emerald-100",
    actionText: "View Grocery Trends",
    priority: 'medium',
    category: 'Groceries',
    relatedData: { amount: 50, percentage: 15 }
  },
  {
    id: '2',
    type: 'security',
    headline: "Spotting an Unusual Expense?",
    keyDataPoint: "$127 Coffee Shop",
    description: "You spent $127 at 'Downtown Coffee' yesterday - that's 5x your usual amount. Was this correct?",
    icon: "⚠️",
    color: "#EF4444",
    bgGradient: "from-red-100 to-pink-100",
    actionText: "Review Transaction",
    priority: 'high',
    category: 'Dining',
    relatedData: { amount: 127, merchant: 'Downtown Coffee' }
  },
  {
    id: '3',
    type: 'saving',
    headline: "Time to Boost Your Emergency Fund!",
    keyDataPoint: "+$250 Available",
    description: "You're $250 under budget this month. Consider moving this to your emergency fund to reach your $5,000 goal faster.",
    icon: "🏦",
    color: "#3B82F6",
    bgGradient: "from-blue-100 to-sky-100",
    actionText: "Add to Emergency Fund",
    priority: 'medium',
    category: 'Savings',
    relatedData: { amount: 250, goalProgress: 68 }
  },
  {
    id: '4',
    type: 'budgeting',
    headline: "Entertainment Budget Alert",
    keyDataPoint: "95% Used",
    description: "You've used 95% of your entertainment budget with 8 days left in the month. Consider adjusting spending.",
    icon: "🎬",
    color: "#F59E0B",
    bgGradient: "from-yellow-100 to-orange-100",
    actionText: "Adjust Budget",
    priority: 'high',
    category: 'Entertainment',
    relatedData: { percentage: 95, daysLeft: 8 }
  },
  {
    id: '5',
    type: 'investment',
    headline: "Great Month for Your Portfolio!",
    keyDataPoint: "+$1,247 Growth",
    description: "Your investment portfolio grew by $1,247 this month. Consider increasing your monthly contributions.",
    icon: "📈",
    color: "#10B981",
    bgGradient: "from-emerald-100 to-green-100",
    actionText: "Review Portfolio",
    priority: 'low',
    category: 'Investments',
    relatedData: { growth: 1247, percentage: 8.2 }
  },
  {
    id: '6',
    type: 'goal',
    headline: "Vacation Fund Progress!",
    keyDataPoint: "72% Complete",
    description: "You're 72% of the way to your vacation goal! At this rate, you'll reach it 2 months early.",
    icon: "✈️",
    color: "#8B5CF6",
    bgGradient: "from-purple-100 to-violet-100",
    actionText: "View Goal Details",
    priority: 'medium',
    category: 'Goals',
    relatedData: { progress: 72, monthsEarly: 2 }
  }
];

export default function InsightsScreen({ onBack, onNavigate }: InsightsScreenProps) {
  const [cards, setCards] = useState<InsightCard[]>(mockInsights);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [streak, setStreak] = useState(5);
  const [points, setPoints] = useState(1250);
  const [nextReward, setNextReward] = useState(3);
  const [lastAction, setLastAction] = useState<'like' | 'dismiss' | null>(null);
  const [undoCard, setUndoCard] = useState<InsightCard | null>(null);
  const [showUndo, setShowUndo] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const currentCard = cards[currentIndex];

  const handleCardSwipe = (direction: 'left' | 'right') => {
    if (!currentCard) return;

    const action = direction === 'right' ? 'like' : 'dismiss';
    setLastAction(action);
    setUndoCard(currentCard);
    setShowUndo(true);

    // Award points for engagement
    if (action === 'like') {
      setPoints(prev => prev + 10);
      setNextReward(prev => Math.max(0, prev - 1));
    } else {
      setPoints(prev => prev + 5);
    }

    // Move to next card
    setCurrentIndex(prev => prev + 1);

    // Hide undo after 3 seconds
    setTimeout(() => {
      setShowUndo(false);
      setUndoCard(null);
    }, 3000);
  };

  const handleUndo = () => {
    if (undoCard) {
      setCurrentIndex(prev => prev - 1);
      setShowUndo(false);
      setUndoCard(null);
      setLastAction(null);
      // Deduct points awarded
      const pointsToDeduct = lastAction === 'like' ? 10 : 5;
      setPoints(prev => Math.max(0, prev - pointsToDeduct));
      if (lastAction === 'like') {
        setNextReward(prev => prev + 1);
      }
    }
  };

  const handleCardTap = () => {
    if (currentCard) {
      onNavigate('insight-details', { insight: currentCard });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'spending': return <TrendingDown className="h-4 w-4" />;
      case 'saving': return <DollarSign className="h-4 w-4" />;
      case 'budgeting': return <Target className="h-4 w-4" />;
      case 'goal': return <Target className="h-4 w-4" />;
      case 'security': return <AlertTriangle className="h-4 w-4" />;
      case 'investment': return <TrendingUp className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Status Bar */}
      <div className="bg-card/80 backdrop-blur-sm flex flex-row items-center justify-between px-4 pt-[21px] pb-0 h-[50px]">
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
      <div className="bg-card/80 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <h1 className="text-lg font-semibold text-foreground">Your Coach</h1>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="p-2"
              onClick={() => onNavigate('achievements')}
            >
              <Trophy className="h-5 w-5 text-yellow-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="p-2"
              onClick={() => onNavigate('insights-settings')}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Gamification Progress Bar */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="text-orange-600">🔥</span>
            <span className="font-medium">Daily Streak: {streak} days</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600">💎</span>
            <span className="font-medium">{points.toLocaleString()} points</span>
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground text-center">
          Next reward in {nextReward} insight{nextReward !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
        {/* Undo Button */}
        <AnimatePresence>
          {showUndo && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50"
            >
              <Button
                variant="secondary"
                size="sm"
                onClick={handleUndo}
                className="shadow-lg"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Undo {lastAction === 'like' ? 'Like' : 'Dismiss'}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card Stack */}
        <div className="relative w-full max-w-sm h-96">
          <AnimatePresence mode="popLayout">
            {cards.slice(currentIndex, currentIndex + 3).map((card, stackIndex) => (
              <motion.div
                key={card.id}
                className="absolute inset-0"
                style={{
                  zIndex: 3 - stackIndex,
                  scale: 1 - stackIndex * 0.02,
                  y: stackIndex * 8,
                }}
                initial={stackIndex === 0 ? { scale: 1.1, opacity: 0 } : {}}
                animate={stackIndex === 0 ? { scale: 1, opacity: 1 } : {}}
                exit={{
                  x: dragOffset.x > 0 ? 300 : -300,
                  opacity: 0,
                  transition: { duration: 0.3 }
                }}
                drag={stackIndex === 0}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(_, info) => {
                  setIsDragging(false);
                  if (Math.abs(info.offset.x) > 100) {
                    handleCardSwipe(info.offset.x > 0 ? 'right' : 'left');
                  }
                }}
                whileDrag={{ 
                  rotate: dragOffset.x * 0.1,
                  scale: 1.05
                }}
              >
                <Card 
                  className={`h-full bg-gradient-to-br ${card.bgGradient} border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden`}
                  onClick={stackIndex === 0 && !isDragging ? handleCardTap : undefined}
                >
                  <CardContent className="p-6 h-full flex flex-col justify-between">
                    {/* Header */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(card.type)}
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getPriorityColor(card.priority)}`}
                          >
                            {card.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-3xl">{card.icon}</div>
                      </div>

                      <h2 className="text-xl font-bold text-foreground leading-tight">
                        {card.headline}
                      </h2>

                      <div className="text-center py-4">
                        <div 
                          className="text-3xl font-bold mb-1"
                          style={{ color: card.color }}
                        >
                          {card.keyDataPoint}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4">
                      <p className="text-foreground/80 text-sm leading-relaxed">
                        {card.description}
                      </p>

                      {/* Action Button */}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full bg-white/50 hover:bg-white/70"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardTap();
                        }}
                      >
                        {card.actionText}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Swipe Indicators */}
        <div className="flex items-center justify-center gap-12 mt-8">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <X className="h-6 w-6 text-red-600" />
            </div>
            <span className="text-xs text-muted-foreground">Not Relevant</span>
          </div>
          
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-xs text-muted-foreground">Helpful</span>
          </div>
        </div>

        {/* Empty State */}
        {currentIndex >= cards.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              You're All Caught Up!
            </h3>
            <p className="text-muted-foreground mb-4">
              Check back tomorrow for new insights.
            </p>
            <Button onClick={() => onNavigate('dashboard')}>
              Back to Dashboard
            </Button>
          </motion.div>
        )}

        {/* Quick Stats */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {Math.max(0, cards.length - currentIndex)} insights remaining
              </span>
              <span className="text-muted-foreground">
                Tap card for details
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}