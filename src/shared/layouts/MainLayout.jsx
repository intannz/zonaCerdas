import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0FF] font-['Nunito_Sans']">
      {/* Navbar dan Footer otomatis ada di semua halaman publik */}
      <Navbar />
      
      {/* Halaman utama (seperti Catalog) akan render di sini */}
      <main className="flex-grow flex justify-center py-10 px-4">
        <div className="w-full max-w-7xl bg-white rounded-[35px] shadow-sm overflow-hidden pb-16">
          <Outlet /> 
        </div>
      </main>
      
      <Footer />
    </div>
  );
}