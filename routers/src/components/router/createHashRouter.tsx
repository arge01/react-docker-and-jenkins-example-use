import { DOMRouterOpts, RouteObject } from '@/constants';
export { createHashRouter } from 'react-router-dom';

export type createHashRouterProps = {
  routes: RouteObject[];
  opts?: DOMRouterOpts;
};
