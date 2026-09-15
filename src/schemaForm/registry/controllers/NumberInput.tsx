import BaseController from './BaseController';
import type { BaseControllerProps } from './BaseController';

export type NumberInputProps = BaseControllerProps & {
  label: string;
};

const NumberInput = ({ name, control, label, disabled, readOnly }: NumberInputProps) => {
  return (
    <BaseController
      name={name}
      control={control}
      disabled={disabled}
      render={({ name, value, onChange, onBlur, ref, invalid }) => (
        <label>
          {label}
          <input
            type="number"
            name={name}
            value={value ?? ''}
            onChange={(event) => onChange(event.target.valueAsNumber)}
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

export default NumberInput;
