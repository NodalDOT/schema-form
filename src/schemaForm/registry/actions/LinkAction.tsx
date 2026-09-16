export type LinkActionProps = {
  label: string;
  disabled?: boolean;
  href: string;
  target?: string;
  rel?: string;
};

const LinkAction = (props: LinkActionProps) => {
  const { label, disabled, href, target, rel } = props;

  if (disabled) {
    return <span aria-disabled="true">{label}</span>;
  }

  return (
    <a href={href} target={target} rel={rel}>
      {label}
    </a>
  );
};

export default LinkAction;
