import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="flex gap-6">
        <Input
          placeholder="Search your tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-[30vw] p-5 bg-gray-500 text-white border-none"
        />
        <Button>Completed</Button>
        <Button>Pending</Button>
        <Button>In Progress</Button>
      </div>
    </>
  );
}
