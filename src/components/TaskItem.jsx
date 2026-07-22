import { truncate } from "../utils/truncate";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import useTaskStore from "@/store/taskStore";
import { memo } from "react";

function TaskItem({ id, Title, Description, status }) {
  const title = truncate(Title, 90);
  const description = truncate(Description, 206);
  const updateTask = useTaskStore((state) => state.updateTask);
  const normalizedStatus =
    status === "Completed" || status === "completed"
      ? "Completed"
      : status === "In-progress" || status === "in-progress" || status === "in progress"
        ? "In-progress"
        : "Pending";

  const statusStyles = {
    Pending: "bg-yellow-500 text-white",
    "In-progress": "bg-blue-500 text-white",
    Completed: "bg-green-500 text-white",
  };
  
  const handleStatusChange = async (id) => {
    if (!id) {
      console.log("Task id is missing");
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}/toggle`, {
        method: "PATCH"
      });

      if (!response.ok) {
        console.log("Error updating task status");
        return;
      }

      const updatedTask = await response.json();
      updateTask(updatedTask);
      console.log("Task status updated:", updatedTask);
    } catch (error) {
      console.log("Error updating task status:", error);
    }
  };

  return (
    <>
      <Card className="grid grid-cols-[3fr_6fr_1fr] items-top gap-4 p-4 mb-4 h-[12vh] max-h-[12vh]">
        <div className="min-w-0">
          <span className="wrap-break-word">{title}</span>
        </div>

        <div className="min-w-0">
          <span className="wrap-break-word">{description}</span>
        </div>

        <Button
          className={`justify-self-center cursor-pointer hover:${statusStyles[normalizedStatus]} ${statusStyles[normalizedStatus]}`}
          onClick={() => handleStatusChange(id)}
        >
          {normalizedStatus}
        </Button>
      </Card>
    </>
  );
}

export default memo(TaskItem);
