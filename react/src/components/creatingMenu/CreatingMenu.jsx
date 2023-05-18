import React  from 'react';
import styles from './creatingMenu.module.css'
import {useStateContext} from "../../context/ContextProvider.jsx";

export const CreatingMenu = ({renderDay, renderRecipe, selectedRecipeName, deleteSelectedDish}) => {

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
                  }).map(item => <div key={item.id} className={styles.notes}>
                    <p >{item.arrayNameRecipe}</p>
                    <svg
                      onClick={()=>deleteSelectedDish([item, oneDay.date])}
                      className={styles.button}
                      x="0px" y="0px" viewBox="0 0 512.021 512.021" width="15" height="15">
                      <g>
                        <path
                          d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z"/>
                      </g>
                    </svg>
                  </div> )
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
