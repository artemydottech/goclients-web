 'use client';
import {useId,useState} from 'react';import Link from 'next/link';import {useGetServices} from '@/services/queries/services';import {useGetAvailability} from '@/services/queries/availability';
import {getCompanyToday,inCompanyTimezone} from '@/utils/date';import {Input} from '@/components/ui/input';import {ErrorText} from '@/components/shared/error-text';import {Skeleton} from '@/components/ui/skeleton';
export const QuickAvailability=({companyId,timezone}:{companyId:number;timezone:string})=>{
 const [serviceId,setServiceId]=useState(0);const [date,setDate]=useState('');const selectId=useId();const dateId=useId();const services=useGetServices(companyId);
 const currentDate=date||getCompanyToday(timezone);const results=useGetAvailability(serviceId,{date:currentDate,days:7,step:15,limit:12});
 return <section className="space-y-3 rounded-xl border p-4"><h2 className="font-semibold">Ближайшее свободное время</h2>
 <div className="flex flex-wrap gap-3"><div className="space-y-1"><label htmlFor={selectId} className="text-sm">Услуга</label>
 <select id={selectId} value={serviceId} onChange={event=>setServiceId(Number(event.target.value))} className="block h-9 rounded-md border bg-background px-3"><option value={0}>Выберите услугу</option>{services.data?.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
 <div className="space-y-1"><label htmlFor={dateId} className="text-sm">Начиная с</label><Input id={dateId} type="date" value={currentDate} onChange={event=>setDate(event.target.value)}/></div></div>
 {services.error&&<ErrorText errorMessage={services.error.message}/>}
 {serviceId>0&&(results.isPending?<Skeleton className="h-20 w-full"/>:results.error?<ErrorText errorMessage={results.error.message}/>:results.data?.length===0?<p className="text-sm text-muted-foreground">На ближайшие 7 дней свободного времени нет</p>:<ul className="grid gap-2 sm:grid-cols-2">{results.data?.map(slot=>{
 const at=inCompanyTimezone(slot.starts_at,timezone);return <li key={slot.employee_id+':'+slot.starts_at} className="flex items-center justify-between gap-3 rounded-md bg-muted p-3 text-sm"><span>{at.format('D MMMM, HH:mm')} · {slot.employee_name}</span><Link className="underline" href={`/dashboard/${companyId}/appointments?date=${at.format('YYYY-MM-DD')}`}>В календарь</Link></li>})}</ul>)}
 </section>;
};
