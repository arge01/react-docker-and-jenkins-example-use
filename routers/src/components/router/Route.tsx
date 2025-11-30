import { Action as NavigationType, FutureConfig } from '@/constants/router/index';
import { Route as R } from 'react-router-dom';

export interface RouterProps {
  basename?: string;
  children?: React.ReactNode;
  location: Partial<Location> | string;
  navigationType?: NavigationType;
  navigator: Navigator;
  static?: boolean;
  future?: Partial<Pick<FutureConfig, "v7_relativeSplatPath">>;
}

function Route(props: RouterProps) {
  return <R {...props} />;
}

export { Route };
