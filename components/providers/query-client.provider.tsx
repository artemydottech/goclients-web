'use client';

import { useState } from 'react';
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { toast } from 'sonner';
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
    mutationCache: new MutationCache({
      onSuccess: (_data, _variables, _result, mutation) => {
        const message = mutation.meta?.successMessage;
        if (message) toast.success(message);
      },
      onError: (error, _variables, _result, mutation) => {
        if (!mutation.meta?.hasInlineError) toast.error(error.message);
      },
    }),
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
