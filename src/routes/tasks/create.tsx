import { createTask } from "@/api/task";
import TaskFormBody from "@/components/tasks/form-body";
import { redirect } from "react-router-dom";


export async function action({ request }: { request: Request }) {
  // handle the form submission
  const formData = await request.formData() as FormData;
  const resp = await createTask({formData});
  if (resp.id < 0) throw new Response("Server error", { status: resp.status });

  return redirect("/app/tasks");
}

// TODO: this should be a generic form.
export default function CreateTask() {
  return <TaskFormBody isEdit={false} />
  // return (
  //   <>
  //     <h1>{isEdit ? "Edit Task" : "Create Task"}</h1>
  //     <Form method="post" className="grid grid-col-3 md:grid-cols-12 gap-4 grid-row-1">
  //       <Input type="hidden" name="id" value={isEdit ? task?.id : undefined} />
  //       <div className="left grid-col-3  md:col-start-2 md:col-span-5 lg:col-start-3 lg:col-span-4">
  //         <div className="">
  //           <Label htmlFor="name">Name</Label>
  //           <Input type="text" id="name" name="name" />
  //         </div>
  //         <div className="my-4">
  //           <Label htmlFor="description">Description</Label>
  //           <Textarea placeholder="What's the task about?" id="description" name="description" />
  //         </div>
  //         <div className="my-4">
  //           <Label htmlFor="priority">Urgency</Label>
  //           <Select name="priority">
  //             <SelectTrigger >
  //               <SelectValue placeholder="Select urgency" />
  //             </SelectTrigger>
  //             <SelectContent>
  //               <SelectItem value="low">Low</SelectItem>
  //               <SelectItem value="medium">Medium</SelectItem>
  //               <SelectItem value="high">High</SelectItem>
  //               <SelectItem value="urgent">Urgent</SelectItem>
  //               <SelectItem value="critical">Critical</SelectItem>
  //             </SelectContent>
  //           </Select>
  //         </div>
  //         <div className="mt-4 mb-2 flex flex-col gap-1 ">
  //           <Label htmlFor="assigner">Assigner</Label>
  //           <Input type="hidden" id="assigner" name="assignerEmail" value={assigner ?? ""} />
  //           {assigner ?
  //             <>
  //               <p> {assigner} </p>
  //               <p onClick={() => setAssigner("")}> Remove assigner </p>
  //             </>
  //             :
  //             <>
  //               <CommonCombobox setValue={setAssigner} value={assigner ?? ""} />
  //               <p onClick={() => setAssigner(user?.email ?? "NOT ONE")}> Assign by me </p>
  //             </>
  //           }
  //         </div>
  //         <div className="my-2 flex flex-col gap-1">
  //           <Label htmlFor="assignee">Assignee</Label>
  //           <Input type="hidden" id="assignee" name="assigneeEmail" value={assignee ?? ""} />
  //           {assignee ?
  //             <>
  //               <p> {assignee} </p>
  //               <p onClick={() => setAssignee("")}> Remove assignee </p>
  //             </>
  //             :
  //             <>
  //               <CommonCombobox setValue={setAssignee} value={assignee ?? ""} />
  //               <p onClick={() => setAssignee(user?.email ?? "NOT ONE")}> Assign to me </p>
  //             </>
  //           }
  //         </div>
  //       </div>
  //       <div className="right grid-col-3 md:col-start-7 md:col-span-3 lg:col-start-7 lg:col-span-3">
  //         <Label htmlFor="deadline">Deadline</Label>
  //         <Calendar
  //           mode="single"
  //           selected={date}
  //           onSelect={setDate}
  //           className="rounded-md border"
  //         />
  //         <input
  //           type="hidden"
  //           name="deadline"
  //           value={date ? date.toISOString() : ''}
  //         />
  //         <Button type="submit" className="mt-4 place-content-center"> {isEdit ? "Edit" : "Create"} </Button>
  //       </div>

  //       {/* <div className="col-span-full md:col-start-7 md:col-end-10 h-max"> */}
  //       {/* </div> */}
  //     </Form>
  //   </>
  // );
}