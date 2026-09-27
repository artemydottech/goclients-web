'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { isApiError } from '@/services/api';

const MAX_RETRIES = 2;

const shouldRetry = (failureCount: number, error: Error): boolean => {
  if (isApiError(error) && error.status !== null && error.status < 500) {
    return false;
  }
  return failureCount < MAX_RETRIES;
};

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: shouldRetry },
    },
  });

export function QueryClientProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState(createQueryClient);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
