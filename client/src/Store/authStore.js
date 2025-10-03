import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  accessToken: null,
  tokenType: null,
  user: null, // To store user data if needed
  login: (accessToken, tokenType, user) => {
    set({ isAuthenticated: true, accessToken, tokenType, user });
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('tokenType', tokenType);
    // Optionally store user data in localStorage if it's not sensitive
    // localStorage.setItem('user', JSON.stringify(user));
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
    // const user = JSON.parse(localStorage.getItem('user'));
    if (accessToken && tokenType) {
      set({ isAuthenticated: true, accessToken, tokenType });
      // set({ isAuthenticated: true, accessToken, tokenType, user });
    }
  },
}));

export default useAuthStore;
