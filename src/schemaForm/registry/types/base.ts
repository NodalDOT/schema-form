export type BaseRegistryEntity<Type extends string = string> = {
  type: Type;
}

type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T];

export type PropsField<T> = RequiredKeys<T> extends never ? { props?: T } : { props: T };
