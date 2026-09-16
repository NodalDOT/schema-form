# Conventions

## Component/function props

When a component or function has many props (roughly 4+, or any prop list that
doesn't fit on one line), accept a single `props` parameter typed by its props
type, and destructure the fields you need from it inside the function body —
don't destructure the whole prop list directly in the signature.

```tsx
// Preferred
const Radio = (props: RadioProps) => {
  const { name, control, label, options, disabled, readOnly } = props;
  // ...
};

// Avoid for many props
const Radio = ({ name, control, label, options, disabled, readOnly }: RadioProps) => {
  // ...
};
```

Destructuring directly in the signature is fine for a small number of props.
