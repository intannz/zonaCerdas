import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiUser, BiEnvelope, BiMap, BiCalendar, BiJoystick, BiMoney, BiTrendingUp } from 'react-icons/bi';
import { authService } from '../../auth/services/authService';
import { contributorService } from '../services/contributorService';

export default function Profile() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setIsLoading(true);

        // Menembak 4 API BERSAMAAN dengan error handling individu
        // Jadi kalau ada 1 API yang error (misal API balance belum siap di backend), 
        // sisanya tetep jalan dan ga bikin layar stuck loading.
        const [meRes, contentsRes, balanceRes, transactionsRes] = await Promise.all([
          authService.getMe().catch(err => { console.error("Error getMe:", err); return null; }),
          contributorService.getMyContents().catch(err => { console.error("Error getMyContents:", err); return []; }),
          contributorService.getBalance().catch(err => { console.error("Error getBalance:", err); return { balance: 0 }; }),
          contributorService.getTransactions().catch(err => { console.error("Error getTransactions:", err); return []; })
        ]);

        const actualContents = Array.isArray(contentsRes) ? contentsRes : [];
        const actualTransactions = Array.isArray(transactionsRes) ? transactionsRes : [];

        setDashboardData({
          user: {
            name: meRes?.name || "Kreator",
            email: meRes?.email || "-",
            role: meRes?.role || "CONTRIBUTOR",
            joinedAt: new Date().toISOString()
          },
          contents: actualContents,
          stats: {
            totalGames: actualContents.length,
            totalRevenue: balanceRes?.balance || 0,
            totalPurchases: actualTransactions.length
          }
        });
      } catch (error) {
        console.error("Gagal memuat profil keseluruhan:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  const formatDate = (dateString) => {
    if(!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });
  };

  if (isLoading || !dashboardData) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F6EEFC] text-[#630ED4] font-bold animate-pulse">Memuat Profil Asli...</div>;
  }

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
              <span className="bg-[#8A4CFC]/10 text-[#712AE2] font-bold text-xs px-3 py-1 rounded-full">Kreator Aktif</span>
            </div>
            <div className="w-full border-t border-[#CCC3D8]/30 mb-6"></div>
            <div className="w-full flex flex-col gap-4">
              <h3 className="font-bold text-sm text-[#1D1A24]">Informasi Personal</h3>
              <div className="flex items-center gap-3 text-[#4A4455]">
                <BiEnvelope className="text-[#4800A0] text-lg" /> <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-[#4A4455]">
                <BiMap className="text-[#4800A0] text-lg" /> <span className="text-sm">Indonesia</span>
              </div>
              <div className="flex items-center gap-3 text-[#4A4455]">
                <BiCalendar className="text-[#4800A0] text-lg" /> <span className="text-sm">Online</span>
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
            
            <div className="md:col-span-2 bg-white rounded-[24px] shadow-[0px_4px_20px_rgba(99,14,212,0.05)] p-8 flex flex-col justify-center relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-bold text-[#630ED4] uppercase tracking-wide">Total Pembelian</span>
                <Link to="/contributor/transactions" className="text-sm font-bold text-[#4800A0] hover:text-[#630ED4] hover:underline flex items-center gap-1 transition-colors">
                  Lihat Selengkapnya &gt;
                </Link>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-['Quicksand'] font-bold text-5xl text-[#1D1A24]">{stats.totalPurchases.toLocaleString('id-ID')}</span>
                <div className="flex items-center gap-1 text-green-600 font-bold text-base mt-2">
                  <BiTrendingUp /> <span>Aktivitas terbaru</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KOLEKSI GAME SECTION */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="font-['Quicksand'] font-bold text-3xl text-[#4800A0] mb-1">Koleksi Game Terakhir</h2>
            </div>
            <Link to="/contributor/my-contents" className="text-[#630ED4] font-bold text-sm hover:underline flex items-center gap-1">
              Lihat Semua &gt;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contents.slice(0, 3).map((game) => (
              <div key={game.id} className="bg-white rounded-[24px] shadow-[0px_4px_20px_rgba(99,14,212,0.05)] overflow-hidden flex flex-col h-[400px]">
                <div className="h-[200px] w-full bg-[#E8DFEE] flex items-center justify-center flex-shrink-0">
                   <BiJoystick className="text-6xl text-[#4800A0]/30" />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-['Quicksand'] font-bold text-xl text-[#4800A0] line-clamp-1">{game.title}</h3>
                    <p className="text-[#4A4455] text-sm line-clamp-2 leading-relaxed">Harga: {formatCurrency(game.price || 0)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4">
                    <span className="text-xs text-[#4A4455]">Dirilis: {formatDate(game.createdAt || game.updatedAt)}</span>
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