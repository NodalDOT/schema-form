import type { RegistryEntityOf, RegistryMaps } from './base';

export type ControllerOf<TRegistry extends RegistryMaps> = RegistryEntityOf<
  'controller',
  TRegistry['controllers'],
  'control',
  { scope: string; label?: string },
  'name' | 'label' | 'control' | 'readOnly' | 'disabled'
>;
