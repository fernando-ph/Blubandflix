import { create } from 'zustand';
import { API } from '../Config/Api';
import useAuthStore from './authStore';

const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const { accessToken, tokenType } = useAuthStore.getState();
      const config = {
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      };
      const response = await API.get('/categories', config);
      set({ categories: response.data, loading: false });
    } catch (error) {
      set({ error: error, loading: false });
      console.error("Failed to fetch categories:", error);
    }
  },
}));

export default useCategoryStore;
