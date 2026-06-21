import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiJoystick, BiInfoCircle, BiSupport, BiShieldQuarter } from 'react-icons/bi';
import { catalogService } from '../../catalog/services/catalogService';

export default function LandingPage() {
  const navigate = useNavigate();
  const [featuredGames, setFeaturedGames] = useState([]);
  const role = localStorage.getItem('role'); 

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await catalogService.getAll();
        const games = response?.data || response || [];
        setFeaturedGames(games.slice(0, 3));
      } catch (error) {
        console.error("Gagal ambil data katalog:", error);
      }
    };
    fetchCatalog();
  }, []);

  const handleCariMateri = () => {
    if (role === 'CONTRIBUTOR') {
      navigate('/contributor/my-contents');
    } else {
      navigate('/catalog');
    }
  };

  return (
    <div className="bg-[#FEF7FF] min-h-screen font-['Nunito_Sans'] text-[#4A4455]">
      
      {/* 1. HERO SECTION */}
      <section className="pt-20 pb-24 px-6 md:px-10 max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className="font-['Quicksand'] font-bold text-5xl md:text-6xl text-[#630ED4] leading-tight mb-6">
            Pusat Pembelajaran Interaktif untuk Kelas Anda
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Zona Cerdas menjadi jembatan antara kreator game edukatif dengan Guru dan Siswa. Hadirkan materi interaktif yang memikat langsung di layar kelas Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={handleCariMateri}
              className="bg-[#630ED4] text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-[#4800A0] transition shadow-lg"
            >
              {role === 'CONTRIBUTOR' ? 'Kelola Konten' : 'Cari Materi'}
            </button>
            {role !== 'CONTRIBUTOR' && (
              <button 
                onClick={() => navigate('/auth/register')}
                className="bg-white border-2 border-[#630ED4] text-[#630ED4] font-bold text-lg px-8 py-4 rounded-full hover:bg-[#F9F1FF] transition"
              >
                Jadilah Kontributor
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[400px] aspect-square bg-[#EFE5FF] rounded-full flex items-center justify-center relative shadow-[0px_20px_50px_rgba(99,14,212,0.15)]">
            <BiJoystick className="text-[150px] text-[#630ED4]" />
            <div className="absolute top-10 right-10 bg-white p-3 rounded-2xl shadow-md rotate-12">
               <span className="font-bold text-[#16A34A]">Interaktif</span>
            </div>
            <div className="absolute bottom-10 left-10 bg-white p-3 rounded-2xl shadow-md -rotate-12">
               <span className="font-bold text-[#EAB308]">Edukasi</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GAME UNGGULAN (Hanya muncul jika bukan Contributor) */}
      {role !== 'CONTRIBUTOR' && (
        <section className="py-20 px-6 md:px-10 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="font-['Quicksand'] font-bold text-3xl text-[#1D1A24] mb-2">Koleksi Konten Pilihan</h2>
                <p>Materi pembelajaran interaktif yang disukai oleh para pengajar.</p>
              </div>
              <Link to="/catalog" className="text-[#630ED4] font-bold hover:underline hidden md:block">Lihat Semua &gt;</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredGames.map(game => (
                <div key={game.id} className="bg-[#FEF7FF] rounded-[24px] border border-[#CCC3D8]/30 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition">
                  <div className="w-24 h-24 bg-[#630ED4]/10 rounded-full flex items-center justify-center mb-6">
                    <BiJoystick className="text-5xl text-[#630ED4]" />
                  </div>
                  <h3 className="font-['Quicksand'] font-bold text-xl text-[#1D1A24] mb-2">{game.title}</h3>
                  <span className="bg-white border border-[#CCC3D8]/50 text-[#4A4455] text-xs font-bold px-3 py-1 rounded-full mb-4">
                    {game.subject || "Umum"}
                  </span>
                  <button 
                    onClick={() => navigate(`/catalog/${game.id}`)}
                    className="mt-auto w-full py-3 bg-white text-[#630ED4] border border-[#630ED4]/20 rounded-xl font-bold hover:bg-[#630ED4] hover:text-white transition"
                  >
                    Lihat Detail
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. INFORMASI (Section ini menggunakan icon yang di-import) */}
      <section className="py-24 px-6 md:px-10 max-w-[1200px] mx-auto">
        <h2 className="font-['Quicksand'] font-bold text-3xl text-[#1D1A24] text-center mb-16">Informasi Zona Cerdas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-[#DEE8FF] rounded-2xl flex items-center justify-center text-[#4800A0]"><BiInfoCircle className="text-3xl" /></div>
            <h3 className="font-['Quicksand'] font-bold text-2xl text-[#1D1A24]">Tentang Kami</h3>
            <p>Zona Cerdas adalah platform kolaboratif yang menjembatani talenta developer dengan pendidik untuk menghadirkan pembelajaran inovatif.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-[#DCFCE7] rounded-2xl flex items-center justify-center text-[#15803D]"><BiSupport className="text-3xl" /></div>
            <h3 className="font-['Quicksand'] font-bold text-2xl text-[#1D1A24]">Bantuan</h3>
            <p>Tim support kami siap membantu integrasi materi interaktif di kelas Anda. Hubungi support@zonacerdas.id.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-[#FEF9C3] rounded-2xl flex items-center justify-center text-[#A16207]"><BiShieldQuarter className="text-3xl" /></div>
            <h3 className="font-['Quicksand'] font-bold text-2xl text-[#1D1A24]">Kebijakan Privasi</h3>
            <p>Keamanan data akademik dan hak cipta kreator adalah prioritas utama kami dengan sistem enkripsi terkini.</p>
          </div>
        </div>
      </section>
    </div>
  );
}