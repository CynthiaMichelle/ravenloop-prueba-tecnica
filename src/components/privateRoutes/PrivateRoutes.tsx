import { Navigate } from "react-router-dom";
import { useStateContext } from "../../state/auth.state";
import { ReactElement } from "react";

export const PrivateRoutes = ({ children }: { children: ReactElement }) => {
  const {
    auth: { isLogged },
  } = useStateContext();

  return isLogged ? children : <Navigate to={"/"} replace />;
};
