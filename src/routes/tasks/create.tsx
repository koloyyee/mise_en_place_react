import { CommonCombobox } from "@/components/common/combobox";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Form } from "react-router-dom";

const users = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    name: "Jane Doe",
    email: "jane.doe@example.com",
  },
  {
    name: "John Smith",
    email: "john.smith@example.com",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
  },
];

export async function action({ request }: { params: Request }) {
  // handle the form submission
  const formData = await request.formData() as FormData;
  console.log(formData.entries());
}

export default function CreateTask({ isEdit }: { isEdit: boolean }) {
  const [openAssigner, setOpenAssigner] = useState(false);
  const [openAssignee, setOpenAssignee] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [assignee, setAssignee] = useState<string | undefined>();
  const [assigner, setAssigner] = useState<string | undefined>();


  function debounceSearch(e: React.ChangeEvent<HTMLInputElement>, setUser: React.Dispatch<React.SetStateAction< string | undefined>>, timeout: number = 300) {

    setTimeout(() => {
      const name = e.target.value;
      const target = users.find(user => user.name.toLowerCase().includes(name.toLowerCase()));

      setUser(target?.email);
    }, timeout);
  }

  return (
    <>
      <h1>{isEdit ? "Edit Task" : "Create Task"}</h1>
      <Form method="post" action="/app/tasks/create" className="grid grid-col-3 md:grid-cols-12 gap-4 grid-row-1  md:grid-rows-2">

        <div className="left grid-col-3  md:col-start-2 md:col-span-5 lg:col-start-3 lg:col-span-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input type="text" id="description" name="description" />
          </div>
          <div>
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
          <div>
            <Label htmlFor="assigner">Assigner</Label>
            <Input type="hidden" id="assigner" name="assigner" value={assigner ?? ""} />
            <CommonCombobox setValue={setAssigner} value={assigner ?? ""} />
          </div>
          <div>
            <Label htmlFor="assignee">Assignee</Label>
            <Input type="hidden" id="assignee" name="assignee" value={assignee ?? ""} />
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
        </div>

        <div className="col-span-full md:col-start-7 md:col-end-10">
          <Button type="submit" className="place-content-center"> {isEdit ? "Edit" : "Create"} </Button>
        </div>
      </Form>
    </>
  );
}