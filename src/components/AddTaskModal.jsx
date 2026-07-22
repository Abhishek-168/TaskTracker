import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import useTaskStore from "@/store/taskStore";
import useAddTaskModalStore from "@/store/addTaskModalStore";

export default function AddTaskModal() {
  const setTasks = useTaskStore((state) => state.setTasks);
  const setAddTaskModal = useAddTaskModalStore((state) => state.setAddTaskModal);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim()) {
      console.log("Title is required");
      return;
    }
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
  };

  return (
    <>
      <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-pink-500 flex justify-center items-center p-4 rounded-lg min-w-[20vw] min-h-[30vh]">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
         <label className="text-white font-bold">Add Task</label>
         
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
          <Button type="submit" className="bg-red-400 hover:bg-red-500 text-white p-5">
            Add Task
          </Button>
        </form>
      </div>
    </>
  );
}
