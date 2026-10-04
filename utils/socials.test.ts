import { describe, expect, it } from 'vitest';
import { buildSocialUrl } from './socials';

describe('buildSocialUrl', () => {
  describe('telegram', () => {
    it('builds a t.me link from a handle', () => {
      expect(buildSocialUrl('telegram', '@salon')).toBe('https://t.me/salon');
    });

    it('adds a protocol to a bare link', () => {
      expect(buildSocialUrl('telegram', 't.me/salon')).toBe(
        'https://t.me/salon',
      );
    });
  });
});
