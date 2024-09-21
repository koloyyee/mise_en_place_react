import { get } from "./fetch";

export type TaskType = {
  id: number;
  name: string;
  description: string;
  assigner: string;
  assignee: string;
  priority: string; 
  deadline: Date;
}

export const Urgency = Object.freeze({
  low: "low",
  medium: "medium",
  high: "high",
  urgent: "urgent",
  critical: "critical",
});

const tasks: TaskType[] = [
  {
    id: 1,
    name: "clean the table",
    description: "clean database after each test",
    assigner: "David",
    assignee: "Paul",
    priority: Urgency.low,
    deadline: new Date()
  },
  // create 2 more different tasks with different urgency, name and description
  {
    id: 2,
    name: "clean the database",
    description: "clean database after each test",
    assigner: "George",
    assignee: "John",
    priority: Urgency.medium,
    deadline: new Date()
  },
  {
    id: 3,
    name: "add data",
    description: "add data before each test",
    assigner: "David",
    assignee: "George",
    priority: Urgency.high,
    deadline: new Date()
  },
  {
    id: 4,
    name: "edit the table",
    description: "edit database after each test",
    assigner: "Mary",
    assignee: "Paul",
    priority: Urgency.urgent,
    deadline: new Date()
  },

]

export async function getTaskById({taskId }: {taskId: number}) {
  const task = await get("/tasks/" + taskId);
  console.log(task);
  return task;
}

export async function geTaskTypes() {
  return tasks;
}
