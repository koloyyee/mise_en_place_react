import { findAllTodos, todoSchema, TodoType } from "@/api/todo";
import { getLocalUser, UserType } from "@/api/user";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import { z } from "zod";



export async function loader() {
  const todos = await findAllTodos();
  console.log(todos);
  return { todos };
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const user = getLocalUser() as unknown as UserType;

  formData.append("username", user.username);
  setTimeout(async () => {
    try {
      const validatedData = todoSchema.parse(Object.fromEntries(formData));
      // await createTodo(validatedData);
    } catch (e) {
      if (e instanceof z.ZodError) {
        console.error('Validation errors:', e.errors);
      } else {
        console.error('Unexpected error:', e);
      }
    }
  }, 1000)
  return { ok: true };
}

export default function Todo() {
  const submit = useSubmit();
  const { todos } = useLoaderData() as { todos: TodoType[] };

  function debounceSubmit(event: React.FocusEvent<HTMLFormElement>) {
    submit(event.currentTarget, {
      method: "POST",
    });
  }

  return (
    <main>
      <section className="flex flex-col md:flex-row h-screen gap-4">
        <div className="self border border-red-600 w-1/2 h-1/2">
          <h3 className="text-xl"> Own Todo</h3>
          {/* 
          Render the list of todos
          on top have an input that creates new todo 
          and update right away.
           */}
          <div>
            <Form method="post" className="h-3" onBlur={debounceSubmit}   >
              <Accordion type="single" className="w-full">
                <AccordionItem value="item-1" >
                  <AccordionTrigger className="bg-white dark:bg-slate-900">
                    <Input data-test="todo-name" type="text" name="name" className="bg-white dark:bg-slate-900" />
                  </AccordionTrigger>
                  <AccordionContent>
                    <Input data-test="todo-" className="dark:text-gray-200 light:text-gray-800" type="text" name="note" placeholder="note" />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Form>
          </div>
          <div>
            {/* create a loop loads all the todos */}
            {todos.map(todo => {
              return (
                <div>
                  <Form method="post" className="h-max" onBlur={debounceSubmit}    >
                    <Accordion type="single" className="w-full" >
                      <AccordionItem value="item-1" >
                        <AccordionTrigger className="bg-white dark:bg-slate-900">
                          <Input data-test="todo-name" defaultValue={todo.name ?? ""} type="text" name="name" className="bg-white dark:bg-slate-900" />
                        </AccordionTrigger>
                        <AccordionContent>
                          <Input data-test="todo-" defaultValue={todo.note ?? ""} className="dark:text-gray-200 light:text-gray-800" type="text" name="note" placeholder="note" />
                          <Input data-test="todo-id" defaultValue={todo.id ?? ""} type="hidden" name="id" className="bg-white dark:bg-slate-900" />
                          <Input data-test="todo-created" defaultValue={todo.createdAt?.toLocaleString() ?? ""} type="hidden" name="created_at" className="bg-white dark:bg-slate-900" />
                          <Input data-test="todo-updated" defaultValue={todo.updatedAt?.toLocaleString() ?? ""} type="hidden" name="updated_at" className="bg-white dark:bg-slate-900" />
                          <Input data-test="todo-username" defaultValue={todo.username ?? ""} type="hidden" name="username" className="bg-white dark:bg-slate-900" />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Form>
                </div>
              );
            })}
          </div>
        </div>
        <div className="assigned border border-red-600 w-1/2 h-1/2">
          <h3 className="text-xl"> Assigned Tasks </h3>

        </div>
      </section>
    </main>
  );
}