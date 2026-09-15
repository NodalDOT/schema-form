import type { SchemaObject } from 'ajv';

export type RuleEffect = 'HIDE' | 'SHOW' | 'DISABLE' | 'ENABLE';

export type Rule = {
  effect: RuleEffect;
  condition: {
    scope: string;
    schema: SchemaObject;
  };
};
