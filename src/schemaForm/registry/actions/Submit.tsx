import { useFormState } from 'react-hook-form';
import { useSchemaForm } from '../../SchemaFormProvider';

export type SubmitProps = {
  label: string;
  disabled?: boolean;
};

const Submit = ({ label, disabled }: SubmitProps) => {
  const { form } = useSchemaForm();
  const { isSubmitting } = useFormState({ control: form.control });

  return (
    <button type="submit" disabled={disabled || isSubmitting} aria-busy={isSubmitting}>
      {label}
    </button>
  );
};

export default Submit;
