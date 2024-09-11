export type TTask = {
  id: number;
  name: string;
  description: string;
  assigner: string;
  assignee: string;
  status: string; 
  deadline: Date;
}

export const Urgency = Object.freeze({
  low: "low",
  medium: "medium",
  high: "high",
  urgent: "urgent",
  critical: "critical",
});

const tasks: TTask[] = [
  {
    id: 1,
    name: "clean the table",
    description: "clean database after each test",
    assigner: "David",
    assignee: "Paul",
    status: Urgency.low,
    deadline: new Date()
  },
  // create 2 more different tasks with different urgency, name and description
  {
    id: 2,
    name: "clean the database",
    description: "clean database after each test",
    assigner: "George",
    assignee: "John",
    status: Urgency.medium,
    deadline: new Date()
  },
  {
    id: 3,
    name: "add data",
    description: "add data before each test",
    assigner: "David",
    assignee: "George",
    status: Urgency.high,
    deadline: new Date()
  },
  {
    id: 4,
    name: "edit the table",
    description: "edit database after each test",
    assigner: "Mary",
    assignee: "Paul",
    status: Urgency.urgent,
    deadline: new Date()
  },

]

export async function getTask(taskId: number) {
  return tasks.find(task => task.id === taskId);
}

export async function getTasks() {
  return tasks;
}
