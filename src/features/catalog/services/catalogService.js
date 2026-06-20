import api from '../../../shared/services/api';

export const catalogService = {
  /**
   * 1. Mengambil daftar semua game di marketplace
   * Bisa menerima parameter filter, contoh: { subject: 'Matematika', category: 'GAME' }
   */
  getCatalog: async (params = {}) => {
    // Karena kita memakai axios, kita bisa langsung melempar object params
    const response = await api.get('/catalog', { params });
    return response; // Ingat, response ini sudah berupa isi "data" berkat interceptor api.js
  },

  /**
   * 2. Mengambil detail satu konten berdasarkan ID
   */
  getContentDetail: async (id) => {
    const response = await api.get(`/catalog/${id}`);
    return response;
  },

  /**
   * 3. Mengambil daftar filter (Taxonomies) untuk dropdown/tombol
   */
  getTaxonomies: async () => {
    const response = await api.get('/catalog/taxonomies');
    return response;
  },

  /**
   * 4. Membeli atau mengklaim konten
   * Endpoint ini butuh token (otomatis diselipkan oleh api.js)
   */
  purchaseContent: async (id) => {
    const response = await api.post(`/catalog/${id}/purchase`);
    return response;
  }
};