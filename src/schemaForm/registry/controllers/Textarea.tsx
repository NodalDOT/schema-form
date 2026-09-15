import BaseController from './BaseController';
import type { BaseControllerProps } from './BaseController';

export type TextareaProps = BaseControllerProps & {
  label: string;
};

const Textarea = ({ name, control, label }: TextareaProps) => {
  return (
    <BaseController
      name={name}
      control={control}
      render={({ name, value, onChange, onBlur, ref, invalid }) => (
        <label>
          {label}
          <textarea
            name={name}
            value={value ?? ''}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            aria-invalid={invalid}
          />
        </label>
      )}
    />
  );
};

export default Textarea;
