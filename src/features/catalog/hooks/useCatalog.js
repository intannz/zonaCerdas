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
      const data = await catalogService.getCatalog(params);
      setGames(data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Gagal memuat data katalog.');
      console.error(err);
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