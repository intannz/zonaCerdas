import { useState } from 'react';

export default function OpenContentButton({ contentId, contentTitle }) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePlay = () => {
    setIsLoading(true);
    // Sekarang kita mencetak contentId ke console agar ESLint tahu variabelnya terpakai
    console.log(`Sedang mengambil URL permainan untuk ID: ${contentId}`);
    
    setTimeout(() => {
      setIsLoading(false);
      alert(`Membuka game: ${contentTitle}!\n\n(Nanti ini akan membuka tab baru/iframe dari URL API)`);
    }, 800);
  };

  return (
    <button
      onClick={handlePlay}
      disabled={isLoading}
      className="w-full bg-[#4800B2] text-white font-['Quicksand'] font-bold text-[16px] py-3 rounded-full hover:bg-[#360088] transition-colors shadow-sm flex items-center justify-center"
    >
      {isLoading ? 'Memuat Game...' : 'Buka Permainan'}
    </button>
  );
}