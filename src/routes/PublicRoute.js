import { Navigate, Outlet, useLocation } from "react-router";
const PublicRoute = ({ auth }) => {
  const location = useLocation();
  return !auth ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" state={{ from: location }} />
  );
};

export default PublicRoute;
