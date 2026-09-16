import { useFormState } from 'react-hook-form';
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
  const { form, uiSchema } = useSchemaForm();
  const { reset, control } = form;
  const { isSubmitting, isValid } = useFormState({ control });

  return (
    <div>
      <Renderer node={uiSchema} />
      <p>{isSubmitting ? 'Sending…' : `Valid: ${isValid}`}</p>
      <button type="button" onClick={() => reset()}>
        Reset
      </button>
    </div>
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
