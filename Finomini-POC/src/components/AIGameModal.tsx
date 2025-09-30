import { useState, useEffect } from 'react';
import { X, Sparkles, Trophy, Zap, Star, Gift, Target, Camera, Shield, TrendingUp, Crown, Flame, Heart, Coins, Coffee, Gamepad2, Medal, ChevronRight, Plus, CheckCircle2, Clock, Share2, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { motion, AnimatePresence } from 'motion/react';

interface AIGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: string, data?: any) => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  total: number;
  xpReward: number;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  total: number;
  timeLeft: string;
  xpReward: number;
  type: 'daily' | 'weekly' | 'special';
}

interface UserStats {
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  totalSaved: number;
  badgesEarned: number;
  rank: string;
}

export default function AIGameModal({ isOpen, onClose, onNavigate }: AIGameModalProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [showCelebration, setShowCelebration] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  const userStats: UserStats = {
    level: 7,
    xp: 2450,
    xpToNext: 800,
    streak: 12,
    totalSaved: 1847,
    badgesEarned: 8,
    rank: 'Money Ninja'
  };

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Receipt Scanner Pro',
      description: 'Scan 10 receipts in a week',
      icon: <Camera className="w-5 h-5" />,
      progress: 7,
      total: 10,
      xpReward: 100,
      unlocked: false,
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Savings Streak',
      description: 'Save money 7 days in a row',
      icon: <Flame className="w-5 h-5" />,
      progress: 12,
      total: 7,
      xpReward: 250,
      unlocked: true,
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Budget Master',
      description: 'Stay under budget for 3 consecutive months',
      icon: <Crown className="w-5 h-5" />,
      progress: 2,
      total: 3,
      xpReward: 500,
      unlocked: false,
      rarity: 'epic'
    },
    {
      id: '4',
      title: 'AI BFF',
      description: 'Chat with AI assistant 50 times',
      icon: <Heart className="w-5 h-5" />,
      progress: 47,
      total: 50,
      xpReward: 150,
      unlocked: false,
      rarity: 'common'
    }
  ];

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Skip the Latte',
      description: 'Avoid coffee shop purchases today',
      icon: <Coffee className="w-5 h-5" />,
      progress: 1,
      total: 1,
      timeLeft: '14h 23m',
      xpReward: 50,
      type: 'daily'
    },
    {
      id: '2',
      title: 'Fraud Detective',
      description: 'Run fraud detection check',
      icon: <Shield className="w-5 h-5" />,
      progress: 0,
      total: 1,
      timeLeft: '8h 45m',
      xpReward: 75,
      type: 'daily'
    },
    {
      id: '3',
      title: 'Goal Getter',
      description: 'Add $100 to any savings goal',
      icon: <Target className="w-5 h-5" />,
      progress: 0,
      total: 100,
      timeLeft: '2d 14h',
      xpReward: 200,
      type: 'weekly'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'bg-green-100 text-green-800';
      case 'weekly': return 'bg-blue-100 text-blue-800';
      case 'special': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const triggerCelebration = (achievement: Achievement) => {
    setNewAchievement(achievement);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const quickActions = [
    {
      title: 'Scan Receipt',
      subtitle: '+25 XP',
      icon: <Camera className="w-6 h-6" />,
      gradient: 'from-blue-500 to-cyan-500',
      action: () => onNavigate('ai-receipt-scanner')
    },
    {
      title: 'Fraud Check',
      subtitle: '+50 XP',
      icon: <Shield className="w-6 h-6" />,
      gradient: 'from-red-500 to-pink-500',
      action: () => onNavigate('ai-fraud-detection')
    },
    {
      title: 'Smart Savings',
      subtitle: '+100 XP',
      icon: <Coins className="w-6 h-6" />,
      gradient: 'from-green-500 to-emerald-500',
      action: () => onNavigate('ai-smart-savings')
    },
    {
      title: 'Budget Optimizer',
      subtitle: '+75 XP',
      icon: <TrendingUp className="w-6 h-6" />,
      gradient: 'from-purple-500 to-indigo-500',
      action: () => onNavigate('ai-budget-optimizer')
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-background rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 p-6 text-white">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16 border-4 border-white/30">
                <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xl">
                  🤖
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold">Money Buddy</h2>
              <p className="text-white/80 text-sm">Level {userStats.level} • {userStats.rank}</p>
              
              {/* XP Progress */}
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>{userStats.xp} XP</span>
                  <span>{userStats.xp + userStats.xpToNext} XP</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(userStats.xp / (userStats.xp + userStats.xpToNext)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="font-bold">{userStats.streak}</span>
              </div>
              <p className="text-xs text-white/70">Day Streak</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="font-bold">${userStats.totalSaved}</span>
              </div>
              <p className="text-xs text-white/70">Saved</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="font-bold">{userStats.badgesEarned}</span>
              </div>
              <p className="text-xs text-white/70">Badges</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-muted">
          {[
            { id: 'home', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'challenges', label: 'Challenges', icon: <Target className="w-4 h-4" /> },
            { id: 'achievements', label: 'Achievements', icon: <Trophy className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                activeTab === tab.id
                  ? 'bg-background text-foreground border-b-2 border-purple-500'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-h-[400px] overflow-y-auto">
          {activeTab === 'home' && (
            <div className="p-4 space-y-4">
              {/* Daily Reward */}
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Gift className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">Daily Reward Ready!</h3>
                        <p className="text-sm text-muted-foreground">Claim your 50 XP bonus</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600">
                      Claim
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={action.action}
                      >
                        <CardContent className="p-4">
                          <div className={`w-10 h-10 bg-gradient-to-r ${action.gradient} rounded-lg flex items-center justify-center mb-2`}>
                            <div className="text-white">{action.icon}</div>
                          </div>
                          <h4 className="font-medium text-sm">{action.title}</h4>
                          <p className="text-xs text-green-600 font-medium">{action.subtitle}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Active Challenges Preview */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-500" />
                    Today's Challenges
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('challenges')}>
                    View All
                  </Button>
                </div>
                <div className="space-y-2">
                  {challenges.filter(c => c.type === 'daily').slice(0, 2).map((challenge) => (
                    <Card key={challenge.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-blue-500">{challenge.icon}</div>
                            <div>
                              <h4 className="font-medium text-sm">{challenge.title}</h4>
                              <p className="text-xs text-muted-foreground">{challenge.timeLeft} left</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-green-600 font-medium">+{challenge.xpReward} XP</div>
                            {challenge.progress >= challenge.total && (
                              <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Recent Achievement */}
              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Flame className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">Achievement Unlocked!</h3>
                      <p className="text-sm text-muted-foreground">Savings Streak - 12 days 🔥</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="p-4 space-y-4">
              {['daily', 'weekly', 'special'].map((type) => (
                <div key={type}>
                  <h3 className="font-medium mb-3 capitalize flex items-center gap-2">
                    {type === 'daily' && <Clock className="w-4 h-4 text-green-500" />}
                    {type === 'weekly' && <Calendar className="w-4 h-4 text-blue-500" />}
                    {type === 'special' && <Star className="w-4 h-4 text-purple-500" />}
                    {type} Challenges
                  </h3>
                  <div className="space-y-3">
                    {challenges.filter(c => c.type === type).map((challenge) => (
                      <Card key={challenge.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${type === 'daily' ? 'bg-green-100 text-green-600' : type === 'weekly' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                                {challenge.icon}
                              </div>
                              <div>
                                <h4 className="font-medium">{challenge.title}</h4>
                                <p className="text-sm text-muted-foreground">{challenge.description}</p>
                                <Badge variant="secondary" className={`mt-1 ${getTypeColor(challenge.type)}`}>
                                  {challenge.timeLeft} left
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-green-600">+{challenge.xpReward} XP</div>
                              {challenge.progress >= challenge.total && (
                                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1" />
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Progress</span>
                              <span>{challenge.progress}/{challenge.total}</span>
                            </div>
                            <Progress 
                              value={(challenge.progress / challenge.total) * 100} 
                              className="h-2"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <Card 
                    key={achievement.id} 
                    className={`relative overflow-hidden ${achievement.unlocked ? 'border-green-200 bg-green-50' : ''}`}
                  >
                    <CardContent className="p-4">
                      <div className={`w-10 h-10 bg-gradient-to-r ${getRarityColor(achievement.rarity)} rounded-lg flex items-center justify-center mb-2 ${!achievement.unlocked ? 'grayscale' : ''}`}>
                        <div className="text-white">{achievement.icon}</div>
                      </div>
                      
                      <h4 className="font-medium text-sm mb-1">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{achievement.progress}/{achievement.total}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.total) * 100} 
                          className="h-1"
                        />
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className={`text-xs bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white border-0`}>
                            {achievement.rarity}
                          </Badge>
                          <span className="text-xs font-medium text-green-600">+{achievement.xpReward} XP</span>
                        </div>
                      </div>
                      
                      {achievement.unlocked && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Share Progress */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Share Your Progress</h3>
                      <p className="text-sm text-muted-foreground">Show off your financial wins!</p>
                    </div>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Celebration Animation */}
        <AnimatePresence>
          {showCelebration && newAchievement && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="bg-white rounded-2xl p-6 mx-4 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Achievement Unlocked! 🎉</h3>
                <h4 className="font-medium mb-1">{newAchievement.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{newAchievement.description}</p>
                <div className="text-green-600 font-medium">+{newAchievement.xpReward} XP Earned!</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}