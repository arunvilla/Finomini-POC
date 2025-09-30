import { ArrowLeft, Gift, MapPin, CreditCard, TrendingUp, Clock, Star, ExternalLink, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface AIMerchantCashbackScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export default function AIMerchantCashbackScreen({ onBack, onNavigate }: AIMerchantCashbackScreenProps) {
  const [activatedOffers, setActivatedOffers] = useState<string[]>([]);

  const cashbackOpportunities = [
    {
      id: '1',
      merchant: 'Target',
      offer: '5% cashback',
      category: 'Groceries & Household',
      validUntil: 'Dec 31, 2024',
      maxCashback: 50,
      yourSpending: 120,
      potentialEarnings: 6,
      confidence: 95,
      distance: '0.3 miles',
      card: 'Chase Freedom',
      description: 'Earn 5% back on all purchases up to $1,000',
      terms: 'Valid on in-store and online purchases',
      logo: '🎯',
      isActive: true,
      reason: 'You spent $120 at Target last month'
    },
    {
      id: '2',
      merchant: 'Whole Foods',
      offer: '10% cashback',
      category: 'Groceries',
      validUntil: 'Dec 29, 2024',
      maxCashback: 25,
      yourSpending: 85,
      potentialEarnings: 8.5,
      confidence: 88,
      distance: '1.2 miles',
      card: 'Amazon Prime Card',
      description: 'Special promotion for Prime members',
      terms: 'Amazon Prime membership required',
      logo: '🥬',
      isActive: true,
      reason: 'You shop here weekly for organic produce'
    },
    {
      id: '3',
      merchant: 'Starbucks',
      offer: '4% cashback',
      category: 'Coffee & Dining',
      validUntil: 'Jan 15, 2025',
      maxCashback: 20,
      yourSpending: 65,
      potentialEarnings: 2.6,
      confidence: 92,
      distance: '0.1 miles',
      card: 'Chase Sapphire',
      description: 'Bonus points on all Starbucks purchases',
      terms: 'Valid at participating locations',
      logo: '☕',
      isActive: false,
      reason: 'Your morning coffee routine matches this offer'
    },
    {
      id: '4',
      merchant: 'Shell Gas Station',
      offer: '3% cashback',
      category: 'Gas & Fuel',
      validUntil: 'Dec 28, 2024',
      maxCashback: 30,
      yourSpending: 200,
      potentialEarnings: 6,
      confidence: 78,
      distance: '0.5 miles',
      card: 'Citi Double Cash',
      description: 'Extra cashback on fuel purchases',
      terms: 'Pay with registered card at pump',
      logo: '⛽',
      isActive: true,
      reason: 'You fill up here twice weekly'
    }
  ];

  const totalPotentialEarnings = cashbackOpportunities
    .filter(offer => offer.isActive)
    .reduce((sum, offer) => sum + offer.potentialEarnings, 0);

  const handleActivateOffer = (offerId: string) => {
    setActivatedOffers(prev => [...prev, offerId]);
  };

  const handleViewOnMap = (merchant: string) => {
    // Implementation to show merchant location on map
    alert(`Opening map for ${merchant}`);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-50';
    if (confidence >= 80) return 'text-yellow-600 bg-yellow-50';
    return 'text-orange-600 bg-orange-50';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-0 h-8 w-8"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-medium">Cashback Opportunities</h1>
            <p className="text-sm text-muted-foreground">AI-discovered deals near you</p>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            ${totalPotentialEarnings.toFixed(2)} Available
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary Card */}
        <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Gift className="w-6 h-6 text-green-600" />
              <div>
                <h2 className="font-medium text-green-800">Active Opportunities</h2>
                <p className="text-sm text-green-600">Based on your spending patterns</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-lg text-green-800">${totalPotentialEarnings.toFixed(2)}</div>
              <div className="text-sm text-green-600">Potential Earnings</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-2 bg-white/50 rounded-lg">
              <div className="font-medium text-green-800">{cashbackOpportunities.filter(o => o.isActive).length}</div>
              <div className="text-xs text-green-600">Active Offers</div>
            </div>
            <div className="text-center p-2 bg-white/50 rounded-lg">
              <div className="font-medium text-green-800">92%</div>
              <div className="text-xs text-green-600">Avg Confidence</div>
            </div>
            <div className="text-center p-2 bg-white/50 rounded-lg">
              <div className="font-medium text-green-800">0.5mi</div>
              <div className="text-xs text-green-600">Avg Distance</div>
            </div>
          </div>
        </Card>

        {/* Cashback Opportunities */}
        <div className="space-y-3">
          {cashbackOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className={`p-4 ${!opportunity.isActive ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{opportunity.logo}</div>
                  <div>
                    <h3 className="font-medium">{opportunity.merchant}</h3>
                    <p className="text-sm text-muted-foreground">{opportunity.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-lg text-green-600">{opportunity.offer}</div>
                  <Badge className={getConfidenceColor(opportunity.confidence)} variant="secondary">
                    {opportunity.confidence}% Match
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-sm text-muted-foreground mb-1">AI Insight:</div>
                  <div className="text-sm font-medium">{opportunity.reason}</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Your Monthly Spending</div>
                    <div className="font-medium">${opportunity.yourSpending}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Potential Earnings</div>
                    <div className="font-medium text-green-600">+${opportunity.potentialEarnings}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{opportunity.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CreditCard className="w-3 h-3" />
                      <span>{opportunity.card}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Until {opportunity.validUntil}</span>
                  </div>
                </div>

                <div className="text-sm">
                  <div className="font-medium mb-1">{opportunity.description}</div>
                  <div className="text-muted-foreground">{opportunity.terms}</div>
                </div>

                <div className="flex gap-2">
                  {activatedOffers.includes(opportunity.id) ? (
                    <Button disabled className="flex-1" variant="secondary">
                      <Bell className="w-4 h-4 mr-2" />
                      Activated
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleActivateOffer(opportunity.id)}
                      className="flex-1"
                      disabled={!opportunity.isActive}
                    >
                      <Gift className="w-4 h-4 mr-2" />
                      Activate Offer
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    onClick={() => handleViewOnMap(opportunity.merchant)}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    View Location
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tips & Insights */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Maximize Your Earnings</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <div className="font-medium">Stack Your Rewards</div>
                <div className="text-muted-foreground">
                  Combine credit card cashback with store loyalty programs for maximum returns.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <div className="font-medium">Time Your Purchases</div>
                <div className="text-muted-foreground">
                  Some offers have spending caps - spread large purchases across multiple months.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Bell className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <div className="font-medium">Optimize Your Cards</div>
                <div className="text-muted-foreground">
                  <Button variant="link" className="p-0 h-auto text-blue-600" onClick={() => onNavigate('ai-credit-card-optimizer')}>
                    View card optimization recommendations
                  </Button> for maximum cashback potential.
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Settings */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Notification Preferences</h3>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Location-based alerts</span>
              <Badge variant="secondary">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>New offer notifications</span>
              <Badge variant="secondary">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Expiring offers reminder</span>
              <Badge variant="secondary">24h before</Badge>
            </div>
          </div>
        </Card>

        {/* Test Navigation */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Credit Card Tools</h3>
          <div className="space-y-2">
            <Button size="sm" onClick={() => onNavigate('ai-credit-card-optimizer')} className="w-full">
              Optimize My Cards
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}