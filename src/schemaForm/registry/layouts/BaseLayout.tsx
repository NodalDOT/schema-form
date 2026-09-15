
export type BaseLayoutProps = {
  children: React.ReactNode;
  title?: string;

};

const BaseLayout = ({ children, title }: BaseLayoutProps) => {
  return (
    <div>
      <p>{ title }</p>
      {children}
    </div>
  );
};

export default BaseLayout;
