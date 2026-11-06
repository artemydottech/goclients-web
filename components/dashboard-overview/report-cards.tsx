 'use client';
import {useGetCompanyReport} from '@/services/queries/reports';
import {Skeleton} from '@/components/ui/skeleton';import {ErrorText} from '@/components/shared/error-text';
import {formatPrice} from '@/utils';import dayjs from '@/lib/dayjs';import {MetricCard} from './metric-card';
export const ReportCards=({companyId,timezone}:{companyId:number;timezone:string})=>{
 const today=dayjs().tz(timezone).startOf('day');
 const daily=useGetCompanyReport(companyId,today.format(),today.add(1,'day').format());
 const weekly=useGetCompanyReport(companyId,today.subtract(6,'day').format(),today.add(1,'day').format());
 const upcoming=useGetCompanyReport(companyId,today.format(),today.add(14,'day').format());
 const error=daily.error??weekly.error??upcoming.error;
 if(error)return <ErrorText errorMessage={error.message}/>;
 if(!daily.data||!weekly.data||!upcoming.data)return <Skeleton className="h-32 w-full"/>;
 return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
 <MetricCard label="Записей сегодня" value={String(daily.data.summary.active)} hint="Активные записи"/>
 <MetricCard label="Ожидаемая выручка сегодня" value={formatPrice(daily.data.summary.expected_revenue)} hint="По ценам на момент записи"/>
 <MetricCard label="Выручка за 7 дней" value={formatPrice(weekly.data.summary.revenue)} hint={`Завершённых визитов: ${weekly.data.summary.completed}`}/>
 <MetricCard label="Впереди записей" value={String(upcoming.data.summary.active)} hint="Сегодня и ближайшие 14 дней"/>
 </div>;
};
