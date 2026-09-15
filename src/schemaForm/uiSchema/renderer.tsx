import type { ComponentType, ReactElement } from 'react';
import { useWatch } from 'react-hook-form';
import { useSchemaForm } from '../SchemaFormProvider';
import { useFieldName } from '../hooks/index.ts';
import { matchesCondition } from '../rules/index.ts';
import { assertNever } from '../utils/index.ts';
import type { Controller } from '../registry/types/index.ts';
import type { Rule } from '../rules/index.ts';
import type { UiSchemaNode } from './types/index.ts';

export const renderItems = (items: UiSchemaNode[]): ReactElement[] =>
  items.map((item, index) => <Renderer key={index} node={item} />);

function withInherited<T extends { readOnly?: boolean; disabled?: boolean }>(
  node: T,
  readOnly: boolean | undefined,
  disabled: boolean | undefined,
): T {
  if (!readOnly && !disabled) return node;
  return { ...node, readOnly: readOnly || node.readOnly, disabled: disabled || node.disabled };
}

function withDisabled<T extends { disabled?: boolean }>(node: T, disabled: boolean): T {
  return { ...node, disabled };
}

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
      readOnly={node.readOnly}
      disabled={node.disabled}
    />
  );
};

const ResolvedNode = ({ node }: { node: UiSchemaNode }): ReactElement => {
  const { registry } = useSchemaForm();

  switch (node.type) {
    case 'layout': {
      const Layout = registry.layouts[node.layout] as ComponentType<any>;
      const children = node.children.map((child) => withInherited(child, node.readOnly, node.disabled));
      return <Layout {...node.props} readOnly={node.readOnly} disabled={node.disabled} children={children} />;
    }

    case 'controller':
      return <ControllerNode node={node} />;

    case 'action': {
      const Action = registry.actions[node.actionType];
      return <Action label={node.label} {...node.props} disabled={node.disabled} />;
    }

    default:
      return assertNever(node);
  }
};

const RuleGate = ({ node, rule }: { node: UiSchemaNode; rule: Rule }): ReactElement | null => {
  const { form } = useSchemaForm();
  const watchedName = useFieldName(rule.condition.scope);
  const watchedValue = useWatch({ control: form.control, name: watchedName, exact: true });
  const matches = matchesCondition(rule.condition.schema, watchedValue);
  const { rule: _rule, ...rest } = node;

  switch (rule.effect) {
    case 'HIDE':
      return matches ? null : <ResolvedNode node={rest} />;

    case 'SHOW':
      return matches ? <ResolvedNode node={rest} /> : null;

    case 'DISABLE':
      return <ResolvedNode node={withDisabled(rest, matches || Boolean(rest.disabled))} />;

    case 'ENABLE':
      return <ResolvedNode node={withDisabled(rest, !matches || Boolean(rest.disabled))} />;

    default:
      return assertNever(rule.effect);
  }
};

export const Renderer = ({ node }: { node: UiSchemaNode }): ReactElement | null =>
  node.rule ? <RuleGate node={node} rule={node.rule} /> : <ResolvedNode node={node} />;
