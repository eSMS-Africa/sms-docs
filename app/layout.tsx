import { RootProvider } from 'fumadocs-ui/provider/next';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import type { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
  title: { default: 'eSMS Africa Docs', template: '%s - eSMS Africa' },
  description: 'Documentation for the eSMS Africa messaging platform.',
  icons: { icon: '/favicon.ico' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Google+Sans+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          theme={{ defaultTheme: 'light', enableSystem: true }}
          search={{ options: { type: 'static' } }}
        >
          <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
