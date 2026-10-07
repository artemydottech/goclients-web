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

  describe('whatsapp and viber', () => {
    it('keeps only digits for whatsapp', () => {
      expect(buildSocialUrl('whatsapp', '+7 (900) 123-45-67')).toBe(
        'https://wa.me/79001234567',
      );
    });

    it('keeps only digits for viber', () => {
      expect(buildSocialUrl('viber', '+7 900 123-45-67')).toBe(
        'viber://chat?number=79001234567',
      );
    });
  });

  describe('vk', () => {
    it('keeps a full link as is', () => {
      expect(buildSocialUrl('vk', 'https://vk.com/salon')).toBe(
        'https://vk.com/salon',
      );
    });

    it('adds a protocol to a bare link', () => {
      expect(buildSocialUrl('vk', 'vk.com/salon')).toBe('https://vk.com/salon');
    });
  });
});
