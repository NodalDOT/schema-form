export type SubmitProps = {
  label: string;
  disabled?: boolean;
};

const Submit = ({ label, disabled }: SubmitProps) => {
  return (
    <button type="submit" disabled={disabled}>
      {label}
    </button>
  );
};

export default Submit;
