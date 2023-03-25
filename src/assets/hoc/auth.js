import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
  const a = false;
  const location = useLocation();
  if (a) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} />;
}

export default RequireAuth;
