import { Link } from 'react-router-dom';
import CategoryBadge from './CategoryBadge';

export default function ContentCard({ game, formatPrice }) {
  return (
    <Link 
      to={`/catalog/${game.id}`} 
      className="bg-white rounded-[30px] shadow-[0px_7px_8px_rgba(0,0,0,0.25)] overflow-hidden hover:-translate-y-2 transition-transform duration-300 flex flex-col h-[450px]"
    >
      {/* Image Placeholder */}
      <div className="h-[240px] w-full bg-[#9D9D9D] flex-shrink-0 relative">
         <div className="absolute top-5 left-5 flex gap-2">
            <CategoryBadge category={game.category} />
         </div>
      </div>

      {/* Card Content */}
      <div className="p-7 flex flex-col flex-grow justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-['Quicksand'] font-bold text-[24px] leading-[30px] text-black line-clamp-2">
            {game.title}
          </h3>
          <p className="text-[#6B7280] font-['Nunito_Sans'] text-[15px]">
            {game.subject} • Oleh {game.contributorName}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <span className={`font-['Nunito_Sans'] font-bold ${game.price === 0 ? 'text-[24px]' : 'text-[20px]'} text-[#630ED4]`}>
            {formatPrice(game.price)}
          </span>
          <div className="bg-[#4800B2] text-white font-['Quicksand'] font-bold text-[14px] py-2.5 px-6 rounded-full hover:bg-[#360088] transition-colors shadow-sm">
            Buka Permainan
          </div>
        </div>
      </div>
    </Link>
  );
}