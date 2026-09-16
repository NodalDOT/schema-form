import { SchemaForm } from '../schemaForm/index.ts';
import type { UiSchema } from '../schemaForm/uiSchema/index.ts';
import type { JSONSchemaType } from 'ajv';

type InvoiceItem = {
  product: string;
  quantity: number;
  notes: string;
  tags: string[];
};

type InvoiceValues = {
  customerName: string;
  items: InvoiceItem[];
};

const invoiceUiSchema: UiSchema = {
  type: 'layout',
  layout: 'BaseLayout',
  props: { title: 'Invoice' },
  children: [
    { type: 'controller', control: 'Input', scope: '#/properties/customerName', label: 'Customer name' },
    {
      type: 'layout',
      layout: 'Array',
      props: {
        scope: '#/properties/items',
        addLabel: 'Add line item',
        removeLabel: 'Remove item',
        defaultItem: { product: '', quantity: 1, notes: '', tags: [] },
      },
      children: [
        {
          type: 'layout',
          layout: 'BaseLayout',
          props: { title: 'Line item' },
          children: [
            { type: 'controller', control: 'Input', scope: '#/properties/product', label: 'Product' },
            { type: 'controller', control: 'NumberInput', scope: '#/properties/quantity', label: 'Quantity' },
            { type: 'controller', control: 'Textarea', scope: '#/properties/notes', label: 'Notes' },
            {
              type: 'layout',
              layout: 'Array',
              props: {
                scope: '#/properties/tags',
                addLabel: 'Add tag',
                removeLabel: 'Remove tag',
                defaultItem: '',
              },
              children: [
                { type: 'controller', control: 'Input', scope: '#', label: 'Tag' },
              ],
            },
          ],
        },
      ],
    },
    { type: 'action', actionType: 'submit', label: 'Submit invoice' },
  ],
};

const invoiceJsonSchema: JSONSchemaType<InvoiceValues> = {
  type: 'object',
  properties: {
    customerName: {
      type: 'string',
      title: 'Customer name',
      minLength: 1,
      default: '',
    },
    items: {
      type: 'array',
      title: 'Line items',
      minItems: 1,
      maxItems: 4,
      default: [{ product: '', quantity: 1, notes: '', tags: [] }],
      items: {
        type: 'object',
        properties: {
          product: { type: 'string', minLength: 1, default: '' },
          quantity: { type: 'number', minimum: 1, default: 1 },
          notes: { type: 'string', default: '' },
          tags: {
            type: 'array',
            maxItems: 3,
            default: [],
            items: { type: 'string', minLength: 1 },
          },
        },
        required: ['product', 'quantity', 'notes', 'tags'],
      },
    },
  },
  required: ['customerName', 'items'],
};

export function ArrayLayoutForm() {
  return (
    <SchemaForm
      uiSchema={invoiceUiSchema}
      jsonSchema={invoiceJsonSchema}
      onSubmit={(data) => console.log(data)}
    />
  );
}
