import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import LoginPage, { action as loginAction } from './login.tsx'
import ErrorPage from './routes/404.tsx'
import Dashboard from './routes/app/dashboard.tsx'
import AppRoot from './routes/app/root.tsx'
import CreateTask, { action as createTaskAction, loader as createTaskLoader } from './routes/tasks/create.tsx'
import Tasks, { loader as allTasksLoader } from './routes/tasks/index.tsx'
import Task, { loader as taskLoader } from './routes/tasks/task.tsx'

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
        loader: taskLoader
      },
      {
        path: "tasks/create",
        element: <CreateTask />,
        errorElement: <ErrorPage />,
        action: createTaskAction,
        loader: createTaskLoader,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
