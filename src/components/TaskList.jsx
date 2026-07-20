import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { getAllTasks } from "@/services/getAllTasks";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const data = await getAllTasks();
      console.log("tasks", data);
      setTasks(data);
    }

    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          Title={task.title}
          Description={task.description}
          status={task.status}
        />
      ))}
    </div>
  );
}
