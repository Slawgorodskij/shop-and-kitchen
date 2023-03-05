import React from 'react';
import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export const DefaultLayout = () => {
  const {user, token} = useStateContext()

  if (!token) {
    return <Navigate to={'/home_guest'}/>
  }
  const onLogout = (event) => {
    event.preventDefault()
  }
  return (
    <div id={'defaultLayout'}>
      <aside>
        <Link to={'/shopping_list'}>Список покупок</Link>
        <Link to={'/menu'}>Меню</Link>
      </aside>
      <div className={'content'}>
        <header>
          <div>Header</div>
          <div>{user.name}</div>
          <a href="#" onClick={onLogout} className={'btn-logout'}>Выйти</a>
        </header>
      </div>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}
