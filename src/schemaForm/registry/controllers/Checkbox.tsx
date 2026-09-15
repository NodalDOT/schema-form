import BaseController from './BaseController';
import type { BaseControllerProps } from './BaseController';

export type CheckboxProps = BaseControllerProps & {
  label: string;
};

const Checkbox = ({ name, control, label, disabled, readOnly }: CheckboxProps) => {
  return (
    <BaseController
      name={name}
      control={control}
      disabled={disabled}
      render={({ name, value, onChange, onBlur, ref, invalid }) => (
        <label>
          <input
            type="checkbox"
            name={name}
            checked={Boolean(value)}
            onChange={(event) => !readOnly && onChange(event.target.checked)}
            onClick={(event) => readOnly && event.preventDefault()}
            onBlur={onBlur}
            ref={ref}
            disabled={disabled}
            aria-invalid={invalid}
            aria-readonly={readOnly}
          />
          {label}
        </label>
      )}
    />
  );
};

export default Checkbox;
