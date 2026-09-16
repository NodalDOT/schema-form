import { SchemaForm, baseRegistry, extendRegistry } from '../schemaForm/index.ts';
import Rating from './Rating.tsx';
import type { JSONSchemaType } from 'ajv';

const registryWithRating = extendRegistry(baseRegistry, {
  controllers: { Rating },
});

type SurveyValues = {
  comment: string;
  satisfaction: number;
};

const surveyUiSchema = {
  type: 'layout' as const,
  layout: 'BaseLayout' as const,
  props: { title: 'Survey (custom control)' },
  children: [
    {
      type: 'controller' as const,
      control: 'Input' as const,
      scope: '#/properties/comment',
      label: 'Comment',
    },
    {
      type: 'controller' as const,
      control: 'Rating' as const,
      scope: '#/properties/satisfaction',
      label: 'Satisfaction',
      props: { max: 5 },
    },
    {
      type: 'action' as const,
      actionType: 'submit' as const,
      label: 'Send',
    },
  ],
};

const surveyJsonSchema: JSONSchemaType<SurveyValues> = {
  type: 'object',
  properties: {
    comment: {
      type: 'string',
      title: 'Comment',
      default: '',
    },
    satisfaction: {
      type: 'number',
      title: 'Satisfaction',
      minimum: 1,
      maximum: 5,
      default: 0,
    },
  },
  required: ['comment', 'satisfaction'],
};

export function ExtendedRegistryForm() {
  return (
    <SchemaForm
      registry={registryWithRating}
      uiSchema={surveyUiSchema}
      jsonSchema={surveyJsonSchema}
      onSubmit={(data) => console.log(data)}
    />
  );
}
