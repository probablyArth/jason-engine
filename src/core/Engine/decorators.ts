import type { Engine } from './index';

export function ensureInitialized(
  target: Engine,
  _: string,
  __: PropertyDescriptor,
) {
  if (typeof target.metadata === 'undefined') {
    throw new Error('Engine not');
  }
}
