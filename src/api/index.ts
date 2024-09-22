import { redirect } from "react-router-dom";

export function getLocalToken(){
  const token = sessionStorage.getItem("token");

  if (!token) {
    console.error("No token");
    return redirect("/");
  }
  return token;
}
