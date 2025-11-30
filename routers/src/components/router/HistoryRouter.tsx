import { FutureConfig } from '@/constants';
import { unstable_HistoryRouter as H } from 'react-router-dom';

export interface HistoryRouterProps {
  basename?: string;
  children?: React.ReactNode;
  future?: Partial<FutureConfig>;
  window?: Window;
}

function HistoryRouter(props: HistoryRouterProps | any) {
  return <H {...props} />;
}

export { HistoryRouter };
