import { useRef } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import type { FieldError, FieldErrors } from 'react-hook-form';
import { useSchemaForm } from '../../SchemaFormProvider';
import { FormPathProvider, joinFormPath, useFieldName, useSchemaField } from '../../hooks/index.ts';
import { renderItems } from '../../uiSchema/renderer.tsx';
import type { LayoutChild } from '../types/index.ts';

export type ArrayLayoutOwnProps = {
  scope: string;
  addLabel?: string;
  removeLabel?: string;
  defaultItem?: unknown;
};

export type ArrayLayoutProps = ArrayLayoutOwnProps & {
  readOnly?: boolean;
  disabled?: boolean;
  children: LayoutChild[];
};

let rowKeySeq = 0;
function nextRowKey() {
  rowKeySeq += 1;
  return `schema-form-array-row-${rowKeySeq}`;
}

function useStableRowKeys(length: number) {
  const keysRef = useRef<string[]>([]);

  while (keysRef.current.length < length) {
    keysRef.current.push(nextRowKey());
  }
  if (keysRef.current.length > length) {
    keysRef.current = keysRef.current.slice(0, length);
  }

  function removeKeyAt(index: number) {
    keysRef.current.splice(index, 1);
  }

  return { rowKeys: keysRef.current, removeKeyAt };
}

function getFieldError(errors: FieldErrors, name: string): FieldError | undefined {
  const node = name.split('.').reduce<unknown>(
    (acc, key) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[key] : undefined),
    errors,
  );
  const withRoot = node as (FieldError & { root?: FieldError }) | undefined;
  return withRoot?.root ?? withRoot;
}

const ArrayLayout = (props: ArrayLayoutProps) => {
  const { scope, addLabel, removeLabel, defaultItem, readOnly, disabled, children } = props;
  const { form } = useSchemaForm();
  const name = useFieldName(scope);
  const schemaField = useSchemaField(name);
  const minItems = schemaField?.minItems as number | undefined;
  const maxItems = schemaField?.maxItems as number | undefined;

  const watched = useWatch({ control: form.control, name, exact: true });
  const value = (watched as unknown[] | undefined) ?? [];

  const { rowKeys, removeKeyAt } = useStableRowKeys(value.length);

  const { errors, isSubmitted } = useFormState({ control: form.control, name });
  const arrayError = getFieldError(errors, name);

  function append() {
    form.setValue(name, [...value, defaultItem ?? {}], { shouldDirty: true });
  }

  function remove(index: number) {
    form.setValue(name, value.filter((_, i) => i !== index), { shouldDirty: true });
    removeKeyAt(index);
    if (isSubmitted) form.trigger(name);
  }

  const editable = !readOnly && !disabled;
  const atMin = minItems != null && value.length <= minItems;
  const atMax = maxItems != null && value.length >= maxItems;

  return (
    <div data-field-name={name}>
      {value.map((_, index) => (
        <div key={rowKeys[index]}>
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
