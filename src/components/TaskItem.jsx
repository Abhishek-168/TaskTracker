import { Card } from "./ui/card";


export default function TaskItem({title, description, status}) {
    return (
        <>
            <Card >
                <span>{title}</span>
                <span>{description}</span>
                <Button>{status}</Button>
            </Card>
        </>
    )
}