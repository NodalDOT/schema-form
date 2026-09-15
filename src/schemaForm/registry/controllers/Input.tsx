import BaseController from './BaseController';
import type { BaseControllerProps } from './BaseController';

export type InputProps = BaseControllerProps & {
  label: string;
};

const Input = ({ name, control, label, disabled, readOnly }: InputProps) => {
  return (
    <BaseController
      name={name}
      control={control}
      disabled={disabled}
      render={({ name, value, onChange, onBlur, ref, invalid }) => (
        <label>
          {label}
          <input
            type="text"
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

export default Input;
