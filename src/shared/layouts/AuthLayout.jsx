import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#EFE5FF] font-['Nunito_Sans']">

      <div className="flex-grow flex items-center justify-center p-6">
        <Outlet />
      </div>

      <Footer />
      
    </div>
  );
}