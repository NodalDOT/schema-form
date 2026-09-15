import { actions } from './actions/index.ts';
import { controllers } from './controllers/index.ts';
import { layouts } from './layouts/index.ts';
import type { Registry } from './types/index.ts';

export const baseRegistry: Registry = {
  controllers,
  layouts,
  actions,
};
