import type { ComponentType, ReactElement } from 'react';
import { useWatch } from 'react-hook-form';
import { useSchemaForm } from '../SchemaFormProvider';
import { useFieldName } from '../hooks/index.ts';
import { matchesCondition } from '../rules/index.ts';
import type { Registry } from '../registry/index.ts';
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

type NodeStrategy<TNode> = (node: TNode, registry: Registry) => ReactElement;

const nodeStrategies: { [K in UiSchemaNode['type']]: NodeStrategy<Extract<UiSchemaNode, { type: K }>> } = {
  layout: (node, registry) => {
    const Layout = registry.layouts[node.layout] as ComponentType<any>;
    const children = node.children.map((child) => withInherited(child, node.readOnly, node.disabled));
    return <Layout {...node.props} readOnly={node.readOnly} disabled={node.disabled} children={children} />;
  },

  controller: (node) => <ControllerNode node={node} />,

  action: (node, registry) => {
    const Action = registry.actions[node.actionType];
    return <Action label={node.label} {...node.props} disabled={node.disabled} />;
  },
};

const ResolvedNode = ({ node }: { node: UiSchemaNode }): ReactElement => {
  const { registry } = useSchemaForm();
  const render = nodeStrategies[node.type] as NodeStrategy<UiSchemaNode>;
  return render(node, registry);
};

type RuleEffectStrategy = (node: UiSchemaNode, matches: boolean) => UiSchemaNode | null;

const ruleEffectStrategies: Record<Rule['effect'], RuleEffectStrategy> = {
  HIDE: (node, matches) => (matches ? null : node),
  SHOW: (node, matches) => (matches ? node : null),
  DISABLE: (node, matches) => withDisabled(node, matches || Boolean(node.disabled)),
  ENABLE: (node, matches) => withDisabled(node, !matches || Boolean(node.disabled)),
};

const RuleGate = ({ node, rule }: { node: UiSchemaNode; rule: Rule }): ReactElement | null => {
  const { form } = useSchemaForm();
  const watchedName = useFieldName(rule.condition.scope);
  const watchedValue = useWatch({ control: form.control, name: watchedName, exact: true });
  const matches = matchesCondition(rule.condition.schema, watchedValue);
  const { rule: _rule, ...rest } = node;
  const resolved = ruleEffectStrategies[rule.effect](rest, matches);

  return resolved ? <ResolvedNode node={resolved} /> : null;
};

export const Renderer = ({ node }: { node: UiSchemaNode }): ReactElement | null => {
  const { rule } = node;
  return rule ? <RuleGate node={node} rule={rule} /> : <ResolvedNode node={node} />;
};
