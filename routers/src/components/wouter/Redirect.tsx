import { Redirect as R, BaseLocationHook as B, NavigationalProps as N } from 'wouter';
import { BrowserLocationHook as BH } from 'wouter/use-browser-location';

export type RedirectBaseLocationHook = B;
export type NavigationalProps<T extends RedirectBaseLocationHook> = N<T>;
export type RedirectBrowserLocationHook = BH;

export type RedirectProps<H extends RedirectBaseLocationHook = RedirectBrowserLocationHook> =
  NavigationalProps<H> & {
    children?: never;
  };

function Redirect(props: RedirectProps<RedirectBaseLocationHook>) {
  return <R {...props} />;
}

export { Redirect };
