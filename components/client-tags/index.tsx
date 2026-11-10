 'use client';
import {useState,useId} from 'react';import {useGetClientTags,useReplaceClientTags} from '@/services/queries/client-tags';
import {Input} from '@/components/ui/input';import {Button} from '@/components/ui/button';import {Badge} from '@/components/ui/badge';import {Skeleton} from '@/components/ui/skeleton';import {ErrorText} from '@/components/shared/error-text';
const TagEditor=({clientId,tags}:{clientId:number;tags:string[]})=>{
 const [value,setValue]=useState(tags.join(', '));const inputId=useId();const mutation=useReplaceClientTags();
 return <form className="space-y-3" onSubmit={event=>{event.preventDefault();mutation.mutate({id:clientId,tags:value.trim()?value.split(','):[]});}}>
 <label htmlFor={inputId} className="text-sm font-medium">Теги клиента</label>
 <div className="flex flex-wrap gap-2">{tags.map(tag=><Badge key={tag} variant="secondary">{tag}</Badge>)}</div>
 <Input id={inputId} value={value} disabled={mutation.isPending} onChange={event=>setValue(event.target.value)} placeholder="vip, постоянный"/>
 <p className="text-xs text-muted-foreground">До 20 тегов через запятую, каждый до 32 символов</p>
 {mutation.error&&<ErrorText errorMessage={mutation.error.message}/>}
 <Button type="submit" variant="outline" disabled={mutation.isPending}>Сохранить теги</Button>
 </form>;
};
export const ClientTags=({clientId}:{clientId:number})=>{
 const query=useGetClientTags(clientId);if(query.isPending)return <Skeleton className="h-24 w-full"/>;if(query.error)return <ErrorText errorMessage={query.error.message}/>;
 return <TagEditor key={JSON.stringify(query.data)} clientId={clientId} tags={query.data}/>;
};
