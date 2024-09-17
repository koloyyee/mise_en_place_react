import { redirect } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function getLocalToken(){
  return sessionStorage.getItem("token");
}

export async function get(endpoint: string ) {
  const token = getLocalToken();
  if (!token) {
    console.error("No token");
    return redirect("/");
  }
  const resp = await fetch(`${BACKEND_URL}/${endpoint}`, {
    method: "GET",
    headers : {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  })
  const data = await resp.json();
  console.log(data);
  return data;
}