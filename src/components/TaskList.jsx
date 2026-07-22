import AddTaskModal from "./AddTaskModal";
import TaskItem from "./TaskItem";
import useTaskStore from "@/store/taskStore";
import useAddTaskModalStore from "@/store/addTaskModalStore";

// Renders the list of tasks and also shows the add task modal when its open
export default function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const addTaskModal = useAddTaskModalStore((state) => state.addTaskModal);
  // just in case tasks is not an array for some reason
  const safeTasks = Array.isArray(tasks) ? tasks : [];
 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
