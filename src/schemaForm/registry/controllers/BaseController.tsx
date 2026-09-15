import { Controller } from 'react-hook-form';
import type { Control, FieldValues } from 'react-hook-form';
import type { ReactElement, Ref } from 'react';

export type BaseControllerProps = {
  name: string;
  control: Control<FieldValues>;
  disabled?: boolean;
  readOnly?: boolean;
};

type FieldRenderProps = {
  name: string;
  value: any;
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  ref: Ref<any>;
  invalid: boolean;
};

type BaseControllerComponentProps = BaseControllerProps & {
  render: (props: FieldRenderProps) => ReactElement;
};

const BaseController = ({ name, control, disabled, render }: BaseControllerComponentProps): ReactElement => {
  return (
    <Controller
      name={name}
      control={control}
      disabled={disabled}
      render={({ field, fieldState }) => (
        <>
          {render({
            name: field.name,
            value: field.value,
            onChange: field.onChange,
            onBlur: field.onBlur,
            ref: field.ref,
            invalid: fieldState.invalid,
          })}
          {fieldState.error && <span>{fieldState.error.message}</span>}
        </>
      )}
    />
  );
};

export default BaseController;
