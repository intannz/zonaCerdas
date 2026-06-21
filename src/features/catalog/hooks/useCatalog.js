import { useState, useCallback } from 'react';
import { catalogService } from '../services/catalogService';

export const useCatalog = () => {
  const [games, setGames] = useState([]);
  const [taxonomies, setTaxonomies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCatalog = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const responseData = await catalogService.getAll(params);
      
      // LOGIC PENYELAMAT NYA DI SINI
      let actualGames = [];
      if (Array.isArray(responseData)) {
        actualGames = responseData;
      } else if (responseData && typeof responseData === 'object') {
        // Cari di dalam object, property mana yang merupakan array
        // (Bisa jadi temanmu menamakannya 'data', 'content', 'items', dll)
        const arrayProp = Object.values(responseData).find(val => Array.isArray(val));
        if (arrayProp) {
          actualGames = arrayProp;
        } else if (Array.isArray(responseData.data)) {
           actualGames = responseData.data;
        }
      }
      
      setGames(actualGames);
      // Opsional: Coba console log untuk melihat bentuk asli data temanmu
      // console.log("Data Catalog Asli:", responseData); 
      
    } catch (err) {
      setError(err?.response?.data?.message || 'Gagal memuat data katalog.');
      console.error("Error Fetch Catalog:", err);
      setGames([]); // Selalu kembalikan array kosong jika gagal
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTaxonomies = useCallback(async () => {
    try {
      const data = await catalogService.getTaxonomies();
      setTaxonomies(data);
    } catch (err) {
      console.error('Gagal memuat filter taxonomies.', err);
    }
  }, []);

  return {
    games,
    taxonomies,
    loading,
    error,
    fetchCatalog,
    fetchTaxonomies
  };
};