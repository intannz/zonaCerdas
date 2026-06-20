export default function CategoryBadge({ category }) {
  return (
    <span className="bg-[#630ED4] text-white text-xs font-bold px-4 py-1.5 rounded-full font-['Nunito_Sans'] shadow-sm">
      {category}
    </span>
  );
}