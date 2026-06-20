import { Navigate, Outlet } from 'react-router-dom';
// import useAuth from '../shared/hooks/useAuth';

export default function GuestRoute() {
  const isAuthenticated = false; 

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}