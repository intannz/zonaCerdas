import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    if (!token) {
      alert("Silakan login terlebih dahulu untuk mengakses halaman ini!");
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }
  
  return <Outlet />;
}