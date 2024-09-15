import { CommonCombobox } from "@/components/common/combobox";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@/types/task";
import { useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { useUser } from "../app/root";


export async function action({ request }: { request: Request }) {
  // handle the form submission
  const formData = await request.formData() as FormData;
  formData.forEach((value, key) => {
    console.log(key, value);
  });
  return null;
}

export async function loader({ params }: { params: { id: string } }) {
  if(params.id) {
    // const task = await getTask(params.id);
    return { task: null };
  }
  console.log(params);
  // const task = await getTask(params.id);
  return { task : null};
}

// TODO: this should be a generic form.
export default function CreateTask() {
  const { task } = useLoaderData() as {task : Task | null};
  const isEdit = task !== undefined && task !== null;

  const { user } = useUser();
  const [date, setDate] = useState<Date | undefined>();
  const [assignee, setAssignee] = useState<string | undefined>();
  const [assigner, setAssigner] = useState<string | undefined>();

  return (
    <>
      <h1>{isEdit ? "Edit Task" : "Create Task"}</h1>
      <Form method="post" action="/app/tasks/create" className="grid grid-col-3 md:grid-cols-12 gap-4 grid-row-1">
        <Input type="hidden" name="id" value={isEdit ? task?.id : undefined} />
        <div className="left grid-col-3  md:col-start-2 md:col-span-5 lg:col-start-3 lg:col-span-4">
          <div className="">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" />
          </div>
          <div className="my-4">
            <Label htmlFor="description">Description</Label>
            <Textarea placeholder="What's the task about?" id="description" name="description" />
          </div>
          <div className="my-4">
            <Label htmlFor="status">Urgency</Label>
            <Select name="status">
              <SelectTrigger >
                <SelectValue placeholder="Select urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 mb-2 flex flex-col gap-1 ">
            <Label htmlFor="assigner">Assigner</Label>
            <Input type="hidden" id="assigner" name="assigner" value={assigner ?? ""} />
            {assigner ?
              <>
                <p> {assigner} </p>
                <p onClick={() => setAssigner("")}> Remove assigner </p>
              </>
              :
              <>
                <CommonCombobox setValue={setAssigner} value={assigner ?? ""} />
                <p onClick={() => setAssigner(user?.email ?? "NOT ONE")}> Assign by me </p>
              </>
            }
          </div>
          <div className="my-2 flex flex-col gap-1">
            <Label htmlFor="assignee">Assignee</Label>
            <Input type="hidden" id="assignee" name="assignee" value={assignee ?? ""} />
            {assignee ?
              <>
                <p> {assignee} </p>
                <p onClick={() => setAssignee("")}> Remove assignee </p>
              </>
              :
              <>
                <CommonCombobox setValue={setAssignee} value={assignee ?? ""} />
                <p onClick={() => setAssignee(user?.email ?? "NOT ONE")}> Assign to me </p>
              </>
            }
          </div>
        </div>
        <div className="right grid-col-3 md:col-start-7 md:col-span-3 lg:col-start-7 lg:col-span-3">
          <Label htmlFor="deadline">Deadline</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          <input
            type="hidden"
            name="deadline"
            value={date ? date.toISOString() : ''}
          />
          <Button type="submit" className="mt-4 place-content-center"> {isEdit ? "Edit" : "Create"} </Button>
        </div>

        {/* <div className="col-span-full md:col-start-7 md:col-end-10 h-max"> */}
        {/* </div> */}
      </Form>
    </>
  );
}