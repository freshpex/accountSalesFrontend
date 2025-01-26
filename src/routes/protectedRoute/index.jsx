import { Navigate } from "react-router-dom";
import { getWithExpiry } from "../../utils/store";

const ProtectedRoute = ({ children }) => {
  const token = getWithExpiry("x-access-token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
