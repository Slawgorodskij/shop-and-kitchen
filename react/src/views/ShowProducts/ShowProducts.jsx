import React, {useEffect, useState} from 'react';
import styles from "./showProducts.module.css"

import {Link, useParams} from "react-router-dom";
import {MyButton} from "../../components/UI/MyButton/MyButton.jsx";
import {useStateContext} from "../../context/ContextProvider.jsx";
import axiosClient from "../../axios-client.js";
import {Card} from "../../components/UI/Card/Card.jsx";


export const ShowProducts = () => {
  const {typeProductId} = useParams();
  const {typeProduct, setTypeProduct} = useStateContext()
  const {products, setProducts} = useStateContext()

  const [checkedTypeProduct, setCheckedTypeProduct] = useState()
  const {user} = useStateContext()

  useEffect(() => {
    if (typeProduct.length === 0) {
      axiosClient.get('/getTypeProduct')
        .then(({data}) => {
          setTypeProduct(data.arrayTypeProduct);
        })
        .catch(err => {
          console.log(err)
        })
    }
    setCheckedTypeProduct(
      typeProduct.filter(item => +item.id === +typeProductId)[0]
    )
  }, [user])

  useEffect(() => {

    axiosClient.post('/getProducts',
      {
        type_product_id: typeProductId,
      })
      .then(({data}) => {
        setProducts(data.arrayProducts)
      })
      .catch(err => {
        console.log(err)
      })
  }, [checkedTypeProduct])

  const checkedProduct = (event) => {
    const newProducts = products.slice(0);
    let product = newProducts.find(item => +item.id === +event.target.name)
        product['checked'] = event.target.checked
    setProducts(newProducts)
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{checkedTypeProduct && checkedTypeProduct.name}</h2>
      <p className={styles.title}>{checkedTypeProduct && checkedTypeProduct.description}</p>
      <div className={styles.cards}>
        {products.length > 0
          ? products.map(item => <label key={item.id}>
              <input
                className={styles.custom_checkbox}
                type="checkbox"
                name={item.id}
                onChange={event => checkedProduct(event)}/>
              <Card
                name={item.name}
                description={item.description}
                imageName={item.imageName}
                checked={item.checked}
              />

            </label>
          )
          : (
            <div>
              <p>что-то пошло не так</p>
            </div>
          )
        }

      </div>
      <Link to={'/add_shopping_list'} className={styles.text_dec_non}>
        <div className={styles.block__button}>
          <MyButton label={'Назад'}/>
        </div>
      </Link>
    </div>
  );
};
