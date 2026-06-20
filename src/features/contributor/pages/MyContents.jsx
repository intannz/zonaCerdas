import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiPlus, BiStar, BiRocket, BiDotsVerticalRounded } from 'react-icons/bi';

export default function MyContents() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const myContentsData = [
        { 
          id: "c1", 
          title: "Petualangan Aljabar", 
          description: "Game RPG untuk mempelajari dasar aljabar bagi siswa SMP dengan tantangan interaktif.", 
          status: "Aktif",
          updatedAt: "2024-01-02T00:00:00Z"
        },
        { 
          id: "c2", 
          title: "Detektif Sejarah: Majapahit", 
          description: "Misi misteri mengungkap fakta-fakta sejarah kerajaan Majapahit yang dikemas secara interaktif.", 
          status: "Menunggu Review",
          updatedAt: "2023-12-15T00:00:00Z"
        },
        { 
          id: "c3", 
          title: "Lab Kimia Virtual", 
          description: "Simulasi pencampuran zat kimia dengan efek visual yang menyenangkan dan aman.", 
          status: "Aktif",
          updatedAt: "2023-11-28T00:00:00Z"
        }
      ];

      setTimeout(() => {
        setDashboardData({
          contents: myContentsData,
          stats: { totalPlayers: 12480, averageRating: 4.8, activeGames: 12 }
        });
        setIsLoading(false);
      }, 800);
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FEF7FF] text-[#630ED4] font-bold animate-pulse">Memuat Manajemen Game...</div>;
  }

  const { contents, stats } = dashboardData;

  return (
    <div className="min-h-screen bg-[#FEF7FF] pt-12 pb-20 px-6 md:px-10 font-['Nunito_Sans']">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-[670px]">
            <h1 className="font-['Quicksand'] font-bold text-[40px] md:text-[48px] text-[#630ED4] leading-tight mb-2">
              Manajemen Game Anda
            </h1>
            <p className="text-[#4A4455] text-lg">
              Kelola, pantau performa, dan publikasikan konten edukatif baru untuk para siswa di seluruh Indonesia.
            </p>
          </div>
          <button 
            onClick={() => navigate('/contributor/upload')}
            className="flex items-center gap-2 bg-[#8A4CFC] text-white font-['Quicksand'] font-bold text-lg px-8 py-3.5 rounded-xl hover:bg-[#712AE2] transition-all shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]"
          >
            <BiPlus className="text-2xl" /> Tambah Game Baru
          </button>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F9F1FF] border border-[#CCC3D8]/30 rounded-[24px] p-6 flex flex-col justify-center relative">
            <span className="text-sm font-bold text-[#630ED4] uppercase tracking-wider mb-3">Total Pemain</span>
            <div className="flex flex-col">
              <span className="font-['Quicksand'] font-bold text-5xl text-[#1D1A24] tracking-tight">{stats.totalPlayers.toLocaleString('en-US')}</span>
              <span className="text-[#16A34A] font-bold text-sm mt-1 flex items-center gap-1">↗ +15% bulan ini</span>
            </div>
          </div>
          <div className="bg-white border border-[#CCC3D8]/30 shadow-sm rounded-[24px] p-6 flex flex-col items-center justify-center">
            <BiStar className="text-5xl text-[#630ED4] mb-2" />
            <span className="font-['Quicksand'] font-bold text-3xl text-[#1D1A24]">{stats.averageRating}</span>
            <span className="text-[#4A4455] text-sm">Rating Rata-rata</span>
          </div>
          <div className="bg-[#630ED4] rounded-[24px] p-6 flex flex-col items-center justify-center text-white">
            <BiRocket className="text-5xl mb-2" />
            <span className="font-['Quicksand'] font-bold text-3xl">{stats.activeGames}</span>
            <span className="text-sm opacity-90">Game Aktif</span>
          </div>
        </div>

        {/* DAFTAR GAME SAYA */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="font-['Quicksand'] font-bold text-3xl text-[#1D1A24]">Daftar Game Saya</h2>
            <div className="flex gap-2">
              <button onClick={() => alert('Fitur Filter akan segera hadir')} className="w-10 h-10 bg-[#EDE5F4] rounded-lg flex items-center justify-center text-[#4A4455] hover:bg-[#E8DFEE] transition">≡</button>
              <button onClick={() => alert('Fitur Sortir akan segera hadir')} className="w-10 h-10 bg-[#EDE5F4] rounded-lg flex items-center justify-center text-[#4A4455] hover:bg-[#E8DFEE] transition">↓</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contents.map((game) => (
              <div key={game.id} className="bg-white rounded-[24px] border border-[#CCC3D8]/20 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col h-[410px] relative">
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold z-10 ${game.status === 'Aktif' ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEF9C3] text-[#A16207]'}`}>
                  {game.status}
                </div>
                <div className="h-[190px] w-full bg-[#F3EBFA] flex items-center justify-center flex-shrink-0 relative">
                  <div className="w-16 h-16 bg-[#630ED4] rounded-xl flex items-center justify-center text-white text-3xl font-bold font-['Quicksand']">
                    {game.title.charAt(0)}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div className="flex flex-col gap-2 relative">
                    <div className="flex justify-between items-start">
                      <h3 className="font-['Quicksand'] font-bold text-xl text-[#1D1A24] leading-tight pr-6 line-clamp-2">{game.title}</h3>
                      {/* Tombol Edit */}
                      <button 
                        onClick={() => navigate(`/contributor/edit/${game.id}`)}
                        className="text-[#7B7487] hover:text-[#630ED4] transition-colors absolute right-0 top-0 p-1"
                        title="Edit Game"
                      >
                        <BiDotsVerticalRounded className="text-2xl" />
                      </button>
                    </div>
                    <p className="text-[#4A4455] text-sm line-clamp-2 leading-relaxed">{game.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4">
                    <div className="flex items-center gap-1 text-xs font-bold text-[#1D1A24]">
                      <span className="text-[#EAB308]">★</span> {game.status === 'Aktif' ? '4.9' : '--'}
                    </div>
                    <span className="text-[11px] text-[#7B7487] font-semibold">Update: {formatDate(game.updatedAt)}</span>
                  </div>
                </div>
              </div>
            ))}

            <button onClick={() => navigate('/contributor/upload')} className="bg-[#F9F1FF] border-2 border-dashed border-[#CCC3D8] rounded-[24px] h-[410px] flex flex-col items-center justify-center gap-4 hover:bg-[#F3EBFA] hover:border-[#630ED4]/50 transition-all group">
              <div className="w-16 h-16 bg-[#630ED4]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <BiPlus className="text-3xl text-[#630ED4]" />
              </div>
              <div className="text-center px-6">
                <h3 className="font-['Quicksand'] font-bold text-2xl text-[#1D1A24] mb-2">Buat Karya Baru</h3>
                <p className="text-[#4A4455] text-sm">Tuangkan ide cemerlangmu menjadi game yang edukatif.</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}