'use client';
import { useRouter } from 'next/navigation';
import { LuClock, LuGlobe, LuMapPin } from 'react-icons/lu';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/shared/error-text';
import { ConfirmDeleteButton } from '@/components/shared/confirm-delete-button';
import { SocialLinks } from '@/components/social-links';
import { useGetCompany } from '@/services/queries/companies';
import { useDeleteCompany } from '@/services/mutations/companies';
import { getInitials } from '@/utils';
import { DEFAULT_TIMEZONE } from '@/utils/date';
import type { CompanyInfoProps } from './company-info.types';

export const CompanyInfo = ({ companyId }: CompanyInfoProps) => {
  const router = useRouter();
  const { data: company, isPending, error } = useGetCompany(companyId);
  const { mutate: deleteCompany, isPending: isDeleting } = useDeleteCompany();

  if (isPending) return <Skeleton className="h-64 w-full" />;
  if (error) return <ErrorText errorMessage={error.message} />;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="lg:col-span-2">
        <CardContent className="flex items-center gap-4">
          <Avatar className="size-16 rounded-xl">
            <AvatarImage src={company.logo} alt={company.name} />
            <AvatarFallback className="rounded-xl text-lg">
              {getInitials(company.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 space-y-1">
            <h1 className="truncate text-2xl font-bold tracking-tight">
              {company.name}
            </h1>
            <Badge variant="secondary">
              {company.timezone || DEFAULT_TIMEZONE}
            </Badge>
          </div>
          <ConfirmDeleteButton
            title={`Удалить «${company.name}»?`}
            description="Удалятся сотрудники, услуги, клиенты и все записи компании. Это действие нельзя отменить."
            isPending={isDeleting}
            onConfirm={() =>
              deleteCompany(companyId, {
                onSuccess: () => router.push('/dashboard'),
              })
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Адрес и график</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="flex items-start gap-2">
            <LuMapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            {company.address || 'Адрес не указан'}
          </p>
          <p className="flex items-start gap-2 whitespace-pre-line">
            <LuClock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            {company.schedule || 'График не указан'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Сайт и соцсети</CardTitle>
          <CardDescription>
            Их увидят клиенты на странице записи
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          {company.site && (
            <a
              href={company.site}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              <LuGlobe className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{company.site}</span>
            </a>
          )}
          <SocialLinks socials={company.socials} />
          {!company.site && !company.socials && (
            <p className="text-muted-foreground">Ничего не указано</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
