import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[60vh] flex items-center justify-center p-8">
          <div className="max-w-md w-full text-center space-y-8">
            {/* Animated error icon */}
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-destructive/20 rounded-3xl blur-xl animate-pulse" />
              <div className="relative w-24 h-24 rounded-3xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-destructive" />
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-black tracking-tight">Something went wrong</h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                An unexpected error occurred. This has been logged and we're working on a fix.
              </p>
              {this.state.error && (
                <p className="text-[11px] font-mono text-destructive/70 bg-destructive/5 p-3 rounded-xl border border-destructive/10 mt-4 break-all">
                  {this.state.error.message}
                </p>
              )}
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={this.handleRetry}
                className="rounded-xl font-bold gap-2"
              >
                <RefreshCw className="h-4 w-4" /> Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="rounded-xl font-bold"
              >
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
