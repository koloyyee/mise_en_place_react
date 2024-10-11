import { UserType } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Form, useLoaderData } from "react-router-dom";

export async function loader() {
  const localUser = localStorage.getItem("user");
  if (localUser) {
    return { user: JSON.parse(localUser) };
  }
  return { user: null }
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  console.log(Object.fromEntries(formData));
  // const resp = await updateProfile(formData);
  // return resp;
  return null;
}

export default function Settings() {
  const [allowInput, setAllowInput] = useState<boolean>(false);
  const { user } = useLoaderData() as { user: UserType | null };

  function toggleEdit() {
    setAllowInput(!allowInput);
  }

  return (
      <Form method="POST" className="flex flex-col w-1/2">
        <section>

          <Input type="hidden" name="username" value={user?.username} />
          <Label htmlFor="firstName"> First Name </Label>
          <Input type="text" name="firstName" defaultValue={user?.firstName} disabled={!allowInput} />

          <Label htmlFor="lastName"> Last Name </Label>
          <Input type="text" name="lastName" defaultValue={user?.lastName} disabled={!allowInput} />

          {/* {user?.authority.toUpperCase() === Authority.Admin ?
            <div>
              <Select name="authority">
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder={user?.authority} defaultValue={user?.authority} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.entries(Authority).map(([k, v]) =>
                      (<SelectItem key={k} value={v} > {k}</SelectItem>)
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            :
            <p>{user?.authority}</p>
          } */}
        </section>

        <section className="ml-auto gap-2">
          <Button type="button" className="w-12" onClick={() => toggleEdit()}>Edit</Button>
          <Button type="submit" className="mt-3 ml-auto mx-2" disabled={!allowInput}> Update </Button>
        </section>
      </Form>
  );
}