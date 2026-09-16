
import { createContext, useContext, useMemo } from 'react';
import { baseRegistry, type Registry } from './registry/index.ts';
import type { ActionOf, ControllerOf, LayoutOf } from './registry/types/index.ts';
import { useForm, type FieldValues, type SubmitHandler, type UseFormProps, type UseFormReturn } from 'react-hook-form';
import type { SchemaObject } from 'ajv';
import { ajvResolverRu, getDefaultValues, type ValidationSchemaProps } from './validation/index.ts';

type SchemaFormContextValue<TFieldValues extends FieldValues = FieldValues, TRegistry extends Registry = Registry> = {
  registry: TRegistry;
  uiSchema: LayoutOf<ControllerOf<TRegistry> | ActionOf<TRegistry>>;
  onSubmit?: SubmitHandler<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
  jsonSchema?: SchemaObject;
};


export const SchemaFormContext = createContext<SchemaFormContextValue<any, any> | null>(null);

type SchemaFormProviderCommonProps<TFieldValues extends FieldValues, TRegistry extends Registry> = {
  children: React.ReactNode;
  registry?: TRegistry;
  uiSchema: LayoutOf<ControllerOf<TRegistry> | ActionOf<TRegistry>>;
  onSubmit?: SubmitHandler<TFieldValues>;
  mode?: UseFormProps<TFieldValues>['mode'];
};

type SchemaFormProviderProps<TFieldValues extends FieldValues = FieldValues, TRegistry extends Registry = Registry> =
  SchemaFormProviderCommonProps<TFieldValues, TRegistry> & ValidationSchemaProps<TFieldValues>;

export function SchemaFormProvider<
  TFieldValues extends FieldValues = FieldValues,
  TRegistry extends Registry = Registry,
>(props: SchemaFormProviderProps<TFieldValues, TRegistry>) {
  const { children, onSubmit, registry = baseRegistry as TRegistry, uiSchema, mode = 'onChange' } = props
  const form = useForm({
    resolver: props.resolver ?? ajvResolverRu<TFieldValues>(props.jsonSchema),
    defaultValues: props.jsonSchema ? getDefaultValues(props.jsonSchema) : undefined,
    mode,
  })
  const contextValue = useMemo<SchemaFormContextValue<TFieldValues, TRegistry>>(
    () => ({
      registry,
      uiSchema,
      onSubmit,
      form,
      jsonSchema: props.jsonSchema,
    }),
    [registry, uiSchema, onSubmit, form, props.jsonSchema],
  );

  return (
    <SchemaFormContext.Provider value={contextValue}>
      {children}
    </SchemaFormContext.Provider>
  );
}

export const useSchemaForm = <
  TFieldValues extends FieldValues = FieldValues,
  TRegistry extends Registry = Registry,
>() => {
  const context = useContext(SchemaFormContext);
  if(!context) throw new Error('useSchemaForm must be used within a SchemaFormProvider');
  return context as SchemaFormContextValue<TFieldValues, TRegistry>;
}
