import Ajv, { type SchemaObject, type ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: false });
addFormats(ajv);

const validators = new WeakMap<SchemaObject, ValidateFunction>();

function getValidator(schema: SchemaObject): ValidateFunction {
  const cached = validators.get(schema);
  if (cached) return cached;

  const validate = ajv.compile(schema);
  validators.set(schema, validate);
  return validate;
}

export function matchesCondition(schema: SchemaObject, value: unknown): boolean {
  return Boolean(getValidator(schema)(value));
}
