import React, {useEffect, useState} from 'react';
import styles from "./menu.module.css"
import axiosClient from "../../axios-client.js";
import {MyButton} from "../../components/UI/MyButton/MyButton.jsx";
import {OneDay} from "../../components/OneDay/OneDay.jsx";
import {Modal} from "../../components/UI/modal/Modal.jsx";
import {useStateContext} from "../../context/ContextProvider.jsx";
import {CreatingMenu} from "../../components/creatingMenu/CreatingMenu.jsx";

export const Menu = () => {
  const [listMenu, setListMenu] = useState([]);
  const [modalActive, setModalActive] = useState(false);

  const {deyWeek, setDeyWeek} = useStateContext()
  const {mealTime, setMealTime} = useStateContext()
  const {user} = useStateContext()
  const {mealTimeAndRecipe, setMealTimeAndRecipe} = useStateContext()

  const openModal = () => {
    setModalActive(true)
  }
  const addListMenu = (data) => {
    data['users_id'] = user.id
    console.log(data)
    axiosClient.post('/addListMenu', data)
      .then(({data}) => {
        console.log(data)
      })
  }
  useEffect(() => {
    axiosClient.get('/listMenu')
      .then(({data}) => {
        setDeyWeek(data.deyWeek)
        setMealTime(data.mealTime)
        setListMenu(data.listMenu)
        setMealTimeAndRecipe(data.mealTimeAndRecipe)
        // console.log(data.mealTimeAndRecipe)
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
        <MyButton label={'Создать'} click={openModal}/>
        {listMenu.length > 0 &&
          <MyButton label={'Редактировать'}/>
        }
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <CreatingMenu deyWeek={deyWeek} addListMenu={addListMenu}/>
      </Modal>
    </div>
  );
};
