import { ReactNode } from "react";
import { Switch as S } from "wouter"

type Props = {
  location?: string;
  children: ReactNode;
}

function Switch({ location, children }: Props): JSX.Element {
  return (
    <S location={location}>{children}</S>
  )
}

export { Switch };