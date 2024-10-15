import { TodoType } from "@/api/todo";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Input } from "../ui/input";

export default function TodoInlineForm({ todo }: { todo: TodoType | null }) {

  const [editable, setEditable] = useState(todo?.isDone !== null ? todo?.isDone : true);

  return (
    <Accordion type="single" className="w-full" >
      <AccordionItem value="item-1" >
        <AccordionTrigger className="bg-white dark:bg-slate-900">
          <Input data-test="todo-name" defaultValue={todo?.name ?? ""} type="text" name="name" className="bg-white dark:bg-slate-900" disabled={editable}  />
          <Input type="checkbox" name="isDone" defaultChecked={todo?.isDone} onChange={()=> setEditable(!editable)} />
        </AccordionTrigger>

        {/* <AccordionContent>
        </AccordionContent> */}
        <AccordionContent>

          <Input data-test="todo" defaultValue={todo?.note} className="dark:text-gray-200 light:text-gray-800" type="text" name="note" placeholder="note" disabled={editable}   />
          
          <Input data-test="todo-id" defaultValue={todo?.id ?? ""} type="hidden" name="id" className="bg-white dark:bg-slate-900" />
          <Input data-test="todo-created" defaultValue={todo?.createdAt?.toLocaleString() ?? ""} type="hidden" name="createdAt" className="bg-white dark:bg-slate-900" />
          <Input data-test="todo-updated" defaultValue={todo?.updatedAt?.toLocaleString() ?? ""} type="hidden" name="updatedAt" className="bg-white dark:bg-slate-900" />
          <Input data-test="todo-username" defaultValue={todo?.username ?? ""} type="hidden" name="username" className="bg-white dark:bg-slate-900" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>

  );
}