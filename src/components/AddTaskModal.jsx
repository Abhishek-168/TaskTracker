import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import useTaskStore from "@/store/taskStore";
import useAddTaskModalStore from "@/store/addTaskModalStore";

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

  useEffect(() => {
    if (isEditing && task) {
      setTitle(task.title);
      setDescription(task.description);
      console.log("Editing task:", task);
      console.log("Task ID:", taskId);
    }
  }, [isEditing, task]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim()) {
      console.log("Title is required");
      return;
    }
    // Editing existing task logic
    if (isEditing && taskId) {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
          }),
        });
        if (!response.ok) {
          console.log("Error updating task");
          return;
        }
        const data = await response.json();
        setTasks(data);
        setAddTaskModal(false);
      } catch (error) {
        console.log("Error updating task api", error);
      }
    } else {
      // New task creation logic
      try {
        const response = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
          }),
        });

        if (!response.ok) {
          console.log("Error at adding tasks");
          return;
        }

        const data = await response.json();
        setTasks(data);
        setAddTaskModal(false);
      } catch (error) {
        console.log("Error at adding tasks api", error);
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
