import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiUser, BiLogOut } from 'react-icons/bi';
import LogoZonaCerdas from '../../assets/images/zona-cerdas-logo.svg';
import { authService } from '../../features/auth/services/authService';

export default function ContributorNavbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // --- STATE USER DATA: Menarik data asli dari API ---
  const [user, setUser] = useState({
    name: "Memuat...",
    email: "Menyiapkan data...",
    role: "CONTRIBUTOR"
  });

  // Efek untuk menutup dropdown jika klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- EFEK UNTUK MENARIK DATA USER DARI API ---
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const data = await authService.getMe();
          if (data) {
            setUser({
              name: data.name,
              email: data.email,
              role: data.role
            });
          }
        } catch (error) {
          console.error("Gagal memuat profil Contributor Navbar:", error);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await authService.logout();
    alert("Berhasil Logout. Mengarahkan kembali ke halaman login.");
    navigate('/auth/login');
  };

  return (
    <nav className="w-full h-20 bg-white/90 border-b border-[#CCC3D8]/30 backdrop-blur-md sticky top-0 z-50 flex items-center px-10">
      <div className="w-full max-w-[1280px] mx-auto flex items-center justify-between relative">
        
        {/* --- KIRI: LOGO GAMBAR --- */}
        <div className="flex flex-shrink-0 items-center">
          {/* Link diperbarui untuk mengarah ke rute Landing Page ("/") */}
          <Link to="/" className="flex items-center">
            <img 
              src={LogoZonaCerdas} 
              alt="Logo Zona Cerdas" 
              className="h-8 w-auto" 
            />
          </Link>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex gap-8 font-['Nunito_Sans'] font-bold text-[14px]">
          <Link 
            to="/contributor/my-contents" 
            className={`py-7 border-b-2 transition-colors ${
              currentPath.includes('/my-contents') 
                ? 'border-[#4800A0] text-[#4800A0]' 
                : 'border-transparent text-[#4A4455] hover:text-[#4800A0]'
            }`}
          >
            Game Saya
          </Link>
          
          <Link 
            to="/contributor/profile" 
            className={`py-7 border-b-2 transition-colors ${
              currentPath.includes('/profile') 
                ? 'border-[#4800A0] text-[#4800A0]' 
                : 'border-transparent text-[#4A4455] hover:text-[#4800A0]'
            }`}
          >
            Profil
          </Link>
        </div>

        {/* --- KANAN: AVATAR DENGAN DROPDOWN --- */}
        <div className="flex items-center flex-shrink-0" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-10 h-10 rounded-full bg-[#4800A0] flex items-center justify-center text-white hover:bg-[#360088] transition-colors shadow-sm focus:outline-none"
          >
            <BiUser className="text-xl" />
          </button>

          {/* Elemen Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-14 w-64 bg-white rounded-[20px] shadow-[0px_10px_30px_rgba(0,0,0,0.15)] border border-[#CCC3D8]/30 py-4 flex flex-col z-50">
              <div className="px-5 pb-3 border-b border-gray-100 flex flex-col">
                <span className="font-['Quicksand'] font-bold text-[16px] text-[#263143] truncate">
                  {user.name}
                </span>
                <span className="font-['Nunito_Sans'] text-xs text-[#6C778D] truncate">
                  {user.email}
                </span>
                <span className="inline-block max-w-max mt-1.5 bg-[#DEE8FF] text-[#4800A0] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {user.role}
                </span>
              </div>
              <div className="px-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-[12px] font-['Quicksand'] font-bold text-[14px] text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                  <BiLogOut className="text-lg" />
                  Keluar Akun
                </button>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </nav>
  );
}