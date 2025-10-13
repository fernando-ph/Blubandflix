import { create } from 'zustand';

const useRegisterStore = create((set) => ({
    form: {
        username: '',
        email: '',
        password: '',
        fullName: '',
        gender: '',
        phone: '',
        address: '',
        image: '',
    },
    setForm: (name, value) => set((state) => ({
        form: {
            ...state.form,
            [name]: value,
        },
    })),
    resetForm: () => set({
        form: {
            username: '',
            email: '',
            password: '',
            fullName: '',
            gender: '',
            phone: '',
            address: '',
            image: '',
        },
    }),
}));

export default useRegisterStore;
