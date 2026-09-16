import type { ComponentProps } from 'react';
import Submit from './Submit';
import Button from './Button';

export const actions = {
  submit: Submit,
  button: Button,
} as const;

export type ActionPropsMap = {
  [Name in keyof typeof actions]: ComponentProps<(typeof actions)[Name]>;
};

export type ActionsRegistry = typeof actions;
