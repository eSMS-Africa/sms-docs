'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const AUTH_API = 'https://auth.esmsafrica.io';
const SESSION_KEY = 'esms_vsid';
const SOURCE = 'docs';

function post(path: string, data: object) {
  try {
    fetch(`${AUTH_API}${path}`, {
      method: 'POST',
      body: JSON.stringify(data),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

function getSessionId(): string {
  try {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, sid);
      post('/track/session', {
        session_id: sid,
        referrer: document.referrer || null,
        utm_source: new URLSearchParams(location.search).get('utm_source') || SOURCE,
        utm_medium: new URLSearchParams(location.search).get('utm_medium') || 'docs',
        utm_campaign: new URLSearchParams(location.search).get('utm_campaign'),
      });
    }
    return sid;
  } catch {
    return '';
  }
}

export function Tracker() {
  const pathname = usePathname();
  const prevPath = useRef('');
  const enteredAt = useRef(0);

  // Page view tracking on route change
  useEffect(() => {
    const sid = getSessionId();
    if (!sid) return;
    const now = Date.now();

    // Record duration on the previous page
    if (prevPath.current && enteredAt.current) {
      post('/track/pageview', {
        session_id: sid,
        path: prevPath.current,
        duration_ms: now - enteredAt.current,
      });
    }

    // Record entry on the new page
    post('/track/pageview', {
      session_id: sid,
      path: pathname,
      referrer: document.referrer || null,
    });

    prevPath.current = pathname;
    enteredAt.current = now;
  }, [pathname]);

  // Click tracking
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const sid = getSessionId();
      if (!sid) return;
      const el = e.target as HTMLElement;

      // Explicit data-track wins
      const tracked = el.closest('[data-track]') as HTMLElement | null;
      if (tracked) {
        post('/track/click', {
          session_id: sid,
          label: tracked.dataset.track || tracked.textContent?.trim().slice(0, 100) || 'unknown',
          path: location.pathname,
        });
        return;
      }

      // Capture link and button clicks
      const btn = el.closest('a[href], button') as HTMLElement | null;
      if (!btn) return;
      const href = (btn as HTMLAnchorElement).href;
      const label = href
        ? `link: ${href.replace(location.origin, '') || '/'}`
        : `btn: ${btn.textContent?.trim().slice(0, 80) || btn.getAttribute('aria-label') || 'unknown'}`;
      post('/track/click', { session_id: sid, label, path: location.pathname });
    }

    document.addEventListener('click', handleClick, { capture: false });
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
