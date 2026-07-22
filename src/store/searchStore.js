import {create} from "zustand";

const useSearchStore = create((set) => ({
  search: "",

 setSearch: (search) => set({ search }),
}));

export default useSearchStore;