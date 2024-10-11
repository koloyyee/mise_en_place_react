import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import LoginPage, { action as loginAction } from './login.tsx'
import ErrorPage from './routes/404.tsx'
import Dashboard from './routes/app/dashboard.tsx'
import AppRoot from './routes/app/root.tsx'
import CreateTask, { action as createTaskAction } from './routes/app/tasks/create.tsx'
import EditTask, { action as editTaskAction, loader as editTaskLoader } from './routes/app/tasks/edit.tsx'
import Tasks, { loader as allTasksLoader } from './routes/app/tasks/index.tsx'
import Task, { action as taskAction, loader as taskLoader } from './routes/app/tasks/task.tsx'
import Todo, { action as createTodoAction, loader as todosLoader } from './routes/app/todos/index.tsx'
import Authority, { loader as authorityLoader } from './routes/app/user-profiles/index.tsx'
import Settings, { action as settingsAction, loader as settingsLoader } from './routes/app/users/settings.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    action: loginAction,
    errorElement: <ErrorPage />,
  },
  {
    path: "/app",
    errorElement: <ErrorPage />,
    element: <AppRoot />,
    action: loginAction,
    children: [
      {
        index: true,
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },
      // Tasks 
      {
        path: "tasks",
        element: <Tasks />,
        errorElement: <ErrorPage />,
        loader: allTasksLoader
      },
      {
        path: "tasks/:taskId",
        element: <Task />,
        errorElement: <ErrorPage />,
        loader: taskLoader,
        action: taskAction,
      },
      {
        path: "tasks/create",
        element: <CreateTask />,
        errorElement: <ErrorPage />,
        action: createTaskAction,
      },
      {
        path: "tasks/edit/:taskId",
        element: <EditTask/>,
        errorElement: <ErrorPage />,
        action: editTaskAction,
        loader: editTaskLoader,
      },
      // Todos
      {
        path: "todos",
        element: <Todo/>,
        errorElement: <ErrorPage/>,
        action: createTodoAction,
        loader: todosLoader
      },
      // Authority
      {
        path:"authority",
        element: <Authority />,
        errorElement: <ErrorPage />,
        loader: authorityLoader,
      },
      // User Settings 
      {
        path: "settings",
        element: <Settings/>,
        errorElement: <ErrorPage />,
        loader: settingsLoader,
        action: settingsAction
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
