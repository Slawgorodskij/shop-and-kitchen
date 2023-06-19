import React, {useEffect} from 'react';
import styles from "./addShoppingList.module.css"
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import {Link} from "react-router-dom";
import {MyButton} from "../../components/UI/MyButton/MyButton.jsx";
import {Card} from "../../components/UI/Card/Card.jsx";


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
                  <Card
                    name={item.name}
                    description={item.description}
                    imageName={item.imageName}
                  />
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

      <Link to={'/shopping_list'} className={styles.text_dec_non}>
        <div className={styles.block__button}>
          <MyButton label={'Назад'}/>
        </div>
      </Link>
    </div>
  );
};
