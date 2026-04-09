import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import ErrorBoundary from '../components/ErrorBoundary';

const TestComponent = () => <div>Test Render Successful</div>;

describe('Core Setup', () => {
  it('AuthProvider renders children correctly', () => {
    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(getByText('Test Render Successful')).toBeInTheDocument();
  });

  it('ErrorBoundary catches no error on normal render', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );
    expect(getByText('Test Render Successful')).toBeInTheDocument();
  });
});
