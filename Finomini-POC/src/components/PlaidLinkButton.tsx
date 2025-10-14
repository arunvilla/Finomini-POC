// Plaid Link Button component for connecting bank accounts

import React from 'react';
import { usePlaidLinkHook } from '../hooks/usePlaidLink';
import { Button } from './ui/button';
import { Loader2, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface PlaidLinkButtonProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg';
  children?: React.ReactNode;
}

export const PlaidLinkButton: React.FC<PlaidLinkButtonProps> = ({
  onSuccess,
  onError,
  className,
  variant = 'default',
  size = 'default',
  children,
}) => {
  const {
    open,
    ready,
    error,
    isLoading,
    isConnected,
    connectedInstitutions,
  } = usePlaidLinkHook();

  // Handle successful connection
  React.useEffect(() => {
    if (isConnected && onSuccess) {
      onSuccess();
    }
  }, [isConnected, onSuccess]);

  // Handle errors
  React.useEffect(() => {
    if (error && onError) {
      onError(error.message);
    }
  }, [error, onError]);

  const handleClick = () => {
    if (ready && !isLoading) {
      open();
    }
  };

  const getButtonText = () => {
    if (isLoading) return 'Connecting...';
    if (!ready) return 'Initializing...';
    if (isConnected) return 'Add Another Account';
    return 'Connect Bank Account';
  };

  const getButtonIcon = () => {
    if (isLoading || !ready) {
      return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
    }
    if (isConnected) {
      return <CheckCircle className="mr-2 h-4 w-4" />;
    }
    return <CreditCard className="mr-2 h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleClick}
        disabled={!ready || isLoading}
        variant={variant}
        size={size}
        className={className}
      >
        {getButtonIcon()}
        {children || getButtonText()}
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error.message}
            {error.recoverable && (
              <span className="block mt-1 text-sm">
                Please try again or contact support if the problem persists.
              </span>
            )}
          </AlertDescription>
        </Alert>
      )}

      {isConnected && connectedInstitutions.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-green-600">
            Connected Accounts ({connectedInstitutions.length})
          </p>
          <div className="space-y-1">
            {connectedInstitutions.map((institution) => (
              <div
                key={institution.accessToken}
                className="flex items-center justify-between p-2 bg-green-50 rounded-md"
              >
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm font-medium">
                    {institution.institutionName}
                  </span>
                </div>
                {institution.lastSynced && (
                  <span className="text-xs text-gray-500">
                    Last synced: {institution.lastSynced.toLocaleDateString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaidLinkButton;