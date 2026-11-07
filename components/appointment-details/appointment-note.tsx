 'use client';
import {useId,useState} from 'react';import {useUpdateAppointmentComment} from '@/services/mutations/appointments';
import {Textarea} from '@/components/ui/textarea';import {Button} from '@/components/ui/button';
import {ErrorText} from '@/components/shared/error-text';
export const AppointmentNote=({id,comment}:{id:number;comment:string})=>{
 const [value,setValue]=useState(comment);const mutation=useUpdateAppointmentComment();const inputId=useId();
 return <form className="space-y-2" onSubmit={event=>{event.preventDefault();mutation.mutate({id,comment:value});}}>
 <label htmlFor={inputId} className="text-sm font-medium">Комментарий</label>
 <Textarea id={inputId} value={value} maxLength={1000} disabled={mutation.isPending} onChange={event=>setValue(event.target.value)}/>
 {mutation.error&&<ErrorText errorMessage={mutation.error.message}/>}
 <Button type="submit" size="sm" variant="outline" disabled={mutation.isPending||value===comment}>{mutation.isPending?'Сохранение…':'Сохранить комментарий'}</Button>
 </form>;
};
