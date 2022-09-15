
import { Navigate, useLocation } from 'react-router-dom';
import { useContextAuth } from '../../context/useContextAuth';

const ProtectedRoute = ({ children }) => {
    
  const { token } = useContextAuth();
  const location = useLocation();

  if (!token) {
    return (<Navigate to="/login" replace state={{ from: location }} />);
  }
  
  return children;
};

export default ProtectedRoute;