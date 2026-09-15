import type { Action } from './action';
import type { Controller } from './controller';
import type { Layout } from './layout';

export type { BaseRegistryEntity } from './base';
export type { Action } from './action';
export type { Controller } from './controller';
export type { Layout } from './layout';


export type RegistryItem = Action | Controller | Layout;

export type Registry = {
  layout: Layout[];
  controllers: Controller[];
  actions: Action[];
}
