import { useState, useEffect } from 'react';
import { contributorService } from '../services/contributorService';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const data = await contributorService.getTransactions();
        
        // Pelindung respon
        const actualData = Array.isArray(data) ? data : [];
        setTransactions(actualData);
      } catch (error) {
        console.error("Gagal memuat transaksi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTransactions();
  }, []);

  const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' });
  }

  if (isLoading) {
    return <div className="min-h-screen text-center pt-24 font-bold text-[#630ED4] animate-pulse">Memuat Transaksi...</div>;
  }

  return (
    <div className="p-10 md:p-14 w-full max-w-[1000px] mx-auto">
      <h1 className="font-['Quicksand'] font-bold text-4xl text-[#4800A0] mb-2">Riwayat Transaksi</h1>
      <p className="text-[#4A4455] font-['Nunito_Sans'] mb-10">Daftar penjualan game edukasi milikmu.</p>

      <div className="bg-white rounded-[24px] shadow-[0px_4px_20px_rgba(99,14,212,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-['Nunito_Sans'] border-collapse">
            <thead className="bg-[#F5F0FF] text-[#4800A0] text-sm">
              <tr>
                <th className="py-4 px-6 font-bold">Waktu Pembelian</th>
                <th className="py-4 px-6 font-bold">Judul Game</th>
                <th className="py-4 px-6 font-bold">Pembeli</th>
                <th className="py-4 px-6 font-bold text-right">Pendapatan</th>
              </tr>
            </thead>
            <tbody className="text-[#4A4455] text-sm">
              {transactions.map((trx, index) => (
                <tr key={trx.purchaseId || index} className={`border-b border-[#CCC3D8]/30 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                  <td className="py-4 px-6">{formatDate(trx.purchasedAt)}</td>
                  <td className="py-4 px-6 font-bold text-[#263143]">{trx.contentTitle || 'Game'}</td>
                  <td className="py-4 px-6">{trx.buyerName || 'User'}</td>
                  <td className="py-4 px-6 text-right font-bold text-green-600">+{formatCurrency(trx.pricePaid || 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {transactions.length === 0 && (
             <div className="text-center py-10 text-[#6C778D]">Belum ada transaksi saat ini.</div>
          )}
        </div>
      </div>
    </div>
  );
}