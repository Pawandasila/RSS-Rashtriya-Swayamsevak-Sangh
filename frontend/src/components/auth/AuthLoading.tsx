"use client";
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/use-auth';

interface AuthLoadingProps {
  children: ReactNode;
  fallback?: ReactNode;
}


export const AuthLoading: React.FC<AuthLoadingProps> = ({
  children,
  fallback = (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  ),
}) => {
  const { loading, initialized } = useAuth();

  if (loading || !initialized) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};