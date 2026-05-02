'use client';
import { Tabs as FumaTabs, TabsList, TabsTrigger } from 'fumadocs-ui/components/tabs';
import type { ComponentProps, ReactNode } from 'react';

const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const TerminalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const di = (name: string) => (
  <img src={`${DI}/${name}/${name}-original.svg`} width={14} height={14} alt="" aria-hidden style={{ flexShrink: 0 }} />
);

const langIcon: Record<string, ReactNode> = {
  curl:       <TerminalIcon />,
  bash:       <TerminalIcon />,
  shell:      <TerminalIcon />,
  terminal:   <TerminalIcon />,
  python:     di('python'),
  'node.js':  <img src={`${DI}/nodejs/nodejs-original.svg`}    width={14} height={14} alt="" aria-hidden style={{ flexShrink: 0 }} />,
  node:       <img src={`${DI}/nodejs/nodejs-original.svg`}    width={14} height={14} alt="" aria-hidden style={{ flexShrink: 0 }} />,
  javascript: di('javascript'),
  js:         di('javascript'),
  typescript: di('typescript'),
  ts:         di('typescript'),
  php:        di('php'),
  ruby:       di('ruby'),
  go:         <img src={`${DI}/go/go-original-wordmark.svg`}   width={14} height={14} alt="" aria-hidden style={{ flexShrink: 0 }} />,
  java:       di('java'),
  rust:       di('rust'),
  swift:      di('swift'),
  kotlin:     di('kotlin'),
  'c#':       <img src={`${DI}/csharp/csharp-original.svg`}   width={14} height={14} alt="" aria-hidden style={{ flexShrink: 0 }} />,
  csharp:     <img src={`${DI}/csharp/csharp-original.svg`}   width={14} height={14} alt="" aria-hidden style={{ flexShrink: 0 }} />,
};

function escapeValue(v: string) {
  return v.toLowerCase().replace(/\s/, '-');
}

type TabsProps = ComponentProps<typeof FumaTabs>;

export function Tabs({ items, defaultIndex = 0, ...props }: TabsProps) {
  const defaultValue = items ? escapeValue(items[defaultIndex]) : undefined;

  return (
    <FumaTabs
      defaultValue={defaultValue}
      {...props}
    >
      {items && (
        <TabsList>
          {items.map((item) => {
            const icon = langIcon[item.toLowerCase()];
            return (
              <TabsTrigger key={item} value={escapeValue(item)}>
                {icon}
                {item}
              </TabsTrigger>
            );
          })}
        </TabsList>
      )}
      {props.children}
    </FumaTabs>
  );
}
