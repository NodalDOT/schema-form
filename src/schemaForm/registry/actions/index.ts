import type { ComponentProps } from 'react';
import Submit from './Submit';
import Button from './Button';
import LinkAction from './LinkAction';

export const actions = {
  submit: Submit,
  button: Button,
  link: LinkAction,
} as const;

export type ActionPropsMap = {
  [Name in keyof typeof actions]: ComponentProps<(typeof actions)[Name]>;
};

export type ActionsRegistry = typeof actions;
