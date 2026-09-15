import BaseController from './BaseController';
import type { BaseControllerProps } from './BaseController';

export type CheckboxProps = BaseControllerProps & {
  label: string;
};

const Checkbox = ({ name, control, label }: CheckboxProps) => {
  return (
    <BaseController
      name={name}
      control={control}
      render={({ name, value, onChange, onBlur, ref, invalid }) => (
        <label>
          <input
            type="checkbox"
            name={name}
            checked={Boolean(value)}
            onChange={(event) => onChange(event.target.checked)}
            onBlur={onBlur}
            ref={ref}
            aria-invalid={invalid}
          />
          {label}
        </label>
      )}
    />
  );
};

export default Checkbox;
