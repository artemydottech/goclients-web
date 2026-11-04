'use client';
import { useDeferredValue, useState } from 'react';
import Link from 'next/link';
import { LuContact, LuSearch } from 'react-icons/lu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { EmptyState } from '@/components/shared/empty-state';
import { useSearchClients } from '@/services/queries/clients';
import { formatPhone } from '@/utils';
import type { ClientsTableProps } from './clients-table.types';

export const ClientsTable = ({ companyId }: ClientsTableProps) => {
  const [query, setQuery] = useState('');
  const deferredQuery=useDeferredValue(query.trim());
 const { data: clients, isPending, error } = useSearchClients(companyId,deferredQuery);

  
  if (error) return <ErrorText errorMessage={error.message} />;

  if (!isPending && clients?.length === 0 && !query) {
    return (
      <EmptyState
        icon={LuContact}
        title="Клиентов пока нет"
        description="Клиенты появятся здесь после первой записи или если добавить их вручную."
      />
    );
  }

  const filtered = clients ?? [];

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <LuSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Имя, телефон или email"
          aria-label="Поиск клиентов"
          className="pl-9"
        />
      </div>

      {isPending ? <Skeleton className="h-64 w-full" /> : filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          Никого не нашли
        </p>
      ) : (
        <Card className="py-0">
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Клиент</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead className="hidden pr-6 md:table-cell">
                    Email
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="pl-6">
                      <Link
                        href={`/dashboard/${companyId}/clients/${client.id}`}
                        className="font-medium hover:underline"
                      >
                        {client.name}
                      </Link>
                      {client.comment && (
                        <p className="max-w-xs truncate text-xs text-muted-foreground">
                          {client.comment}
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="tabular-nums">
                      {formatPhone(client.phone)}
                    </TableCell>
                    <TableCell className="hidden pr-6 text-muted-foreground md:table-cell">
                      {client.email || '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
