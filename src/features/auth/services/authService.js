import api from '../../../shared/services/api';

export const authService = {
  registerUser: async (data) => {
    const response = await api.post('/auth/register/user', data);
    return response.data;
  },
  registerContributor: async (data) => {
    const response = await api.post('/auth/register/contributor', data);
    return response.data;
  },
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    
    // PERBAIKAN: Menyesuaikan dengan struktur { success: true, data: { accessToken: "..." } }
    const result = response.data.data || response.data;

    // Simpan token otomatis setelah login berhasil
    if (result?.accessToken) {
      localStorage.setItem('token', result.accessToken);
      localStorage.setItem('role', result.role);
    }
    
    return result; 
  },
  logout: async () => {
    try {
      // Panggil endpoint logout di BE
      await api.post('/auth/logout');
    } catch (error) {
      // PERBAIKAN ESLINT: Gunakan variabel error di dalam console.warn
      console.warn("Logout di backend gagal, tetap melanjutkan pembersihan lokal.", error);
    } finally {
      // Hapus semua data identitas
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('isLoggedIn');
    }
  },
  getMe: async () => {
    const response = await api.get('/auth/me');
    // Bongkar bungkus data dari backend
    return response.data.data || response.data;
  }
};