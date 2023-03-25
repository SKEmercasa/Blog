import Cookies from 'js-cookie';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
  const location = useLocation();
  if (Cookies.get('token')) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} />;
}

export default RequireAuth;
