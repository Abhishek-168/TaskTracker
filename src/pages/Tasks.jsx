import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import { Card } from "@/components/ui/card";

export default function Tasks() {
  return (
    <div className="flex justify-center">
      <Card className="p-4 mt-10 h-[80vh] w-[70vw] bg-red-300">
        <Header />
        <TaskList/>
      </Card>
    </div>
  );
}