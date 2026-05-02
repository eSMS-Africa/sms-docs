import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { iconHandler } from './icons';

export const source = loader({
  baseUrl: '/',
  source: docs.toFumadocsSource(),
  icon: iconHandler,
});
