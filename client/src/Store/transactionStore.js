import { create } from 'zustand';
import { API } from '../Config/Api';

const useTransactionStore = create((set, get) => ({
  transactions: [],
  loading: false,
  error: null,

  setTransactions: (newTransactions) => set({ transactions: newTransactions }),

  updateTransactionStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      const response = await API.patch(`/transaction/${id}`, { status });
      set((state) => ({
        transactions: state.transactions.map((transaction) =>
          transaction.id === id ? { ...transaction, status: response.data.data.status } : transaction
        ),
        loading: false,
      }));
      return response.data.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));

export default useTransactionStore;
