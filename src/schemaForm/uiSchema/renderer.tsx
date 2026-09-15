import type { ComponentType, ReactElement } from 'react';
import { actions } from '../registry/actions/index.ts';
import { controllers } from '../registry/controllers/index.ts';
import { layouts } from '../registry/layouts/index.ts';
import { useSchemaForm } from '../SchemaFormProvider';
import { assertNever } from '../utils/index.ts';
import type { UiSchemaNode } from './types/index.ts';

export const Renderer = ({ node }: { node: UiSchemaNode }): ReactElement => {
  const { form } = useSchemaForm();

  switch (node.type) {
    case 'layout': {
      const Layout = layouts[node.layout];
      return (
        <Layout {...node.props}>
          {node.children.map((child, index) => (
            <Renderer key={index} node={child} />
          ))}
        </Layout>
      );
    }

    case 'controller': {
      const Control = controllers[node.control] as ComponentType<any>;
      return (
        <Control
          name={node.name}
          label={node.label ?? ''}
          control={form.control}
          {...node.props}
        />
      );
    }

    case 'action': {
      const Action = actions[node.actionType];
      return <Action label={node.label} {...node.props} />;
    }

    default:
      return assertNever(node);
  }
};
