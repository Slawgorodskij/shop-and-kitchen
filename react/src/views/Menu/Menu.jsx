import React, {useEffect, useState} from 'react';
import styles from "./menu.module.css"
import axiosClient from "../../axios-client.js";
import {MyButton} from "../../components/UI/MyButton/MyButton.jsx";
import {OneDay} from "../../components/OneDay/OneDay.jsx";
import {Modal} from "../../components/UI/modal/Modal.jsx";
import {useStateContext} from "../../context/ContextProvider.jsx";
import {CreatingMenu} from "../../components/creatingMenu/CreatingMenu.jsx";

export const Menu = () => {
  //const [listMenu, setListMenu] = useState([]);
  const [modalActive, setModalActive] = useState(false);

  const {DayWeek, setDayWeek} = useStateContext()
  const {mealTime, setMealTime} = useStateContext()
  const {user} = useStateContext()
  const {listNameRecipes, setListNameRecipes} = useStateContext()

  const openModal = () => {
    setModalActive(true)
  }
//TODO выбор даты надо сделать
  const addListMenu = (data) => {
    data['users_id'] = user.id
    axiosClient.post('/addListMenu', data)
      .then(({data}) => {
        console.log(data)
      })
  }
  const addShoppingList = (data) =>{
    data['users_id'] = user.id
    axiosClient.post('/addShoppingList', data)
      .then(({data}) => {
        console.log(data)
      })
  }
  useEffect(() => {
    if (user.id) {
      const data = {
        users_id: user.id
      }
      axiosClient.post('/listMenu', data)
        .then(({data}) => {
          setDayWeek(data.DayWeek)
          setMealTime(data.mealTime)
          setListNameRecipes(data.listNameRecipes)
        })
    }
    console.log(listNameRecipes)
  }, [user])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Меню</h2>
      <div className={styles.main}>
        {listNameRecipes.length === 0 &&
          <div className={styles.none__table}>
            <p>Меню не составлено.</p>
            <p>Нажмите кнопку "Создать".</p>
          </div>
        }
        {listNameRecipes.length > 0 &&
          DayWeek.map(deyName =>
            <OneDay key={deyName.id} nameDay={deyName} mealTime={mealTime} listNameRecipes={listNameRecipes}/>
          )
        }
      </div>
      <div className={styles.block__button}>
        <MyButton label={'Создать'} click={openModal}/>
        {listNameRecipes.length > 0 &&
          <MyButton label={'Редактировать'}/>
        }
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <CreatingMenu DayWeek={DayWeek} addListMenu={addListMenu}/>
      </Modal>
    </div>
  );
};
