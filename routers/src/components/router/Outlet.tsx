import { Outlet as O } from 'react-router-dom';

export interface OutletProps {
  context?: unknown;
}

function Outlet(props: OutletProps) {
  return <O {...props} />;
}

export { Outlet };