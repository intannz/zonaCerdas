import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EFE5FF] p-6 font-['Nunito_Sans']">
      <Outlet />
    </div>
  );
}