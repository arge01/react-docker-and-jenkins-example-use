import { ReactNode } from 'react';
import { BaseLocationHook, BaseSearchHook, Parser, Path, Router as R, SearchString } from 'wouter';

export type RouterOptions = {
  hook?: BaseLocationHook;
  searchHook?: BaseSearchHook;
  base?: Path;
  parser?: Parser;
  ssrPath?: Path;
  ssrSearch?: SearchString;
};

export type RouterProps = RouterOptions & {
  children: ReactNode;
};

function Router(props: RouterProps): JSX.Element {
  return <R {...props} />;
}

export { Router };
