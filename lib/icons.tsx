import type { ReactNode } from 'react';
import { icons } from './icon-svgs';

/**
 * Map fumadocs meta.json icon names → marketing icon keys.
 * Allows meta.json files to use either the marketing camelCase names
 * directly (preferred) or legacy PascalCase aliases.
 */
const aliases: Record<string, keyof typeof icons> = {
  // Legacy PascalCase → marketing camelCase
  Send:       'send',
  Radio:      'nodesCircle',
  Users:      'team',
  Tag:        'senderIds',
  CreditCard: 'wallet',
  Key:        'apiKeys',
  Code:       'nodesSquare',
  HelpCircle: 'info',
  Terminal:   'terminal',
  Rocket:     'send',
};

export function iconHandler(name: string | undefined): ReactNode | undefined {
  if (!name) return undefined;

  // Resolve alias (PascalCase legacy) or use directly (camelCase marketing name)
  const key = (aliases[name] ?? name) as keyof typeof icons;
  const svg = icons[key];
  if (!svg) return undefined;

  // Inject width/height so the SVG scales to 16 × 16 inside the sidebar.
  // The marketing SVGs have viewBox="0 0 24 24" but no explicit size.
  const sized = svg.replace('<svg ', '<svg width="16" height="16" style="flex-shrink:0;display:block" ');

  return (
    <span
      aria-hidden="true"
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: sized }}
    />
  );
}
