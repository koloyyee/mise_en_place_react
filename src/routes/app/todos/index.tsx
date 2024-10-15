import { createTodo, findAllTodos, todoSchema, TodoType, updateTodo } from "@/api/todo";
import { getLocalUser, UserType } from "@/api/user";
import TodoInlineForm from "@/components/todos/inline-form";
import { Separator } from "@/components/ui/separator";
import { isEqual } from "@/utils/helper/deep-equal";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import { z } from "zod";

let cachedTodos: TodoType[] = [];

export async function loader() {
  const todos = await findAllTodos();
  cachedTodos = todos;
  return { todos };
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  console.log(formData)

  const user = getLocalUser() as unknown as UserType;

  formData.append("username", user.username);
  const isDone = formData.get("isDone") === "on" ? true : false;
  const id = Number.parseInt(formData.get("id") as string);
  const createdAt = formData.get("createdAt") ? new Date(formData.get("createdAt") as string) : null;
  const updatedAt = formData.get("updatedAt") ? new Date(formData.get("updatedAt") as string) : null;

  const data = { ...Object.fromEntries(formData), id, isDone, createdAt, updatedAt } as TodoType;

  const curr = cachedTodos.find(todo => todo.id === data.id);
  // console.log(data.id)
  // console.log(isEqual(data, curr))
  console.log({ data, curr })


  if (!isEqual(data, curr)) {
    const final = {...curr, ...data};
    console.log({final})
    try {
      const validatedData = todoSchema.parse(final);
      console.log(validatedData)

      if (request.method.toLowerCase() === "post") {
        console.log("post! " + { validatedData })
        return await createTodo(validatedData);
      } else {
        console.log("update! " + { validatedData })
        return await updateTodo(validatedData);
      }


    } catch (e) {
      if (e instanceof z.ZodError) {
        console.error('Validation errors:', e.errors);
        return null;
      } else {
        console.error('Unexpected error:', e);

        return null;
      }
    }
  }
}

export default function Todo() {
  const submit = useSubmit();
  const { todos } = useLoaderData() as { todos: TodoType[] };

  function debounceSubmit(event: React.FocusEvent<HTMLFormElement>) {

    const currentTarget = event.currentTarget;
    setTimeout(() => {
      submit(currentTarget, {
        method: currentTarget.method === "post" ? "post" : "put"
      });
    }, 5000);

  }


  return (
    <main>
      <section className="flex flex-col md:flex-row h-screen gap-4">
        <div className="self border border-red-600 w-1/2 h-1/2">
          <h3 className="text-xl"> Own Todo</h3>

          <Form method="post" className="h-max" onBlur={debounceSubmit} >
            <TodoInlineForm todo={null} />
          </Form>

          <Separator className="h-3" />
          {todos.map(todo => {
            return (
              <Form key={todo.id + "-update"} method="get" className="h-max" onBlur={debounceSubmit} >
                <TodoInlineForm key={todo.id + "put"} todo={todo} />
              </Form>
            );
          }
          )}
        </div>
        <div className="assigned border border-red-600 w-1/2 h-1/2">
          <h3 className="text-xl"> Assigned Tasks </h3>
        </div>
      </section>
    </main>
  );
}
