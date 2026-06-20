import { Navigate, Outlet } from 'react-router-dom';
// import useAuth from '../shared/hooks/useAuth';

export default function ContributorRoute() {
  const isAuthenticated = true;
  const userRole = 'CONTRIBUTOR';

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (userRole !== 'CONTRIBUTOR') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}