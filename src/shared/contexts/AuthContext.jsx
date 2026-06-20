/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import { getToken, setToken, removeToken } from '../services/authStorage';
import api from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading awal pas web dibuka

  useEffect(() => {
    // Cek token saat aplikasi pertama kali dimuat
    const loadUser = async () => {
      const token = getToken();
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
      } catch (error) {
        console.error("Gagal memuat sesi user", error);
        removeToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Fungsi dipanggil saat form login sukses disubmit
  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
  };

  // Tombol logout diklik
  const logout = () => {
    api.post('/auth/logout').catch(() => console.log('Logout API error')); 
    
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}