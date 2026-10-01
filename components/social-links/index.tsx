import type { IconType } from 'react-icons';
import { FaTelegram, FaViber, FaVk, FaWhatsapp } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import type { SocialNetwork } from '@/types';
import { buildSocialUrl, SOCIAL_LABELS } from '@/utils/socials';
import type { SocialLinksProps } from './social-links.types';

const SOCIAL_ICONS: Record<SocialNetwork, IconType> = {
  vk: FaVk,
  telegram: FaTelegram,
  whatsapp: FaWhatsapp,
  viber: FaViber,
};

const isSocialNetwork = (key: string): key is SocialNetwork =>
  key in SOCIAL_ICONS;

export const SocialLinks = ({ socials }: SocialLinksProps) => {
  const entries = Object.entries(socials ?? {}).filter(
    (entry): entry is [SocialNetwork, string] =>
      isSocialNetwork(entry[0]) && Boolean(entry[1]),
  );

  if (entries.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {entries.map(([network, value]) => {
        const Icon = SOCIAL_ICONS[network];
        return (
          <Button key={network} variant="outline" size="sm" asChild>
            <a
              href={buildSocialUrl(network, value)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon className="size-4" />
              {SOCIAL_LABELS[network]}
            </a>
          </Button>
        );
      })}
    </div>
  );
};
