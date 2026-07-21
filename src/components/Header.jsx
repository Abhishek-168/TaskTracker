import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDebounce from "@/utils/useDebounce";
import { useEffect, useState } from "react";

export default function Header({ search, setSearch, setTasks }) {
  const debouncedSearch = useDebounce(search, 500);

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
  }, [debouncedSearch]);

  return (
    <>
      <div className="flex gap-6 relative">
        <Input
          placeholder="Search your tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearch(e.target.value);
            }
          }}
          className="max-w-[30vw] p-5 bg-gray-500 text-white border-none placeholder:text-gray-300"
        />
        <Button>Completed</Button>
        <Button>Pending</Button>
        <Button>In Progress</Button>
      </div>
    </>
  );
}
