import { To, RelativeRoutingType } from "@/constants/router/index";
import { Link as L, NavLink as N } from 'react-router-dom';

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  reloadDocument?: boolean;
  replace?: boolean;
  state?: any;
  preventScrollReset?: boolean;
  relative?: RelativeRoutingType;
  to: To;
  unstable_viewTransition?: boolean;
}

export type NavLinkRenderProps = {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
};

export interface NavLinkProps
  extends Omit<LinkProps, 'className' | 'style' | 'children'> {
  children?: React.ReactNode | ((props: NavLinkRenderProps) => React.ReactNode);
  caseSensitive?: boolean;
  className?: string | ((props: NavLinkRenderProps) => string | undefined);
  end?: boolean;
  style?:
    | React.CSSProperties
    | ((props: NavLinkRenderProps) => React.CSSProperties | undefined);
}

function Link(props: LinkProps) {
  return <L {...props} />;
}

function NavLink(props: NavLinkProps) {
  return <N {...props} />;
}

export { Link, NavLink };
