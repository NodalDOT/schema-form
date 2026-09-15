import type { FieldValues, Resolver } from 'react-hook-form';
import type { JSONSchemaType } from 'ajv';

export type ValidationSchemaProps<TFieldValues extends FieldValues> =
  | { jsonSchema: JSONSchemaType<TFieldValues>; resolver?: undefined }
  | { jsonSchema?: undefined; resolver: Resolver<TFieldValues> };
