import { SchemaForm } from '../schemaForm/index.ts';
import type { UiSchema } from '../schemaForm/uiSchema/index.ts';
import type { JSONSchemaType } from 'ajv';

type RegistrationValues = {
  login: string;
  age: number;
  plan: 'basic' | 'pro' | 'enterprise';
  bio?: string;
  agree: true;
};

const registrationUiSchema: UiSchema = {
  type: 'layout',
  layout: 'BaseLayout',
  props: { title: 'Sign up' },
  children: [
    {
      type: 'controller',
      control: 'Input',
      name: 'login',
      label: 'Login',
    },
    {
      type: 'controller',
      control: 'NumberInput',
      name: 'age',
      label: 'Age',
    },
    {
      type: 'controller',
      control: 'Radio',
      name: 'plan',
      label: 'Plan',
      props: {
        options: [
          { label: 'Basic', value: 'basic' },
          { label: 'Pro', value: 'pro' },
          { label: 'Enterprise', value: 'enterprise' },
        ],
      },
    },
    {
      type: 'controller',
      control: 'Textarea',
      name: 'bio',
      label: 'About you',
    },
    {
      type: 'controller',
      control: 'Checkbox',
      name: 'agree',
      label: 'I agree to the terms',
    },
    {
      type: 'action',
      actionType: 'submit',
      label: 'Sign up',
    },
  ],
};

const registrationJsonSchema: JSONSchemaType<RegistrationValues> = {
  type: 'object',
  properties: {
    login: {
      type: 'string',
      title: 'Login',
      minLength: 2,
      default: '',
    },
    age: {
      type: 'number',
      title: 'Age',
      minimum: 18,
    },
    plan: {
      type: 'string',
      title: 'Plan',
      enum: ['basic', 'pro', 'enterprise'],
      default: 'basic',
    },
    bio: {
      type: 'string',
      title: 'About you',
      nullable: true,
    },
    agree: {
      type: 'boolean',
      title: 'I agree to the terms',
      const: true,
    },
  },
  required: ['login', 'age', 'plan', 'agree'],
};

export function RegistrationForm() {
  return (
    <SchemaForm
      uiSchema={registrationUiSchema}
      jsonSchema={registrationJsonSchema}
      onSubmit={(data) => console.log(data)}
    />
  );
}
