import type { JSONSchemaType, SchemaObject } from 'ajv';
import type { DefaultValues, FieldValues } from 'react-hook-form';

function extractDefaults(schema: SchemaObject): FieldValues {
  if (schema.default !== undefined) {
    return schema.default;
  }

  if (schema.type !== 'object' || !schema.properties) {
    return {};
  }

  const defaults: FieldValues = {};

  for (const [key, propertySchema] of Object.entries(schema.properties as Record<string, SchemaObject>)) {
    if (propertySchema.default !== undefined) {
      defaults[key] = propertySchema.default;
    } else if (propertySchema.type === 'object' && propertySchema.properties) {
      const nested = extractDefaults(propertySchema);
      if (Object.keys(nested).length > 0) {
        defaults[key] = nested;
      }
    }
  }

  return defaults;
}

export function getDefaultValues<TFieldValues extends FieldValues>(
  schema: JSONSchemaType<TFieldValues>,
): DefaultValues<TFieldValues> {

  return extractDefaults(schema) as DefaultValues<TFieldValues>;
}
