import { Router as R, RouterState, AgnosticIndexRouteObject, AgnosticNonIndexRouteObject, LazyRouteFunction } from "@remix-run/router";

export type RemixRouter = R;

export interface Path {
  /**
   * A URL pathname, beginning with a /.
   */
  pathname: string;
  /**
   * A URL search string, beginning with a ?.
   */
  search: string;
  /**
   * A URL fragment identifier, beginning with a #.
   */
  hash: string;
}

export interface Location<State = any> extends Path {
  /**
   * A value of arbitrary data associated with this location.
   */
  state: State;
  /**
   * A unique string associated with this location. May be used to safely store
   * and retrieve data in some other storage API, like `localStorage`.
   *
   * Note: This value is always "default" on the initial location.
   */
  key: string;
}

export declare enum Action {
  /**
   * A POP indicates a change to an arbitrary index in the history stack, such
   * as a back or forward navigation. It does not describe the direction of the
   * navigation, only that the current index changed.
   *
   * Note: This is the default action for newly created history objects.
   */
  Pop = "POP",
  /**
   * A PUSH indicates a new entry being added to the history stack, such as when
   * a link is clicked and a new page loads. When this happens, all subsequent
   * entries in the stack are lost.
   */
  Push = "PUSH",
  /**
   * A REPLACE indicates the entry at the current index in the history stack
   * being replaced by a new one.
   */
  Replace = "REPLACE"
}

export interface Update {
  /**
   * The action that triggered the change.
   */
  action: Action;
  /**
   * The new location.
   */
  location: Location;
  /**
   * The delta between this location and the former location in the history stack
   */
  delta: number | null;
}

export interface Listener {
  (update: Update): void;
}

export interface History {
  /**
   * The last action that modified the current location. This will always be
   * Action.Pop when a history instance is first created. This value is mutable.
   */
  readonly action: Action;
  /**
   * The current location. This value is mutable.
   */
  readonly location: Location;
  /**
   * Returns a valid href for the given `to` value that may be used as
   * the value of an <a href> attribute.
   *
   * @param to - The destination URL
   */
  createHref(to: To): string;
  /**
   * Returns a URL for the given `to` value
   *
   * @param to - The destination URL
   */
  createURL(to: To): URL;
  /**
   * Encode a location the same way window.history would do (no-op for memory
   * history) so we ensure our PUSH/REPLACE navigations for data routers
   * behave the same as POP
   *
   * @param to Unencoded path
   */
  encodeLocation(to: To): Path;
  /**
   * Pushes a new location onto the history stack, increasing its length by one.
   * If there were any entries in the stack after the current one, they are
   * lost.
   *
   * @param to - The new URL
   * @param state - Data to associate with the new location
   */
  push(to: To, state?: any): void;
  /**
   * Replaces the current location in the history stack with a new one.  The
   * location that was replaced will no longer be available.
   *
   * @param to - The new URL
   * @param state - Data to associate with the new location
   */
  replace(to: To, state?: any): void;
  /**
   * Navigates `n` entries backward/forward in the history stack relative to the
   * current index. For example, a "back" navigation would use go(-1).
   *
   * @param delta - The delta in the stack index
   */
  go(delta: number): void;
  /**
   * Sets up a listener that will be called whenever the current location
   * changes.
   *
   * @param listener - A function that will be called when the location changes
   * @returns unlisten - A function that may be used to stop listening
   */
  listen(listener: Listener): () => void;
}

export type InitialEntry = string | Partial<Location>;
export type MemoryHistoryOptions = {
    initialEntries?: InitialEntry[];
    initialIndex?: number;
    v5Compat?: boolean;
};
/**
 * A memory history stores locations in memory. This is useful in stateful
 * environments where there is no web browser, such as node tests or React
 * Native.
 */
export interface MemoryHistory extends History {
    /**
     * The current index in the history stack.
     */
    readonly index: number;
}

export interface FutureConfig {
  v7_relativeSplatPath: boolean;
  v7_startTransition: boolean;
}

export interface RouterFutureConfig {
  v7_fetcherPersist: boolean;
  v7_normalizeFormMethod: boolean;
  v7_partialHydration: boolean;
  v7_prependBasename: boolean;
  v7_relativeSplatPath: boolean;
}

export type HydrationState = Partial<Pick<RouterState, "loaderData" | "actionData" | "errors">>;

export interface DOMRouterOpts {
  basename?: string;
  future?: Partial<Omit<RouterFutureConfig, "v7_prependBasename">>;
  hydrationData?: HydrationState;
  window?: Window;
}

export type RelativeRoutingType = 'route' | 'path';
export type To = string | Partial<Path>;

export interface IndexRouteObject {
  caseSensitive?: AgnosticIndexRouteObject["caseSensitive"];
  path?: AgnosticIndexRouteObject["path"];
  id?: AgnosticIndexRouteObject["id"];
  loader?: AgnosticIndexRouteObject["loader"];
  action?: AgnosticIndexRouteObject["action"];
  hasErrorBoundary?: AgnosticIndexRouteObject["hasErrorBoundary"];
  shouldRevalidate?: AgnosticIndexRouteObject["shouldRevalidate"];
  handle?: AgnosticIndexRouteObject["handle"];
  index: true;
  children?: undefined;
  element?: React.ReactNode | null;
  hydrateFallbackElement?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  Component?: React.ComponentType | null;
  HydrateFallback?: React.ComponentType | null;
  ErrorBoundary?: React.ComponentType | null;
  lazy?: LazyRouteFunction<RouteObject>;
}
export interface NonIndexRouteObject {
  caseSensitive?: AgnosticNonIndexRouteObject["caseSensitive"];
  path?: AgnosticNonIndexRouteObject["path"];
  id?: AgnosticNonIndexRouteObject["id"];
  loader?: AgnosticNonIndexRouteObject["loader"];
  action?: AgnosticNonIndexRouteObject["action"];
  hasErrorBoundary?: AgnosticNonIndexRouteObject["hasErrorBoundary"];
  shouldRevalidate?: AgnosticNonIndexRouteObject["shouldRevalidate"];
  handle?: AgnosticNonIndexRouteObject["handle"];
  index?: false;
  children?: RouteObject[];
  element?: React.ReactNode | null;
  hydrateFallbackElement?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  Component?: React.ComponentType | null;
  HydrateFallback?: React.ComponentType | null;
  ErrorBoundary?: React.ComponentType | null;
  lazy?: LazyRouteFunction<RouteObject>;
}
export type RouteObject = IndexRouteObject | NonIndexRouteObject;

export interface NavigateOptions {
  replace?: boolean;
  state?: any;
  preventScrollReset?: boolean;
  relative?: RelativeRoutingType;
  unstable_flushSync?: boolean;
  unstable_viewTransition?: boolean;
}

export interface NavigateFunction {
  (to: To, options?: NavigateOptions): void;
  (delta: number): void;
}