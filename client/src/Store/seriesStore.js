import { create } from 'zustand';
import { API } from '../Config/Api';
import useAuthStore from './authStore';

const useSeriesStore = create((set) => ({
  series: [],
  loading: false,
  error: null,

  fetchSeries: async () => {
    set({ loading: true, error: null });
    try {
      const { accessToken, tokenType } = useAuthStore.getState();
      console.log("Fetching series with token:", tokenType, accessToken); // Debugging line
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${tokenType} ${accessToken}`,
        },
      };
      const response = await API.get('/series', config);
      // Ensure response.data.data is an array, or default to an empty array
      set({ series: Array.isArray(response.data) ? response.data : [], loading: false });
    } catch (error) {
      set({ error: error, loading: false });
      console.error("Failed to fetch series:", error);
    }
  },

  addSeries: async (formData) => {
    set({ loading: true, error: null });
    try {
      const { accessToken, tokenType } = useAuthStore.getState();
      console.log("Adding series with token:", tokenType, accessToken); // Debugging line
      const headers = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      // If formData is an instance of FormData, let the browser set the Content-Type header
      if (formData instanceof FormData) {
        // No Content-Type header needed for FormData
      } else {
        // Default to application/json if not FormData
        headers['Content-Type'] = 'application/json';
      }

      const config = {
        headers,
      };
      const response = await API.post('/series', formData, config);
      set((state) => ({
        series: [...state.series, response.data],
        loading: false,
      }));
      return response.data;
    } catch (error) {
      set({ error: error, loading: false });
      console.error("Failed to add series:", error);
      throw error;
    }
  },

  updateSeries: async (id, seriesData) => {
    set({ loading: true, error: null });
    try {
      const { accessToken, tokenType } = useAuthStore.getState();
      console.log("Updating series with token:", tokenType, accessToken); // Debugging line
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${tokenType} ${accessToken}`,
        },
      };
      const response = await API.patch(`/series/${id}`, seriesData, config);
      set((state) => ({
        series: state.series.map((item) =>
          item.id === id ? response.data.data : item
        ),
        loading: false,
      }));
      return response.data.data;
    } catch (error) {
      set({ error: error, loading: false });
      console.error("Failed to update series:", error);
      throw error;
    }
  },

  deleteSeries: async (id) => {
    set({ loading: true, error: null });
    try {
      const { accessToken, tokenType } = useAuthStore.getState();
      console.log("Deleting series with token:", tokenType, accessToken); // Debugging line
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${tokenType} ${accessToken}`,
        },
      };
      await API.delete(`/series/${id}`, config);
      set((state) => ({
        series: state.series.filter((item) => item.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error, loading: false });
      console.error("Failed to delete series:", error);
      throw error;
    }
  },
}));

export default useSeriesStore;
