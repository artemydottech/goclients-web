import {it,expect,vi} from 'vitest';import api from '..';import {getAppointmentHistory} from '.';
vi.mock('..',async(original)=>({...await original<typeof import('..')>(),default:{get:vi.fn()}}));
it('loads a bounded and cancellable appointment timeline',async()=>{
 const signal=new AbortController().signal;vi.mocked(api.get).mockResolvedValue({data:[]});await expect(getAppointmentHistory(7,signal)).resolves.toEqual([]);
 expect(api.get).toHaveBeenCalledWith('/appointments/7/history',{params:{limit:50},signal});
});
