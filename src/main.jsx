import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router'
import App from './App.jsx'
import Layout from './Layout.jsx'
import Cert from './Cert.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/App.css';
import CertDetail from './CertDetail.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout context={{}} />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'cert',
        element: <Cert />
      },
      {
        path: 'cert/:certId',
        element: <CertDetail />,
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)



