import React, {useEffect} from 'react';
import styles from "./shoppingList.module.css"
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import {OneNotes} from "../../components/OneNotes/OneNotes.jsx";

export const ShoppingList = () => {

  const {user} = useStateContext()
  const {shoppingListRendering, setShoppingListRendering} = useStateContext()

  const purchased = (data) => {
    console.log(data)
  }
  const deleteProduct = (data) => {
    console.log(data)
  }

  useEffect(() => {
    if (user.id) {
      const data = {
        users_id: user.id
      }
      axiosClient.post('/shoppingListRendering', data)
        .then(({data}) => {
          setShoppingListRendering(data.shoppingListRendering)
        })
    }
  }, [user])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Список покупок</h2>
      <div className={styles.main}>
        {shoppingListRendering.length === 0 &&
          <div className={styles.none__table}>
            <p>Все необходимые Вам продукты уже приобретены.</p>
          </div>
        }

        {shoppingListRendering.length > 0 &&
          shoppingListRendering.map(oneNotes =>
            <OneNotes
              key={oneNotes.id}
              oneNotes={oneNotes}
              purchased={purchased}
              deleteProduct={deleteProduct}
            />
          )
        }
      </div>

    </div>
  );
};
