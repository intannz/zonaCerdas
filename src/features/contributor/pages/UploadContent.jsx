import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiUser, BiFileBlank, BiMoney, BiImage, BiLink } from 'react-icons/bi';
import { contributorService } from '../services/contributorService';

export default function UploadContent() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', fileUrl: '', thumbnailUrl: '', category: 'GAME', subject: 'Matematika', gradeLevel: 'SD'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await contributorService.uploadContent(formData);
      alert("Game berhasil diunggah!");
      navigate('/contributor/my-contents');
    } catch (error) {
      console.error("Gagal unggah game:", error);
      const backendMessage = error.response?.data?.message || error.response?.data?.error;
      alert(`Gagal mengunggah game: ${backendMessage || 'Silakan coba lagi.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10 md:p-14 w-full flex justify-center bg-[#FEF7FF] min-h-screen">
      <div className="bg-white rounded-[35px] shadow-[0px_10px_30px_rgba(99,14,212,0.05)] p-10 md:p-12 w-full max-w-[1150px] flex flex-col items-center">
        
        <div className="text-center mb-10">
          <h1 className="font-['Quicksand'] font-bold text-[32px] text-[#4800A0] mb-2">Masukkan Permainan Anda</h1>
          <p className="font-['Nunito_Sans'] text-[16px] text-[#4A4455]">Ciptakan Tempat Belajar yang Seru!</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-['Nunito_Sans'] font-bold text-[24px] text-[#4A4455]">Judul</label>
            <div className="relative">
              <BiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7B7487] text-xl" />
              <input type="text" required onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#DEE8FF] rounded-[15px] py-4 pr-4 pl-12 text-[#7B7487] font-['Nunito_Sans'] text-[16px] outline-none focus:ring-2 focus:ring-[#630ED4] transition" placeholder="Judul" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-['Nunito_Sans'] font-bold text-[24px] text-[#4A4455]">Deskripsi Permainan</label>
            <div className="relative">
              <BiFileBlank className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7B7487] text-xl" />
              <input type="text" required onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#DEE8FF] rounded-[15px] py-4 pr-4 pl-12 text-[#7B7487] font-['Nunito_Sans'] text-[16px] outline-none focus:ring-2 focus:ring-[#630ED4] transition" placeholder="Deskripsi singkat game Anda" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-['Nunito_Sans'] font-bold text-[24px] text-[#4A4455]">Harga</label>
            <div className="relative">
              <BiMoney className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7B7487] text-xl" />
              <input type="number" min="0" required onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full bg-[#DEE8FF] rounded-[15px] py-4 pr-4 pl-12 text-[#7B7487] font-['Nunito_Sans'] text-[16px] outline-none focus:ring-2 focus:ring-[#630ED4] transition" placeholder="Rp.0" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <label className="font-['Nunito_Sans'] font-bold text-[24px] text-[#4A4455]">Kategori</label>
              <select onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[#DEE8FF] rounded-[15px] py-4 px-5 text-[#263143] font-['Quicksand'] font-medium text-[20px] outline-none focus:ring-2 focus:ring-[#630ED4] transition appearance-none cursor-pointer">
                <option value="GAME">Game</option>
                <option value="QUIZ">Kuis</option>
                <option value="INTERACTIVE">Interaktif</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-['Nunito_Sans'] font-bold text-[24px] text-[#4A4455]">Subjek</label>
              <select onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full bg-[#DEE8FF] rounded-[15px] py-4 px-5 text-[#263143] font-['Quicksand'] font-medium text-[20px] outline-none focus:ring-2 focus:ring-[#630ED4] transition appearance-none cursor-pointer">
                <option value="Sejarah">Sejarah</option>
                <option value="Matematika">Matematika</option>
                <option value="Sains">Sains</option>
                <option value="Seni Budaya">Seni Budaya</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-['Nunito_Sans'] font-bold text-[24px] text-[#4A4455]">Tingkat</label>
              <select onChange={e => setFormData({...formData, gradeLevel: e.target.value})} className="w-full bg-[#DEE8FF] rounded-[15px] py-4 px-5 text-[#263143] font-['Quicksand'] font-medium text-[20px] outline-none focus:ring-2 focus:ring-[#630ED4] transition appearance-none cursor-pointer">
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-['Nunito_Sans'] font-bold text-[24px] text-[#4A4455]">Thumbnail (URL)</label>
            <div className="relative">
              <BiImage className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7B7487] text-xl" />
              <input type="url" onChange={e => setFormData({...formData, thumbnailUrl: e.target.value})} className="w-full bg-[#DEE8FF] rounded-[15px] py-4 pr-4 pl-12 text-[#7B7487] font-['Nunito_Sans'] text-[16px] outline-none focus:ring-2 focus:ring-[#630ED4] transition" placeholder="Masukkan Link Foto 1:1" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-['Nunito_Sans'] font-bold text-[24px] text-[#4A4455]">Link Game (Google Drive)</label>
            <div className="relative">
              <BiLink className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7B7487] text-xl" />
              <input type="url" required onChange={e => setFormData({...formData, fileUrl: e.target.value})} className="w-full bg-[#DEE8FF] rounded-[15px] py-4 pr-4 pl-12 text-[#7B7487] font-['Nunito_Sans'] text-[16px] outline-none focus:ring-2 focus:ring-[#630ED4] transition" placeholder="https://drive.google.com/file/d/..." />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-[#630ED4] text-white font-['Quicksand'] font-bold text-[24px] py-4 rounded-[15px] mt-6 hover:bg-[#4800A0] transition disabled:bg-gray-400">
            {isLoading ? 'Menyimpan...' : 'Buat Game'}
          </button>
        </form>
      </div>
    </div>
  );
}