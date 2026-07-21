import TaskItem from "./TaskItem";

// Provides the list fo tasks
export default function TaskList({tasks}) {
 
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
