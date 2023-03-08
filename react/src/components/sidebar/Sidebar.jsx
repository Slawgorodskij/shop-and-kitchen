import React from 'react';
import styles from "./sidebar.module.css";
import {MyLink} from "../UI/MyLink/MyLink.jsx";
import {useStateContext} from "../../context/ContextProvider.jsx";
export const Sidebar = ({user}) => {
  const {list} = useStateContext();
  return (
    <aside className={styles.aside}>
      <div className={styles.user}>
        <MyLink link={'/home'} label={'ГОТОВИТ ДОМА'}/>
        <p> {user}</p>
      </div>
      <div className={styles.block_link}>
        {list.map((item)=> <MyLink key={item.id} link={item.link} label={item.label}/>)}
      </div>

    </aside>
  );
};
