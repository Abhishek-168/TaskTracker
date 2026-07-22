import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import { Card } from "@/components/ui/card";
import { getAllTasks } from "@/services/getAllTasks";
import useDebounce from "@/utils/useDebounce";
import { useEffect } from "react";
import  useTaskStore from "@/store/taskStore";
import useSearchStore from "@/store/searchStore";

export default function Tasks() {
  const setTasks = useTaskStore((state) => state.setTasks);
  const search = useSearchStore((state) => state.search);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    async function fetchTasks() {
      let data;

      if (debouncedSearch.trim()) {
        const res = await fetch(
          `http://localhost:3000/search?search=${encodeURIComponent(debouncedSearch)}`,
        );
        data = await res.json();
      } else {
        data = await getAllTasks();
      }

      setTasks(data);
    }

    fetchTasks();
  }, [debouncedSearch, setTasks]);

  return (
    <div className="flex justify-center">
      <Card className="p-4 mt-10 h-[80vh] w-[70vw] bg-red-300 overflow-y-scroll scrollbar-thin">
        <Header />
        <TaskList/>
      </Card>
    </div>
  );
}
