import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  accessToken: null,
  tokenType: null,
  user: null, // To store user data if needed
  login: (accessToken, tokenType) => {
    const decodedUser = jwtDecode(accessToken);
    set({ isAuthenticated: true, accessToken, tokenType, user: decodedUser });
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('tokenType', tokenType);
    localStorage.setItem('user', JSON.stringify(decodedUser));
  },
  logout: () => {
    set({ isAuthenticated: false, accessToken: null, tokenType: null, user: null });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('user');
  },
  initializeAuth: () => {
    const accessToken = localStorage.getItem('accessToken');
    const tokenType = localStorage.getItem('tokenType');
    const storedUser = localStorage.getItem('user');

    if (accessToken && tokenType && storedUser) {
      const decodedUser = JSON.parse(storedUser);
      set({ isAuthenticated: true, accessToken, tokenType, user: decodedUser });
    } else if (accessToken && tokenType) {
      // If user data is not in localStorage but token is, decode it
      const decodedUser = jwtDecode(accessToken);
      set({ isAuthenticated: true, accessToken, tokenType, user: decodedUser });
      localStorage.setItem('user', JSON.stringify(decodedUser));
    }
  },
}));

export default useAuthStore;
