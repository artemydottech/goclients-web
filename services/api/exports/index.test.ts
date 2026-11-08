import {beforeEach,it,expect,vi} from 'vitest';import api from '..';import {getCsv} from '.';import {buildAxiosError} from '../test-utils';
vi.mock('..',async(original)=>({...await original<typeof import('..')>(),default:{get:vi.fn()}}));
beforeEach(()=>vi.resetAllMocks());
it('requests a cancellable blob download',async()=>{
 const signal=new AbortController().signal;const blob=new Blob(['id\n1']);vi.mocked(api.get).mockResolvedValue({data:blob});
 await expect(getCsv('/clients/export',{company_id:7},signal)).resolves.toBe(blob);
 expect(api.get).toHaveBeenCalledWith('/clients/export',{params:{company_id:7},signal,responseType:'blob'});
});
it('decodes JSON errors returned as blobs',async()=>{
 vi.mocked(api.get).mockRejectedValue(buildAxiosError(400,new Blob([JSON.stringify({error:'invalid period'})])));
 await expect(getCsv('/appointments/export',{company_id:7})).rejects.toMatchObject({status:400,message:expect.stringContaining('invalid period')});
});
