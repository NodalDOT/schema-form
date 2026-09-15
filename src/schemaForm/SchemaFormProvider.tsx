
import { createContext, useContext, useMemo } from 'react';
import { baseRegistry, type Registry } from './registry/index.ts';
import { useForm, type FieldValues, type SubmitHandler, type UseFormProps, type UseFormReturn } from 'react-hook-form';
import type { SchemaObject } from 'ajv';
import type { UiSchema } from './uiSchema/index.ts';
import { ajvResolverRu, getDefaultValues, type ValidationSchemaProps } from './validation/index.ts';

type SchemaFormContextValue<TFieldValues extends FieldValues = FieldValues> = {
  registry: Registry;
  uiSchema: UiSchema;
  onSubmit?: SubmitHandler<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
  jsonSchema?: SchemaObject;
};


export const SchemaFormContext = createContext<SchemaFormContextValue | null>(null);

type SchemaFormProviderCommonProps<TFieldValues extends FieldValues> = {
  children: React.ReactNode;
  registry?: Registry;
  uiSchema: UiSchema;
  onSubmit?: SubmitHandler<TFieldValues>;
  mode?: UseFormProps<TFieldValues>['mode'];
};

type SchemaFormProviderProps<TFieldValues extends FieldValues = FieldValues> =
  SchemaFormProviderCommonProps<TFieldValues> & ValidationSchemaProps<TFieldValues>;

export function SchemaFormProvider<TFieldValues extends FieldValues = FieldValues>(props: SchemaFormProviderProps<TFieldValues>) {
  const { children, onSubmit, registry = baseRegistry, uiSchema, mode = 'onChange' } = props
  const form = useForm({
    resolver: props.resolver ?? ajvResolverRu<TFieldValues>(props.jsonSchema),
    defaultValues: props.jsonSchema ? getDefaultValues(props.jsonSchema) : undefined,
    mode,
  })
  const contextValue = useMemo<SchemaFormContextValue<TFieldValues>>(
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
    <SchemaFormContext.Provider value={contextValue as SchemaFormContextValue}>
      {children}
    </SchemaFormContext.Provider>
  );
}

export const useSchemaForm = <TFieldValues extends FieldValues = FieldValues>() => {
  const context = useContext(SchemaFormContext);
  if(!context) throw new Error('useSchemaForm must be used within a SchemaFormProvider');
  return context as SchemaFormContextValue<TFieldValues>;
}
