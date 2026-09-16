import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useSchemaForm } from '../../SchemaFormProvider';

export type ButtonActionProps = {
  label: string;
  disabled?: boolean;
  item?: unknown;
  validate?: boolean;
  onAction: (item: unknown, ctx: { formData: FieldValues }) => void | Promise<void>;
};

const Button = (props: ButtonActionProps) => {
  const { label, disabled, item, validate, onAction } = props;
  const { form } = useSchemaForm();
  const [pending, setPending] = useState(false);

  async function handleClick() {
    if (validate && !(await form.trigger())) return;

    setPending(true);
    try {
      await onAction(item, { formData: form.getValues() });
    } finally {
      setPending(false);
    }
  }

  return (
    <button type="button" disabled={disabled || pending} aria-busy={pending} onClick={handleClick}>
      {label}
    </button>
  );
};

export default Button;
