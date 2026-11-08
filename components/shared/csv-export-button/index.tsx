'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getCsv, saveCsv } from '@/services/api/exports';
export const CsvExportButton = ({
  path,
  params,
  filename,
}: {
  path: string;
  params: Record<string, string | number>;
  filename: string;
}) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  return (
    <div className="space-y-1">
      <Button
        type="button"
        variant="outline"
        disabled={pending}
        onClick={async () => {
          setPending(true);
          setError('');
          try {
            saveCsv(await getCsv(path, params), filename);
          } catch (error) {
            setError(
              error instanceof Error ? error.message : 'Не удалось скачать CSV',
            );
          } finally {
            setPending(false);
          }
        }}
      >
        {pending ? 'Подготовка CSV…' : 'Скачать CSV'}
      </Button>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};
