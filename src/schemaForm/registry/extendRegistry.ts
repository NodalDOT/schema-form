import type { ComponentMap, Registry } from './types/index.ts';

type RegistryOverrides = {
  controllers?: ComponentMap;
  layouts?: ComponentMap;
  actions?: ComponentMap;
};

export function extendRegistry<TBase extends Registry, TOverrides extends RegistryOverrides>(
  base: TBase,
  overrides: TOverrides,
): {
  controllers: TBase['controllers'] & TOverrides['controllers'];
  layouts: TBase['layouts'] & TOverrides['layouts'];
  actions: TBase['actions'] & TOverrides['actions'];
} {
  return {
    controllers: { ...base.controllers, ...overrides.controllers },
    layouts: { ...base.layouts, ...overrides.layouts },
    actions: { ...base.actions, ...overrides.actions },
  };
}
