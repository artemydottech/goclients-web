import axios from 'axios';import api,{handleApiError} from '..';
export const getCsv=async(path:string,params:Record<string,string|number>,signal?:AbortSignal):Promise<Blob>=>{
 try{const {data}=await api.get<Blob>(path,{params,signal,responseType:'blob'});return data;}
 catch(error){
 if(axios.isAxiosError(error)&&error.response?.data instanceof Blob){
 const text=await error.response.data.text();try{error.response.data=JSON.parse(text);}catch{error.response.data=text;}}
 throw handleApiError(error,'Не удалось скачать CSV');
 }
};
export const saveCsv=(blob:Blob,filename:string)=>{
 const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=filename;
 document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
