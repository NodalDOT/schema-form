
import { SchemaFormProvider, useSchemaForm } from './SchemaFormProvider';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { baseRegistry } from './registry/base-registry';
import type { Registry } from './registry/index.ts';
import type { ActionOf, ControllerOf, LayoutOf } from './registry/types/index.ts';
import { Renderer } from './uiSchema/index.ts';
import type { ValidationSchemaProps } from './validation/index.ts';

type SchemaFormCommonProps<TFieldValues extends FieldValues, TRegistry extends Registry> = {
  registry?: TRegistry;
  uiSchema: LayoutOf<ControllerOf<TRegistry> | ActionOf<TRegistry>>;
  onSubmit?: SubmitHandler<TFieldValues>;
};

type SchemaFormProps<TFieldValues extends FieldValues = FieldValues, TRegistry extends Registry = Registry> =
  SchemaFormCommonProps<TFieldValues, TRegistry> & ValidationSchemaProps<TFieldValues>;

const SchemaFormFields = () => {
  const { form, uiSchema, onSubmit } = useSchemaForm();
  const { handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit ?? (() => {}))}>
      <Renderer node={uiSchema} />
    </form>
  );
};

export function SchemaForm<
  TFieldValues extends FieldValues = FieldValues,
  TRegistry extends Registry = Registry,
>(props: SchemaFormProps<TFieldValues, TRegistry>) {
  const { registry = baseRegistry as TRegistry, uiSchema, onSubmit, ...validationProps } = props

  return (
    <SchemaFormProvider<TFieldValues, TRegistry>
      {...validationProps}
      onSubmit={onSubmit}
      registry={registry}
      uiSchema={uiSchema}
    >
      <SchemaFormFields />
    </SchemaFormProvider>
  );
}
