import api,{handleApiError} from '..';
export interface ReportGroup {id:number;name:string;appointments:number;completed:number;revenue:number}
export interface CompanyReport {
 company_id:number;from:string;to:string;
 summary:{appointments:number;active:number;completed:number;cancelled:number;no_shows:number;unique_clients:number;revenue:number;expected_revenue:number};
 services:ReportGroup[];employees:ReportGroup[];
}
export const getCompanyReport=async(companyId:number,from:string,to:string,signal?:AbortSignal):Promise<CompanyReport>=>{
 try {const {data}=await api.get<CompanyReport>(`/companies/${companyId}/report`,{params:{from,to},signal});return data;}
 catch(error){throw handleApiError(error,'Не удалось загрузить отчёт');}
};
