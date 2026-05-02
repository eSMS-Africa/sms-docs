import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 min-h-[60vh] px-6 text-center">
      <div className="mb-6 text-6xl select-none">404</div>
      <h1 className="text-2xl font-semibold mb-2 text-fd-foreground">Page not found</h1>
      <p className="text-fd-muted-foreground mb-8 max-w-sm">
        This page doesn't exist or may have been moved. Try searching, or head back to the docs.
      </p>
      <div className="flex gap-3">
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 rounded-lg bg-fd-foreground text-fd-background px-4 py-2 text-sm font-medium hover:opacity-80 transition-opacity"
        >
          Go to docs
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-fd-border px-4 py-2 text-sm font-medium text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground transition-colors"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
