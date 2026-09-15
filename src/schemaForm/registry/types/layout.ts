import type { LayoutPropsMap } from '../layouts';
import type { Action } from './action';
import type { BaseRegistryEntity, PropsField } from './base';
import type { Controller } from './controller';

export type LayoutChild = Layout | Controller | Action;

type LayoutFor<Name extends keyof LayoutPropsMap> = BaseRegistryEntity<'layout'> & {
  layout: Name;
  children: LayoutChild[];
} & PropsField<Omit<LayoutPropsMap[Name], 'children'>>;

export type Layout = {
  [Name in keyof LayoutPropsMap]: LayoutFor<Name>;
}[keyof LayoutPropsMap];
