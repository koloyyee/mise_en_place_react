import { boardSchema, BoardType, createBoard, getBoards } from "@/api/task";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ActionFunctionArgs, Form, Link, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { z } from "zod";

export async function loader() {
  const boards = await getBoards();

  if (boards.stauts >= 300) {
    throw new Response("Bad Request", { status: boards.status });
  }
  return { boards };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const method = request.method;
  const newBoard = Object.fromEntries(formData);
  try {
    const validatedData = boardSchema.parse(newBoard);

    switch (method) {
      case "POST":
        await createBoard(validatedData);
        break;
      default:
        break;
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.log(e);
    }
  }
  return null;
}

/**
 * The index page of the tasks, shows all tasks with pagination.
 */
export default function Tasks() {
  const navigate = useNavigate();
  const submit = useSubmit();
  const { boards } = useLoaderData() as { boards: BoardType[] };
  // const tasks = resp.data as TaskType[];
  // useEffect(() => {
  //   if (!boards.ok) {
  //     navigate("/");
  //   }
  // }, [navigate])


  // return (
  //   <div className="container mx-auto py-10">
  //     <DataTable columns={columns} data={tasks} />
  //   </div>
  // )

  // 2 parts:
  // 1: create new board with a mini form with a colour picker and 

  return (
    <main>

      <div className="flex flex-col sm: w-max md:w-1/4 ">
        {/* when submit > save in db > re-render the boards below */}
        <Form onSubmit={(e) => {
          e.preventDefault();
          submit(e.currentTarget, {
            method: "post",
            navigate: false,
          })
        }}>
          <label htmlFor="name">Create Board</label>
          <Input className="my-5" id="name" name="name" type="text" placeholder="Your New Board" />
          <div className="flex gap-5 justify-between">
            <Input className="min-w-[1rem] " type="color" id="colour" name="colour" />
            <Button type="submit"> + </Button>
          </div>
        </Form>
      </div>
      {/* Boards goes here. fix values for now */}
      <section className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-[2rem]">
        {boards.map((board) => (
          <Link to={"/app/tasks/boards/" + board.id} key={board.id + "_link"}>
            <Card key={board.id + "_card"} className={cn(`h-[5rem] border-b-[${board.colour}]  border-b-8 col-span-1`)}>
              <CardTitle className={cn("m-3")}> {board.name} </CardTitle>
            </Card>
          </Link>
        ))}
      </section>
    </main>

  );
}

