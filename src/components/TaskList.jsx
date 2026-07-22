import AddTaskModal from "./AddTaskModal";
import TaskItem from "./TaskItem";
import useTaskStore from "@/store/taskStore";
import useAddTaskModalStore from "@/store/addTaskModalStore";

// Provides the list fo tasks
export default function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const addTaskModal = useAddTaskModalStore((state) => state.addTaskModal);
  const safeTasks = Array.isArray(tasks) ? tasks : [];
 
  return (
    <div className="flex gap-4 flex-wrap">
      {safeTasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          Title={task.title}
          Description={task.description}
          status={task.status}
        />
      ))}

      {addTaskModal && <AddTaskModal/> }
    </div>
  );
}
