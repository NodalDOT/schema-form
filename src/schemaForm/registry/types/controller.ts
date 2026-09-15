import type { ControllerPropsMap } from '../controllers';
import type { BaseRegistryEntity, PropsField } from './base';

type ControllerFor<Control extends keyof ControllerPropsMap> = BaseRegistryEntity<'controller'> & {
  control: Control;
  scope: string;
  label?: string;
} & PropsField<Omit<ControllerPropsMap[Control], 'name' | 'label' | 'control'>>;

export type Controller = {
  [Control in keyof ControllerPropsMap]: ControllerFor<Control>;
}[keyof ControllerPropsMap];
