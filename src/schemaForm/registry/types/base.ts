import type { Rule } from '../../rules/index.ts';

export type BaseRegistryEntity<Type extends string = string> = {
  type: Type;
  readOnly?: boolean;
  disabled?: boolean;
  rule?: Rule;
}

type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T];

export type PropsField<T> = RequiredKeys<T> extends never ? { props?: T } : { props: T };
