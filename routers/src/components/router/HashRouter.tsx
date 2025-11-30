import { FutureConfig } from '@/constants';
import { HashRouter as H } from 'react-router-dom';

export interface HashRouterProps {
  basename?: string;
  children?: React.ReactNode;
  future?: Partial<FutureConfig>;
  window?: Window;
}

function HashRouter(props: HashRouterProps) {
  return <H {...props} />;
}

export { HashRouter };
