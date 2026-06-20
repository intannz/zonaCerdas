import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiUser, BiEnvelope, BiMap, BiCalendar, BiJoystick, BiMoney, BiTrendingUp } from 'react-icons/bi';

export default function Profile() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setTimeout(() => {
        setDashboardData({
          user: {
            name: "Creator Kece",
            email: "budi.santoso@email.id",
            role: "CONTRIBUTOR",
            joinedAt: "2024-01-01T00:00:00Z"
          },
          contents: [
            { id: "c1", title: "Petualangan Angka", description: "Belajar berhitung melalui petualangan seru di pulau geometris yang ajaib." },
            { id: "c2", title: "Labirin Logika", description: "Tantang otakmu dengan ratusan level labirin yang memerlukan pemikiran kritis." },
            { id: "c3", title: "Memori Kata", description: "Asah daya ingatmu sambil memperkaya kosa kata bahasa Indonesia." }
          ],
          stats: {
            totalGames: 12,
            totalRevenue: 2400000,
            totalPurchases: 12480
          }
        });
        setIsLoading(false);
      }, 800);
    };
    fetchDashboard();
  }, []);

  const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-[#F6EEFC] text-[#630ED4] font-bold animate-pulse">Memuat Profil...</div>;

  const { user, stats, contents } = dashboardData;

  return (
    <div className="min-h-screen bg-[#F6EEFC] pt-12 pb-20 px-6 md:px-10 font-['Nunito_Sans']">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-14">
        
        {/* HERO PROFILE SECTION */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
          <div className="w-full lg:w-[380px] bg-white rounded-[24px] shadow-[0px_4px_20px_rgba(99,14,212,0.05)] p-8 flex flex-col items-center">
            <div className="w-24 h-24 bg-[#630ED4] rounded-full flex items-center justify-center mb-4">
              <BiUser className="text-4xl text-[#CDB4FF]" />
            </div>
            <h1 className="font-['Quicksand'] font-bold text-2xl text-[#4800A0] mb-1 text-center">{user.name}</h1>
            <p className="text-[#4A4455] text-base mb-4 text-center">Pengembang Game Edukasi</p>
            <div className="flex gap-2 mb-8">
              <span className="bg-[#8A4CFC]/10 text-[#712AE2] font-bold text-xs px-3 py-1 rounded-full">Matematika</span>
              <span className="bg-[#8A4CFC]/10 text-[#712AE2] font-bold text-xs px-3 py-1 rounded-full">Logika</span>
            </div>
            <div className="w-full border-t border-[#CCC3D8]/30 mb-6"></div>
            <div className="w-full flex flex-col gap-4">
              <h3 className="font-bold text-sm text-[#1D1A24]">Informasi Personal</h3>
              <div className="flex items-center gap-3 text-[#4A4455]">
                <BiEnvelope className="text-[#4800A0] text-lg" /> <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-[#4A4455]">
                <BiMap className="text-[#4800A0] text-lg" /> <span className="text-sm">Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center gap-3 text-[#4A4455]">
                <BiCalendar className="text-[#4800A0] text-lg" /> <span className="text-sm">Bergabung: {formatDate(user.joinedAt)}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[24px] shadow-[0px_4px_20px_rgba(99,14,212,0.05)] p-8 flex flex-col items-center justify-center">
              <div className="w-20 h-16 bg-[#4800A0]/10 rounded-xl flex items-center justify-center mb-4">
                <BiJoystick className="text-4xl text-[#4800A0]" />
              </div>
              <span className="font-['Quicksand'] font-bold text-4xl text-[#4800A0] mb-1">{stats.totalGames}</span>
              <span className="text-xs text-[#4A4455] uppercase tracking-wider">Total Game Dibuat</span>
            </div>
            
            <div className="bg-white rounded-[24px] shadow-[0px_4px_20px_rgba(99,14,212,0.05)] p-8 flex flex-col items-center justify-center">
              <div className="w-20 h-16 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                <BiMoney className="text-4xl text-green-600" />
              </div>
              <span className="font-['Quicksand'] font-bold text-3xl text-[#4800A0] mb-1">{formatCurrency(stats.totalRevenue)}</span>
              <span className="text-xs text-[#4A4455] uppercase tracking-wider">Total Pendapatan</span>
            </div>
            
            {/* --- CARD TOTAL PEMBELIAN YANG DIUPDATE --- */}
            <div className="md:col-span-2 bg-white rounded-[24px] shadow-[0px_4px_20px_rgba(99,14,212,0.05)] p-8 flex flex-col justify-center relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-bold text-[#630ED4] uppercase tracking-wide">Total Pembelian</span>
                
                <Link 
                  to="/contributor/transactions" 
                  className="text-sm font-bold text-[#4800A0] hover:text-[#630ED4] hover:underline flex items-center gap-1 transition-colors"
                >
                  Lihat Selengkapnya &gt;
                </Link>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="font-['Quicksand'] font-bold text-5xl text-[#1D1A24]">{stats.totalPurchases.toLocaleString('id-ID')}</span>
                <div className="flex items-center gap-1 text-green-600 font-bold text-base mt-2">
                  <BiTrendingUp /> <span>+15% bulan ini</span>
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* KOLEKSI GAME SECTION */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="font-['Quicksand'] font-bold text-3xl text-[#4800A0] mb-1">Koleksi Game</h2>
              <p className="text-[#4A4455] text-base">Game yang telah dipublikasikan di Zona Cerdas</p>
            </div>
            <Link to="/contributor/my-contents" className="text-[#630ED4] font-bold text-sm hover:underline flex items-center gap-1">
              Lihat Semua &gt;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contents.map((game) => (
              <div key={game.id} className="bg-white rounded-[24px] shadow-[0px_4px_20px_rgba(99,14,212,0.05)] overflow-hidden flex flex-col h-[400px]">
                <div className="h-[200px] w-full bg-[#E8DFEE] flex items-center justify-center flex-shrink-0">
                   <BiJoystick className="text-6xl text-[#4800A0]/30" />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-['Quicksand'] font-bold text-xl text-[#4800A0] line-clamp-1">{game.title}</h3>
                    <p className="text-[#4A4455] text-sm line-clamp-2 leading-relaxed">{game.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4">
                    <span className="text-xs text-[#4A4455]">Dipublikasikan</span>
                    <Link to={`/contributor/edit/${game.id}`} className="border-2 border-[#4800A0]/20 text-[#4800A0] font-['Nunito_Sans'] font-bold px-6 py-1.5 rounded-full hover:bg-[#DEE8FF] transition-colors">
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}