import { useSubmit } from "react-router-dom";

interface ItemProp {
  id?: number;
  name: string;
  description: string;
  assignerEmail: string;
  assigneeEmail: string;
  order: number;
  columnId: string;
  priority: "low" | "medium" | "high" | "urgent" | "critical";
  status: "todo" | "done" | "delay" | "cancelled" | "unavailable";
  deadline: string; // return as ISO format 
  nextOrder: number;
  prevOrder: number;
}

export default function Item({
  id,
  name,
  description,
  assignerEmail,
  assigneeEmail,
  order,
  columnId,
  priority,
  status,
  deadline,
  nextOrder,
  prevOrder

}: ItemProp) {

  const submit = useSubmit();

  return (
    <li 
    >
    </li>
  );
}