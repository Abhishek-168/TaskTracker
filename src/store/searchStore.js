import {create} from "zustand";

// store for the search input value, shared between header and tasks page
const useSearchStore = create((set) => ({
  search: "",

 setSearch: (search) => set({ search }),
}));

export default useSearchStore;