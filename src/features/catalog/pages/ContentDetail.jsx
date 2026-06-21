import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BiArrowBack, BiCategory, BiBook, BiTrophy, BiCheckCircle } from 'react-icons/bi';
import PurchaseButton from '../components/PurchaseButton';
import PurchaseSuccessModal from '../components/PurchaseSuccessModal';
import { catalogService } from '../services/catalogService';
import api from '../../../shared/services/api';

export default function ContentDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); 

  const [game, setGame] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const [isOwned, setIsOwned] = useState(false);

  useEffect(() => {
    const fetchGameDetailAndOwnership = async () => {
      try {
        setIsLoadingData(true);
        const responseData = await catalogService.getById(id);
        const actualData = responseData?.data || responseData;

        const safeGame = {
          id: actualData.id || id,
          title: actualData.title || actualData.judul || "Game Tanpa Judul",
          contributorName: actualData.contributorName || actualData.author || actualData.creator || "Kontributor",
          createdAt: actualData.createdAt || actualData.created_at || actualData.tanggalRilis || new Date().toISOString(),
          category: actualData.category || actualData.kategori || "-",
          subject: actualData.subject || actualData.mapel || "-",
          gradeLevel: actualData.gradeLevel || actualData.jenjang || "-",
          description: actualData.description || actualData.deskripsi || "Belum ada deskripsi untuk game ini.",
          price: Number(actualData.price ?? actualData.harga ?? actualData.hargaAkses ?? 0) || 0,
          thumbnailUrl: actualData.thumbnailUrl || actualData.thumbnail_url || actualData.image || actualData.gambar || ""
        };

        setGame(safeGame);

        // --- PERUBAHAN: LOGIKA PENGECEKAN KEPEMILIKAN ---
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const libRes = await api.get('/library');
            
            // Ekstraksi data yang sesuai dengan respons Postman: { data: [ ... ] }
            const actualLibrary = libRes.data?.data || [];

            // Pengecekan ID yang kebal terhadap tipe data (String vs UUID)
            const hasBought = actualLibrary.some(item => {
              const apiGameId = String(item?.content?.id || '').toLowerCase();
              const currentGameId = String(safeGame.id || '').toLowerCase();
              return apiGameId === currentGameId && apiGameId !== '';
            });
            
            setIsOwned(hasBought);
          } catch (err) {
            console.error("Gagal mengecek kepemilikan game:", err);
          }
        }

      } catch (error) {
        console.error("Gagal memuat detail game:", error);
      } finally {
        setIsLoadingData(false);
      }
    };
    
    fetchGameDetailAndOwnership();
  }, [id]);

  const handlePurchase = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert("Ops! Anda harus Masuk atau Daftar terlebih dahulu untuk mengunduh game ini.");
      navigate('/auth/login');
      return; 
    }

    setIsPurchasing(true);
    try {
      await catalogService.purchase(id);
      setShowSuccessModal(true);
      setIsOwned(true); 
    } catch (error) {
      console.error("Error API Pembelian:", error);
      
      // --- PERUBAHAN: LOGIKA PENYELAMAT 400 BAD REQUEST ---
      if (error.response?.status === 400) {
        alert("Anda sudah memiliki game ini. Menuju ke Koleksi Game Anda...");
        setIsOwned(true);
        navigate('/library');
      } else {
        alert("Gagal memproses pembelian. Coba lagi nanti.");
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/library'); 
  };

  const formatPrice = (price) => {
    if (isNaN(price) || price === 0) return 'FREE';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    try {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Tanggal Tidak Valid";
      return date.toLocaleDateString('id-ID', options);
    } catch {
      return "Tanggal Tidak Valid";
    }
  };

  if (isLoadingData || !game) {
    return <div className="p-14 text-center font-['Nunito_Sans'] font-bold text-[#630ED4] animate-pulse">Memuat Data Game...</div>;
  }

  return (
    <div className="p-6 md:p-14 w-full max-w-[1200px] mx-auto">
      <Link to="/catalog" className="inline-flex items-center gap-2 text-[#6C778D] hover:text-[#630ED4] font-['Nunito_Sans'] font-bold text-[16px] mb-8 transition-colors">
        <BiArrowBack className="text-xl" /> Kembali ke Katalog
      </Link>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        <div className="w-full lg:w-1/2 flex-shrink-0">
          <div className="w-full aspect-[4/3] bg-[#E8DFEE] rounded-[35px] shadow-[0px_10px_20px_rgba(0,0,0,0.1)] overflow-hidden relative flex items-center justify-center">
            {game.thumbnailUrl ? (
              <img 
                src={game.thumbnailUrl} 
                alt={game.title} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            
            <div 
              className="absolute inset-0 flex items-center justify-center text-[#630ED4]/40 font-['Quicksand'] font-bold text-3xl"
              style={{ display: game.thumbnailUrl ? 'none' : 'flex' }}
            >
              {game.title ? game.title.charAt(0).toUpperCase() : '?'}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-6">
            <h1 className="font-['Quicksand'] font-bold text-4xl md:text-[42px] text-black leading-tight mb-2">
              {game.title}
            </h1>
            <p className="font-['Nunito_Sans'] text-lg text-[#6B7280]">
              Dibuat oleh <span className="font-bold text-[#630ED4]">{game.contributorName}</span> • Dirilis {formatDate(game.createdAt)}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 bg-[#DEE8FF] text-[#263143] px-4 py-2 rounded-[15px] font-['Nunito_Sans'] font-bold text-sm">
              <BiCategory className="text-lg text-[#630ED4]" /> {game.category}
            </div>
            <div className="flex items-center gap-2 bg-[#DEE8FF] text-[#263143] px-4 py-2 rounded-[15px] font-['Nunito_Sans'] font-bold text-sm">
              <BiBook className="text-lg text-[#630ED4]" /> {game.subject}
            </div>
            <div className="flex items-center gap-2 bg-[#DEE8FF] text-[#263143] px-4 py-2 rounded-[15px] font-['Nunito_Sans'] font-bold text-sm">
              <BiTrophy className="text-lg text-[#630ED4]" /> Jenjang {game.gradeLevel}
            </div>
          </div>

          <div className="mb-10 flex-grow">
            <h2 className="font-['Quicksand'] font-bold text-xl text-[#263143] mb-3">Tentang Game Ini</h2>
            <p className="font-['Nunito_Sans'] text-[16px] leading-relaxed text-[#4A4455]">
              {game.description}
            </p>
          </div>

          <div className="bg-[#F5F0FF] rounded-[25px] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#EFE5FF]">
            <div className="text-center sm:text-left w-full sm:w-auto">
              <p className="font-['Nunito_Sans'] font-semibold text-[#6C778D] text-sm mb-1">
                {isOwned ? 'Status' : 'Harga Akses'}
              </p>
              
              <div className={`font-['Nunito_Sans'] font-bold ${game.price === 0 || isOwned ? 'text-[32px]' : 'text-[28px]'} text-[#630ED4] leading-none`}>
                {isOwned ? (
                  <span className="flex items-center justify-center sm:justify-start gap-2 text-[#16A34A]">
                    <BiCheckCircle /> Dimiliki
                  </span>
                ) : (
                  formatPrice(game.price)
                )}
              </div>
            </div>

            {/* RENDER TOMBOL BERDASARKAN KEPEMILIKAN */}
            {isOwned ? (
              <button 
                onClick={() => navigate('/library')}
                className="w-full sm:w-auto bg-[#16A34A] text-white font-['Quicksand'] font-bold px-8 py-3.5 rounded-[15px] hover:bg-[#15803D] transition-colors shadow-sm"
              >
                Mainkan Game
              </button>
            ) : (
              <PurchaseButton 
                price={game.price} 
                onPurchase={handlePurchase} 
                isPurchasing={isPurchasing} 
              />
            )}

            <PurchaseSuccessModal 
                isOpen={showSuccessModal} 
                onClose={handleCloseModal} 
                gameTitle={game.title} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}