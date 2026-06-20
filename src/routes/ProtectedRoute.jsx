import { Navigate, Outlet } from 'react-router-dom';
// import useAuth from '../shared/hooks/useAuth';

export default function ProtectedRoute() {
  const isAuthenticated = true; 

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}