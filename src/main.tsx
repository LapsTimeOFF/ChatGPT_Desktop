import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './samples/node-api'
import './index.scss'
import './normalize.css'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Settings from './Settings'

const router = createHashRouter([
  {
    path: "/",
    element: (
      <App />
    ),
  },
  {
    path: "/settings",
    element: <Settings/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
