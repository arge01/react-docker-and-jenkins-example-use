import { FutureConfig, RemixRouter } from "@/constants";
import { RouterProvider as R } from "react-router-dom";

export interface RouterProviderProps {
  fallbackElement?: React.ReactNode;
  router: RemixRouter;
  future?: Partial<Pick<FutureConfig, "v7_startTransition">>;
}

function RouterProvider(props: RouterProviderProps) {
  return (
    <R {...props} />
  )
}

export { RouterProvider }