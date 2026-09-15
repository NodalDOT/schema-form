import type { Action } from './action';
import type { Controller } from './controller';
import type { Layout } from './layout';
import type { ActionsRegistry } from '../actions/index.ts';
import type { ControllersRegistry } from '../controllers/index.ts';
import type { LayoutsRegistry } from '../layouts/index.ts';

export type { BaseRegistryEntity } from './base';
export type { Action } from './action';
export type { Controller } from './controller';
export type { Layout } from './layout';


export type RegistryItem = Action | Controller | Layout;

export type Registry = {
  controllers: ControllersRegistry;
  layouts: LayoutsRegistry;
  actions: ActionsRegistry;
}
