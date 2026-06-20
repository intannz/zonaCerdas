import { Link, useLocation } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
// Import logo SVG-nya dari folder images
import LogoZonaCerdas from '../../assets/images/zona-cerdas-logo.svg';

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="w-full h-20 bg-white/90 border-b border-[#CCC3D8]/30 backdrop-blur-md sticky top-0 z-50 flex items-center px-6">
      {/* Container agar lebarnya selaras dengan layout lain */}
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Kiri: Logo */}
        <Link to="/catalog" className="flex items-center">
          <img 
            src={LogoZonaCerdas} 
            alt="Logo Zona Cerdas" 
            className="h-10 w-auto" // Membatasi tinggi logo agar proporsional
          />
        </Link>

        {/* Kanan: Navigasi & Avatar */}
        <div className="flex items-center gap-10">
          
          {/* Menu Links */}
          <div className="flex gap-8 font-['Nunito_Sans'] font-semibold text-[15px]">
            <Link 
              to="/library" 
              className={`py-6 border-b-2 transition-colors ${
                currentPath === '/library' 
                  ? 'border-[#4800A0] text-[#4800A0]' 
                  : 'border-transparent text-[#4A4455] hover:text-[#4800A0]'
              }`}
            >
              Game Saya
            </Link>
            
            <Link 
              to="/profile" 
              className={`py-6 border-b-2 transition-colors ${
                currentPath === '/profile' 
                  ? 'border-[#4800A0] text-[#4800A0]' 
                  : 'border-transparent text-[#4A4455] hover:text-[#4800A0]'
              }`}
            >
              Profil
            </Link>
          </div>

          {/* Avatar User */}
          <Link 
            to="/profile" 
            className="w-10 h-10 rounded-full bg-[#4800A0] flex items-center justify-center text-white hover:bg-[#630ED4] transition-colors shadow-sm"
          >
            <BiUser className="text-xl" />
          </Link>
          
        </div>

      </div>
    </nav>
  );
}