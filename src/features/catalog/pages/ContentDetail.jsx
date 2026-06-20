import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BiArrowBack, BiCategory, BiBook, BiTrophy } from 'react-icons/bi';
// Jangan lupa import komponen PurchaseButton-nya!
import PurchaseButton from '../components/PurchaseButton';
import PurchaseSuccessModal from '../components/PurchaseSuccessModal';

// DATABASE PALSU YANG SAMA DENGAN KATALOG
const DUMMY_CATALOG = [
  {
    id: "c1-001",
    title: "Petualangan Angka Rimba",
    description: "Game interaktif yang mengajak siswa belajar matematika dasar sambil berpetualang di hutan virtual. Sangat cocok untuk anak SD kelas 1-3. Materi mencakup penjumlahan, pengurangan, dan pengenalan pola angka sederhana yang dikemas dalam bentuk teka-teki.",
    price: 0,
    thumbnailUrl: null,
    category: "GAME",
    subject: "Matematika",
    gradeLevel: "SD",
    contributorName: "Guru Hebat",
    createdAt: "2026-06-18T10:00:00Z"
  },
  {
    id: "c1-002",
    title: "Detektif Kerajaan Nusantara",
    description: "Bantu detektif memecahkan misteri kerajaan Majapahit dengan menjawab pertanyaan-pertanyaan sejarah Nusantara yang seru dan menantang.",
    price: 45000,
    thumbnailUrl: null,
    category: "GAME",
    subject: "Sejarah",
    gradeLevel: "SMP",
    contributorName: "Budi Santoso",
    createdAt: "2026-06-17T09:00:00Z"
  },
  {
    id: "c1-003",
    title: "Labirin Kota Penyihir Ajaib",
    description: "Selesaikan tantangan labirin dengan menjawab soal-soal Sains tentang energi dan tata surya agar bisa keluar dari kota penyihir.",
    price: 0,
    thumbnailUrl: null,
    category: "INTERACTIVE",
    subject: "Sains",
    gradeLevel: "SD",
    contributorName: "Sari Pertiwi",
    createdAt: "2026-06-15T14:30:00Z"
  },
  {
    id: "c1-004",
    title: "Simfoni Nada Pintar",
    description: "Kuis interaktif untuk mengenali berbagai alat musik tradisional dan modern. Tingkatkan pengetahuan seni budayamu!",
    price: 70000,
    thumbnailUrl: null,
    category: "QUIZ",
    subject: "Seni Budaya",
    gradeLevel: "SMA",
    contributorName: "Andi Wijaya",
    createdAt: "2026-06-10T08:15:00Z"
  }
];

export default function ContentDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchGameDetail = async () => {
      // Cari game berdasarkan ID dari URL
      const foundGame = DUMMY_CATALOG.find(item => item.id === id);
      
      setTimeout(() => {
        setGame(foundGame);
      }, 500); // Simulasi loading API
    };
    fetchGameDetail();
  }, [id]);

  const formatPrice = (price) => {
    if (price === 0) return 'FREE';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const handlePurchase = () => {
    setIsPurchasing(true);
    setTimeout(() => {
      setIsPurchasing(false);
      setShowSuccessModal(true);
    }, 1000);
  };

  // Tampilan Loading
  if (!game) return <div className="p-14 text-center font-['Nunito_Sans'] font-bold text-[#630ED4] animate-pulse">Memuat Data Game...</div>;

  return (
    <div className="p-6 md:p-14 w-full max-w-[1200px] mx-auto">
      <Link to="/catalog" className="inline-flex items-center gap-2 text-[#6C778D] hover:text-[#630ED4] font-['Nunito_Sans'] font-bold text-[16px] mb-8 transition-colors">
        <BiArrowBack className="text-xl" /> Kembali ke Katalog
      </Link>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        <div className="w-full lg:w-1/2 flex-shrink-0">
          <div className="w-full aspect-[4/3] bg-[#9D9D9D] rounded-[35px] shadow-[0px_10px_20px_rgba(0,0,0,0.1)] overflow-hidden relative">
            {game.thumbnailUrl ? (
              <img src={game.thumbnailUrl} alt={game.title} className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/50 font-['Quicksand'] font-bold text-xl">
                No Image Available
              </div>
            )}
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
              <p className="font-['Nunito_Sans'] font-semibold text-[#6C778D] text-sm mb-1">Harga Akses</p>
              <div className={`font-['Nunito_Sans'] font-bold ${game.price === 0 ? 'text-[32px]' : 'text-[28px]'} text-[#630ED4] leading-none`}>
                {formatPrice(game.price)}
              </div>
            </div>

            <PurchaseButton 
              price={game.price} 
              onPurchase={handlePurchase} 
              isPurchasing={isPurchasing} 
            />

            <PurchaseSuccessModal 
                isOpen={showSuccessModal} 
                onClose={() => setShowSuccessModal(false)} 
                gameTitle={game.title} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}