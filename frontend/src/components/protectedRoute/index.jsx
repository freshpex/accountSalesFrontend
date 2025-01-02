import { Navigate, useLocation } from 'react-router-dom';
import { getWithExpiry } from '../../utils/store';

const ProtectedRoute = ({ children }) => {
  const auth = getWithExpiry('x-access-token');
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
