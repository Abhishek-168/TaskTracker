import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllTasks } from "@/services/getAllTasks";
import useDebounce from "@/utils/useDebounce";
import { useEffect, useState } from "react";
import { Plus } from 'lucide-react';
import useSearchStore from "@/store/searchStore";
import useTaskStore from "@/store/taskStore";
import useAddTaskModalStore from "@/store/addTaskModalStore";

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

  useEffect(() => {
    async function handleSearch() {
      if (!debouncedSearch.trim()) return;

      const res = await fetch(
        `http://localhost:3000/search?search=${encodeURIComponent(
          debouncedSearch,
        )}`,
      );

      const data = await res.json();
      setTasks(data);
    }

    handleSearch();
  }, [debouncedSearch, setTasks]);

  const handleFilter = async (value) => {
    const tasks = await getAllTasks();
    const filteredTasks = (tasks ?? []).filter((task) => {
      const taskStatus = String(task.status ?? "Pending").toLowerCase();
      if (value === "completed") return taskStatus === "completed";
      if (value === "pending") return taskStatus === "pending";
      if (value === "in-progress") return taskStatus === "in-progress";
      return true;
    });

    setTasks(filteredTasks);
  };

  return (
    <>
      <div className="flex gap-3 relative">
        <Button className="rounded-[50%] pl-3 pr-3"
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
          className="max-w-[30vw] p-5 bg-pink-500 text-white border-none placeholder:text-gray-300"
        />
       
        <Button onClick={() => handleFilter("")} className="cursor-pointer"> 
          All
        </Button>
        <Button onClick={() => handleFilter("completed") } className={`hover:${statusStyles.Completed} ${statusStyles.Completed} cursor-pointer`}>
          Completed
        </Button>
        <Button onClick={() => handleFilter("pending") } className={`hover:${statusStyles.Pending} ${statusStyles.Pending} cursor-pointer`}>
          Pending
        </Button>
        <Button onClick={() => handleFilter("in-progress") } className={`hover:${statusStyles["In-progress"]} ${statusStyles["In-progress"]} cursor-pointer`}>
          In Progress
        </Button>
      </div>
    </>
  );
}
