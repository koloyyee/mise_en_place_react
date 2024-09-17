import { getLocalToken } from "@/api";
import CommonBreadcrumbs from "@/components/layout/breadcrumbs";
import { ThemeProvider } from "@/components/theme/theme-provider";
import ThemeToggle from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CircleUser, ClipboardList, FilePlus, Home, Inbox, LineChart, Menu, MessageCircleMore, Package2, PackageCheck, Search, SquareUser } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import "./app.css";

type User = {
  email: string
};
type ContextType = { user: User | null };

export async function loader() {
  return localStorage.getItem("token");
}


/***
 * Understanding the app:
 * Dashboard: /app - consist of short list of tasks involved, todos, and reminder<br>
 * Task: /tasks - a detail table of tasks with assigner, assignee and other more detail information.<br>
 *       /tasks/:id - able to see the status high, mid, low, etc and other related information, deadline.
 * ToDo: /todos - a list of personal todos, status will be done, working, overdue etc.
 * Analytics: /analytics - a graph of what's has been done, or some sort of data visualisation.
 * Message: /message - synchronous message (email) sending between users on this platform
 * Chat: /chat - instead chat application.
 * 
 */
function RenderMenuContent({ isMobile }: { isMobile: boolean }) {
  const twStyle = isMobile ? "h-5 w-5" : "h-6 w-6";

  const menu = [
    { href: "/app", text: "Dashboard", icon: <Home className={twStyle} /> },
    { href: "/app/tasks", text: "Task", icon: <PackageCheck className={twStyle} /> },
    { href: "/app/todos", text: "ToDos", icon: <ClipboardList className={twStyle} /> },
    { href: "/app/analytics", text: "Analytic", icon: <LineChart className={twStyle} /> },
    { href: "/app/messages", text: "Messages", icon: <Inbox className={twStyle} /> },
    { href: "/app/chat", text: "Chat", icon: <MessageCircleMore className={twStyle} /> },
  ]

  return (
    <>
      {menu.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          {item.icon}
          {item.text}
        </Link>
      ))}
    </>
  );
}

/**
 * The Layout of the app after login.
 */
export default function AppRoot() {

  const [user, setUser] = useState<User | null>({ email: localStorage.getItem("userEmail") ?? "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = getLocalToken();
    if (!token) {
      navigate("/");
    }
  }, []);

  function logout() {
    localStorage.removeItem("userEmail");
    setUser(null);
    navigate("/");
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 justify-between">
              <Link to="/" className="flex items-center gap-2 font-semibold">
                <span className="">Mise En Place</span>
              </Link>
              <Link to="/app/tasks/create" className="flex items-center gap-2 font-semibold">
                <FilePlus className="h-6 w-6 " />
                <span className="sr-only">New Ticket</span>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <RenderMenuContent isMobile={false} />
              </nav>
            </div>
            <div className="mt-auto p-4">
              <div className="flex">

                <Link
                  to="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <SquareUser className="size-5" />
                  User Settings
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetDescription>
                <VisuallyHidden>
                  Mobile Menu
                </VisuallyHidden>
              </SheetDescription>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <SheetTitle>Menu</SheetTitle>
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    to="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Mise en Place</span>
                  </Link>
                  <RenderMenuContent isMobile={true} />
                </nav>
                <div className="mt-auto">
                  <Link
                    to="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <SquareUser className="size-5" />
                    User Settings
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Hi, {JSON.parse(user!.email)}!</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                      Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <CommonBreadcrumbs />
            <Outlet context={{ user } satisfies ContextType} />
          </main>
        </div>
      </div>
    </ThemeProvider>

  );
}
export function useUser() {
  return useOutletContext<ContextType>();
}

