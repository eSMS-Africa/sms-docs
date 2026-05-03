import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Steps, Step } from 'fumadocs-ui/components/steps';
import { Tab } from 'fumadocs-ui/components/tabs';
import { Callout } from 'fumadocs-ui/components/callout';
import { Tabs } from './code-tabs';
import { TransactionFlow, FXConversion, DiagramNote, MessageLifecycle } from './TransactionFlow';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Steps,
    Step,
    Tabs,
    Tab,
    Callout,
    TransactionFlow,
    FXConversion,
    DiagramNote,
    MessageLifecycle,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
