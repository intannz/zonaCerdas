import api from '../../../shared/services/api';

export const authService = {
  /**
   * 1. Register User Biasa
   * @param {Object} data - { name, email, password }
   */
  registerUser: async (data) => {
    const response = await api.post('/auth/register', data);
    return response;
  },

  /**
   * 2. Register Kreator (Kontributor)
   * @param {Object} data - { name, email, password, bankName, bankAccount }
   */
  registerContributor: async (data) => {
    // Ingat, kalau ada URL portofolio dari form FE, pastikan BE juga mau menerimanya (di API Docs saat ini belum tertulis field portofolio, jadi kita sesuaikan dengan docs).
    const response = await api.post('/auth/register/contributor', data);
    return response;
  },

  /**
   * 3. Login User & Contributor
   * @param {Object} credentials - { email, password }
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response;
  },

  /**
   * 4. Logout
   * Tidak butuh body, karena token otomatis diselipkan di Header oleh api.js
   */
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response;
  },

  /**
   * 5. Get Current User Data
   * Mengambil data profil user yang sedang login beserta role-nya
   */
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response;
  }
};