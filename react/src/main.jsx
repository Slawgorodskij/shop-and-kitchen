import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {router} from "./router";
import {ContextProvider} from "./context/ContextProvider";
import {RouterProvider} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>
  </React.StrictMode>,
)
