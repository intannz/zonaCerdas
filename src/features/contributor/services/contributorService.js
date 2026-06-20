import api from '../../../shared/services/api';

export const contributorService = {
  uploadContent: async (data) => await api.post('/contents', data),
  getMyContents: async () => await api.get('/contents/my-contents'),
  editContent: async (id, data) => await api.put(`/contents/${id}`, data),
  deleteContent: async (id) => await api.delete(`/contents/${id}`),
  getBalance: async () => await api.get('/contributor/balance'),
  getTransactions: async () => await api.get('/contributor/transactions'),
};