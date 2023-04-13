import React from 'react';
import styles from "./oneDay.module.css"

export const OneDay = ({nameDay, mealTime, listNameRecipes}) => {
  return (
    <>
      <div className={styles.block__title}>
        <h2>{nameDay.name}</h2>
      </div>
      <div className={styles.main}>
        {mealTime.length > 0 &&
          mealTime.map(eating =>
            <div
              className={styles.block__meal}
              key={eating.id}
            >
              <div className={styles.meal__name}>
                <p>{eating.name}</p>
              </div>
              <div className={styles.block__recipe}>
                {listNameRecipes.length > 0 &&
                  listNameRecipes.filter(item => {
                    if (item.day_weeks_id === nameDay.id && item.meal_times_id === eating.id) {
                      return item
                    }
                  }).map(item => <p key={item.id} >{item.recipe_name}</p>)
                }
              </div>
            </div>
          )}
      </div>
    </>
  )
};
