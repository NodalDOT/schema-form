import { useFormState } from 'react-hook-form';
import { useSchemaForm } from '../../SchemaFormProvider';

export type SubmitProps = {
  label: string;
  disabled?: boolean;
};

const Submit = ({ label, disabled }: SubmitProps) => {
  const { form, onSubmit } = useSchemaForm();
  const { isSubmitting } = useFormState({ control: form.control });

  return (
    <button
      type="button"
      disabled={disabled || isSubmitting}
      aria-busy={isSubmitting}
      onClick={form.handleSubmit(onSubmit ?? (() => {}))}
    >
      {label}
    </button>
  );
};

export default Submit;
