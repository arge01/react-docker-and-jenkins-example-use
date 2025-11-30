import { FutureConfig, Action as NavigationType, To, History, NavigateOptions } from '@/constants';
import { Router as R } from 'react-router-dom';

export interface Navigator {
  createHref: History["createHref"];
  encodeLocation?: History["encodeLocation"];
  go: History["go"];
  push(to: To, state?: any, opts?: NavigateOptions): void;
  replace(to: To, state?: any, opts?: NavigateOptions): void;
}

export interface RouterNavigateProps {
  basename?: string;
  children?: React.ReactNode;
  location: Partial<Location> | string;
  navigationType?: NavigationType;
  navigator: Navigator;
  static?: boolean;
  future?: Partial<Pick<FutureConfig, "v7_relativeSplatPath">>;
}

function Router(props: RouterNavigateProps) {
  return <R {...props} />;
}

export { Router };
