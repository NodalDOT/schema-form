import { SchemaForm } from '../schemaForm/index.ts';
import type { UiSchema } from '../schemaForm/uiSchema/index.ts';
import type { JSONSchemaType } from 'ajv';

type ProfileValues = {
  firstName: string;
  lastName: string;
  newsletter: boolean;
  theme: 'light' | 'dark';
};

const profileUiSchema: UiSchema = {
  type: 'layout',
  layout: 'BaseLayout',
  props: { title: 'Profile' },
  children: [
    {
      type: 'layout',
      layout: 'BaseLayout',
      props: { title: 'Personal info' },
      children: [
        { type: 'controller', control: 'Input', name: 'firstName', label: 'First name' },
        { type: 'controller', control: 'Input', name: 'lastName', label: 'Last name' },
      ],
    },
    {
      type: 'layout',
      layout: 'BaseLayout',
      props: { title: 'Preferences' },
      children: [
        { type: 'controller', control: 'Checkbox', name: 'newsletter', label: 'Subscribe to newsletter' },
        {
          type: 'controller',
          control: 'Radio',
          name: 'theme',
          label: 'Theme',
          props: {
            options: [
              { label: 'Light', value: 'light' },
              { label: 'Dark', value: 'dark' },
            ],
          },
        },
      ],
    },
    {
      type: 'action',
      actionType: 'submit',
      label: 'Save',
    },
  ],
};

const profileJsonSchema: JSONSchemaType<ProfileValues> = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      title: 'First name',
      minLength: 1,
      default: '',
    },
    lastName: {
      type: 'string',
      title: 'Last name',
      minLength: 1,
      default: '',
    },
    newsletter: {
      type: 'boolean',
      title: 'Subscribe to newsletter',
      default: true,
    },
    theme: {
      type: 'string',
      title: 'Theme',
      enum: ['light', 'dark'],
      default: 'light',
    },
  },
  required: ['firstName', 'lastName', 'newsletter', 'theme'],
};

export function NestedLayoutsForm() {
  return (
    <SchemaForm
      uiSchema={profileUiSchema}
      jsonSchema={profileJsonSchema}
      onSubmit={(data) => console.log(data)}
    />
  );
}
