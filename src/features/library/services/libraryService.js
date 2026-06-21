import api from '../../../shared/services/api';

export const libraryService = {
  getLibrary: async () => {
    const response = await api.get('/library');
    return response.data;
  },
  play: async (id) => {
    const response = await api.get(`/library/${id}/play`);
    return response.data;
  },
};