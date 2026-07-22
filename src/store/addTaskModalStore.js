import {create} from "zustand";

const useAddTaskModalStore = create((set) => ({
    addTaskModal: false,
    setAddTaskModal: (addTaskModal) => set({ addTaskModal }),
}));

export default useAddTaskModalStore;