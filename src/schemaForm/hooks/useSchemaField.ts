import type { SchemaObject } from 'ajv';
import { useSchemaForm } from '../SchemaFormProvider';

export function getSchemaAtPath(schema: SchemaObject | undefined, name: string): SchemaObject | undefined {
  if (!schema || !name) return schema;

  return name.split('.').reduce<SchemaObject | undefined>((current, segment) => {
    if (!current) return undefined;
    return /^\d+$/.test(segment) ? current.items : current.properties?.[segment];
  }, schema);
}

export function useSchemaField(name: string): SchemaObject | undefined {
  const { jsonSchema } = useSchemaForm();
  return getSchemaAtPath(jsonSchema, name);
}
