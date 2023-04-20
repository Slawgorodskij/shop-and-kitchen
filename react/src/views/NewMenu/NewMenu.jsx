import React, {useEffect, useState} from 'react';
import styles from "./newMenu.module.css"
import axiosClient from "../../axios-client.js";
import {MyButton} from "../../components/UI/MyButton/MyButton.jsx";
import {OneDay} from "../../components/OneDay/OneDay.jsx";
import {Modal} from "../../components/UI/modal/Modal.jsx";
import {useStateContext} from "../../context/ContextProvider.jsx";
import {CreatingMenu} from "../../components/creatingMenu/CreatingMenu.jsx";

export const NewMenu = () => {

  const [modalActive, setModalActive] = useState(false);
  const [creatingModalActive, setCreatingModalActive] = useState(false);
  //const [startWeek, setStartWeek] = useState([])
  const [modalActiveTitle, setModalActiveTitle] = useState('');
  const [recipeSelect, setRecipeSelect] = useState([])
  const [selectedRecipeName, setSelectedRecipeName] = useState([])
  const [renderDay, setRenderDay] = useState([])

  const {DayWeek, setDayWeek} = useStateContext()
  const {mealTime, setMealTime} = useStateContext()
  const {user} = useStateContext()
  const {listNameRecipes, setListNameRecipes} = useStateContext()
  const {mealTimeAndRecipe, setMealTimeAndRecipe} = useStateContext()

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
  const addShoppingList = (data) => {
    data['users_id'] = user.id
    axiosClient.post('/addShoppingList', data)
      .then(({data}) => {
        console.log(data)
      })
  }
  useEffect(() => {
    if (user.id) {
      const data = {
        users_id: user.id,
        date: 'next'
      }
      axiosClient.post('/listMenu', data)
        .then(({data}) => {
          // setDayWeek(data.DayWeek)
          setMealTime(data.mealTime)
          setListNameRecipes(data.listNameRecipes)
          setMealTimeAndRecipe(data.mealTimeAndRecipe)
          //setStartWeek(data.date)
          renderDate(data.date, data.DayWeek)
          creatSelectedRecipeName(data.listNameRecipes)
        })
    }
  }, [user])

  const renderDate = (startDate, dayWeek) => {
    const date = new Date(startDate);
    dayWeek.map(oneDay => {
      date.setDate(date.getDate() + 1)
      oneDay['date'] = date.toLocaleDateString("ru-RU")
    })
    setRenderDay(dayWeek)
  }

  const creatSelectedRecipeName = (data) => {
    for (let key in data){
      const newName = {
        'id': Math.round(Date.now() * Math.random()).toString(),
        'recipesId': data[key].recipe_id,
        'oneDayWeek': data[key].day_weeks_id,
        'itemMealTime': data[key].meal_times_id,
        'arrayNameRecipe': data[key].recipe_name,
      }

      setSelectedRecipeName(prev => [...prev, newName])
    }

  }

  const renderRecipe = (itemMealTime, oneDayWeek) => {

    const recipeArray = mealTimeAndRecipe.filter(item => {
      return item.meal_times_id === itemMealTime.id
    })
    recipeArray.map(recipe => {
      recipe['date'] = oneDayWeek.date
      recipe['itemMealTime'] = itemMealTime.id
      recipe['oneDayWeek'] = oneDayWeek.id
    })
    setRecipeSelect(recipeArray)
    setModalActiveTitle(itemMealTime.name.toLowerCase())
    setCreatingModalActive(true)
  }

  const addRecipe = (recipe) => {
    const newName = {
      'id': Math.round(Date.now() * Math.random()).toString(),
      'recipesId': recipe.recipe_id,
      'oneDayWeek': recipe.oneDayWeek,
      'itemMealTime': recipe.itemMealTime,
      'arrayNameRecipe': recipe.recipe_name,
    }

    setSelectedRecipeName(prev => [...prev, newName])

    addListMenu({
      'recipes_id': recipe.recipe_id,
      'day_weeks_id': recipe.oneDayWeek,
      'meal_times_id': recipe.itemMealTime,
      'date': recipe.date
    })
    setCreatingModalActive(false)

    addShoppingList({
      'recipes_id': recipe.recipe_id,
    })
  }
 const deleteSelectedDish = (data) => {
   console.log(data)
 }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Меню на следующую неделю</h2>
      <div className={styles.main}>
        {DayWeek.map(deyName =>
          <OneDay key={deyName.id}
                  nameDay={deyName}
                  mealTime={mealTime}
                  listNameRecipes={listNameRecipes}
          />)}
      </div>
      <div className={styles.block__button}>
        <MyButton label={'Редактировать'} click={openModal}/>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <CreatingMenu
          renderDay={renderDay}
          addListMenu={addListMenu}
          addShoppingList={addShoppingList}
          renderRecipe={renderRecipe}
          selectedRecipeName={selectedRecipeName}
          deleteSelectedDish={deleteSelectedDish}
        />
      </Modal>

      <Modal active={creatingModalActive} setActive={setCreatingModalActive}>
        <h3 className={styles.title}>На {modalActiveTitle} подойдет</h3>
        {recipeSelect.map(recipe =>
          <p
            className={styles.text_btn}
            key={recipe.recipe_id}
            onClick={() => addRecipe(recipe)}
          >
            {recipe.recipe_name}
          </p>)}
      </Modal>
    </div>
  );
};
