import { SchemaForm } from '../schemaForm/index.ts';
import type { UiSchema } from '../schemaForm/uiSchema/index.ts';
import type { JSONSchemaType } from 'ajv';

type NewsletterValues = {
  newsletter: boolean;
  frequency?: 'daily' | 'weekly';
  hasPromo: boolean;
  promoCode?: string;
};

const rulesUiSchema: UiSchema = {
  type: 'layout',
  layout: 'BaseLayout',
  props: { title: 'Rules demo' },
  children: [
    { type: 'controller', control: 'Checkbox', scope: '#/properties/newsletter', label: 'Subscribe to newsletter' },
    {
      type: 'controller',
      control: 'Radio',
      scope: '#/properties/frequency',
      label: 'Frequency',
      props: {
        options: [
          { label: 'Daily', value: 'daily' },
          { label: 'Weekly', value: 'weekly' },
        ],
      },
      rule: { effect: 'SHOW', condition: { scope: '#/properties/newsletter', schema: { const: true } } },
    },
    { type: 'controller', control: 'Checkbox', scope: '#/properties/hasPromo', label: 'I have a promo code' },
    {
      type: 'controller',
      control: 'Input',
      scope: '#/properties/promoCode',
      label: 'Promo code',
      rule: { effect: 'ENABLE', condition: { scope: '#/properties/hasPromo', schema: { const: true } } },
    },
    {
      type: 'action',
      actionType: 'submit',
      label: 'Save',
    },
  ],
};

const rulesJsonSchema: JSONSchemaType<NewsletterValues> = {
  type: 'object',
  properties: {
    newsletter: {
      type: 'boolean',
      title: 'Subscribe to newsletter',
      default: false,
    },
    frequency: {
      type: 'string',
      enum: ['daily', 'weekly'],
      nullable: true,
    },
    hasPromo: {
      type: 'boolean',
      title: 'I have a promo code',
      default: false,
    },
    promoCode: {
      type: 'string',
      nullable: true,
      default: '',
    },
  },
  required: ['newsletter', 'hasPromo'],
};

export function RulesForm() {
  return (
    <SchemaForm
      uiSchema={rulesUiSchema}
      jsonSchema={rulesJsonSchema}
      onSubmit={(data) => console.log(data)}
    />
  );
}
