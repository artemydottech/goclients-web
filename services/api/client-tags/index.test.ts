import {it,expect,vi} from 'vitest';import api from '..';import {getClientTags,replaceClientTags} from '.';
vi.mock('..',async(original)=>({...await original<typeof import('..')>(),default:{get:vi.fn(),put:vi.fn()}}));
it('loads cancellable tags and clears with an explicit array',async()=>{
 const signal=new AbortController().signal;vi.mocked(api.get).mockResolvedValue({data:['vip']});
 await expect(getClientTags(7,signal)).resolves.toEqual(['vip']);expect(api.get).toHaveBeenCalledWith('/clients/7/tags',{signal});
 await replaceClientTags({id:7,tags:[]});expect(api.put).toHaveBeenCalledWith('/clients/7/tags',{tags:[]});
});
