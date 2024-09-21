import { redirect } from "react-router-dom";
import { getLocalToken } from ".";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


/**
 * 
 * @param endpoint - make sure to have the / e.g.: "/tasks" or "/todo/2".
 * @returns Task
 */
export async function get(endpoint: string ) {
  const token = getLocalToken();
  console.log("Authorization: `Bearer ${token}`");

  if (!token) {
    console.error("No token");
    return redirect("/");
  }
  const resp = await fetch(`${BACKEND_URL}${endpoint}`, {
    method: "GET",
    headers : {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  const data = await resp.json();
  console.log(data);
  return data;
}