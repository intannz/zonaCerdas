import api from '../../../shared/services/api';

export const catalogService = {
  getAll: async (params) => {
    const response = await api.get('/catalog', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/catalog/${id}`);
    return response.data;
  },
  getTaxonomies: async () => {
    const response = await api.get('/catalog/taxonomies');
    return response.data;
  },
  purchase: async (id) => {
    const response = await api.post(`/catalog/${id}/purchase`);
    return response.data;
  }
};