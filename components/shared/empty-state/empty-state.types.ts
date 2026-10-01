import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';

export interface EmptyStateProps {
  icon: IconType;
  title: string;
  description?: string;
  action?: ReactNode;
}
