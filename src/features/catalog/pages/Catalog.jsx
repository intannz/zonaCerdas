import { useState } from 'react';
import { BiSearchAlt, BiChevronDown } from 'react-icons/bi';
import { Link } from 'react-router-dom';

// --- DUMMY DATA: Sesuai struktur API Docs (GET /api/catalog) ---
const DUMMY_CATALOG = [
  {
    id: "c1-001",
    title: "Petualangan Angka Rimba",
    price: 0,
    thumbnailUrl: null, // Kalau null, kita kasih warna abu-abu
    category: "GAME",
    subject: "Matematika",
    contributorName: "Guru Hebat"
  },
  {
    id: "c1-002",
    title: "Detektif Kerajaan Nusantara",
    price: 45000,
    thumbnailUrl: null,
    category: "GAME",
    subject: "IPS",
    contributorName: "Budi Santoso"
  },
  {
    id: "c1-003",
    title: "Labirin Kota Penyihir Ajaib",
    price: 0,
    thumbnailUrl: null,
    category: "INTERACTIVE",
    subject: "IPA",
    contributorName: "Sari Pertiwi"
  },
  {
    id: "c1-004",
    title: "Simfoni Nada Pintar",
    price: 70000,
    thumbnailUrl: null,
    category: "QUIZ",
    subject: "Seni Budaya",
    contributorName: "Andi Wijaya"
  }
];

export default function Catalog() {
  const [activeTab, setActiveTab] = useState('Semua');

  // Nanti fungsi format harga ini bisa dipindah ke utils/formatCurrency.js
  const formatPrice = (price) => {
    if (price === 0) return 'FREE';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="p-10 md:p-14">
      
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="font-['Quicksand'] font-bold text-5xl md:text-[64px] text-[#630ED4] leading-tight mb-4">
          Pasar Game Zona Cerdas
        </h1>
        <p className="font-['Nunito_Sans'] text-xl md:text-2xl text-[#263143] max-w-3xl">
          Temukan ribuan game edukasi buatan rekan guru di seluruh Indonesia untuk membuat kelas Anda lebih hidup dan ceria.
        </p>
      </div>

      {/* Search & Filter Section */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12">
        
        {/* Kiri: Search Bar & Kategori */}
        <div className="flex flex-col gap-4 w-full xl:w-auto">
          {/* Search Input */}
          <div className="relative w-full md:w-[645px]">
            <BiSearchAlt className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-[#6B7280]" />
            <input 
              type="text" 
              placeholder="Cari game edukasi..."
              className="w-full bg-[#DEE8FF] border border-[#6B6B6B] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)] rounded-[25px] py-3 pl-16 pr-6 outline-none focus:ring-2 focus:ring-[#630ED4] transition"
            />
          </div>

          {/* Filter Badges */}
          <div className="flex flex-wrap gap-3">
            {['Semua', 'Matematika', 'IPS', 'IPA'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-1.5 rounded-[15px] font-['Quicksand'] font-bold text-base transition-colors ${
                  activeTab === tab 
                    ? 'bg-[#7C3AED] text-white' 
                    : 'bg-[#DEE8FF] text-[#263143] hover:bg-[#c8d8ff]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Kanan: Urutkan */}
        <div className="flex items-center gap-4">
          <span className="font-['Nunito_Sans'] font-bold text-xl text-[#263143]">
            URUTKAN :
          </span>
          <div className="relative cursor-pointer bg-[#DEE8FF] rounded-[18px] py-2 px-5 flex items-center justify-between min-w-[190px]">
            <span className="font-['Quicksand'] text-lg text-[#263143]">Terpopuler</span>
            <BiChevronDown className="text-2xl text-[#6C778D]" />
          </div>
        </div>

      </div>

      {/* Grid Katalog */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {DUMMY_CATALOG.map((game) => (
          // Link menuju detail game (akan error 404 kalau halamannya belum dibuat)
          <Link 
            to={`/catalog/${game.id}`} 
            key={game.id} 
            className="bg-white rounded-[30px] shadow-[0px_7px_8px_rgba(0,0,0,0.25)] overflow-hidden hover:-translate-y-2 transition-transform duration-300 flex flex-col h-[450px]"
          >
            {/* Image Placeholder (Abu-abu) */}
            <div className="h-[250px] w-full bg-[#9D9D9D] flex-shrink-0">
              {/* Kalau thumbnailUrl dari API sudah ada, tinggal ganti pakai tag <img src={game.thumbnailUrl} className="w-full h-full object-cover" /> */}
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow justify-between">
              <h3 className="font-['Quicksand'] font-bold text-[24px] leading-[30px] text-black line-clamp-2">
                {game.title}
              </h3>
              
              <div className="font-['Nunito_Sans'] font-bold text-[24px] text-[#630ED4]">
                {formatPrice(game.price)}
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}