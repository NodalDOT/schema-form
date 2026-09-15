import ArrayLayout from './ArrayLayout';
import type { ArrayLayoutOwnProps } from './ArrayLayout';
import BaseLayout from './BaseLayout';
import type { BaseLayoutOwnProps } from './BaseLayout';

export const layouts = {
  BaseLayout,
  Array: ArrayLayout,
} as const;

export type LayoutPropsMap = {
  BaseLayout: BaseLayoutOwnProps;
  Array: ArrayLayoutOwnProps;
};

export type LayoutsRegistry = typeof layouts;
