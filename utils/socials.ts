import type { SocialNetwork } from '@/types';
import { onlyDigits } from '.';

export const SOCIAL_LABELS: Record<SocialNetwork, string> = {
  vk: 'ВКонтакте',
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
  viber: 'Viber',
};

const withProtocol = (value: string): string =>
  /^https?:\/\//.test(value) ? value : `https://${value}`;

export const buildSocialUrl = (
  network: SocialNetwork,
  value: string,
): string => {
  switch (network) {
    case 'telegram':
      return value.startsWith('@')
        ? `https://t.me/${value.slice(1)}`
        : withProtocol(value);
    case 'whatsapp':
      return `https://wa.me/${onlyDigits(value)}`;
    case 'viber':
      return `viber://chat?number=${onlyDigits(value)}`;
    case 'vk':
      return withProtocol(value);
  }
};
