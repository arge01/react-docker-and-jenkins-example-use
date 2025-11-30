import { FutureConfig } from '@/constants';
import { BrowserRouter as R } from 'react-router-dom';

export interface BrowserRouterProps {
  basename?: string;
  children?: React.ReactNode;
  future?: Partial<FutureConfig>;
  window?: Window;
}

function BrowserRouter(props: BrowserRouterProps) {
  return <R {...props} />;
}

export { BrowserRouter };
