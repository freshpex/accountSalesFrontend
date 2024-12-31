import React from "react";
import { getWithExpiry } from "src/utils/store";
import { useLocation, Outlet, Navigate } from "react-router-dom";

const AuthWrapper = () => {
  const auth = getWithExpiry("x-access-token");
  // const auth = true
  const location = useLocation();
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthWrapper;
