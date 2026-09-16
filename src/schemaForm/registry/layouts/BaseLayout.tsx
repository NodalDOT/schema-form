import { renderItems } from '../../uiSchema/renderer.tsx';
import type { LayoutChild } from '../types/index.ts';

export type BaseLayoutOwnProps = {
  title?: string;
};

export type BaseLayoutProps = BaseLayoutOwnProps & {
  children: LayoutChild[];
};

const BaseLayout = ({ children, title }: BaseLayoutProps) => {
  return (
    <div>
      <p>{ title }</p>
      {renderItems(children)}
    </div>
  );
};

export default BaseLayout;
