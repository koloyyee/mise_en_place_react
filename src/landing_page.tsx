import { Form, redirect } from 'react-router-dom'
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

export async function action({ request }: { request: Request }) {
  // const navigate = useNavigate();
  const formData = await request.formData();
  const email = formData.get("email");
  if (email) {
    return redirect("/app");
  }
  return null
}

function LandingPage() {

  return (
    <main className="grid h-screen place-content-center " >
      Logging from here.
      <Form method="POST">
        {/* <input name="login" type="email" /> */}
        <Input name="email" type="email" placeholder="Email" />
        <Button type="submit">Login</Button>
      </Form>
    </main>
  )
}

export default LandingPage
