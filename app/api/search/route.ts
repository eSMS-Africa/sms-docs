import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// statically pre-rendered at build time - no Node.js server needed
export const revalidate = false;
export const { staticGET: GET } = createFromSource(source);
