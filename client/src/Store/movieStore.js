import { create } from 'zustand';
import { API } from '../Config/Api';
import useAuthStore from './authStore';

const useMovieStore = create((set) => ({
  movies: [],
  loading: false,
  error: null,

  fetchMovies: async () => {
    set({ loading: true, error: null });
    try {
      const { accessToken, tokenType } = useAuthStore.getState();
      console.log("Fetching movies with token:", tokenType, accessToken); // Debugging line
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${tokenType} ${accessToken}`,
        },
      };
      const response = await API.get('/movies', config);
      // Ensure response.data.data is an array, or default to an empty array
      set({ movies: Array.isArray(response.data) ? response.data : [], loading: false });
    } catch (error) {
      set({ error: error, loading: false });
      console.error("Failed to fetch movies:", error);
    }
  },

  addMovie: async (formData) => {
    set({ loading: true, error: null });
    try {
      const { accessToken, tokenType } = useAuthStore.getState();
      console.log("Adding movie with token:", tokenType, accessToken); // Debugging line
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
      const response = await API.post('/movies', formData, config);
      set((state) => ({
        movies: [...state.movies, response.data],
        loading: false,
      }));
      return response.data;
    } catch (error) {
      set({ error: error, loading: false });
      console.error("Failed to add movie:", error);
      throw error;
    }
  },

  updateMovie: async (id, movieData) => {
    set({ loading: true, error: null });
    try {
      const { accessToken, tokenType } = useAuthStore.getState();
      console.log("Updating movie with token:", tokenType, accessToken); // Debugging line
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${tokenType} ${accessToken}`,
        },
      };
      const response = await API.patch(`/movies/${id}`, movieData, config);
      set((state) => ({
        movies: state.movies.map((movie) =>
          movie.id === id ? response.data.data : movie
        ),
        loading: false,
      }));
      return response.data.data;
    } catch (error) {
      set({ error: error, loading: false });
      console.error("Failed to update movie:", error);
      throw error;
    }
  },

  deleteMovie: async (id) => {
    set({ loading: true, error: null });
    try {
      const { accessToken, tokenType } = useAuthStore.getState();
      console.log("Deleting movie with token:", tokenType, accessToken); // Debugging line
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${tokenType} ${accessToken}`,
        },
      };
      await API.delete(`/movies/${id}`, config);
      set((state) => ({
        movies: state.movies.filter((movie) => movie.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error, loading: false });
      console.error("Failed to delete movie:", error);
      throw error;
    }
  },
}));

export default useMovieStore;
