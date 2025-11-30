type Props = {
  children: JSX.Element | Array<JSX.Element>;
  authority: string | undefined;
};

function Authorized({ children }: Props) {
  return <>{children}</>;
}

export default Authorized;
