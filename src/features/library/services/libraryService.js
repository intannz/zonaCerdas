import api from '../../../shared/services/api';

export const libraryService = {
  // Mengambil daftar game yang sudah dibeli/diklaim
  getLibrary: async () => {
    const response = await api.get('/library');
    return response;
  },

  // Mendapatkan URL untuk memainkan game
  playContent: async (id) => {
    const response = await api.get(`/library/${id}/play`);
    return response;
  },
};