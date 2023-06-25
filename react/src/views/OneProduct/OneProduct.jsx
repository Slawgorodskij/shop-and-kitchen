import React, {useEffect, useState} from 'react';
import styles from "./oneProduct.module.css"
import {useStateContext} from "../../context/ContextProvider.jsx";
import {useNavigate, useParams} from "react-router-dom";
import axiosClient from "../../axios-client.js";

export const OneProduct = () => {
  const navigate = useNavigate();
  const {productId} = useParams();
  const {user} = useStateContext()
  const [product, setProduct] = useState([])


  useEffect(() => {
    if (user.id) {
      axiosClient.post('/getProduct',
        {
          users_id: user.id,
          product_id: productId,
        })
        .then(({data}) => {
          console.log(data)
          setProduct(data.dataProduct)
        })
        .catch(err => {
          console.log(err)
        })
    }

  }, [user])


  const addProduct = () => {
    const data = {
      users_id: user.id,

    }
    axiosClient.post('/addShoppingList', data)
      .then(() => {
        navigate('/shopping_list')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className={styles.container}>
      <h2>Product</h2>

    </div>
  );
};
