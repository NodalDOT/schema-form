import type { ActionPropsMap } from '../actions';
import type { BaseRegistryEntity, PropsField } from './base';

type ActionFor<Type extends keyof ActionPropsMap> = BaseRegistryEntity<'action'> & {
  actionType: Type;
  label: string;
} & PropsField<Omit<ActionPropsMap[Type], 'label' | 'disabled'>>;

export type Action = {
  [Type in keyof ActionPropsMap]: ActionFor<Type>;
}[keyof ActionPropsMap];
