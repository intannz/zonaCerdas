import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer'; // Import Footer di sini

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-t from-[#F5F0FF] to-white font-['Nunito_Sans']">
      
      {/* Area Konten Utama (Form) */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 relative z-10">
        <Outlet /> 
      </main>

      {/* Panggil Footer sebagai komponen */}
      <Footer />
      
    </div>
  );
}