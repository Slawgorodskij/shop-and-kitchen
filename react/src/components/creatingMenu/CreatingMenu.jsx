import React, {useEffect, useState} from 'react';
import styles from './creatingMenu.module.css'
import {useStateContext} from "../../context/ContextProvider.jsx";
import {Modal} from "../UI/modal/Modal.jsx";

const date = new Date();
date.setDate(date.getDate() + (1 + 6 - date.getDay()) % 7)

export const CreatingMenu = ({DayWeek, addListMenu}) => {

  const {mealTime} = useStateContext()
  const {mealTimeAndRecipe} = useStateContext()
  const [modalActive, setModalActive] = useState(false);
  const [modalActiveTitle, setModalActiveTitle] = useState('');

  const [renderDay, setRenderDay] = useState(([]))
  const [recipeSelect, setRecipeSelect] = useState([])
  const [selectedRecipeName, setSelectedRecipeName] = useState([])


  useEffect(() => {
    DayWeek.map(oneDay => {
      date.setDate(date.getDate() + 1)
      oneDay['date'] = date.toLocaleDateString("ru-RU")
    })
    setRenderDay(DayWeek)
  }, [DayWeek]);

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
    setModalActive(true)
  }
  const addRecipe = (recipe) => {
    const newName = {
      'id': Math.round(Date.now() * Math.random()).toString(),
      'oneDayWeek': recipe.oneDayWeek,
      'itemMealTime': recipe.itemMealTime,
      'arrayNameRecipe': recipe.recipe_name,
    }

    setSelectedRecipeName(prev => [...prev, newName])
    addListMenu({
      'recipes_id': recipe.recipe_id,
      'day_weeks_id':recipe.oneDayWeek,
      'meal_times_id':recipe.itemMealTime,
      'date': recipe.date
    })
    setModalActive(false)
  }


  return (
    <>
      {renderDay.map(oneDay =>
        <div key={oneDay.id}>
          <div className={styles.block__title}>
            <h2>{oneDay.name} {oneDay.date}</h2>
          </div>
          {mealTime.map(eating =>
            <div
              className={styles.block__meal}
              key={eating.id}
            >
              <div className={styles.meal__name}>
                <p>{eating.name}</p>
              </div>
              <div className={styles.block__recipe}>
                {selectedRecipeName.length > 0 &&
                  selectedRecipeName.filter(item => {
                    if (item.oneDayWeek === oneDay.id && item.itemMealTime === eating.id) {
                      return item
                    }
                  }).map(item => <p key={item.id}>{item.arrayNameRecipe}</p>)
                }
                <p
                  className={styles.text_btn}
                  onClick={() => renderRecipe(eating, oneDay)}> добавить< /p>
              </div>
            </div>
          )}
        </div>)}

      <Modal active={modalActive} setActive={setModalActive}>
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
    </>
  )

};
//
// {mealTime.length > 0 &&
// <div className={styles.block__recipe}>
//               <p>Название блюда</p>
//               <p>Название блюда</p>
//               <p>Название блюда</p>
//             </div>
//         </div>
