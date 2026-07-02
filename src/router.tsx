import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { ToolPage } from './pages/ToolPage'
import { NotFoundPage } from './pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/tools/:toolId', element: <ToolPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
