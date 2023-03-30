import React from 'react';
import styles from "./oneDay.module.css"

export const OneDay = ({nameDay, mealTime}) => {
  return (
    <>
      <div className={styles.block__title}>
        <h2>{nameDay.name}</h2>
      </div>
      <div className={styles.main}>
        {mealTime.length > 0 &&
          mealTime.map(item =>
            <div
              className={styles.block__meal}
              key={item.id}
            >
              <div className={styles.meal__name}>
                <p>{item.name}</p>
              </div>
              <div className={styles.block__recipe}>
                <p>Название блюда</p>
                <p>Название блюда</p>
                <p>Название блюда</p>
              </div>
            </div>
          )}
      </div>
    </>
  )
};
