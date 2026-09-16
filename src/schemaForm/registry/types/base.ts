import type { ComponentProps, ComponentType } from 'react';
import type { Rule } from '../../rules/index.ts';

export type BaseRegistryEntity<Type extends string = string> = {
  type: Type;
  readOnly?: boolean;
  disabled?: boolean;
  rule?: Rule;
}

export type ComponentMap = Record<string, ComponentType<any>>;

export type RegistryMaps = {
  controllers: ComponentMap;
  actions: ComponentMap;
};

type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T];

export type PropsField<T> = RequiredKeys<T> extends never ? { props?: T } : { props: T };

export type RegistryEntityOf<
  Kind extends string,
  TMap extends ComponentMap,
  DiscriminantKey extends string,
  ExtraFields,
  ExcludedProps extends string,
> = {
  [Name in keyof TMap]: BaseRegistryEntity<Kind>
    & Record<DiscriminantKey, Name>
    & ExtraFields
    & PropsField<Omit<ComponentProps<TMap[Name]>, ExcludedProps>>;
}[keyof TMap];
