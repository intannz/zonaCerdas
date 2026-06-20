import { BiCheckCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export default function PurchaseSuccessModal({ isOpen, onClose, gameTitle }) {
  if (!isOpen) return null;

  return (
    // Backdrop / Latar Belakang Gelap Transparan
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#263143]/40 backdrop-blur-sm">
      
      {/* Modal Box */}
      <div className="bg-white rounded-[35px] p-8 md:p-10 w-full max-w-[420px] flex flex-col items-center text-center shadow-[0px_20px_40px_rgba(0,0,0,0.1)] animate-[bounce_0.3s_ease-out_1]">
        
        {/* Ikon Sukses */}
        <div className="w-24 h-24 bg-[#DEE8FF] rounded-full flex items-center justify-center mb-6 shadow-inner">
          <BiCheckCircle className="text-6xl text-[#630ED4]" />
        </div>

        {/* Judul & Teks */}
        <h2 className="font-['Quicksand'] font-bold text-[28px] text-[#263143] mb-3 leading-tight">
          Pembayaran Berhasil!
        </h2>
        <p className="font-['Nunito_Sans'] text-[16px] text-[#6C778D] mb-8">
          Yey! Akses untuk <span className="font-bold text-[#630ED4]">{gameTitle}</span> telah terbuka. Sekarang kamu bisa memainkannya kapan saja.
        </p>

        {/* Tombol Aksi */}
        <div className="flex flex-col w-full gap-3">
          <Link
            to="/library"
            className="w-full bg-[#630ED4] text-white font-['Quicksand'] font-bold text-[16px] py-3.5 rounded-full hover:bg-[#4800B2] transition-colors shadow-sm"
          >
            Buka Koleksi Game
          </Link>
          <button
            onClick={onClose}
            className="w-full bg-[#F5F0FF] text-[#630ED4] font-['Quicksand'] font-bold text-[16px] py-3.5 rounded-full hover:bg-[#DEE8FF] transition-colors"
          >
            Nanti Saja
          </button>
        </div>
        
      </div>
    </div>
  );
}