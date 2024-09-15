import { useUser } from "./root";

export default function Dashboard() {
  const {user} = useUser();
  console.log(user);

  return (
    <div>
      App
    </div>
  );
}
