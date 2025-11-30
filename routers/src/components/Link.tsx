import { Link as L, LinkProps as LProps } from 'wouter';
import { BrowserLocationHook as B } from 'wouter/use-browser-location';

export type BrowserLocationHook = B;
export type LinkProps<T extends BrowserLocationHook> = LProps<T>;

function Link(props: LinkProps<BrowserLocationHook>): JSX.Element {
  return <L {...props} />;
}

export { Link };
