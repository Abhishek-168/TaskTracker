import {create} from "zustand";

// controls whether the add task modal is open or closed
const useAddTaskModalStore = create((set) => ({
    addTaskModal: false,
    setAddTaskModal: (addTaskModal) => set({ addTaskModal }),
}));

export default useAddTaskModalStore;