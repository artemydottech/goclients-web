import {it,expect} from 'vitest';import {createRequestKey} from './request-key';
it('keeps the same key for a retry and changes it when the request changes',()=>{
 const keys=createRequestKey();const first=keys.forPayload({client:1});expect(keys.forPayload({client:1})).toBe(first);
 expect(keys.forPayload({client:2})).not.toBe(first);keys.reset();expect(keys.forPayload({client:1})).not.toBe(first);
});
