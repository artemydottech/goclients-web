import type { StatusScreenProps } from './status-screen.types';

export const StatusScreen = ({
  code,
  title,
  description,
  actions,
}: StatusScreenProps) => (
  <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
    <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
      {code}
    </p>
    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
    <p className="text-muted-foreground">{description}</p>
    <div className="mt-2 flex flex-col gap-2 sm:flex-row">{actions}</div>
  </div>
);
