import {beforeEach,it,expect,vi} from 'vitest';
import api from '..';import {getCompanyReport} from '.';
vi.mock('..',async(original)=>({...await original<typeof import('..')>(),default:{get:vi.fn()}}));
beforeEach(()=>vi.resetAllMocks());
it('loads report totals using the requested company and range',async()=>{
 const signal=new AbortController().signal;vi.mocked(api.get).mockResolvedValue({data:{company_id:3,summary:{revenue:42}}});
 await expect(getCompanyReport(3,'from','to',signal)).resolves.toMatchObject({summary:{revenue:42}});
 expect(api.get).toHaveBeenCalledWith('/companies/3/report',{params:{from:'from',to:'to'},signal});
});
