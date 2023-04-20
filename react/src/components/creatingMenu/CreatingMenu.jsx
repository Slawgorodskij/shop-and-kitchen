import React  from 'react';
import styles from './creatingMenu.module.css'
import {useStateContext} from "../../context/ContextProvider.jsx";

export const CreatingMenu = ({renderDay, renderRecipe, selectedRecipeName}) => {

  const {mealTime} = useStateContext()

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
    </>
  )
};
