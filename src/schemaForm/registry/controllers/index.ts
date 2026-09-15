import type { ComponentProps } from 'react';
import Checkbox from './Checkbox';
import Input from './Input';
import NumberInput from './NumberInput';
import Radio from './Radio';
import Textarea from './Textarea';

export const controllers = {
  Input,
  NumberInput,
  Checkbox,
  Radio,
  Textarea,
} as const;

export type ControllerPropsMap = {
  [Name in keyof typeof controllers]: ComponentProps<(typeof controllers)[Name]>;
};

export type ControllerName = keyof ControllerPropsMap;
