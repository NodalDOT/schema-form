import type { ComponentProps } from 'react';
import Submit from './Submit';

export const actions = {
  submit: Submit,
} as const;

export type ActionPropsMap = {
  [Name in keyof typeof actions]: ComponentProps<(typeof actions)[Name]>;
};
