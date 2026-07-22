import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import useTaskStore from "@/store/taskStore";
import useAddTaskModalStore from "@/store/addTaskModalStore";
import { createTask } from "@/services/createTask";
import { updateTask } from "@/services/updateTask";

/**
 * Modal component for adding a new task or editing an exisitng one
 * @param {Object} props
 * @param {boolean} props.isEditing - whether we are editing or creating
 * @param {string|number|null} props.taskId - id of the task being edited
 * @param {Function|null} props.setOpenEditModal - callback to close the edit modal
 */
export default function AddTaskModal({
  isEditing = false,
  taskId = null,
  setOpenEditModal = null,
}) {
  const task = useTaskStore((state) =>
    state.tasks.find((t) => t.id === taskId),
  );
  const setTasks = useTaskStore((state) => state.setTasks);
  const setAddTaskModal = useAddTaskModalStore(
    (state) => state.setAddTaskModal,
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // prefill the form fields when editing a task
  useEffect(() => {
    if (isEditing && task) {
      setTitle(task.title);
      setDescription(task.description);
      console.log("Editing task:", task);
      console.log("Task ID:", taskId);
    }
  }, [isEditing, task]);

  /**
   * Handles form submission for both creating and updating tasks
   * @param {Event} event - the form submit event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim()) {
      console.log("Title is required");
      return;
    }

    if (isEditing && taskId) {
      // editing a existing task
      const data = await updateTask(taskId, title, description);
      if (data) {
        setTasks(data);
        setAddTaskModal(false);
      }
    } else {
      // creating a new task
      const data = await createTask(title, description);
      if (data) {
        setTasks(data);
        setAddTaskModal(false);
      }
    }
  };

  return (
    <>
      <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-pink-500 flex justify-center items-center p-4 rounded-lg min-w-[20vw] min-h-[30vh]">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label className="text-white font-bold">
            {isEditing ? "Edit Task" : "Add Task"}
          </label>

          <Input
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="min-w-[20vw] max-w-[30vw] p-5 pl-3 bg-gray-200 text-black border-none placeholder:text-gray-500 border
"
          ></Input>
          <Input
            placeholder="Enter the description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-w-[20vw] max-w-[30vw] p-5 pl-3 bg-gray-200 text-black border-none placeholder:text-gray-500"
          ></Input>
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              onClick={() => {
                setAddTaskModal(false);
                setOpenEditModal(false);
              }}
              className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white p-5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="cursor-pointer bg-red-400 hover:bg-red-500 text-white p-5"
            >
              Add Task
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
