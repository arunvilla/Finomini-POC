import { useState } from 'react';
import { ArrowLeft, Trophy, Star, Target, Flame, Calendar, DollarSign, TrendingUp, Award, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface AchievementsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'milestones' | 'streaks' | 'challenges';
  badge: string;
  dateAchieved?: string;
  progress?: number;
  maxProgress?: number;
  isLocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
}

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Completed your first insight review',
    icon: '👶',
    category: 'milestones',
    badge: '🏆',
    dateAchieved: '2025-01-20',
    isLocked: false,
    rarity: 'common',
    points: 50
  },
  {
    id: '2',
    title: 'Savings Starter',
    description: 'Successfully saved your first $500',
    icon: '💰',
    category: 'milestones',
    badge: '💎',
    dateAchieved: '2025-01-22',
    isLocked: false,
    rarity: 'common',
    points: 100
  },
  {
    id: '3',
    title: 'Budget Master',
    description: 'Stayed under budget for 3 consecutive months',
    icon: '📊',
    category: 'milestones',
    badge: '👑',
    dateAchieved: '2025-01-25',
    isLocked: false,
    rarity: 'rare',
    points: 250
  },
  {
    id: '4',
    title: 'Insight Explorer',
    description: 'Reviewed 50 financial insights',
    icon: '🔍',
    category: 'milestones',
    badge: '🏅',
    progress: 42,
    maxProgress: 50,
    isLocked: true,
    rarity: 'rare',
    points: 200
  },
  {
    id: '5',
    title: 'Hot Streak',
    description: 'Daily insight streak of 7 days',
    icon: '🔥',
    category: 'streaks',
    badge: '🔥',
    dateAchieved: '2025-01-27',
    isLocked: false,
    rarity: 'common',
    points: 150
  },
  {
    id: '6',
    title: 'Consistency King',
    description: 'Daily insight streak of 30 days',
    icon: '👑',
    category: 'streaks',
    badge: '👑',
    progress: 5,
    maxProgress: 30,
    isLocked: true,
    rarity: 'epic',
    points: 500
  },
  {
    id: '7',
    title: 'No-Spend Weekend',
    description: 'Complete a weekend without any discretionary spending',
    icon: '🚫',
    category: 'challenges',
    badge: '🎯',
    dateAchieved: '2025-01-26',
    isLocked: false,
    rarity: 'common',
    points: 100
  },
  {
    id: '8',
    title: 'Subscription Sleuth',
    description: 'Cancelled 3 unused subscriptions',
    icon: '🕵️',
    category: 'challenges',
    badge: '🔍',
    progress: 2,
    maxProgress: 3,
    isLocked: true,
    rarity: 'rare',
    points: 200
  },
  {
    id: '9',
    title: 'Emergency Fund Hero',
    description: 'Built an emergency fund of $5,000',
    icon: '🦸',
    category: 'milestones',
    badge: '🦸',
    progress: 3400,
    maxProgress: 5000,
    isLocked: true,
    rarity: 'epic',
    points: 750
  },
  {
    id: '10',
    title: 'Investment Pioneer',
    description: 'Made your first investment of $1,000+',
    icon: '🚀',
    category: 'milestones',
    badge: '🚀',
    progress: 0,
    maxProgress: 1000,
    isLocked: true,
    rarity: 'legendary',
    points: 1000
  }
];

export default function AchievementsScreen({ onBack, onNavigate }: AchievementsScreenProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [totalPoints] = useState(1250);
  const [wellnessScore] = useState(78);
  const [nextTierPoints] = useState(250);

  const getFilteredAchievements = () => {
    switch (activeTab) {
      case 'earned':
        return mockAchievements.filter(a => !a.isLocked);
      case 'in-progress':
        return mockAchievements.filter(a => a.isLocked && a.progress !== undefined);
      case 'locked':
        return mockAchievements.filter(a => a.isLocked && a.progress === undefined);
      case 'milestones':
        return mockAchievements.filter(a => a.category === 'milestones');
      case 'streaks':
        return mockAchievements.filter(a => a.category === 'streaks');
      case 'challenges':
        return mockAchievements.filter(a => a.category === 'challenges');
      default:
        return mockAchievements;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const earnedAchievements = mockAchievements.filter(a => !a.isLocked);
  const totalAchievements = mockAchievements.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex flex-col">
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
          
          <h1 className="text-lg font-semibold text-foreground">Achievements</h1>
          
          <div className="w-10" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Overall Progress */}
        <div className="p-4 space-y-4">
          <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="text-4xl">🏆</div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {totalPoints.toLocaleString()} Points
                  </h2>
                  <p className="text-muted-foreground">Total Insight Points Earned</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-white/50 rounded-lg">
                    <div className="text-xl font-bold text-foreground">{wellnessScore}</div>
                    <div className="text-sm text-muted-foreground">Wellness Score</div>
                  </div>
                  <div className="p-3 bg-white/50 rounded-lg">
                    <div className="text-xl font-bold text-foreground">
                      {earnedAchievements.length}/{totalAchievements}
                    </div>
                    <div className="text-sm text-muted-foreground">Achievements</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Next Reward Tier</span>
                    <span>{nextTierPoints} points to go</span>
                  </div>
                  <Progress 
                    value={((totalPoints % 500) / 500) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Tabs */}
        <div className="px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="earned" className="text-xs">Earned</TabsTrigger>
              <TabsTrigger value="in-progress" className="text-xs">Progress</TabsTrigger>
            </TabsList>

            <div className="mt-4">
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                <Button
                  variant={activeTab === 'milestones' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab('milestones')}
                  className="whitespace-nowrap"
                >
                  <Target className="h-3 w-3 mr-1" />
                  Milestones
                </Button>
                <Button
                  variant={activeTab === 'streaks' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab('streaks')}
                  className="whitespace-nowrap"
                >
                  <Flame className="h-3 w-3 mr-1" />
                  Streaks
                </Button>
                <Button
                  variant={activeTab === 'challenges' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab('challenges')}
                  className="whitespace-nowrap"
                >
                  <Award className="h-3 w-3 mr-1" />
                  Challenges
                </Button>
              </div>
            </div>

            <TabsContent value={activeTab} className="space-y-3 pb-6">
              {getFilteredAchievements().map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`${achievement.isLocked ? 'opacity-70' : ''} transition-all duration-200 hover:shadow-md`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Icon and Badge */}
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                          {achievement.isLocked && !achievement.progress ? (
                            <Lock className="h-6 w-6 text-gray-400" />
                          ) : (
                            achievement.icon
                          )}
                        </div>
                        {!achievement.isLocked && (
                          <div className="absolute -top-1 -right-1 text-lg">
                            {achievement.badge}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className={`font-semibold ${achievement.isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {achievement.description}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${getRarityColor(achievement.rarity)}`}
                            >
                              {achievement.rarity.toUpperCase()}
                            </Badge>
                            <span className="text-xs font-medium text-muted-foreground">
                              {achievement.points} pts
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        {achievement.progress !== undefined && achievement.maxProgress && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">
                                {achievement.category === 'milestones' && achievement.title.includes('$') 
                                  ? `${formatCurrency(achievement.progress)} / ${formatCurrency(achievement.maxProgress)}`
                                  : `${achievement.progress} / ${achievement.maxProgress}`
                                }
                              </span>
                            </div>
                            <Progress 
                              value={(achievement.progress / achievement.maxProgress) * 100} 
                              className="h-2"
                            />
                          </div>
                        )}

                        {/* Date Achieved */}
                        {achievement.dateAchieved && (
                          <div className="flex items-center gap-1 mt-2">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              Achieved: {new Date(achievement.dateAchieved).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {getFilteredAchievements().length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No achievements in this category yet
                  </h3>
                  <p className="text-muted-foreground">
                    Keep using insights to unlock achievements!
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Upcoming Rewards Preview */}
        <div className="p-4">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🎁</div>
                    <div>
                      <div className="font-medium text-sm">Monthly Challenge Rewards</div>
                      <div className="text-xs text-muted-foreground">Exclusive badges and bonuses</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Feb 2025
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🏅</div>
                    <div>
                      <div className="font-medium text-sm">Leaderboards</div>
                      <div className="text-xs text-muted-foreground">Compare with friends (opt-in)</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Coming Soon
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}