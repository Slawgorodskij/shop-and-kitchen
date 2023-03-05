import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export const DefaultLayout = () => {
  const {user, token} = useStateContext()

  if (!token) {
    return <Navigate to={'/login'}/>
  }

  return (
    <>
      <h1> test DefaultLayout</h1>
      <Outlet/>
    </>
  )
}
