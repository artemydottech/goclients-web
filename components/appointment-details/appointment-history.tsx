 'use client';
import {useGetAppointmentHistory} from '@/services/queries/appointment-history';import {inCompanyTimezone} from '@/utils/date';import {STATUS_LABELS} from '@/utils/appointments';import {ErrorText} from '@/components/shared/error-text';
const labels={created:'Запись создана',status:'Изменён статус',rescheduled:'Запись перенесена',comment:'Изменён комментарий'};
export const AppointmentHistory=({id,timezone}:{id:number;timezone:string})=>{
 const query=useGetAppointmentHistory(id);
 return <details className="space-y-3 rounded-lg border p-3"><summary className="cursor-pointer text-sm font-medium">История изменений</summary>
 {query.isPending?<p className="text-sm text-muted-foreground">Загрузка истории…</p>:query.error?<ErrorText errorMessage={query.error.message}/>:query.data.length===0?<p className="text-sm text-muted-foreground">Изменений пока нет</p>:<ol className="max-h-60 space-y-3 overflow-y-auto text-sm">{query.data.map(event=><li key={event.id} className="space-y-1 border-l-2 pl-3">
 <p className="font-medium">{labels[event.kind]}</p><time dateTime={event.occurred_at} className="text-xs text-muted-foreground">{inCompanyTimezone(event.occurred_at,timezone).format('D MMMM YYYY, HH:mm')}</time>
 {event.kind==='status'&&<p>{event.before&&STATUS_LABELS[event.before.status]} → {STATUS_LABELS[event.after.status]}</p>}
 {event.kind==='rescheduled'&&<p>{event.before&&inCompanyTimezone(event.before.starts_at,timezone).format('D MMM, HH:mm')} → {inCompanyTimezone(event.after.starts_at,timezone).format('D MMM, HH:mm')}</p>}
 {event.kind==='comment'&&<p className="whitespace-pre-wrap">{event.after.comment||'Комментарий очищен'}</p>}
 </li>)}</ol>}</details>;
};
