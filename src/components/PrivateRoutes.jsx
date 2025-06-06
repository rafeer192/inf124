import { useContext } from "react";
import { AccountContext } from "./AccountContext";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const { user } = useContext(AccountContext);
  const location = useLocation();

  if (user && user.loggedIn === null) {
    // Still loading auth state
    return null;
  }

  return user?.loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
