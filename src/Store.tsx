import { create } from 'zustand';

const useStore = create((set) => ({
  items: [],
  addItems: (item) => set((state) => ({ items: [...state.items, item] })),
}));

export default useStore;
