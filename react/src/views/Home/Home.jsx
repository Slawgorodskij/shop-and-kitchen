import React, {useEffect, useState} from 'react';
import styles from './home.module.css';
import {useStateContext} from "../../context/ContextProvider.jsx";
import axiosClient from "../../axios-client.js";
import {MyLink} from "../../components/UI/MyLink/MyLink.jsx";
import {MyButton} from "../../components/UI/MyButton/MyButton.jsx";

const date = new Date()
let currentDayWeeks = date.getDay();
export const Home = () => {
    const {mealTime, setMealTime} = useStateContext()
    const {user} = useStateContext()
    const {listNameRecipes, setListNameRecipes} = useStateContext()
    const {shoppingListRendering, setShoppingListRendering} = useStateContext()

    const [currentData, setCurrentData] = useState([])
    if (currentDayWeeks === 0) {
        currentDayWeeks += 7;
    }

    useEffect(() => {
        if (user.id) {
            const data = {
                users_id: user.id,
            }
            // axiosClient.post('/shoppingListRendering', data)
            //     .then(({data}) => {
            //         setShoppingListRendering(data.data)
            //     })
            //
            // data['date'] = 'this'
            // axiosClient.post('/listMenu', data)
            //     .then(({data}) => {
            //         setMealTime(data.mealTime)
            //         setListNameRecipes(data.listNameRecipes)
            //     })
        }

    }, [user])

    useEffect(() => {
        setCurrentData(listNameRecipes.filter(item => item.day_weeks_id === currentDayWeeks))

    }, [listNameRecipes])


    return (
        <div className={styles.main}>
            {/* Заголовок */}
            <h1 className={styles.title}>Создайте список продуктов за минуту!</h1>

            {/* Кнопки */}
            <div className={styles.buttons_container}>
                <MyLink link={'/add_shopping_list'} label={'Добавить вручную'} addClass={styles.button}/>
                <MyLink link={'/add_shopping_list'} label={'Выбрать рецепт'} addClass={styles.button}/>
            </div>
        </div>
    );
};


// <>
//       <h1 className={styles.title}>Домашняя страница</h1>
//
//       {currentData.length === 0 &&
//         <div className="main">
//           <div className={styles.subtitle}>
//             <p>Сегодня вы ни чего не планировали готовить.</p>
//           </div>
//         </div>
//       }
//
//       {currentData.length > 0 &&
//         <div className="main">
//           <h3 className={styles.subtitle}>Сегодня вы планировали приготовить</h3>
//           {currentData.map(eating =>
//             <div key={eating.id}>
//               <p>{eating.meal_times_name}: <span>{eating.recipe_name}</span></p>
//             </div>
//           )}
//         </div>
//       }
//
//       {shoppingListRendering.length === 0 &&
//         <h3 className={styles.subtitle}>
//           Все необходимые Вам продукты уже приобретены.
//         </h3>
//       }
//
//       {shoppingListRendering.length > 0 &&
//         <div className={styles.main}>
//           <h3 className={styles.subtitle}>
//             У вас приобретены не все необходимые продукты.
//           </h3>
//           <p>Для просмотра посетите страницу</p>
//           <MyLink link={'/shopping_list'} label={'Список покупок'}/>
//         </div>
//       }
//     </>
