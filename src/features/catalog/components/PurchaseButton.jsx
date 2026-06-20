export default function PurchaseButton({ price, onPurchase, isPurchasing }) {
  const labelText = isPurchasing 
    ? 'Memproses...' 
    : (price === 0 ? 'Dapatkan Gratis' : 'Beli Sekarang');

  return (
    <button 
      onClick={onPurchase}
      disabled={isPurchasing}
      className={`w-full sm:w-auto font-['Quicksand'] font-bold text-lg py-4 px-8 rounded-full transition-all shadow-sm flex items-center justify-center
        ${isPurchasing 
          ? 'bg-gray-400 text-white cursor-not-allowed' 
          : 'bg-[#630ED4] text-white hover:bg-[#4800B2] hover:shadow-md'
        }
      `}
    >
      {labelText}
    </button>
  );
}