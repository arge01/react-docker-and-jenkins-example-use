import { ComponentType, ReactNode } from 'react';
import { Route as R } from 'wouter';

export interface DefaultParams {
  readonly [paramName: string]: string | undefined;
}

export interface RouteComponentProps<T extends DefaultParams = DefaultParams> {
  params: T;
}

export type Path = string;

export type RouteParams<T extends string> =
  T extends `${infer Prev}/*/${infer Rest}`
    ? RouteParams<Prev> & { wild: string } & RouteParams<Rest>
    : T extends `${string}:${infer P}?/${infer Rest}`
    ? { [K in P]?: string } & RouteParams<Rest>
    : T extends `${string}:${infer P}/${infer Rest}`
    ? { [K in P]: string } & RouteParams<Rest>
    : T extends `${string}:${infer P}?`
    ? { [K in P]?: string }
    : T extends `${string}:${infer P}`
    ? { [K in P]: string }
    : T extends `${string}*`
    ? { '*': string }
    : T extends `${string}*?`
    ? { '*'?: string }
    : any;

export type RouteProps<
  T extends DefaultParams | undefined = undefined,
  RoutePath extends Path = Path,
> = {
  children?:
    | ((
        params: T extends DefaultParams ? T : RouteParams<RoutePath>,
      ) => ReactNode)
    | ReactNode;
  path?: RoutePath;
  component?: ComponentType<
    RouteComponentProps<T extends DefaultParams ? T : RouteParams<RoutePath>>
  >;
  nest?: boolean;
};

function Route(props: RouteProps<DefaultParams, Path>) {
  return <R {...props} />;
}

export { Route };
