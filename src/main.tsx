import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './index.css'
import LoginPage, { action as loginAction } from './login.tsx'
import ErrorPage from './routes/404.tsx'
import Dashboard from './routes/app/dashboard.tsx'
import AppRoot from './routes/app/root.tsx'
import Board, { loader as boardLoader, } from './routes/app/tasks/board.tsx'
import CreateTask, { action as createTaskAction } from './routes/app/tasks/create.tsx'
import EditTask, { action as editTaskAction, loader as editTaskLoader } from './routes/app/tasks/edit.tsx'
import Tasks, { loader as allTasksLoader, action as tasksAction } from './routes/app/tasks/index.tsx'
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
      },
      // Tasks 
      {
        path: "tasks",
        element: <Tasks />,
        loader: allTasksLoader,
        action: tasksAction,
        children: [
          {
            path: ":taskId",
            element: <Task />,
            loader: taskLoader,
            action: taskAction,
          },
          {
            path: "create",
            element: <CreateTask />,
            action: createTaskAction,
          },
          {
            path: "edit/:taskId",
            element: <EditTask />,
            action: editTaskAction,
            loader: editTaskLoader,
          },
          // {
          //   path: "boards/",
          //   element: <Navigate to="/app/tasks" />,
          //   children : [
          //     {
          //       path: ":id",
          //       element: <Board />,
          //       loader: boardLoader

          //     },
          //   ]

          // },

        ]
      },
      {
        path: "tasks/boards",
        element: <Navigate to="/app/tasks" />
      },
      {
        path: "tasks/boards/:id",
        element: <Board />,
        loader: boardLoader

      },
      // Todos
      {
        path: "todos",
        element: <Todo />,
        action: createTodoAction,
        loader: todosLoader
      },
      // Authority
      {
        path: "authority",
        element: <Authority />,
        loader: authorityLoader,
      },
      // User Settings 
      {
        path: "settings",
        element: <Settings />,
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
