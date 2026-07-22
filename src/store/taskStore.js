import { create } from "zustand";

// zustand store for managing tasks globally
const useTaskStore = create((set) => ({
  tasks: [],
  

  /**
   * Replaces the entire tasks array
   * @param {Array} tasks - new tasks array from api
   */
  setTasks: (tasks) =>
    set({
      // make sure we dont set tasks to something thats not an array
      tasks: Array.isArray(tasks) ? tasks : [],
    }),

  /**
   * Adds a single task to the list
   * @param {Object} task - the task object to add
   */
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  /**
   * Updates an existing task by matching its id
   * @param {Object} updatedTask - task with updated feilds
   */
  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task,
      ),
    })),

  /**
   * Removes a task from the store by id
   * @param {string|number} id - the task id to remove
   */
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));

export default useTaskStore;