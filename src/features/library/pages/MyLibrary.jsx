import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiSearchAlt, BiChevronDown, BiErrorCircle } from 'react-icons/bi'; // Tambah icon error
import LibraryCard from '../components/LibraryCard';
import { libraryService } from '../services/libraryService';

export default function MyLibrary() {
  const [libraryData, setLibraryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false); // STATE BARU DETEKSI SERVER MATI

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGrade, setActiveGrade] = useState('Semua');
  const [activeSubject, setActiveSubject] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  // Nembak API Library
  useEffect(() => {
    const fetchMyLibrary = async () => {
      try {
        setIsLoading(true);
        setIsError(false); // Reset error state
        const responseData = await libraryService.getLibrary();
        
        // Ekstraksi array yang lebih aman
        let actualData = [];
        if (Array.isArray(responseData)) {
          actualData = responseData;
        } else if (Array.isArray(responseData?.data)) {
          actualData = responseData.data;
        } else if (Array.isArray(responseData?.data?.data)) {
          actualData = responseData.data.data;
        }

        setLibraryData(actualData);
      } catch (error) {
        console.error("Gagal mengambil library", error);
        setLibraryData([]); 
        setIsError(true); // SET ERROR JIKA API GAGAL (MISAL 404)
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyLibrary();
  }, []);

  // FILTERING LOGIC
  const safeLibraryData = Array.isArray(libraryData) ? libraryData : [];

  const filteredData = safeLibraryData.filter((item) => {
    const game = item?.content || item?.game || item;
    if (!game) return false;
    
    const title = game.title || game.judul || "";
    const matchSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const gradeLevel = game.gradeLevel || game.jenjang || "";
    const matchGrade = activeGrade === 'Semua' || gradeLevel === activeGrade;
    
    const subject = game.subject || game.mapel || "";
    const matchSubject = activeSubject === '' || subject === activeSubject;
    
    const category = game.category || game.kategori || "";
    const matchCategory = activeCategory === '' || category === activeCategory;

    return matchSearch && matchGrade && matchSubject && matchCategory;
  });

  const grades = ["SD", "SMP", "SMA"];
  const subjects = ["Matematika", "Sejarah", "Sains", "Seni Budaya"];
  const categories = ["GAME", "QUIZ", "INTERACTIVE"];

  if (isLoading) return <div className="min-h-screen text-center pt-24 font-bold text-[#630ED4] animate-pulse">Menyiapkan Koleksi Anda...</div>;

  return (
    <div className="p-10 md:p-14 w-full max-w-[1200px] mx-auto">
      <div className="mb-10">
        <h1 className="font-['Quicksand'] font-bold text-5xl md:text-[48px] text-[#630ED4] leading-tight mb-2">
          Koleksi Game Saya
        </h1>
        <p className="font-['Nunito_Sans'] text-lg text-[#263143] max-w-2xl">
          Selesaikan Petualang Belajarmu Dimana Saja.
        </p>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        <div className="relative w-full lg:w-[645px]">
          <BiSearchAlt className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-[#6B7280]" />
          <input 
            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari koleksimu..."
            className="w-full bg-[#DEE8FF] border border-[#6B6B6B] shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)] rounded-[25px] py-3 pl-16 pr-6 outline-none focus:ring-2 focus:ring-[#630ED4] transition font-['Nunito_Sans']"
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mt-2">
          {/* ... (Kodingan Dropdown Filter tetap sama seperti aslinya) ... */}
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setActiveGrade('Semua')} className={`px-5 py-1.5 rounded-[15px] font-['Quicksand'] font-bold text-[16px] transition-colors ${activeGrade === 'Semua' ? 'bg-[#7C3AED] text-white' : 'bg-[#DEE8FF] text-[#263143]'}`}>Semua</button>
            {grades.map((grade) => (
              <button key={grade} onClick={() => setActiveGrade(grade)} className={`px-5 py-1.5 rounded-[15px] font-['Quicksand'] font-bold text-[16px] transition-colors ${activeGrade === grade ? 'bg-[#7C3AED] text-white' : 'bg-[#DEE8FF] text-[#263143]'}`}>{grade}</button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="font-['Nunito_Sans'] font-bold text-[14px] text-[#263143] uppercase">Mapel:</span>
              <div className="relative">
                <select value={activeSubject} onChange={(e) => setActiveSubject(e.target.value)} className="appearance-none cursor-pointer bg-[#DEE8FF] rounded-[18px] py-2 pl-5 pr-10 font-['Quicksand'] font-bold text-[16px] text-[#263143] outline-none">
                  <option value="">Semua</option>
                  {subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                </select>
                <BiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-[#6C778D] pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-['Nunito_Sans'] font-bold text-[14px] text-[#263143] uppercase">Kategori:</span>
              <div className="relative">
                <select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} className="appearance-none cursor-pointer bg-[#DEE8FF] rounded-[18px] py-2 pl-5 pr-10 font-['Quicksand'] font-bold text-[16px] text-[#263143] outline-none">
                  <option value="">Semua</option>
                  {categories.map(category => <option key={category} value={category}>{category}</option>)}
                </select>
                <BiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-[#6C778D] pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RENDER BERDASARKAN KONDISI SERVER */}
      {isError ? (
        <div className="text-center py-20 font-['Nunito_Sans'] text-xl text-[#EF4444] flex flex-col items-center bg-red-50 rounded-[24px] border border-red-200">
          <BiErrorCircle className="text-5xl mb-4" />
          <p className="font-bold">Gagal Terhubung ke Server</p>
          <p className="text-base text-[#6B7280] mt-2">API Koleksi Game sedang tidak dapat diakses saat ini.</p>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="text-center py-20 font-['Nunito_Sans'] text-xl text-[#6C778D] flex flex-col items-center">
          <p>Koleksimu masih kosong atau tidak ditemukan.</p>
          <Link to="/catalog" className="text-[#630ED4] font-bold mt-2 hover:underline">Jelajahi Pasar Game</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {filteredData.map((item, index) => (
            <LibraryCard 
              key={item?.purchaseId || item?.id || index} 
              item={item} 
            />
          ))}
        </div>
      )}
    </div>
  );
}