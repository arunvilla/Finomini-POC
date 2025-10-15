// AI Configuration Screen for API key management

import { useState, useEffect } from 'react';
import { ArrowLeft, Brain, Key, CheckCircle2, AlertTriangle, Info, Zap, Settings, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { aiService } from '../services/ai/AIService';
import { toast } from 'sonner';

interface AIConfigurationScreenProps {
  onBack: () => void;
}

export default function AIConfigurationScreen({ onBack }: AIConfigurationScreenProps) {
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [anthropicApiKey, setAnthropicApiKey] = useState('');
  const [preferredProvider, setPreferredProvider] = useState<'openai' | 'anthropic' | 'local'>('local');
  const [openaiModel, setOpenaiModel] = useState('gpt-3.5-turbo');
  const [anthropicModel, setAnthropicModel] = useState('claude-3-haiku-20240307');
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  const [showAnthropicKey, setShowAnthropicKey] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [aiStatus, setAiStatus] = useState<any>(null);

  useEffect(() => {
    loadConfiguration();
    updateAIStatus();
  }, []);

  const loadConfiguration = () => {
    const savedOpenaiKey = localStorage.getItem('openai_api_key');
    const savedAnthropicKey = localStorage.getItem('anthropic_api_key');
    const savedProvider = localStorage.getItem('preferred_ai_provider') as 'openai' | 'anthropic' | 'local';
    const savedOpenaiModel = localStorage.getItem('openai_model');
    const savedAnthropicModel = localStorage.getItem('anthropic_model');

    if (savedOpenaiKey) setOpenaiApiKey(savedOpenaiKey);
    if (savedAnthropicKey) setAnthropicApiKey(savedAnthropicKey);
    if (savedProvider) setPreferredProvider(savedProvider);
    if (savedOpenaiModel) setOpenaiModel(savedOpenaiModel);
    if (savedAnthropicModel) setAnthropicModel(savedAnthropicModel);
  };

  const updateAIStatus = () => {
    const status = aiService.getStatus();
    setAiStatus(status);
  };

  const handleSaveConfiguration = async () => {
    try {
      setIsTestingConnection(true);
      
      // Validate API keys
      if (preferredProvider === 'openai' && !openaiApiKey.trim()) {
        toast.error('Please enter an OpenAI API key');
        return;
      }
      
      if (preferredProvider === 'anthropic' && !anthropicApiKey.trim()) {
        toast.error('Please enter an Anthropic API key');
        return;
      }

      if (openaiApiKey && !openaiApiKey.startsWith('sk-')) {
        toast.error('OpenAI API keys should start with "sk-"');
        return;
      }

      if (anthropicApiKey && !anthropicApiKey.startsWith('sk-ant-')) {
        toast.error('Anthropic API keys should start with "sk-ant-"');
        return;
      }

      // Save to localStorage
      if (openaiApiKey) localStorage.setItem('openai_api_key', openaiApiKey);
      if (anthropicApiKey) localStorage.setItem('anthropic_api_key', anthropicApiKey);
      localStorage.setItem('preferred_ai_provider', preferredProvider);
      localStorage.setItem('openai_model', openaiModel);
      localStorage.setItem('anthropic_model', anthropicModel);

      // Update AI service configuration
      aiService.updateConfig({
        openaiApiKey: openaiApiKey || undefined,
        anthropicApiKey: anthropicApiKey || undefined,
        openaiModel,
        anthropicModel
      });

      if (preferredProvider !== 'local') {
        aiService.setPreferredProvider(preferredProvider);
      }

      // Test the connection
      await aiService.initialize();
      
      updateAIStatus();
      toast.success('AI configuration saved and tested successfully!');
      
    } catch (error) {
      console.error('AI configuration failed:', error);
      toast.error(`Configuration failed: ${(error as Error).message}`);
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleTestConnection = async () => {
    try {
      setIsTestingConnection(true);
      
      // Test a simple categorization
      const result = await aiService.categorizeTransaction('Test transaction', 10.00);
      
      toast.success(`Connection test successful! Category: ${result.category} (${Math.round(result.confidence * 100)}% confidence)`);
      updateAIStatus();
      
    } catch (error) {
      console.error('Connection test failed:', error);
      toast.error(`Connection test failed: ${(error as Error).message}`);
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleClearConfiguration = () => {
    localStorage.removeItem('openai_api_key');
    localStorage.removeItem('anthropic_api_key');
    localStorage.removeItem('preferred_ai_provider');
    localStorage.removeItem('openai_model');
    localStorage.removeItem('anthropic_model');
    
    setOpenaiApiKey('');
    setAnthropicApiKey('');
    setPreferredProvider('local');
    setOpenaiModel('gpt-3.5-turbo');
    setAnthropicModel('claude-3-haiku-20240307');
    
    aiService.updateConfig({
      openaiApiKey: undefined,
      anthropicApiKey: undefined,
      openaiModel: 'gpt-3.5-turbo',
      anthropicModel: 'claude-3-haiku-20240307'
    });
    
    updateAIStatus();
    toast.success('AI configuration cleared');
  };

  const getProviderStatus = (provider: string) => {
    if (!aiStatus) return { color: 'secondary', text: 'Unknown' };
    
    switch (provider) {
      case 'openai':
        return aiStatus.hasOpenAI 
          ? { color: 'default', text: 'Configured' }
          : { color: 'secondary', text: 'Not configured' };
      case 'anthropic':
        return aiStatus.hasAnthropic 
          ? { color: 'default', text: 'Configured' }
          : { color: 'secondary', text: 'Not configured' };
      case 'local':
        return { color: 'outline', text: 'Always available' };
      default:
        return { color: 'secondary', text: 'Unknown' };
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fbfa] flex flex-col">
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

          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            <h1 className="text-lg font-semibold text-foreground">AI Configuration</h1>
          </div>

          <div className="w-10" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Current Status */}
        <Card className="border-[#eef8ee] shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              AI Service Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Current Provider</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={aiStatus?.preferredProvider === 'local' ? 'outline' : 'default'}>
                    {aiStatus?.preferredProvider || 'local'}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Status</Label>
                <div className="flex items-center gap-2 mt-1">
                  {aiStatus?.isInitialized ? (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Ready
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Not initialized
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleTestConnection}
                disabled={isTestingConnection}
                variant="outline"
                size="sm"
              >
                {isTestingConnection ? (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Zap className="h-4 w-4 mr-2" />
                )}
                Test Connection
              </Button>
              
              <Button
                onClick={handleClearConfiguration}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                Clear Config
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Configuration Tabs */}
        <Tabs value={preferredProvider} onValueChange={(value: string) => setPreferredProvider(value as 'openai' | 'anthropic' | 'local')} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#f7fcf7]">
            <TabsTrigger value="openai" className="text-sm">
              OpenAI
              <Badge variant={getProviderStatus('openai').color as any} className="ml-2 text-xs">
                {getProviderStatus('openai').text}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="anthropic" className="text-sm">
              Anthropic
              <Badge variant={getProviderStatus('anthropic').color as any} className="ml-2 text-xs">
                {getProviderStatus('anthropic').text}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="local" className="text-sm">
              Local Only
              <Badge variant={getProviderStatus('local').color as any} className="ml-2 text-xs">
                {getProviderStatus('local').text}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* OpenAI Configuration */}
          <TabsContent value="openai" className="space-y-4 mt-4">
            <Card className="border-[#eef8ee] shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-green-600" />
                  OpenAI Configuration
                </CardTitle>
                <CardDescription>
                  Configure OpenAI API for advanced AI-powered financial insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="openai-key">API Key</Label>
                  <div className="flex gap-2 mt-1">
                    <div className="relative flex-1">
                      <Input
                        id="openai-key"
                        type={showOpenaiKey ? "text" : "password"}
                        placeholder="sk-..."
                        value={openaiApiKey}
                        onChange={(e) => setOpenaiApiKey(e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowOpenaiKey(!showOpenaiKey)}
                      >
                        {showOpenaiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenAI Platform</a>
                  </p>
                </div>

                <div>
                  <Label htmlFor="openai-model">Model</Label>
                  <Select value={openaiModel} onValueChange={setOpenaiModel}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Recommended)</SelectItem>
                      <SelectItem value="gpt-4">GPT-4 (More accurate, slower)</SelectItem>
                      <SelectItem value="gpt-4-turbo-preview">GPT-4 Turbo (Latest)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">OpenAI Features:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Advanced transaction categorization</li>
                        <li>Intelligent spending insights</li>
                        <li>Cash flow predictions</li>
                        <li>Budget recommendations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Anthropic Configuration */}
          <TabsContent value="anthropic" className="space-y-4 mt-4">
            <Card className="border-[#eef8ee] shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-purple-600" />
                  Anthropic Configuration
                </CardTitle>
                <CardDescription>
                  Configure Anthropic Claude API for AI-powered financial analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="anthropic-key">API Key</Label>
                  <div className="flex gap-2 mt-1">
                    <div className="relative flex-1">
                      <Input
                        id="anthropic-key"
                        type={showAnthropicKey ? "text" : "password"}
                        placeholder="sk-ant-..."
                        value={anthropicApiKey}
                        onChange={(e) => setAnthropicApiKey(e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowAnthropicKey(!showAnthropicKey)}
                      >
                        {showAnthropicKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get your API key from <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Anthropic Console</a>
                  </p>
                </div>

                <div>
                  <Label htmlFor="anthropic-model">Model</Label>
                  <Select value={anthropicModel} onValueChange={setAnthropicModel}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="claude-3-haiku-20240307">Claude 3 Haiku (Fast & Affordable)</SelectItem>
                      <SelectItem value="claude-3-sonnet-20240229">Claude 3 Sonnet (Balanced)</SelectItem>
                      <SelectItem value="claude-3-opus-20240229">Claude 3 Opus (Most Capable)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-purple-600 mt-0.5" />
                    <div className="text-sm text-purple-800">
                      <p className="font-medium">Anthropic Features:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Detailed financial analysis</li>
                        <li>Contextual spending insights</li>
                        <li>Risk assessment</li>
                        <li>Personalized recommendations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Local Processing */}
          <TabsContent value="local" className="space-y-4 mt-4">
            <Card className="border-[#eef8ee] shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-gray-600" />
                  Local Processing
                </CardTitle>
                <CardDescription>
                  Use built-in algorithms without external API calls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-gray-600 mt-0.5" />
                    <div className="text-sm text-gray-800">
                      <p className="font-medium">Local Processing Features:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Basic transaction categorization</li>
                        <li>Simple spending pattern analysis</li>
                        <li>Rule-based insights</li>
                        <li>No API costs or external dependencies</li>
                        <li>Complete privacy - data never leaves your device</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Local processing is always available and requires no setup
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Configuration */}
        <div className="flex gap-3">
          <Button
            onClick={handleSaveConfiguration}
            disabled={isTestingConnection}
            className="flex-1"
            size="lg"
          >
            {isTestingConnection ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Key className="h-4 w-4 mr-2" />
            )}
            Save Configuration
          </Button>
        </div>

        {/* Usage Tips */}
        <Card className="bg-[#fef1e6] border-[#f5c4a0] shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-[#904204] mt-0.5" />
              <div className="text-sm text-[#904204]">
                <p className="font-medium mb-2">💡 Pro Tips:</p>
                <ul className="space-y-1">
                  <li>• Start with local processing to test the app without API costs</li>
                  <li>• OpenAI GPT-3.5 Turbo offers the best balance of speed and accuracy</li>
                  <li>• Anthropic Claude excels at detailed financial analysis</li>
                  <li>• API keys are stored locally and never shared</li>
                  <li>• The app automatically falls back to local processing if APIs fail</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}