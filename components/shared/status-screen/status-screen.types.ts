import type { ReactNode } from 'react';

export interface StatusScreenProps {
  code: string;
  title: string;
  description: string;
  actions: ReactNode;
}
