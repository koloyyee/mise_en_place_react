import { Form, redirect } from 'react-router-dom';
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

export async function action({ request }: { request: Request }) {

  const formData = await request.formData();
  const email = formData.get("email");
  if (email) {
    localStorage.setItem("userEmail", JSON.stringify(email));
    return redirect("/app");
  }
  return null;
}

export default function LandingPage() {
  return (
    <main className="grid h-screen place-content-center " >
      <Form method="POST">
        <Input name="email" type="email" placeholder="Email" />
        <Button type="submit">Login</Button>
      </Form>
    </main>
  )
}

