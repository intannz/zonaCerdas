import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiUser, BiEnvelope, BiLockAlt, BiSolidFileBlank, BiMoneyWithdraw, BiShow, BiHide, BiArrowBack } from "react-icons/bi";
import { authService } from '../services/authService';

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState('USER');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', portofolio: '', bankName: '', bankAccount: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (role === 'USER') {
        await authService.registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
      } else {
        await authService.registerContributor({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          portofolio: formData.portofolio,
          bankName: formData.bankName,
          bankAccount: formData.bankAccount
        });
      }
      alert("Pendaftaran berhasil! Silakan masuk.");
      navigate('/auth/login');
    } catch (error) {
      console.error("Registrasi gagal. Detail:", error.response?.data || error.message);
      const backendMessage = error.response?.data?.message || error.response?.data?.error;
      
      if (backendMessage) {
        alert(`Pendaftaran gagal: ${backendMessage}`);
      } else {
        alert("Pendaftaran gagal. Pastikan kata sandi cukup kuat (Huruf besar, angka, simbol) dan email belum terdaftar.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[500px] flex flex-col">
      
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

      <div className="bg-white shadow-[0_10px_30px_rgba(99,14,212,0.05)] rounded-[35px] p-10">
        <div className="text-center mb-6">
          <h1 className="font-['Quicksand'] font-bold text-[#4800A0] text-[32px] leading-[38px] mb-2">Daftar di Zona Cerdas</h1>
          <p className="text-[#4A4455] text-base font-['Nunito_Sans']">Bergabunglah dengan komunitas belajar masa depan.</p>
        </div>

        <div className="flex gap-4 mb-8">
          <button type="button" onClick={() => setRole('USER')} className={`flex-1 py-3 rounded-[15px] font-bold text-sm font-['Nunito_Sans'] transition-all ${role === 'USER' ? 'bg-[#630ED4] text-white border-2 border-[#630ED4]' : 'bg-white text-[#4800A0] border-2 border-[#EFE5FF]'}`}>User</button>
          <button type="button" onClick={() => setRole('CONTRIBUTOR')} className={`flex-1 py-3 rounded-[15px] font-bold text-sm font-['Nunito_Sans'] transition-all ${role === 'CONTRIBUTOR' ? 'bg-[#630ED4] text-white border-2 border-[#630ED4]' : 'bg-white text-[#4800A0] border-2 border-[#EFE5FF]'}`}>Kontributor</button>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-[#4A4455] font-bold text-sm ml-1 font-['Nunito_Sans']">Nama Lengkap</label>
            <div className="relative">
              <BiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B7487] text-xl" />
              <input required type="text" name="name" onChange={handleChange} placeholder="Masukkan nama lengkap" className="w-full bg-[#DEE8FF] rounded-[15px] py-4 pr-4 pl-12 text-[#7B7487] font-['Nunito_Sans'] outline-none focus:ring-2 focus:ring-[#630ED4] transition" />
            </div>
          </div>

          {role === 'CONTRIBUTOR' && (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-[#4A4455] font-bold text-sm ml-1 font-['Nunito_Sans']">Link Portofolio (Github/Web)</label>
                <div className="relative">
                  <BiSolidFileBlank className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B7487] text-xl" />
                  <input required type="url" name="portofolio" onChange={handleChange} placeholder="https://github.com/user" className="w-full bg-[#DEE8FF] rounded-[15px] py-4 pr-4 pl-12 text-[#7B7487] font-['Nunito_Sans'] outline-none focus:ring-2 focus:ring-[#630ED4] transition" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 w-1/3">
                  <label className="text-[#4A4455] font-bold text-sm ml-1 font-['Nunito_Sans']">Bank</label>
                  <div className="relative">
                    <input required type="text" name="bankName" onChange={handleChange} placeholder="BCA" className="w-full bg-[#DEE8FF] rounded-[15px] py-4 px-4 text-[#7B7487] font-['Nunito_Sans'] outline-none focus:ring-2 focus:ring-[#630ED4] transition uppercase" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-2/3">
                  <label className="text-[#4A4455] font-bold text-sm ml-1 font-['Nunito_Sans']">No. Rekening</label>
                  <div className="relative">
                    <BiMoneyWithdraw className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B7487] text-xl" />
                    <input required type="text" name="bankAccount" onChange={handleChange} placeholder="123-456-789" className="w-full bg-[#DEE8FF] rounded-[15px] py-4 pr-4 pl-12 text-[#7B7487] font-['Nunito_Sans'] outline-none focus:ring-2 focus:ring-[#630ED4] transition" />
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-[#4A4455] font-bold text-sm ml-1 font-['Nunito_Sans']">Alamat Email</label>
            <div className="relative">
              <BiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B7487] text-xl" />
              <input required type="email" name="email" onChange={handleChange} placeholder="contoh@email.com" className="w-full bg-[#DEE8FF] rounded-[15px] py-4 pr-4 pl-12 text-[#7B7487] font-['Nunito_Sans'] outline-none focus:ring-2 focus:ring-[#630ED4] transition" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#4A4455] font-bold text-sm ml-1 font-['Nunito_Sans']">Kata Sandi</label>
            <div className="relative">
              <BiLockAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B7487] text-xl" />
              <input required type={showPassword ? "text" : "password"} name="password" onChange={handleChange} placeholder="Min. 8 karakter" className="w-full bg-[#DEE8FF] rounded-[15px] py-4 pr-12 pl-12 text-[#7B7487] font-['Nunito_Sans'] outline-none focus:ring-2 focus:ring-[#630ED4] transition" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7B7487] hover:text-[#630ED4] text-xl focus:outline-none">
                {showPassword ? <BiShow /> : <BiHide />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-[#630ED4] text-white font-['Quicksand'] font-bold text-2xl py-4 rounded-[15px] hover:bg-[#4800A0] transition mt-2 disabled:bg-gray-400">
            {isLoading ? 'Memproses...' : 'Buat Akun'}
          </button>
        </form>

        <div className="text-center mt-6 text-[#4A4455] font-['Nunito_Sans']">
          Sudah punya akun? <Link to="/auth/login" className="text-[#630ED4] font-bold hover:underline">Masuk</Link>
        </div>
      </div>
    </div>
  );
}