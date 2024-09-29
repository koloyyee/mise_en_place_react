import { updateProfile, UserType } from "@/api/user";
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
  const resp = await updateProfile(formData);
  console.log(resp);
  return resp;
}

export default function Settings() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { user } = useLoaderData() as { user: UserType | null };

  function toggleEdit() {
    setEditMode(!editMode);
  }

  return (
    <>
      <Form method="POST">
        <Input type="hidden" name="username" value={user?.username}  />
        <Label htmlFor=""> First Name </Label>
        <Input type="text" name="firstName" defaultValue={user?.firstName} disabled={!editMode} />

        <Label htmlFor=""> Last Name </Label>
        <Input type="text" name="lastName" defaultValue={user?.lastName} disabled={!editMode} />
        <Button type="submit" className="mt-3"> Update </Button>

      </Form>
      <Button className="w-12" onClick={() => toggleEdit()}>Edit</Button>
    </>
  );
}