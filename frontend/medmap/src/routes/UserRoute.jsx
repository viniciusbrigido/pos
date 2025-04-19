import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export function UserRoute({ children }) {
  const { isAuthenticated, userType, isLoading, firstAccess } = useAuth();

  if (isLoading) return <LoadingSpinner />;

  if (!isAuthenticated) return <Navigate to='/login' />;
  if (firstAccess) return <Navigate to='/change-password' />;
  if (userType !== 'USER') return <Navigate to='/about' />;

  return children;
}
