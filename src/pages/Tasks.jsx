import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import { Card } from "@/components/ui/card";
import { getAllTasks } from "@/services/getAllTasks";
import { searchTasks } from "@/services/searchTasks";
import useDebounce from "@/utils/useDebounce";
import { useEffect } from "react";
import  useTaskStore from "@/store/taskStore";
import useSearchStore from "@/store/searchStore";

/**
 * Main tasks page, fetches and displays all tasks
 * Also handles search - if theres a search query it hits the search api instead
 */
export default function Tasks() {
  const setTasks = useTaskStore((state) => state.setTasks);
  const search = useSearchStore((state) => state.search);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    async function fetchTasks() {
      let data;

      if (debouncedSearch.trim()) {
        // user is searching, use the search service
        data = await searchTasks(debouncedSearch);
      } else {
        // no search query, just get all tasks
        data = await getAllTasks();
      }

      setTasks(data);
    }

    fetchTasks();
  }, [debouncedSearch, setTasks]);

  return (
    <div className="flex justify-center">
      <Card className="p-4 mt-4 sm:mt-10 h-[85vh] w-[95vw] sm:w-[85vw] lg:w-[70vw] bg-red-300 overflow-y-scroll scrollbar-thin">
        <Header />
        <TaskList/>
      </Card>
    </div>
  );
}
