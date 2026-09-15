import { SchemaFormProvider, useSchemaForm } from '../schemaForm/SchemaFormProvider';
import { Renderer } from '../schemaForm/uiSchema/index.ts';
import type { UiSchema } from '../schemaForm/uiSchema/index.ts';
import type { JSONSchemaType } from 'ajv';

type FeedbackValues = {
  message: string;
};

const feedbackUiSchema: UiSchema = {
  type: 'layout',
  layout: 'BaseLayout',
  props: { title: 'Feedback' },
  children: [
    { type: 'controller', control: 'Textarea', scope: '#/properties/message', label: 'Your message' },
    { type: 'action', actionType: 'submit', label: 'Send' },
  ],
};

const feedbackJsonSchema: JSONSchemaType<FeedbackValues> = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      title: 'Your message',
      minLength: 5,
      default: '',
    },
  },
  required: ['message'],
};

const CustomFormFields = () => {
  const { form, uiSchema, onSubmit } = useSchemaForm();
  const { handleSubmit, reset, formState } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit ?? (() => {}))}>
      <Renderer node={uiSchema} />
      <p>{formState.isSubmitting ? 'Sending…' : `Valid: ${formState.isValid}`}</p>
      <button type="button" onClick={() => reset()}>
        Reset
      </button>
    </form>
  );
};

export function ProviderOnlyForm() {
  return (
    <SchemaFormProvider<FeedbackValues>
      uiSchema={feedbackUiSchema}
      jsonSchema={feedbackJsonSchema}
      onSubmit={(data) => console.log(data)}
    >
      <CustomFormFields />
    </SchemaFormProvider>
  );
}
