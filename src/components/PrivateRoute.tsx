import { Navigate, Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PATHNAMES from "../constants/pathnames";

interface PrivateRouteProps {
  path: string;
  exact?: boolean;
  isProtected: boolean;
  component: React.ComponentType;
}

const PrivateRoute = ({ isProtected, component: Component, ...rest }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isProtected && !isAuthenticated) {
    return <Navigate to={PATHNAMES.AUTH} replace />;
  }

  return <Route {...rest} element={<Component />} />;
};

export default PrivateRoute;
