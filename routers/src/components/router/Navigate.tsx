import { To, RelativeRoutingType } from '@/constants/router/index';
import { Navigate as N } from 'react-router-dom';

export interface NavigateProps {
  to: To;
  replace?: boolean;
  state?: any;
  relative?: RelativeRoutingType;
}

function Navigate(props: NavigateProps) {
  return <N {...props} />;
}

export { Navigate };
