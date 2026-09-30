'use client';
import Link from 'next/link';
import { toast } from 'sonner';
import { LuCopy, LuExternalLink } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { BookingLinkProps } from './booking-link.types';

export const BookingLink = ({ companyId }: BookingLinkProps) => {
  const path = `/book/${companyId}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${path}`);
      toast.success('Ссылка скопирована');
    } catch {
      toast.error('Не удалось скопировать ссылку');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Онлайн-запись</CardTitle>
        <CardDescription>
          Отправьте ссылку клиентам или поставьте её в соцсети
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <code className="flex-1 truncate rounded-md bg-muted px-3 py-2 text-sm">
          {path}
        </code>
        <div className="flex gap-2">
          <Button variant="outline" onClick={copyLink}>
            <LuCopy className="size-4" />
            Скопировать
          </Button>
          <Button variant="outline" asChild>
            <Link href={path} target="_blank">
              <LuExternalLink className="size-4" />
              Открыть
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
