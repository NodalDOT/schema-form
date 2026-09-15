import BaseController from './BaseController';
import type { BaseControllerProps } from './BaseController';

export type TextareaProps = BaseControllerProps & {
  label: string;
};

const Textarea = ({ name, control, label, disabled, readOnly }: TextareaProps) => {
  return (
    <BaseController
      name={name}
      control={control}
      disabled={disabled}
      render={({ name, value, onChange, onBlur, ref, invalid }) => (
        <label>
          {label}
          <textarea
            name={name}
            value={value ?? ''}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={invalid}
          />
        </label>
      )}
    />
  );
};

export default Textarea;
