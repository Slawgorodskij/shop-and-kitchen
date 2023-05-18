import React, {useState} from 'react';
import styles from "./sidebar.module.css";
import {MyLink} from "../UI/MyLink/MyLink.jsx";
import {useStateContext} from "../../context/ContextProvider.jsx";

export const Sidebar = ({user, onLogout, burgerActive, setBurgerActive}) => {
  const {list} = useStateContext();
  return (
    <aside
      className={burgerActive ? `${styles.aside} ${styles.aside_active}` : styles.aside}
    >
      <div className={styles.block_button}>
        <p onClick={onLogout} className={styles.logout}>Выйти</p>
        <div
          onClick={() => setBurgerActive(!burgerActive)}
          className={burgerActive ? `${styles.burger} ${styles.burger_active}` : styles.burger}>
          <span className={styles.burger_line}></span>
        </div>
      </div>
      <div className={styles.user}>
        <MyLink link={'/home'} label={'ГОТОВИТ ДОМА'}/>
        <p> {user}</p>
      </div>
      <div className={styles.block_link}>
        {list.map((item) => <MyLink key={item.id} link={item.link} label={item.label}/>)}
      </div>

    </aside>
  );
};
