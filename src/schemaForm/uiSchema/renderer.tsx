import type { ComponentType, ReactElement } from 'react';
import { useSchemaForm } from '../SchemaFormProvider';
import { useFieldName } from '../hooks/index.ts';
import { assertNever } from '../utils/index.ts';
import type { Controller } from '../registry/types/index.ts';
import type { UiSchemaNode } from './types/index.ts';

export const renderItems = (items: UiSchemaNode[]): ReactElement[] =>
  items.map((item, index) => <Renderer key={index} node={item} />);

const ControllerNode = ({ node }: { node: Controller }): ReactElement => {
  const { form, registry } = useSchemaForm();
  const name = useFieldName(node.scope);
  const Control = registry.controllers[node.control] as ComponentType<any>;

  return (
    <Control
      name={name}
      label={node.label ?? ''}
      control={form.control}
      {...node.props}
    />
  );
};

export const Renderer = ({ node }: { node: UiSchemaNode }): ReactElement => {
  const { registry } = useSchemaForm();

  switch (node.type) {
    case 'layout': {
      const Layout = registry.layouts[node.layout] as ComponentType<any>;
      return <Layout {...node.props} children={node.children} />;
    }

    case 'controller':
      return <ControllerNode node={node} />;

    case 'action': {
      const Action = registry.actions[node.actionType];
      return <Action label={node.label} {...node.props} />;
    }

    default:
      return assertNever(node);
  }
};
