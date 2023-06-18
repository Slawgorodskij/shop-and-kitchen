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
    console.log(typeProduct)
    if (typeProduct.length === 0) {
      axiosClient.get('/getTypeProduct')
        .then(({data}) => {
          console.log(data)
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


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{checkedTypeProduct && checkedTypeProduct.name}</h2>
      <p>{checkedTypeProduct && checkedTypeProduct.description}</p>
      <div className={styles.cards}>
        {products.length > 0
          ? products.map(item => <Card name={item.name} description={item.description} key={item.id}/>)
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
