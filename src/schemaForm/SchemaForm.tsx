
import { SchemaFormProvider, useSchemaForm } from './SchemaFormProvider';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { baseRegistry } from './registry/base-registry';
import type { Registry } from './registry/index.ts';
import { Renderer } from './uiSchema/index.ts';
import type { UiSchema } from './uiSchema/index.ts';
import type { ValidationSchemaProps } from './validation/index.ts';

type SchemaFormCommonProps<TFieldValues extends FieldValues> = {
  registry?: Registry;
  uiSchema: UiSchema;
  onSubmit?: SubmitHandler<TFieldValues>;
};

type SchemaFormProps<TFieldValues extends FieldValues = FieldValues> =
  SchemaFormCommonProps<TFieldValues> & ValidationSchemaProps<TFieldValues>;

const SchemaFormFields = () => {
  const { form, uiSchema, onSubmit } = useSchemaForm();
  const { handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit ?? (() => {}))}>
      <Renderer node={uiSchema} />
    </form>
  );
};

export function SchemaForm<TFieldValues extends FieldValues = FieldValues>(props: SchemaFormProps<TFieldValues>) {
  const { registry = baseRegistry, jsonSchema, uiSchema, resolver, onSubmit } = props
  const validationProps = { jsonSchema, resolver } as ValidationSchemaProps<TFieldValues>;

  return (
    <SchemaFormProvider<TFieldValues>
      {...validationProps}
      onSubmit={onSubmit}
      registry={registry}
      uiSchema={uiSchema}
    >
      <SchemaFormFields />
    </SchemaFormProvider>
  );
}
