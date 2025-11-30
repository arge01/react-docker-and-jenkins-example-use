import { DOMRouterOpts, RouteObject } from '@/constants';
export { createBrowserRouter } from 'react-router-dom';

export type createBrowserRouterProps = {
  routes: RouteObject[];
  opts?: DOMRouterOpts;
};