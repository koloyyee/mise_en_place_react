import { useState } from 'react';
import { Form, redirect, useNavigate } from 'react-router-dom';
import { login } from './api/auth';
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { LoadingSpinner } from './components/ui/spinner';

export async function action({ request }: { request: Request }) {

  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (email && password) {
    const { err } = await login(email, password);
    if (err) {
      return err;
    }
    return redirect("/app");
  }
  return null;
}

export default function LoginPage() {

  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function sampleLogin() {
    setLoading(true);
    const { err } = await login("hello@world.com", "password");
    if (err) {
      setMsg(err.message);
    } else {
      navigate("/app");
    }
    setLoading(false);
  }
  return (
    <main className="grid h-screen place-content-center gap-3 " >
      {loading && <LoadingSpinner className="w-3 h-3" />}
      <Form method="POST">
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <Button type="submit">Login</Button>
        <Button variant="outline" onClick={sampleLogin} > Sample Account </Button>
      </Form>
      {msg && <p className='text-red-500'>{msg}</p>}
    </main>
  )
}

