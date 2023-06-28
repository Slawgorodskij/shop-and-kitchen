import React, {useEffect, useState} from 'react';
import styles from "./oneProduct.module.css"
import {useStateContext} from "../../context/ContextProvider.jsx";
import {useNavigate, useParams} from "react-router-dom";
import axiosClient from "../../axios-client.js";
import {MyButton} from "../../components/UI/MyButton/MyButton.jsx";

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
          setProduct(data.dataProduct[0])
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
      <h2 className={styles.title}>{product.name}</h2>
      <div className={styles.block}>
        <div className={styles.image_block}>
          <img className={styles.image}
               src={product.imageName ? `/images/${product.imageName}` : '/images/image_no.jpg'}
               alt={product.name}/>
        </div>
        <div>
          <h3>На 100 гр. продукта приходится</h3>
          <p>Каллорий: {product.calories}</p>
          <p>Белков: {product.squirrels}</p>
          <p>Жиров: {product.fats}</p>
          <p>Углеводов: {product.carbohydrates}</p>
          <p>Реализуется упаковкой весом: {product.default_weight} гр.</p>
        </div>
      </div>
      <div>
        <span className={styles.text_transform}>{product.name}</span> {product.description}
      </div>
      <div className={styles.bottom}>
        {
          product.count
            ? <p> Вы запланировали {product.name} к покупке в количестве - {product.count} уп.
              или {product.quantity / 1000} кг. </p>
            : <p> Вы еще не запланировали покупку {product.name} 😔</p>
        }
      </div>
      <MyButton label={'Назад'} click={() => navigate(-1)}/>
    </div>
  );
};
