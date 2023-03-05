import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export const GuestLayout = () => {
  const { user, token } = useStateContext();
  if (token) {
    return <Navigate to={'/home'}/>
  }
  return (
    <>
      <h1>test GuestLayout</h1>
      <Outlet/>
    </>
  );
};
