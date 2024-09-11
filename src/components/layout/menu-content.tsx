import { ClipboardList, Home, Inbox, LineChart, Link, PackageCheck } from "lucide-react";

export default function MenuContent() {

  const menu = [
    { text: "Dashboard", icon: <Home className="h-4 w-4" /> },
    { text: "Task", icon: <PackageCheck className="h-4 w-4" /> },
    { text: "List", icon: <ClipboardList className="h-4 w-4" /> },
    { text: "Analytic", icon: <LineChart className="h-4 w-4" /> },
    { text: "Messages", icon: <Inbox className="h-4 w-4" /> },
  ]
  return (
    <div className="flex-1">
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {menu.map( (item, index)=> (
        <Link
        key={index}
          to="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          {item.icon}
          {item.text}
        </Link>
      ))}
    </nav>
  </div>
  );
}