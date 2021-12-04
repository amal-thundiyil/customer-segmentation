import { Navigate, Outlet, useLocation } from "react-router";
const PrivateRoute = ({ auth }) => {
  const location = useLocation();
  return auth ? <Outlet /> : <Navigate to={location} />;
};

export default PrivateRoute;
