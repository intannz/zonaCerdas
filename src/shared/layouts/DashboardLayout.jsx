import { Outlet } from 'react-router-dom';
import ContributorNavbar from '../components/ContributorNavbar';
import Footer from '../components/Footer';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6EEFC] font-['Nunito_Sans']">
        
      <ContributorNavbar />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}