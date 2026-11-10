 'use client';
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';import {getClientTags,replaceClientTags} from '@/services/api/client-tags';
export const useGetClientTags=(id:number)=>useQuery({queryKey:['get-client-tags',id],queryFn:({signal})=>getClientTags(id,signal)});
export const useReplaceClientTags=()=>{const client=useQueryClient();return useMutation({mutationFn:replaceClientTags,meta:{successMessage:'Теги сохранены',hasInlineError:true},onSuccess:()=>Promise.all([client.invalidateQueries({queryKey:['get-client-tags']}),client.invalidateQueries({queryKey:['get-clients']})])});};
