import { CommonCombobox } from "@/components/common/combobox";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/routes/app/root";
import { Intent, Priority, TaskType } from "@/types/task";
import { DateTime } from "luxon";
import { useState } from "react";
import { Form } from "react-router-dom";

interface TaskFormBodyProps {
  isEdit?: boolean;
  task?: TaskType;
	boardId: string,
	columnId: number,
	nextOrder: number,
	onAddCard: () => void;
	onComplete: () => void;
}

export default function TaskFormBody({ boardId, columnId, nextOrder, onAddCard, onComplete, isEdit = false, task }: TaskFormBodyProps) {

  const { user } = useUser();
  const [allowInput, setAllowInput] = useState<boolean>(!isEdit);
  const [date, setDate] = useState<Date | undefined>(task?.deadline ? DateTime.fromISO(task!.deadline).toJSDate() : undefined);
  const [assignee, setAssignee] = useState<string | undefined>(task?.assigneeEmail ?? "");
  const [assigner, setAssigner] = useState<string | undefined>(task?.assignerEmail ?? "");

  return (

    <>
      <h1>{isEdit ? task?.name : "Create Task"}</h1>
      <Form method={isEdit ? "put" : "post"} className="grid grid-col-3 md:grid-cols-12 gap-4 grid-row-1">
				
				<input type="hidden" name="columnId" value={columnId} />
				<input type="hidden" name="boardId" value={boardId} />
				<input type="hidden" name="orderNum" value={nextOrder} />
				<input type="hidden" name="intent" value={Intent.createItem} />
        <Input type="hidden" name="id" value={isEdit ? task?.id : undefined} disabled={!allowInput} />

        <div className="left grid-col-3  md:col-start-2 md:col-span-5 lg:col-start-3 lg:col-span-4">
          <div className="">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" defaultValue={task?.name ?? ""} disabled={!allowInput} />
          </div>
          <div className="my-4">
            <Label htmlFor="description">Description</Label>
            <Textarea placeholder="What's the task about?" id="description" name="description" defaultValue={task?.description ?? ""} disabled={!allowInput} />
          </div>
          <div className="my-4">
            <Label htmlFor="priority">Urgency</Label>
            <Select name="priority" defaultValue={task?.priority} disabled={!allowInput} >
              <SelectTrigger >
                <SelectValue placeholder="Select urgency" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(Priority).map(([k, v]) => {
                  return (
                    <SelectItem key={k} value={v}>{k} </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
          {/* {isEdit ?
            <div className="my-4">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={task?.status} disabled={!allowInput} >
                <SelectTrigger >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(TaskStatus).map(([k, v]) => {
                    return <SelectItem key={k} value={v}>{k}</SelectItem>;
                  })}
                </SelectContent>
              </Select>
            </div>
            :
            <></>
          } */}
          <div className="mt-4 mb-2 flex flex-col gap-1 ">
            <Label htmlFor="assigner">Assigner</Label>
            <Input type="hidden" id="assigner" name="assignerEmail" value={assigner ?? ""} disabled={!allowInput} />
            {assigner ?
              <>
                <p> {assigner} </p>
                {allowInput ?
                  <p onClick={() => setAssigner("")} > Remove assigner </p>
                  :
                  <></>
                }
              </>
              :
              <>
                <CommonCombobox setValue={setAssigner} value={assigner ?? ""} />
                <p onClick={() => setAssigner(user?.username ?? "NOT ONE")}> Assign by me </p>
              </>
            }
          </div>
          <div className="my-2 flex flex-col gap-1">
            <Label htmlFor="assignee">Assignee</Label>
            <Input type="hidden" id="assignee" name="assigneeEmail" value={assignee ?? ""} disabled={!allowInput} />
            {assignee ?
              <>
                <p> {assignee} </p>
                {allowInput ?
                  <p onClick={() => setAssignee("")}> Remove assignee </p>
                  :
                  <> </>
                }
              </>
              :
              <>
                <CommonCombobox setValue={setAssignee} value={assignee ?? ""} />
                <p onClick={() => setAssignee(user?.username ?? "NOT ONE")}> Assign to me </p>
              </>
            }
          </div>
        </div>
        <div className="right grid-col-3 sm:col-span-6 lg:col-start-7 lg:col-span-3 ">
          <Label htmlFor="deadline">Deadline</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border w-max"
            disabled={!allowInput}
            fromDate={new Date()}
          />
          <input
            type="hidden"
            name="deadline"
            value={date ? date.toLocaleString() : ''}
          />
          {
            isEdit ?

              <Button type="button" className="mt-4 place-content-center" onClick={() => setAllowInput(!allowInput)}>  Edit </Button>
              :
              <Button type="submit" className="mt-4 place-content-center">  Create </Button>
          }
          {
            allowInput && isEdit ?
              <Button type="submit" className="mx-2 mt-4 place-content-center">  Update </Button>
              :
              <></>
          }
        </div>

        {/* <div className="col-span-full md:col-start-7 md:col-end-10 h-max"> */}
        {/* </div> */}
      </Form>
      {isEdit ?
        <Form method="DELETE">
          <input type="hidden" name="id" value={task?.id ?? ""} />
          <Button type="submit" className="mt-4 place-content-center" disabled={!allowInput}> delete </Button>
        </Form>
        :
        <></>
      }
    </>
  );
}