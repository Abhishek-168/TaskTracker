import { truncate } from "../utils/truncate";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import useTaskStore from "@/store/taskStore";
import AddTaskModal from "./AddTaskModal";
import useAddTaskModalStore from "@/store/addTaskModalStore";
import { deleteTask } from "@/services/deleteTask";
import { toggleTaskStatus } from "@/services/toggleTaskStatus";
import { Pencil, Trash2 } from "lucide-react";
import { memo } from "react";
import { useState } from "react";

/**
 * Renders a single task card with title, description and action buttons
 * @param {Object} props
 * @param {string|number} props.id - task id
 * @param {string} props.Title - task title
 * @param {string} props.Description - task description
 * @param {string} props.status - current status of the task
 */
function TaskItem({ id, Title, Description, status }) {
  const title = truncate(Title, 90);
  const description = truncate(Description, 200);
  const updateTask = useTaskStore((state) => state.updateTask);
  const [openEditModal, setOpenEditModal] = useState(false);
  const setAddTaskModal = useAddTaskModalStore((state) => state.setAddTaskModal);

  // normalize status so we can handle inconsistent casing from the backend
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

  /**
   * Deletes a task and removes it from the store
   * @param {string|number} id - the task id to delete
   */
  const handleDelete = async (id) => {
    if (!id) {
      console.log("Task id is missing");
      return;
    }

    const data = await deleteTask(id);
    if (data) {
      console.log(data.message);
      // remove from store after successfull delete
      useTaskStore.getState().removeTask(id);
    }
  };

  /**
   * Toggles the task status and updates the store
   * @param {string|number} id
   */
  const handleStatusChange = async (id) => {
    if (!id) {
      console.log("Task id is missing");
      return;
    }

    const updatedTask = await toggleTaskStatus(id);
    if (updatedTask) {
      updateTask(updatedTask);
      console.log("Task status updated:", updatedTask);
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
