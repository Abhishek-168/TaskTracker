import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllTasks } from "@/services/getAllTasks";
import { searchTasks } from "@/services/searchTasks";
import useDebounce from "@/utils/useDebounce";
import { useEffect, useState } from "react";
import { Plus } from 'lucide-react';
import useSearchStore from "@/store/searchStore";
import useTaskStore from "@/store/taskStore";
import useAddTaskModalStore from "@/store/addTaskModalStore";

/**
 * Header component with search bar, filter buttons and add task button
 */
export default function Header() {
  const search = useSearchStore((state) => state.search);
  const setSearch = useSearchStore((state) => state.setSearch);
  const setTasks = useTaskStore((state) => state.setTasks);
  const setAddTaskModal = useAddTaskModalStore((state) => state.setAddTaskModal);

  const debouncedSearch = useDebounce(search, 500);
  const statusStyles = {
    Pending: "bg-yellow-500 text-white",
    "In-progress": "bg-blue-500 text-white",
    Completed: "bg-green-500 text-white",
  };

  // fires when debounced search value changes, calls the search api
  useEffect(() => {
    async function handleSearch() {
      if (!debouncedSearch.trim()) return;

      const data = await searchTasks(debouncedSearch);
      setTasks(data);
    }

    handleSearch();
  }, [debouncedSearch, setTasks]);

  /**
   * Filters tasks by there status value
   * @param {string} value - the status to filter by (eg "completed", "pending")
   */
  const handleFilter = async (value) => {
    const tasks = await getAllTasks();
    const filteredTasks = (tasks ?? []).filter((task) => {
      const taskStatus = String(task.status ?? "Pending").toLowerCase();
      if (value === "completed") return taskStatus === "completed";
      if (value === "pending") return taskStatus === "pending";
      if (value === "in-progress") return taskStatus === "in-progress";
      return true; // no filter, show all
    });

    setTasks(filteredTasks);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex gap-3 items-center">
          <Button className="rounded-[50%] pl-3 pr-3 shrink-0"
                  onClick={() => setAddTaskModal(true)}      
            >
            <Plus />
          </Button>
          <Input
            placeholder="Search your tasks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearch(e.target.value);
              }
            }}
            className="w-full sm:w-auto sm:max-w-[30vw] p-5 bg-pink-500 text-white border-none placeholder:text-gray-300"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => handleFilter("")} className="cursor-pointer text-sm"> 
            All
          </Button>
          <Button onClick={() => handleFilter("completed") } className={`hover:${statusStyles.Completed} ${statusStyles.Completed} cursor-pointer text-sm`}>
            Completed
          </Button>
          <Button onClick={() => handleFilter("pending") } className={`hover:${statusStyles.Pending} ${statusStyles.Pending} cursor-pointer text-sm`}>
            Pending
          </Button>
          <Button onClick={() => handleFilter("in-progress") } className={`hover:${statusStyles["In-progress"]} ${statusStyles["In-progress"]} cursor-pointer text-sm`}>
            In Progress
          </Button>
        </div>
      </div>
    </>
  );
}
