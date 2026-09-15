import { useRef } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import { useSchemaForm } from '../../SchemaFormProvider';
import { FormPathProvider, joinFormPath, useFieldName, useSchemaField } from '../../hooks/index.ts';
import { renderItems } from '../../uiSchema/renderer.tsx';
import type { LayoutChild } from '../types/layout.ts';

export type ArrayLayoutOwnProps = {
  scope: string;
  addLabel?: string;
  removeLabel?: string;
  defaultItem?: unknown;
  readOnly?: boolean;
  disabled?: boolean;
};

export type ArrayLayoutProps = ArrayLayoutOwnProps & {
  children: LayoutChild[];
};

let rowKeySeq = 0;
function nextRowKey() {
  rowKeySeq += 1;
  return `schema-form-array-row-${rowKeySeq}`;
}

const ArrayLayout = ({ scope, addLabel, removeLabel, defaultItem, readOnly, disabled, children }: ArrayLayoutProps) => {
  const { form } = useSchemaForm();
  const name = useFieldName(scope);
  const schemaField = useSchemaField(name);
  const minItems = schemaField?.minItems as number | undefined;
  const maxItems = schemaField?.maxItems as number | undefined;

  const watched = useWatch({ control: form.control, name, exact: true });
  const value = (watched as unknown[] | undefined) ?? [];

  const rowKeysRef = useRef<string[]>([]);
  while (rowKeysRef.current.length < value.length) {
    rowKeysRef.current.push(nextRowKey());
  }
  if (rowKeysRef.current.length > value.length) {
    rowKeysRef.current = rowKeysRef.current.slice(0, value.length);
  }

  const { errors, isSubmitted } = useFormState({ control: form.control, name });
  const rawError = name.split('.').reduce<any>((acc, key) => acc?.[key], errors);
  const arrayError = rawError?.root ?? rawError;

  function append() {
    const current = (form.getValues(name) as unknown[]) ?? [];
    form.setValue(name, [...current, defaultItem ?? {}], { shouldDirty: true });
    rowKeysRef.current.push(nextRowKey());
  }

  function remove(index: number) {
    const current = (form.getValues(name) as unknown[]) ?? [];
    form.setValue(name, current.filter((_, i) => i !== index), { shouldDirty: true });
    rowKeysRef.current.splice(index, 1);
    if (isSubmitted) form.trigger(name);
  }

  const editable = !readOnly && !disabled;
  const atMin = minItems != null && value.length <= minItems;
  const atMax = maxItems != null && value.length >= maxItems;

  return (
    <div data-field-name={name}>
      {value.map((_, index) => (
        <div key={rowKeysRef.current[index]}>
          <FormPathProvider value={joinFormPath(name, String(index))}>
            {renderItems(children)}
          </FormPathProvider>
          {editable && (
            <button type="button" disabled={atMin} onClick={() => remove(index)}>
              {removeLabel ?? 'Remove'}
            </button>
          )}
        </div>
      ))}
      {editable && (
        <div>
          <button type="button" disabled={atMax} onClick={append}>
            {addLabel ?? 'Add'}
          </button>
          {arrayError?.message && <span>{arrayError.message}</span>}
        </div>
      )}
    </div>
  );
};

export default ArrayLayout;
