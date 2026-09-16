import type { RegistryEntityOf, RegistryMaps } from './base';

export type ActionOf<TRegistry extends RegistryMaps> = RegistryEntityOf<
  'action',
  TRegistry['actions'],
  'actionType',
  { label: string },
  'label' | 'disabled'
>;
