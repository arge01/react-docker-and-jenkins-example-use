import { Location } from '@/constants';
import { Routes as R } from 'react-router-dom';

export interface RoutesProps {
  children?: React.ReactNode;
  location?: Partial<Location> | string;
}

function Routes(props: RoutesProps) {
  return <R {...props} />;
}

export { Routes };
