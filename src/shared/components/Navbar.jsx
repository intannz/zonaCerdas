import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiUser, BiLogOut } from 'react-icons/bi';
import LogoZonaCerdas from '../../assets/images/zona-cerdas-logo.svg';

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  
  // State untuk mengontrol buka-tutup dropdown avatar
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // --- DUMMY USER DATA: Sesuai dengan response GET /api/auth/me ---
  const user = {
    name: "Budi Santoso",
    email: "budi@gmail.com",
    role: "USER" // Bisa diganti 'CONTRIBUTOR' untuk tes tampilan navbar
  };

  // Menutup dropdown otomatis jika pengguna mengklik di luar area menu avatar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fungsi simulasi logout (Sesuai POST /api/auth/logout)
  const handleLogout = () => {
    setIsDropdownOpen(false);
    // Nanti di sini tempat memanggil authService.logout() dan menghapus token
    alert("Berhasil Logout. Mengarahkan kembali ke halaman login.");
    navigate('/auth/login');
  };

  return (
    <nav className="w-full h-20 bg-white/90 border-b border-[#CCC3D8]/30 backdrop-blur-md sticky top-0 z-50 flex items-center px-10">
      <div className="w-full max-w-7xl mx-auto flex items-center relative">
        
        {/* --- KIRI: LOGO --- */}
        <div className="flex flex-shrink-0 items-center">
          <Link to={user.role === 'CONTRIBUTOR' ? '/contributor/my-contents' : '/catalog'} className="flex items-center">
            <img 
              src={LogoZonaCerdas} 
              alt="Logo Zona Cerdas" 
              className="h-8 w-auto" 
            />
          </Link>
        </div>

        {/* --- TENGAH: NAVIGASI --- */}
        <div className="flex-grow flex justify-center font-['Nunito_Sans'] font-bold text-[14px]">
          <div className="flex gap-8">
            {user.role === 'USER' ? (
              <>
                <Link 
                  to="/catalog" 
                  className={`py-7 border-b-2 transition-colors ${
                    currentPath.includes('/catalog') 
                      ? 'border-[#630ED4] text-[#630ED4]' 
                      : 'border-transparent text-[#4A4455] hover:text-[#630ED4]'
                  }`}
                >
                  Pasar Game
                </Link>
                <Link 
                  to="/library" 
                  className={`py-7 border-b-2 transition-colors ${
                    currentPath === '/library' 
                      ? 'border-[#630ED4] text-[#630ED4]' 
                      : 'border-transparent text-[#4A4455] hover:text-[#630ED4]'
                  }`}
                >
                  Koleksi Game
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/contributor/my-contents" 
                  className={`py-7 border-b-2 transition-colors ${
                    currentPath.includes('/contributor/my-contents') 
                      ? 'border-[#630ED4] text-[#630ED4]' 
                      : 'border-transparent text-[#4A4455] hover:text-[#630ED4]'
                  }`}
                >
                  Game Saya
                </Link>
              </>
            )}
          </div>
        </div>

        {/* --- KANAN: AVATAR DENGAN DROPDOWN --- */}
        <div className="flex items-center ml-auto flex-shrink-0" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-10 h-10 rounded-full bg-[#630ED4] flex items-center justify-center text-white hover:bg-[#4800B2] transition-colors shadow-sm focus:outline-none"
          >
            <BiUser className="text-xl" />
          </button>

          {/* Elemen Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-14 w-64 bg-white rounded-[20px] shadow-[0px_10px_30px_rgba(0,0,0,0.15)] border border-[#CCC3D8]/30 py-4 flex flex-col z-50">
              
              {/* Bagian Atas: Info Akun Singkat */}
              <div className="px-5 pb-3 border-b border-gray-100 flex flex-col">
                <span className="font-['Quicksand'] font-bold text-[16px] text-[#263143] truncate">
                  {user.name}
                </span>
                <span className="font-['Nunito_Sans'] text-xs text-[#6C778D] truncate">
                  {user.email}
                </span>
                <span className="inline-block max-w-max mt-1.5 bg-[#DEE8FF] text-[#630ED4] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {user.role}
                </span>
              </div>

              {/* Bagian Bawah: Aksi */}
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