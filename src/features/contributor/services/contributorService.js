import api from '../../../shared/services/api';

export const contributorService = {
  uploadContent: async (data) => {
    const response = await api.post('/contents', data);
    return response.data?.data || response.data;
  },
  getMyContents: async () => {
    const response = await api.get('/contents/my-contents');
    // Pastikan selalu mereturn array, meskipun backend kirim null/undefined
    const result = response.data?.data || response.data;
    return Array.isArray(result) ? result : [];
  },
  editContent: async (id, data) => {
    const response = await api.put(`/contents/${id}`, data);
    return response.data?.data || response.data;
  },
  deleteContent: async (id) => {
    const response = await api.delete(`/contents/${id}`);
    return response.data?.data || response.data;
  },
  getBalance: async () => {
    const response = await api.get('/contributor/balance');
    return response.data?.data || response.data;
  },
  getTransactions: async () => {
    const response = await api.get('/contributor/transactions');
    const result = response.data?.data || response.data;
    return Array.isArray(result) ? result : [];
  }
};