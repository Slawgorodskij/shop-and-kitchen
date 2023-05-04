import React from 'react';

import styles from "./homeGuest.module.css"
import {MyLink} from "../../components/UI/MyLink/MyLink.jsx";

export const HomeGuest = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>ГОТОВИМ ДОМА</h1>
        <h2>быстро и просто</h2>
      </header>
      <div className={styles.block_text}>
        <h3 className={styles.title}>Поход в магазин - это всегда соблазн</h3>
        <p>Если хотите подойти к этома вопросу рационально, то это приложение для Вас.</p>
        <p>Оно поможет составить список необходимых продуктов на основании предварительно составленного меню</p>
      </div>
      <div className={styles.buttons_block}>
        <MyLink link={'/login'} label={'Вход'}/>
        <MyLink link={'/signup'} label={'Регистрация'}/>
      </div>
    </>
  );
};
