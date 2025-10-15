// AI Configuration Screen for API key management

import { useState, useEffect } from 'react';
import { ArrowLeft, Brain, Key, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { useAI } from '../hooks/useAI';
import { toast } from 'sonner';

interface AIConfigurationScreenProps {
  onBack: () => void;
}

export default function AIConfigurationScreen({ onBack }: AIConfigurationScreenProps) {
  const [apiKey, setApiKey] = useState('');
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const { isInitialized, hasAPIKey, error, initialize, clearError } = useAI();

  useEffect(() => {
    // Load existing API key from localStorage
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter an API key');
      return;
    }

    if (!apiKey.startsWith('sk-')) {
      toast.error('OpenAI API keys should start with "sk-"');
      return;
    }

    try {
      setIsTestingConnection(true);
      
      // Save to localStorage
      localStorage.setItem('openai_api_key', apiKey);
      
      // Set environment variable for the session
      (process.env as any).REACT_APP_OPENAI_API_KEY = apiKey;
      
      // Reinitialize AI service
      await initialize();
      
      toast.success('API key saved and tested successfully!');
    } catch (error) {
      toast.error('Failed to validate API key. Please check and try again.');
      console.error('API key validation failed:', error);
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem('openai_api_key');
    delete (process.env as any).REACT_APP_OPENAI_API_KEY;
    setApiKey('');
    toast.success('API key removed. AI will use local processing.');
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.substring(0, 8) + '•'.repeat(key.length - 12) + key.substring(key.length - 4);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <h1 className="text-xl font-semibold text-foreground">AI Configuration</h1>
          
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* AI Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              AI Service Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Service Status</span>
              <Badge variant={isInitialized ? "default" : "secondary"}>
                {isInitialized ? 'Initialized' : 'Not Initialized'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">API Integration</span>
              <Badge variant={hasAPIKey ? "default" : "outline"}>
                {hasAPIKey ? 'OpenAI Connected' : 'Local Processing'}
              </Badge>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Error</p>
                  <p className="text-sm text-red-600">{error}</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={clearError}
                    className="mt-2"
                  >
                    Clear Error
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* API Key Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-green-600" />
              OpenAI API Key
            </CardTitle>
            <CardDescription>
              Configure your OpenAI API key for enhanced AI features like smart categorization and insights.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              {apiKey && (
                <p className="text-xs text-muted-foreground">
                  Current key: {maskApiKey(apiKey)}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleSaveApiKey}
                disabled={isTestingConnection || !apiKey.trim()}
                className="flex-1"
              >
                {isTestingConnection ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Testing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Save & Test
                  </>
                )}
              </Button>
              
              {hasAPIKey && (
                <Button 
                  variant="outline" 
                  onClick={handleRemoveApiKey}
                >
                  Remove
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium">With OpenAI API Key:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Advanced transaction categorization</li>
                <li>• Personalized financial insights</li>
                <li>• Smart spending predictions</li>
                <li>• Budget optimization recommendations</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Without API Key (Local Processing):</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Basic rule-based categorization</li>
                <li>• Simple spending analysis</li>
                <li>• Limited insights generation</li>
                <li>• All processing happens locally</li>
              </ul>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Privacy:</strong> Your API key is stored locally and never shared. 
                All AI requests are made directly from your browser to OpenAI.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Getting API Key */}
        <Card>
          <CardHeader>
            <CardTitle>Getting an OpenAI API Key</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ol className="text-sm space-y-2">
              <li>1. Visit <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">platform.openai.com/api-keys</a></li>
              <li>2. Sign in or create an OpenAI account</li>
              <li>3. Click "Create new secret key"</li>
              <li>4. Copy the key and paste it above</li>
              <li>5. Add billing information to your OpenAI account</li>
            </ol>
            
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> OpenAI API usage incurs costs. Typical usage for personal finance 
                management is very low (usually under $1/month).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}