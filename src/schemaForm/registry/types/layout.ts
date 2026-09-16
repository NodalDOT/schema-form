import type { LayoutPropsMap } from '../layouts';
import type { BaseRegistryEntity, PropsField } from './base';

export type LayoutOf<TChild> = {
  [Name in keyof LayoutPropsMap]: BaseRegistryEntity<'layout'> & {
    layout: Name;
    children: LayoutChildOf<TChild>[];
  } & PropsField<Omit<LayoutPropsMap[Name], 'children'>>;
}[keyof LayoutPropsMap];

export type LayoutChildOf<TChild> = LayoutOf<TChild> | TChild;
