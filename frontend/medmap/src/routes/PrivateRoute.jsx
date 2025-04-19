import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from "../components/LoadingSpinner";

export function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading, firstAccess } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  if (firstAccess) return <Navigate to='/change-password' />;
  return isAuthenticated ? children : <Navigate to='/login' />;
}
