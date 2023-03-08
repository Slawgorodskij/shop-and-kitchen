import React from 'react';

import styles from "./homeGuest.module.css"
import {MyLink} from "../../components/UI/MyLink/MyLink.jsx";

export const HomeGuest = () => {
const text = 'БЛОК С ОПИСАНИЕМ ПРИЛОЖЕНИЯ'
  return (
    <>
      <header className={styles.header}>
        <h1>ГОТОВИМ ДОМА</h1>
        <h2>быстро и просто</h2>
      </header>
      <div className={styles.block_text}>
        {text}
      </div>
      <div className={styles.buttons_block}>
        <MyLink link={'/login'} label={'Вход'}/>
        <MyLink link={'/signup'} label={'Регистрация'}/>
      </div>
    </>
  );
};
