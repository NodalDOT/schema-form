import BaseController from './BaseController';
import type { BaseControllerProps } from './BaseController';

export type NumberInputProps = BaseControllerProps & {
  label: string;
};

const NumberInput = ({ name, control, label }: NumberInputProps) => {
  return (
    <BaseController
      name={name}
      control={control}
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
            aria-invalid={invalid}
          />
        </label>
      )}
    />
  );
};

export default NumberInput;
