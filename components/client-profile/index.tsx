'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LuArrowLeft, LuMail, LuPhone } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { ConfirmDeleteButton } from '@/components/shared/confirm-delete-button';
import { useGetClient } from '@/services/queries/clients';
import { useDeleteClient } from '@/services/mutations/clients';
import { formatPhone } from '@/utils';
import type { ClientProfileProps } from './client-profile.types';

export const ClientProfile = ({ companyId, clientId }: ClientProfileProps) => {
  const router = useRouter();
  const { data: client, isPending, error } = useGetClient(clientId);
  const { mutate: deleteClient, isPending: isDeleting } = useDeleteClient();
  const listUrl = `/dashboard/${companyId}/clients`;

  if (isPending) return <Skeleton className="h-28 w-full" />;
  if (error) return <ErrorText errorMessage={error.message} />;

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link href={listUrl}>
          <LuArrowLeft className="size-4" />
          Все клиенты
        </Link>
      </Button>
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1 space-y-2">
          <h1 className="truncate text-2xl font-bold tracking-tight">
            {client.name}
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
            <a
              href={`tel:+${client.phone}`}
              className="flex items-center gap-1.5 hover:text-foreground"
            >
              <LuPhone className="size-4" />
              {formatPhone(client.phone)}
            </a>
            {client.email && (
              <a
                href={`mailto:${client.email}`}
                className="flex items-center gap-1.5 hover:text-foreground"
              >
                <LuMail className="size-4" />
                {client.email}
              </a>
            )}
          </div>
          {client.comment && (
            <p className="rounded-lg bg-muted px-3 py-2 text-sm">
              {client.comment}
            </p>
          )}
        </div>
        <ConfirmDeleteButton
          title={`Удалить клиента ${client.name}?`}
          description="Вместе с клиентом удалится история его записей."
          isPending={isDeleting}
          onConfirm={() =>
            deleteClient(clientId, { onSuccess: () => router.push(listUrl) })
          }
        />
      </div>
    </div>
  );
};
