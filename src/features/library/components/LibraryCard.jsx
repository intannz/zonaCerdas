import OpenContentButton from './OpenContentButton';

export default function LibraryCard({ item }) {
  // Destrukturisasi data sesuai format API GET /api/library
  const { content, purchasedAt } = item;

  // Format tanggal beli
  const formattedDate = new Date(purchasedAt).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  return (
    <div className="bg-white rounded-[30px] shadow-[0px_7px_8px_rgba(0,0,0,0.25)] overflow-hidden hover:-translate-y-2 transition-transform duration-300 flex flex-col h-[450px]">
      {/* Image Placeholder */}
      <div className="h-[240px] w-full bg-[#9D9D9D] flex-shrink-0 relative">
         <div className="absolute top-5 left-5 flex gap-2">
            <span className="bg-[#630ED4] text-white text-xs font-bold px-4 py-1.5 rounded-full font-['Nunito_Sans'] shadow-sm">
              {content.category}
            </span>
         </div>
      </div>

      {/* Card Content */}
      <div className="p-7 flex flex-col flex-grow justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-['Quicksand'] font-bold text-[24px] leading-[30px] text-black line-clamp-2">
            {content.title}
          </h3>
          <p className="text-[#6B7280] font-['Nunito_Sans'] text-[15px]">
            {content.subject} • Didapat pada {formattedDate}
          </p>
        </div>
        
        {/* Tombol Buka Permainan */}
        <div className="mt-auto pt-4">
          <OpenContentButton contentId={content.id} contentTitle={content.title} />
        </div>
      </div>
    </div>
  );
}