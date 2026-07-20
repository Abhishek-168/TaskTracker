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
    <>
      <div className="flex flex-col">
        {tasks.map((task) => {
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
          />;
        })}
      </div>
    </>
  );
}
