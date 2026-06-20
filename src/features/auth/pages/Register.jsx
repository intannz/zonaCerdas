import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BiUser, 
  BiEnvelope, 
  BiLockAlt, 
  BiSolidFileBlank, // Icon dokumen untuk portofolio
  BiMoneyWithdraw,  // Icon uang untuk Bank & No Rekening
  BiShow,           // Icon mata terbuka
  BiHide            // Icon mata tertutup
} from "react-icons/bi";

export default function Register() {
  // State untuk mengontrol tab yang aktif: 'USER' atau 'CONTRIBUTOR'
  const [role, setRole] = useState('USER');
  // State untuk mengontrol visibilitas kata sandi
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white shadow-[0_10px_30px_rgba(99,14,212,0.05)] rounded-[35px] p-10 w-full max-w-[500px]">
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="font-['Quicksand'] font-bold text-[#4800A0] text-[32px] leading-[38px] mb-2">
          Daftar di Zona Cerdas
        </h1>
        <p className="text-[#4A4455] text-base font-['Nunito_Sans']">
          Bergabunglah dengan komunitas belajar masa depan.
        </p>
      </div>

      {/* Role Selector (Tabs) */}
      <div className="flex gap-4 mb-8">
        <button 
          type="button"
          onClick={() => setRole('USER')}
          className={`flex-1 py-3 rounded-[15px] font-bold text-sm font-['Nunito_Sans'] transition-all ${
            role === 'USER' 
              ? 'bg-[#630ED4] text-white border-2 border-[#630ED4]' 
              : 'bg-white text-[#4800A0] border-2 border-[#EFE5FF]'
          }`}
        >
          Daftar sebagai User
        </button>
        <button 
          type="button"
          onClick={() => setRole('CONTRIBUTOR')}
          className={`flex-1 py-3 rounded-[15px] font-bold text-sm font-['Nunito_Sans'] transition-all ${
            role === 'CONTRIBUTOR' 
              ? 'bg-[#630ED4] text-white border-2 border-[#630ED4]' 
              : 'bg-white text-[#4800A0] border-2 border-[#EFE5FF]'
          }`}
        >
          Daftar sebagai Kontributor
        </button>
      </div>

      {/* Registration Form */}
      <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        
        {/* Input Nama Lengkap (Selalu Muncul) */}
        <div className="flex flex-col gap-2">
          <label className="text-[#4A4455] font-bold text-sm ml-1 font-['Nunito_Sans']">Nama Lengkap</label>
          <div className="relative">
            <BiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B7487] text-xl" />
            <input 
              type="text" 
              placeholder="Masukkan nama lengkap"
              className="w-full bg-[#DEE8FF] rounded-[15px] py-4 pr-4 pl-12 text-[#7B7487] font-['Nunito_Sans'] outline-none focus:ring-2 focus:ring-[#630ED4] transition"
            />
          </div>
        </div>

        {/* --- Area Input Khusus Kontributor --- */}
        {role === 'CONTRIBUTOR' && (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-[#4A4455] font-bold text-sm ml-1 font-['Nunito_Sans']">Portofolio</label>
              <div className="relative">
                <BiSolidFileBlank className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B7487] text-xl" />
                <input 
                  type="url" 
                  placeholder="https://github.com/user"
                  className="w-full bg-[#DEE8FF] rounded-[15px] py-4 pr-4 pl-12 text-[#7B7487] font-['Nunito_Sans'] outline-none focus:ring-2 focus:ring-[#630ED4] transition"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#4A4455] font-bold text-sm ml-1 font-['Nunito_Sans']">BANK</label>
              <div className="relative">
                <BiMoneyWithdraw className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B7487] text-xl" />
                <input 
                  type="text" 
                  placeholder="BCA"
                  className="w-full bg-[#DEE8FF] rounded-[15px] py-4 pr-4 pl-12 text-[#7B7487] font-['Nunito_Sans'] outline-none focus:ring-2 focus:ring-[#630ED4] transition"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#4A4455] font-bold text-sm ml-1 font-['Nunito_Sans']">No. Rekening</label>
              <div className="relative">
                <BiMoneyWithdraw className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B7487] text-xl" />
                <input 
                  type="text" 
                  placeholder="123-456-7891"
                  className="w-full bg-[#DEE8FF] rounded-[15px] py-4 pr-4 pl-12 text-[#7B7487] font-['Nunito_Sans'] outline-none focus:ring-2 focus:ring-[#630ED4] transition"
                />
              </div>
            </div>
          </>
        )}
        {/* --- Batas Area Khusus Kontributor --- */}

        {/* Input Email (Selalu Muncul) */}
        <div className="flex flex-col gap-2">
          <label className="text-[#4A4455] font-bold text-sm ml-1 font-['Nunito_Sans']">Alamat Email</label>
          <div className="relative">
            <BiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B7487] text-xl" />
            <input 
              type="email" 
              placeholder="contoh@email.com"
              className="w-full bg-[#DEE8FF] rounded-[15px] py-4 pr-4 pl-12 text-[#7B7487] font-['Nunito_Sans'] outline-none focus:ring-2 focus:ring-[#630ED4] transition"
            />
          </div>
        </div>

        {/* Input Kata Sandi (Selalu Muncul) */}
        <div className="flex flex-col gap-2">
          <label className="text-[#4A4455] font-bold text-sm ml-1 font-['Nunito_Sans']">Kata Sandi</label>
          <div className="relative">
            <BiLockAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B7487] text-xl" />
            <input 
              // Tipe input berubah dinamis berdasarkan state showPassword
              type={showPassword ? "text" : "password"} 
              placeholder="Min. 8 karakter"
              className="w-full bg-[#DEE8FF] rounded-[15px] py-4 pr-12 pl-12 text-[#7B7487] font-['Nunito_Sans'] outline-none focus:ring-2 focus:ring-[#630ED4] transition"
            />
            {/* Tombol Mata */}
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7B7487] hover:text-[#630ED4] text-xl transition-colors focus:outline-none"
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </button>
          </div>
        </div>

        {/* Tombol Buat Akun */}
        <button 
          type="submit"
          className="w-full bg-[#630ED4] text-white font-['Quicksand'] font-bold text-2xl py-4 rounded-[15px] hover:bg-[#4800A0] transition mt-2"
        >
          Buat Akun
        </button>

      </form>

      {/* Link ke halaman Login */}
      <div className="text-center mt-6 text-[#4A4455] font-['Nunito_Sans']">
        Sudah punya akun?{' '}
        <Link to="/auth/login" className="text-[#630ED4] font-bold hover:underline">
          Masuk
        </Link>
      </div>

    </div>
  );
}