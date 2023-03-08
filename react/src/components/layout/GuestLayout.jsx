import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";
import styles from "./guestLayout.module.css"

export const GuestLayout = () => {
  const {token} = useStateContext();
  if (token) {
    return <Navigate to={'/home'}/>
  }
  return (
    <div className={styles.background}>
      <main className={styles.main}>
        <Outlet/>
      </main>
    </div>
  );
};
