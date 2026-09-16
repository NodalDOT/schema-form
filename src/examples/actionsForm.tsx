import { SchemaForm } from '../schemaForm/index.ts';
import type { UiSchema } from '../schemaForm/uiSchema/index.ts';
import type { JSONSchemaType } from 'ajv';
import type { FieldValues } from 'react-hook-form';

type FeedbackValues = {
  message: string;
};

function saveDraft(item: unknown, { formData }: { formData: FieldValues }) {
  console.log('saving draft', item, formData);
  return new Promise<void>((resolve) => setTimeout(resolve, 800));
}

const actionsUiSchema: UiSchema = {
  type: 'layout',
  layout: 'BaseLayout',
  props: { title: 'Actions demo' },
  children: [
    { type: 'controller', control: 'Textarea', scope: '#/properties/message', label: 'Message' },
    {
      type: 'action',
      actionType: 'button',
      label: 'Save draft',
      props: { item: { kind: 'draft' }, validate: true, onAction: saveDraft },
    },
    {
      type: 'action',
      actionType: 'link',
      label: 'Read the guidelines',
      props: { href: '#guidelines' },
    },
    { type: 'action', actionType: 'submit', label: 'Send' },
  ],
};

const actionsJsonSchema: JSONSchemaType<FeedbackValues> = {
  type: 'object',
  properties: {
    message: { type: 'string', title: 'Message', minLength: 3, default: '' },
  },
  required: ['message'],
};

export function ActionsForm() {
  return (
    <SchemaForm
      uiSchema={actionsUiSchema}
      jsonSchema={actionsJsonSchema}
      onSubmit={(data) => console.log('submit', data)}
    />
  );
}
