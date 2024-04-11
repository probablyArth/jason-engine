import type { Engine } from 'engine';

export function ensureInitialized(
  target: Engine,
  _: string,
  __: PropertyDescriptor,
) {
  if (typeof target.metadata === 'undefined') {
    throw new Error('Engine not');
  }
}
