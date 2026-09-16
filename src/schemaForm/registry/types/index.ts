import type { ActionsRegistry } from '../actions/index.ts';
import type { ControllersRegistry } from '../controllers/index.ts';
import type { LayoutsRegistry } from '../layouts/index.ts';
import type { ActionOf } from './action';
import type { ControllerOf } from './controller';
import type { LayoutChildOf, LayoutOf } from './layout';

export type { BaseRegistryEntity, ComponentMap, RegistryMaps } from './base';
export type { ActionOf } from './action';
export type { ControllerOf } from './controller';
export type { LayoutOf, LayoutChildOf } from './layout';

export type Registry = {
  controllers: ControllersRegistry;
  layouts: LayoutsRegistry;
  actions: ActionsRegistry;
}

export type Controller = ControllerOf<Registry>;
export type Action = ActionOf<Registry>;
export type Layout = LayoutOf<Controller | Action>;
export type LayoutChild = LayoutChildOf<Controller | Action>;

export type RegistryItem = Action | Controller | Layout;
