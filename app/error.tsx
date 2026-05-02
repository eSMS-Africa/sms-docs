'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center flex-1 min-h-[60vh] px-6 text-center">
      <div className="mb-6 text-5xl select-none">⚠</div>
      <h1 className="text-2xl font-semibold mb-2 text-fd-foreground">This page couldn't load</h1>
      <p className="text-fd-muted-foreground mb-8 max-w-sm">
        Something went wrong on our end. Reload to try again, or go back.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg bg-fd-foreground text-fd-background px-4 py-2 text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer"
        >
          Reload
        </button>
        <a
          href="/docs"
          className="inline-flex items-center gap-2 rounded-lg border border-fd-border px-4 py-2 text-sm font-medium text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground transition-colors"
        >
          Back
        </a>
      </div>
    </div>
  );
}
