import { Navigate, Route } from "react-router-dom";
import useAuth from "../hooke/useAuth";

interface PrivateRouteProps {
  path: string;
  exact?: boolean;
  isProtected: boolean;
  component: React.ComponentType;
}

const PrivateRoute = ({ isProtected, component: Component, ...rest }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isProtected && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Route {...rest} element={<Component />} />;
};

export default PrivateRoute;
