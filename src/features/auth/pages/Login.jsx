import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiShow, BiHide, BiArrowBack } from 'react-icons/bi';
import { authService } from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userData = await authService.login(formData);
      localStorage.setItem('isLoggedIn', 'true');
      alert("Login berhasil!");
      
      if (userData.role === 'CONTRIBUTOR') {
        navigate('/contributor/my-contents');
      } else {
        navigate('/catalog');
      }
      
    } catch (error) {
      console.error("Detail Error Login:", error.response?.data || error.message);
      const backendMessage = error.response?.data?.message || error.response?.data?.error;
      
      if (backendMessage) {
        alert(`Login gagal: ${backendMessage}`);
      } else {
        alert("Login gagal. Pastikan email dan kata sandi Anda benar.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[480px] flex flex-col">
      
      {/* TOMBOL KEMBALI DI LUAR KARTU */}
      <div className="mb-4">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1 text-[#6C778D] hover:text-[#630ED4] transition-colors font-['Nunito_Sans'] font-bold text-sm group"
        >
          <BiArrowBack className="text-xl group-hover:-translate-x-1 transition-transform" />
          Kembali ke Beranda
        </Link>
      </div>

      <div className="bg-white rounded-[35px] shadow-[0px_10px_30px_rgba(0,0,0,0.05)] p-10 md:p-12 flex flex-col items-center">
        <h1 className="font-['Quicksand'] font-bold text-[32px] text-[#630ED4] mb-2 text-center">
          Selamat Datang!
        </h1>
        <p className="text-[#6B7280] font-['Nunito_Sans'] text-[16px] text-center mb-8">
          Silakan masuk ke akun Zona Cerdas Anda.
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[#263143] text-[14px]">Email</label>
            <input 
              type="email" 
              placeholder="Masukkan email Anda"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-[#F5F0FF] border border-[#CCC3D8] rounded-[18px] px-5 py-3.5 outline-none focus:border-[#630ED4] focus:ring-1 focus:ring-[#630ED4] transition"
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label className="font-bold text-[#263143] text-[14px]">Kata Sandi</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Masukkan kata sandi"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-[#F5F0FF] border border-[#CCC3D8] rounded-[18px] pl-5 pr-12 py-3.5 outline-none focus:border-[#630ED4] focus:ring-1 focus:ring-[#630ED4] transition"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C778D] hover:text-[#630ED4] text-xl transition-colors focus:outline-none"
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#630ED4] text-white font-['Quicksand'] font-bold text-[16px] py-4 rounded-full mt-4 hover:bg-[#4800B2] transition-colors shadow-sm disabled:bg-gray-400"
          >
            {isLoading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p className="mt-8 text-[#6B7280] text-[14px]">
          Belum punya akun?{' '}
          <Link to="/auth/register" className="text-[#630ED4] font-bold hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}