import BaseController from './BaseController';
import type { BaseControllerProps } from './BaseController';

export type RadioOption = {
  label: string;
  value: string;
};

export type RadioProps = BaseControllerProps & {
  label: string;
  options: RadioOption[];
};

const Radio = ({ name, control, label, options }: RadioProps) => {
  return (
    <BaseController
      name={name}
      control={control}
      render={({ name, value, onChange, onBlur, ref, invalid }) => (
        <fieldset>
          <legend>{label}</legend>
          {options.map((option, index) => (
            <label key={option.value}>
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                onBlur={onBlur}
                ref={index === 0 ? ref : undefined}
                aria-invalid={invalid}
              />
              {option.label}
            </label>
          ))}
        </fieldset>
      )}
    />
  );
};

export default Radio;
