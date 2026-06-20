import { Link } from 'react-router-dom';
import { BiEnvelope, BiLockAlt, BiShow, BiLogoGoogle } from "react-icons/bi";

export default function Login() {
  return (
    <div className="bg-white shadow-[0_10px_30px_rgba(99,14,212,0.05)] rounded-[35px] p-12 w-full max-w-[480px]">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="font-['Quicksand'] font-bold text-[#4800A0] text-xl mb-2">Zona Cerdas</h2>
        <h1 className="font-['Quicksand'] font-bold text-[#1D1A24] text-[32px] leading-[38px] mb-2 tracking-tight">
          Masuk ke Zona Cerdas
        </h1>
        <p className="text-[#4A4455] text-base">
          Selamat datang kembali! Lanjutkan petualangan belajarmu.
        </p>
      </div>

      {/* Form Login */}
      <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        
        {/* Input Email */}
        <div className="flex flex-col gap-2 relative">
          <label className="text-[#4A4455] font-bold text-sm ml-1">Email</label>
          <div className="relative">
            <BiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A4455] text-xl" />
            <input 
              type="email" 
              placeholder="nama@email.com"
              className="w-full bg-[#DEE8FF] rounded-[15px] py-4 pr-4 pl-12 text-[#7B7487] outline-none focus:ring-2 focus:ring-[#630ED4] transition"
            />
          </div>
        </div>

        {/* Input Password */}
        <div className="flex flex-col gap-2 relative">
          <label className="text-[#4A4455] font-bold text-sm ml-1">Kata Sandi</label>
          <div className="relative">
            <BiLockAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A4455] text-xl" />
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-[#DEE8FF] rounded-[15px] py-4 pr-12 pl-12 text-[#7B7487] outline-none focus:ring-2 focus:ring-[#630ED4] transition"
            />
            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4A4455] hover:text-[#630ED4]">
              <BiShow className="text-xl" />
            </button>
          </div>
          <div className="text-right mt-1">
            <a href="#" className="text-[#4800A0] text-xs font-semibold hover:underline">Lupa kata sandi?</a>
          </div>
        </div>

        {/* Tombol Masuk */}
        <button 
          type="submit"
          className="w-full bg-[#630ED4] text-white font-['Quicksand'] font-bold text-2xl py-4 rounded-[15px] hover:bg-[#4800A0] transition shadow-sm mt-2 flex justify-center items-center gap-2"
        >
          Masuk <span>→</span>
        </button>

      </form>

      {/* Divider "Atau masuk dengan" */}
      <div className="relative flex items-center justify-center my-8">
        <div className="absolute w-full border-t border-[#E8DFEE]"></div>
        <span className="bg-white px-4 text-[#4A4455] text-xs font-semibold relative z-10">
          Atau masuk dengan
        </span>
      </div>

      {/* Tombol Social Login */}
      <button className="w-full border-2 border-[#8A4CFC] text-[#8A4CFC] font-bold text-sm py-4 rounded-[15px] flex items-center justify-center gap-3 hover:bg-[#F5F0FF] transition">
        <BiLogoGoogle className="text-2xl" /> Google
      </button>

      {/* Link ke halaman Register */}
      <div className="text-center mt-8 text-[#4A4455]">
        Belum punya akun?{' '}
        <Link to="/auth/register" className="text-[#4800A0] font-bold hover:underline">
          Daftar Sekarang
        </Link>
      </div>

    </div>
  );
}