import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <img src="/logo.png" alt="eSMS Africa" width={28} height={28} />
          <span className="font-semibold text-sm">eSMS Africa</span>
        </>
      ),
    },
    githubUrl: 'https://github.com/eSMS-Africa/sms-docs',
    links: [
      { text: 'Dashboard', url: 'https://sms.esmsafrica.io', external: true },
    ],
  };
}
