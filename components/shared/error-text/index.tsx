import { LuCircleAlert } from 'react-icons/lu';
import type { ErrorTextProps } from './error-text.types';

export const ErrorText = ({ errorMessage }: ErrorTextProps) => (
  <div
    role="alert"
    className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
  >
    <LuCircleAlert className="size-4 shrink-0" />
    {errorMessage}
  </div>
);
