import { useController } from 'react-hook-form';
import type { Control, FieldValues } from 'react-hook-form';

export type RatingProps = {
  name: string;
  control: Control<FieldValues>;
  label: string;
  max?: number;
  disabled?: boolean;
  readOnly?: boolean;
};

const Rating = ({ name, control, label, max = 5, disabled, readOnly }: RatingProps) => {
  const { field } = useController({ name, control, disabled });
  const value = Number(field.value) || 0;
  const locked = disabled || readOnly;

  return (
    <div>
      <span>{label}</span>
      {Array.from({ length: max }, (_, index) => index + 1).map((star) => (
        <button
          key={star}
          type="button"
          disabled={locked}
          aria-pressed={star <= value}
          onClick={() => field.onChange(star)}
        >
          {star <= value ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
};

export default Rating;
