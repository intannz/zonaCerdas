import { Navigate, Outlet } from 'react-router-dom';

export default function ContributorRoute() {

  const isContributor = true; 

  return isContributor ? <Outlet /> : <Navigate to="/auth/login" replace />;
}