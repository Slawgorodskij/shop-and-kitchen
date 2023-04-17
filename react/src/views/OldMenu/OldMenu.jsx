import React, {useEffect, useState} from 'react';
import styles from "./oldMenu.module.css"
import axiosClient from "../../axios-client.js";
import {OneDay} from "../../components/OneDay/OneDay.jsx";
import {useStateContext} from "../../context/ContextProvider.jsx";
import {MyLink} from "../../components/UI/MyLink/MyLink.jsx";

export const OldMenu = () => {

  const {DayWeek, setDayWeek} = useStateContext()
  const {mealTime, setMealTime} = useStateContext()
  const {user} = useStateContext()
  const {listNameRecipes, setListNameRecipes} = useStateContext()

  useEffect(() => {
    if (user.id) {
      const data = {
        users_id: user.id,
        date: 'this',
      }
      axiosClient.post('/listMenu', data)
        .then(({data}) => {
          setDayWeek(data.DayWeek)
          setMealTime(data.mealTime)
          setListNameRecipes(data.listNameRecipes)
        })
    }
  }, [user])


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Меню на текущую неделю</h2>
      {listNameRecipes.length === 0 &&
        <div className={styles.none__table}>
          <p>Меню не составлено.</p>
        </div>
      }

      {listNameRecipes.length > 0 &&
        <div className={styles.main}>
          {DayWeek.map(deyName =>
            <OneDay key={deyName.id}
                    nameDay={deyName}
                    mealTime={mealTime}
                    listNameRecipes={listNameRecipes}
            />)}
        </div>
      }
      <div className={styles.none__table}>
        <MyLink link={'/new_menu'} label={'создать меню на следующую неделю?'}/>
      </div>
    </div>
  );
};
