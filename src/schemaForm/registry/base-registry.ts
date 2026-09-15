import type { Registry } from './types/index.ts'

export const baseRegistry: Registry = {
  layout: [
    {
      type: 'layout',
      layout: 'BaseLayout',
      props: { title: 'Base form' },
      children: [
        {
          type: 'controller',
          control: 'Input',
          name: 'test',
          label: 'Test field',
        },
        {
          type: 'action',
          actionType: 'submit',
          label: 'Submit',
          props: { disabled: false },
        },
      ],
    },
  ],
  controllers: [
    {
      type: 'controller',
      control: 'Input',
      name: 'test',
      label: 'Test field',
    },
  ],
  actions: [
    {
      type: 'action',
      actionType: 'submit',
      label: 'Submit',
      props: { disabled: false },
    },
  ],
};
