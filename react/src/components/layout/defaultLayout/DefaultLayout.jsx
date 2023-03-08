import React, {useEffect} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../../../context/ContextProvider.jsx";
import axiosClient from "../../../axios-client.js";
import styles from "./defaultLayout.module.css"
import {Sidebar} from "../../sidebar/Sidebar.jsx";

export const DefaultLayout = () => {
  const {user, token, setUser, setToken,} = useStateContext()

  if (!token) {
    return <Navigate to={'/home_guest'}/>
  }
  const onLogout = (event) => {
    event.preventDefault()
    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }
  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
      })
  }, [])

  return (
    <div className={styles.background}>
      <Sidebar user={user.name} onLogout={onLogout}/>
      <main className={styles.main}>
        <Outlet/>
      </main>
      <div className="wrapper">
        <p onClick={onLogout} className={styles.logout}>Выйти</p>
      </div>
    </div>
  )
}
