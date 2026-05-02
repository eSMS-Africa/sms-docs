import type { ReactNode } from 'react';

const MONO = "'Google Sans Mono', ui-monospace, monospace";
const SANS = "'Google Sans', -apple-system, BlinkMacSystemFont, sans-serif";

// ─── TransactionFlow ─────────────────────────────────────────────────────────

interface TransactionFlowProps {
  before: string;
  after: string;
  currency?: string;
  action: string;
  /** Single string or array for multi-line calc */
  calc: string | string[];
  /** When true, "Balance after" label is green (top-up). Default: orange (deduction) */
  positive?: boolean;
  /** Optional key-value pairs shown as a footer row */
  footer?: { left: string; right: string };
}

export function TransactionFlow({
  before,
  after,
  currency = 'USD',
  action,
  calc,
  positive = false,
  footer,
}: TransactionFlowProps) {
  const calcLines = Array.isArray(calc) ? calc : [calc];
  const afterColor = positive ? '#34a47c' : '#c2410c';

  return (
    <div style={{ fontFamily: SANS, background: '#faf7f4', border: '1px solid #ece6de', borderRadius: 14, margin: '24px 0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '28px 32px', flexWrap: 'wrap', rowGap: 24 }}>

        {/* Before */}
        <div style={{ minWidth: 130, flex: '0 0 auto' }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#a39a8e', marginBottom: 8 }}>
            Balance before
          </div>
          <div style={{ fontSize: 28, fontWeight: 300, letterSpacing: '-0.02em', color: '#1f1b17', lineHeight: 1 }}>
            {before}{' '}
            <span style={{ fontSize: 13, color: '#a39a8e', fontWeight: 400 }}>{currency}</span>
          </div>
        </div>

        {/* Connector */}
        <div style={{ flex: '1 1 160px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 12 }}>
            <div style={{ flex: 1, height: 1, background: '#ddd5c9' }} />
            <svg style={{ margin: '0 12px', color: '#b0a89e', flexShrink: 0 }} width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <div style={{ flex: 1, height: 1, background: '#ddd5c9' }} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#3a332c', marginBottom: 6 }}>{action}</div>
            {calcLines.map((line, i) => (
              <div key={i} style={{ fontSize: 11, color: i === calcLines.length - 1 && calcLines.length > 1 ? '#1f1b17' : '#7a7269', fontFamily: MONO, fontWeight: i === calcLines.length - 1 && calcLines.length > 1 ? 600 : 400, marginTop: i > 0 ? 3 : 0 }}>
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* After */}
        <div style={{ minWidth: 130, flex: '0 0 auto', textAlign: 'right' }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: afterColor, marginBottom: 8 }}>
            Balance after
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', color: '#1f1b17', lineHeight: 1 }}>
            {after}{' '}
            <span style={{ fontSize: 13, color: '#a39a8e', fontWeight: 400 }}>{currency}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      {footer && (
        <div style={{ borderTop: '1px solid #ece6de', padding: '10px 32px', display: 'flex', justifyContent: 'space-between', background: '#ffffff' }}>
          <span style={{ fontSize: 10, fontFamily: MONO, color: '#b0a89e', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{footer.left}</span>
          <span style={{ fontSize: 10, fontFamily: MONO, color: '#b0a89e', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{footer.right}</span>
        </div>
      )}
    </div>
  );
}

// ─── FXConversion ─────────────────────────────────────────────────────────────
// For showing a currency conversion path without wallet before/after context.

interface FXStep {
  currency: string;
  amount: string;
  label?: string;
}

interface FXConversionProps {
  steps: FXStep[];
  footer?: { left: string; right: string };
  note?: string;
}

function ArrowRight() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#b0a89e', flexShrink: 0 }}>
      <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}

export function FXConversion({ steps, footer, note }: FXConversionProps) {
  return (
    <div style={{ fontFamily: SANS, background: '#faf7f4', border: '1px solid #ece6de', borderRadius: 14, margin: '24px 0', overflow: 'hidden' }}>
      <div style={{ padding: '28px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
          {steps.map((step, i) => (
            <>
              {/* Step box */}
              <div key={`step-${i}`} style={{ textAlign: 'center' }}>
                {step.label && (
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a39a8e', marginBottom: 6 }}>
                    {step.label}
                  </div>
                )}
                <div style={{ background: '#ffffff', border: '1px solid #ece6de', borderRadius: 10, padding: '12px 20px', display: 'inline-block' }}>
                  <span style={{ fontSize: 22, fontWeight: i === steps.length - 1 ? 600 : 300, letterSpacing: '-0.02em', color: '#1f1b17' }}>
                    {step.amount}
                  </span>
                  {' '}
                  <span style={{ fontSize: 12, color: '#a39a8e', fontWeight: 400 }}>{step.currency}</span>
                </div>
              </div>

              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <div key={`arrow-${i}`} style={{ display: 'flex', alignItems: 'center' }}>
                  <ArrowRight />
                </div>
              )}
            </>
          ))}
        </div>

        {note && (
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: '#7a7269', fontFamily: MONO }}>
            {note}
          </div>
        )}
      </div>

      {footer && (
        <div style={{ borderTop: '1px solid #ece6de', padding: '10px 32px', display: 'flex', justifyContent: 'space-between', background: '#ffffff' }}>
          <span style={{ fontSize: 10, fontFamily: MONO, color: '#b0a89e', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{footer.left}</span>
          <span style={{ fontSize: 10, fontFamily: MONO, color: '#b0a89e', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{footer.right}</span>
        </div>
      )}
    </div>
  );
}

// ─── DiagramNote ──────────────────────────────────────────────────────────────

export function DiagramNote({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontFamily: MONO, fontSize: 12, color: '#7a7269', background: '#faf7f4', border: '1px solid #ece6de', borderRadius: 8, padding: '10px 16px', margin: '8px 0' }}>
      {children}
    </div>
  );
}
