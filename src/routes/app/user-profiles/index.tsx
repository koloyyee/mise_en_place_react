import { UserType } from "@/api/user";
import { useLoaderData } from "react-router-dom";


export async function loader() {
  const user = JSON.parse(localStorage.getItem("user") ?? "");
  return {user};
}

export default function Authority() {
  const { user } = useLoaderData() as {user : UserType};


  return(
    <>
      <pre>
        {JSON.stringify(user)}
      </pre>
    </>
  );
}