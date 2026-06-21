import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { contributorService } from '../services/contributorService';
import { catalogService } from '../../catalog/services/catalogService';

export default function EditContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', fileUrl: '', thumbnailUrl: '', category: 'GAME', subject: 'Matematika', gradeLevel: 'SD'
  });

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const responseData = await catalogService.getById(id);
        const data = responseData?.data || responseData;
        if(data) {
          setFormData({
            title: data.title || '',
            description: data.description || '',
            price: data.price || 0,
            fileUrl: data.fileUrl || '',
            thumbnailUrl: data.thumbnailUrl || '',
            category: data.category || 'GAME',
            subject: data.subject || 'Matematika',
            gradeLevel: data.gradeLevel || 'SD'
          });
        }
      } catch (error) {
        console.error("Gagal memuat detail edit game:", error);
        alert("Gagal memuat data game.");
        navigate('/contributor/my-contents');
      } finally {
        setIsFetching(false);
      }
    };
    fetchGameDetail();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await contributorService.editContent(id, formData);
      alert("Perubahan game berhasil disimpan!");
      navigate('/contributor/my-contents');
    } catch (error) {
      console.error("Gagal menyimpan perubahan:", error);
      alert("Gagal menyimpan perubahan. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="min-h-screen flex items-center justify-center font-['Nunito_Sans'] font-bold text-[#630ED4] animate-pulse">Menyiapkan form edit...</div>;
  }

  return (
    <div className="p-10 md:p-14 w-full max-w-[800px] mx-auto">
      <Link to="/contributor/my-contents" className="inline-flex items-center gap-2 text-[#6C778D] hover:text-[#630ED4] font-['Nunito_Sans'] font-bold text-[16px] mb-6 transition-colors">
        <BiArrowBack className="text-xl" /> Kembali ke Dasbor
      </Link>

      <div className="bg-white rounded-[35px] shadow-[0px_4px_20px_rgba(99,14,212,0.05)] p-10">
        <h1 className="font-['Quicksand'] font-bold text-3xl text-[#4800A0] mb-2">Edit Game</h1>
        <p className="text-[#4A4455] font-['Nunito_Sans'] mb-8">Perbarui detail atau harga dari game yang sudah kamu publikasikan.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-['Nunito_Sans']">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[#263143] text-sm">Judul Game</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="bg-[#F5F0FF] rounded-[15px] px-5 py-3 outline-none focus:ring-2 focus:ring-[#630ED4]" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-[#263143] text-sm">Deskripsi Singkat</label>
            <textarea required rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-[#F5F0FF] rounded-[15px] px-5 py-3 outline-none focus:ring-2 focus:ring-[#630ED4]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-bold text-[#263143] text-sm">Kategori</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="bg-[#F5F0FF] rounded-[15px] px-5 py-3 outline-none focus:ring-2 focus:ring-[#630ED4]">
                <option value="GAME">GAME</option><option value="QUIZ">QUIZ</option><option value="INTERACTIVE">INTERACTIVE</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold text-[#263143] text-sm">Mata Pelajaran</label>
              <select value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="bg-[#F5F0FF] rounded-[15px] px-5 py-3 outline-none focus:ring-2 focus:ring-[#630ED4]">
                <option value="Matematika">Matematika</option><option value="Sejarah">Sejarah</option><option value="Sains">Sains</option><option value="Seni Budaya">Seni Budaya</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold text-[#263143] text-sm">Jenjang</label>
              <select value={formData.gradeLevel} onChange={e => setFormData({...formData, gradeLevel: e.target.value})} className="bg-[#F5F0FF] rounded-[15px] px-5 py-3 outline-none focus:ring-2 focus:ring-[#630ED4]">
                <option value="SD">SD</option><option value="SMP">SMP</option><option value="SMA">SMA</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-bold text-[#263143] text-sm">Harga (Rp)</label>
              <input type="number" min="0" required value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="bg-[#F5F0FF] rounded-[15px] px-5 py-3 outline-none focus:ring-2 focus:ring-[#630ED4]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold text-[#263143] text-sm">URL File Game</label>
              <input type="url" required value={formData.fileUrl} onChange={e => setFormData({...formData, fileUrl: e.target.value})} className="bg-[#F5F0FF] rounded-[15px] px-5 py-3 outline-none focus:ring-2 focus:ring-[#630ED4]" />
            </div>
          </div>

          {/* INPUT BARU: URL THUMBNAIL */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[#263143] text-sm">URL Thumbnail (Gambar Cover)</label>
            <input 
              type="url" 
              required 
              placeholder="https://..."
              value={formData.thumbnailUrl} 
              onChange={e => setFormData({...formData, thumbnailUrl: e.target.value})} 
              className="bg-[#F5F0FF] rounded-[15px] px-5 py-3 outline-none focus:ring-2 focus:ring-[#630ED4]" 
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button type="button" onClick={() => navigate('/contributor/my-contents')} className="w-full sm:w-1/3 bg-white text-[#4800A0] border border-[#CCC3D8] font-['Quicksand'] font-bold text-lg py-4 rounded-[15px] hover:bg-[#F5F0FF] transition">Batal</button>
            <button type="submit" disabled={isLoading} className="w-full sm:w-2/3 bg-[#630ED4] text-white font-['Quicksand'] font-bold text-lg py-4 rounded-[15px] hover:bg-[#4800A0] transition disabled:bg-gray-400">{isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}