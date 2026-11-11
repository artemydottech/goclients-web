import {it,expect,vi} from 'vitest';import api from '..';import {getAvailability} from '.';
vi.mock('..',async(original)=>({...await original<typeof import('..')>(),default:{get:vi.fn()}}));
it('requests bounded service availability with cancellation',async()=>{
 const signal=new AbortController().signal;vi.mocked(api.get).mockResolvedValue({data:[]});const params={date:'2027-01-01',days:7,limit:20};
 await expect(getAvailability(3,params,signal)).resolves.toEqual([]);expect(api.get).toHaveBeenCalledWith('/services/3/availability',{params,signal});
});
