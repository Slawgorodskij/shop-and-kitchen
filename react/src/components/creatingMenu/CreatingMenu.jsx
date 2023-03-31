import React from 'react';
import styles from './creatingMenu.module.css'
import {useStateContext} from "../../context/ContextProvider.jsx";

let date = new Date();
date.setDate(date.getDate() + (1 + 7 - date.getDay()) % 7)
const startDate = date.toLocaleDateString("ru-RU")
date.setDate(date.getDate() + 6)
const endDate = date.toLocaleDateString("ru-RU")
export const CreatingMenu = () => {
  const {deyWeek} = useStateContext()
  const {mealTime} = useStateContext()

  return (
    <>
      <h2 className={styles.title}>c {startDate} по {endDate}</h2>
      {deyWeek.map(oneDay =>
        <div key={oneDay.id}>
          <div className={styles.block__title}>
            <h2 id={'renderDate'}>{oneDay.name}</h2>
          </div>
          <div className={styles.main}>
            {mealTime.map(item =>
              <div
                className={styles.block__meal}
                key={item.id}
              >
                <div className={styles.meal__name}>
                  <p>{item.name}</p>
                </div>

              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
    ;
};
//
//       {mealTime.length > 0 &&
// <div className={styles.block__recipe}>
//               <p>Название блюда</p>
//               <p>Название блюда</p>
//               <p>Название блюда</p>
//             </div>
//         </div>
