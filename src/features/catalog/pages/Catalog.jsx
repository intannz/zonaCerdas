import { useState } from 'react';
import { BiSearchAlt, BiChevronDown } from 'react-icons/bi';
import ContentCard from '../components/ContentCard';

// DATABASE DUMMY
const DUMMY_CATALOG = [
  { id: "c1-001", title: "Petualangan Angka Rimba", price: 0, thumbnailUrl: null, category: "GAME", subject: "Matematika", gradeLevel: "SD", contributorName: "Guru Hebat", createdAt: "2026-06-18T10:00:00Z" },
  { id: "c1-002", title: "Detektif Kerajaan Nusantara", price: 45000, thumbnailUrl: null, category: "GAME", subject: "Sejarah", gradeLevel: "SMP", contributorName: "Budi Santoso", createdAt: "2026-06-17T09:00:00Z" },
  { id: "c1-003", title: "Labirin Kota Penyihir Ajaib", price: 0, thumbnailUrl: null, category: "INTERACTIVE", subject: "Sains", gradeLevel: "SD", contributorName: "Sari Pertiwi", createdAt: "2026-06-15T14:30:00Z" },
  { id: "c1-004", title: "Simfoni Nada Pintar", price: 70000, thumbnailUrl: null, category: "QUIZ", subject: "Seni Budaya", gradeLevel: "SMA", contributorName: "Andi Wijaya", createdAt: "2026-06-10T08:15:00Z" }
];

const TAXONOMIES = {
  categories: ["GAME", "QUIZ", "INTERACTIVE"],
  subjects: ["Matematika", "Sejarah", "Sains", "Seni Budaya"],
  gradeLevels: ["SD", "SMP", "SMA"]
};

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGrade, setActiveGrade] = useState('Semua');
  const [activeSubject, setActiveSubject] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  // FILTERING LOGIC
  const filteredData = DUMMY_CATALOG.filter((game) => {
    const matchSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchGrade = activeGrade === 'Semua' || game.gradeLevel === activeGrade;
    const matchSubject = activeSubject === '' || game.subject === activeSubject;
    const matchCategory = activeCategory === '' || game.category === activeCategory;

    return matchSearch && matchGrade && matchSubject && matchCategory;
  });

  const formatPrice = (price) => {
    if (price === 0) return 'FREE';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="p-10 md:p-14 w-full max-w-[1200px] mx-auto">
      
      <div className="mb-10">
        <h1 className="font-['Quicksand'] font-bold text-5xl md:text-[48px] text-[#630ED4] leading-tight mb-2">
          Pasar Game Zona Cerdas
        </h1>
        <p className="font-['Nunito_Sans'] text-lg text-[#263143] max-w-2xl">
          Temukan ribuan game edukasi buatan rekan guru di seluruh Indonesia untuk membuat kelas Anda lebih hidup dan ceria.
        </p>
      </div>

      {/* --- Search & Filter Section --- */}
      <div className="flex flex-col gap-6 mb-12">
        <div className="relative w-full lg:w-[645px]">
          <BiSearchAlt className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-[#6B7280]" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari game edukasi..."
            className="w-full bg-[#DEE8FF] border border-[#6B6B6B] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)] rounded-[25px] py-3 pl-16 pr-6 outline-none focus:ring-2 focus:ring-[#630ED4] transition font-['Nunito_Sans']"
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mt-2">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveGrade('Semua')}
              className={`px-5 py-1.5 rounded-[15px] font-['Quicksand'] font-bold text-[16px] transition-colors ${activeGrade === 'Semua' ? 'bg-[#7C3AED] text-white' : 'bg-[#DEE8FF] text-[#263143] hover:bg-[#c8d8ff]'}`}
            >
              Semua
            </button>
            {TAXONOMIES.gradeLevels.map((grade) => (
              <button
                key={grade}
                onClick={() => setActiveGrade(grade)}
                className={`px-5 py-1.5 rounded-[15px] font-['Quicksand'] font-bold text-[16px] transition-colors ${activeGrade === grade ? 'bg-[#7C3AED] text-white' : 'bg-[#DEE8FF] text-[#263143] hover:bg-[#c8d8ff]'}`}
              >
                {grade}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="font-['Nunito_Sans'] font-bold text-[14px] text-[#263143] uppercase">Mapel:</span>
              <div className="relative">
                <select 
                  value={activeSubject}
                  onChange={(e) => setActiveSubject(e.target.value)}
                  className="appearance-none cursor-pointer bg-[#DEE8FF] rounded-[18px] py-2 pl-5 pr-10 font-['Quicksand'] font-bold text-[16px] text-[#263143] outline-none focus:ring-2 focus:ring-[#630ED4]"
                >
                  <option value="">Semua</option>
                  {TAXONOMIES.subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                </select>
                <BiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-[#6C778D] pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-['Nunito_Sans'] font-bold text-[14px] text-[#263143] uppercase">Kategori:</span>
              <div className="relative">
                <select 
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="appearance-none cursor-pointer bg-[#DEE8FF] rounded-[18px] py-2 pl-5 pr-10 font-['Quicksand'] font-bold text-[16px] text-[#263143] outline-none focus:ring-2 focus:ring-[#630ED4]"
                >
                  <option value="">Semua</option>
                  {TAXONOMIES.categories.map(category => <option key={category} value={category}>{category}</option>)}
                </select>
                <BiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-[#6C778D] pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Katalog Menggunakan Komponen Terpisah */}
      {filteredData.length === 0 ? (
        <div className="text-center py-20 font-['Nunito_Sans'] text-xl text-[#6C778D]">
          Yahh, game yang kamu cari tidak ditemukan 😢
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {filteredData.map((game) => (
            <ContentCard 
              key={game.id} 
              game={game} 
              formatPrice={formatPrice} 
            />
          ))}
        </div>
      )}

    </div>
  );
}