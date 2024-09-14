import { useUser } from "./root";

export default function Dashboard() {
  const {user} = useUser();

  return (
    <div>
      App
    </div>
  );
}
