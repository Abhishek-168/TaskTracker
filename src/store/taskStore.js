import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [],
  

  setTasks: (tasks) =>
    set({
      tasks: Array.isArray(tasks) ? tasks : [],
    }),

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task,
      ),
    })),

  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));

export default useTaskStore;