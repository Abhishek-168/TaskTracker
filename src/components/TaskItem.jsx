import { truncate } from "../utils/truncate";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export default function TaskItem({ id, Title, Description, status }) {
  const title = truncate(Title, 90);
  const description = truncate(Description, 206);



  return (
    <>
      <Card className="grid grid-cols-[3fr_6fr_1fr] items-top gap-4 p-4 mb-4 h-[12vh] max-h-[12vh]">
        <div className="min-w-0">
          <span className="wrap-break-word">{title}</span>
        </div>

        <div className="min-w-0">
          <span className="wrap-break-word">{description}</span>
        </div>

        <Button className="justify-self-center cursor-pointer">{status}</Button>
      </Card>
    </>
  );
}
