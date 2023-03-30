import React, {useEffect, useState} from 'react';
import styles from "./menu.module.css"
import axiosClient from "../../axios-client.js";
import {MyButton} from "../../components/UI/MyButton/MyButton.jsx";
import {OneDay} from "../../components/OneDay/OneDay.jsx";

export const Menu = () => {
  const [deyWeek, setDeyWeek] = useState([]);
  const [mealTime, setMealTime] = useState([]);
  const [listMenu, setListMenu] = useState(['test']);

  useEffect(() => {
    axiosClient.get('/listMenu')
      .then(({data}) => {
        setDeyWeek(data.deyWeek)
        setMealTime(data.mealTime)
        //setListMenu(data.listMenu)
      })
  }, [])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Меню</h2>
      <div className={styles.main}>
        {listMenu.length === 0 &&
          <div className={styles.none__table}>
            <p>Меню не составлено.</p>
            <p>Нажмите кнопку "Создать".</p>
          </div>
        }
        {listMenu.length > 0 &&
          deyWeek.map(deyName =>
            <OneDay nameDay={deyName} mealTime={mealTime}/>
          )
        }
      </div>
      <div className={styles.block__button}>
        <MyButton label={'Создать'}/>
        {listMenu.length > 0 &&
          <MyButton label={'Редактировать'}/>
        }
      </div>
    </div>
  );
};
