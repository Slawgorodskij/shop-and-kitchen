import React, {useEffect, useState} from 'react';
import styles from "./showProducts.module.css"

import {Link, useParams} from "react-router-dom";
import {MyButton} from "../../components/UI/MyButton/MyButton.jsx";
import {useStateContext} from "../../context/ContextProvider.jsx";
import axiosClient from "../../axios-client.js";


export const ShowProducts = () => {
  const {typeProductId} = useParams();
  const {typeProduct, setTypeProduct} = useStateContext()

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
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
    console.log(typeProduct.length)
  }, [checkedTypeProduct])


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{checkedTypeProduct && checkedTypeProduct.name}</h2>
      <p>{checkedTypeProduct && checkedTypeProduct.description}</p>

      <Link to={'/add_shopping_list'}>
        <div className={styles.block__button}>
          <MyButton label={'Назад'}/>
        </div>
      </Link>
    </div>
  );
};
