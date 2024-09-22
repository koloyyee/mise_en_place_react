import { AuthenticationError, IllegalArgumentError } from "@/lib/errors";
import { redirect } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Login to the backend and set the token to the session storage
 * @param email 
 * @param password 
 * @returns 
 */
export async function login(email: string, password: string): Promise<{resp: string | null, err: Error | null}> {
  if(email === "" || password === "") {
    return { resp: null, err: new IllegalArgumentError("Email/Password is empty") }
  }

  const resp = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // username is the email based on the db user table design.
      username: email,
      password: password
    })
  })
  const token = await resp.text();
  if (!token) { 
    return { resp: null, err: new AuthenticationError() } 
  };
  localStorage.setItem("userEmail", JSON.stringify(email));
  sessionStorage.setItem("token", token);
  return { resp: token, err: null };


}


export function logout() {
  sessionStorage.removeItem("token");
  return redirect("/");
}