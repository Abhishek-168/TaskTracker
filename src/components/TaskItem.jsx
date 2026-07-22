import { truncate } from "../utils/truncate";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import useTaskStore from "@/store/taskStore";
import AddTaskModal from "./AddTaskModal";
import useAddTaskModalStore from "@/store/addTaskModalStore";
import { Pencil, Trash2 } from "lucide-react";
import { memo } from "react";
import { useState } from "react";

function TaskItem({ id, Title, Description, status }) {
  const title = truncate(Title, 90);
  const description = truncate(Description, 200);
  const updateTask = useTaskStore((state) => state.updateTask);
  const [openEditModal, setOpenEditModal] = useState(false);
  const setAddTaskModal = useAddTaskModalStore((state) => state.setAddTaskModal);
  const normalizedStatus =
    status === "Completed" || status === "completed"
      ? "Completed"
      : status === "In-progress" ||
          status === "in-progress" ||
          status === "in progress"
        ? "In-progress"
        : "Pending";

  const statusStyles = {
    Pending: "bg-yellow-500 text-white",
    "In-progress": "bg-blue-500 text-white",
    Completed: "bg-green-500 text-white",
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.log("Task id is missing");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.log("Error deleting task");
        return;
      }
      
      const data = await response.json();
      console.log(data.message);
      // Remove the task from the store
      useTaskStore.getState().removeTask(id);
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const handleStatusChange = async (id) => {
    if (!id) {
      console.log("Task id is missing");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}/toggle`, {
        method: "PATCH",
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
      <Card className="aspect-square max-w-[16vw] min-w-[16vw] flex flex-col p-4 gap-3 border border-transparent hover:border-red-500 transition-all duration-300">
        <div className="flex items-start justify-between gap-2">
          <span className="font-semibold text-base wrap-break-word line-clamp-2">
            {title}
          </span>
          
        </div>

        <div className="flex-1 min-h-0">
          <p className="text-sm text-muted-foreground wrap-break-word line-clamp-6">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-end gap-1 pt-2 border-t">
          <Button
            size="sm"
            className={`shrink-0 text-xs px-2 py-1 cursor-pointer hover:${statusStyles[normalizedStatus]} ${statusStyles[normalizedStatus]}`}
            onClick={() => handleStatusChange(id)}
          >
            {normalizedStatus}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="cursor-pointer h-8 w-8"
            onClick={() => setOpenEditModal(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="cursor-pointer h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => handleDelete(id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {openEditModal && (
        <AddTaskModal isEditing={true} taskId={id} setOpenEditModal={setOpenEditModal} />
      )}
    </>
  );
}

export default memo(TaskItem);
