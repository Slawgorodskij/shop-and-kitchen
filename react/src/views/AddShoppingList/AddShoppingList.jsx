import React, {useEffect} from 'react';
import styles from "./addShoppingList.module.css"
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import {Link} from "react-router-dom";
import {MyButton} from "../../components/UI/MyButton/MyButton.jsx";


export const AddShoppingList = () => {

  const {typeProduct, setTypeProduct} = useStateContext()

  useEffect(() => {
    axiosClient.get('/getTypeProduct')
      .then(({data}) => {
        setTypeProduct(data.arrayTypeProduct);
      })
      .catch(err => {
        console.log(err)
      })
    console.log(typeProduct.length)
  }, [])


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Что купить?</h2>
      <div>
        <div>
          <h3 className={styles.subtitle}>Продукты</h3>
          <div className={styles.cards}>
            {typeProduct.length > 0
              ? typeProduct.map(item => (
                <Link
                  to={`/show_product/${item.id}`}
                  key={item.id}>
                  <div className={styles.card}>
                    <div className={styles.card__image_block}>
                      <img className={styles.card__image} src="/images/cereals.jpg" alt=""/>
                    </div>
                    <div className={styles.card__name}>
                      <h4 className={styles.card__title}>{item.name}</h4>
                      <p className={styles.card__text}>{item.description}</p>
                    </div>
                  </div>
                </Link>
              ))
              : (
                <div>
                  <p>что-то пошло не так</p>
                </div>
              )
            }

          </div>
        </div>
        <div><h3 className={styles.subtitle}>Товары</h3></div>


      </div>

      <Link to={'/shopping_list'}>
        <div className={styles.block__button}>
          <MyButton label={'Назад'}/>
        </div>
      </Link>
    </div>
  );
};
