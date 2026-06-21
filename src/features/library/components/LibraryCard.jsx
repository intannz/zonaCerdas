import { useState } from 'react';
import api from '../../../shared/services/api'; 

export default function LibraryCard({ item }) {
  const [isOpening, setIsOpening] = useState(false);
  
  // SUPPORT STRUKTUR FLAT MAUPUN NESTED
  const game = item?.content || item?.game || item || {};
  
  const title = game.title || game.judul || 'Game Tanpa Judul';
  const purchasedAt = item?.purchasedAt || item?.created_at || game?.createdAt || game?.created_at || new Date().toISOString();
  const thumbnailUrl = game.thumbnailUrl || game.thumbnail_url || game.image || '';

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return '-';
    }
  };

  const handlePlay = async () => {
    // Antisipasi nama key id game
    const gameId = game.id || game._id || game.gameId;

    if (!gameId) {
      alert("ID Game tidak ditemukan.");
      return;
    }

    setIsOpening(true);
    try {
      const response = await api.get(`/library/${gameId}/play`);
      const playUrl = response.data?.data?.fileUrl || response.data?.fileUrl;

      if (playUrl) {
        window.open(playUrl, '_blank', 'noopener,noreferrer');
      } else {
        alert('Link game tidak ditemukan di server.');
      }
    } catch (error) {
      console.error("Gagal memuat link game:", error);
      alert("Gagal membuka game. Pastikan koneksi aman atau hubungi admin.");
    } finally {
      setIsOpening(false);
    }
  };

  return (
    <div className="bg-white rounded-[24px] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col h-full">
      <div className="h-[200px] w-full bg-[#E8DFEE] relative flex items-center justify-center overflow-hidden">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
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
          className="absolute inset-0 flex items-center justify-center text-[#630ED4]/40 font-['Quicksand'] font-bold text-5xl"
          style={{ display: thumbnailUrl ? 'none' : 'flex' }}
        >
          {title.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-['Quicksand'] font-bold text-xl text-[#1D1A24] mb-1 line-clamp-1">{title}</h3>
        <p className="text-[#6C778D] text-sm mb-6">Didapat pada {formatDate(purchasedAt)}</p>

        <button
          onClick={handlePlay}
          disabled={isOpening}
          className="mt-auto w-full bg-[#4800A0] text-white font-['Quicksand'] font-bold py-3.5 rounded-[15px] hover:bg-[#360088] transition-colors shadow-sm disabled:bg-gray-400"
        >
          {isOpening ? 'Menyiapkan...' : 'Mainkan Game'}
        </button>
      </div>
    </div>
  );
}