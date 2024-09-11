import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LandingPage, { action as loginAction} from './landing_page.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppRoot from './routes/app/root.tsx'
import Dashboard from './routes/app/dashboard.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    action: loginAction,
  },
  {
    path: "/app",
    element: <AppRoot/>,
    action: loginAction,
    children : [
      {
        index: true,
        element: <Dashboard/>
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
