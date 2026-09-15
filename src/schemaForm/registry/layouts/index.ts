import type { ComponentProps } from 'react';
import BaseLayout from './BaseLayout';

export const layouts = {
  BaseLayout,
} as const;

export type LayoutPropsMap = {
  [Name in keyof typeof layouts]: ComponentProps<(typeof layouts)[Name]>;
};
