import React, {useEffect, useState} from 'react';
import styles from "./showProducts.module.css"

import {Link, useNavigate, useParams} from "react-router-dom";
import {MyButton} from "../../components/UI/MyButton/MyButton.jsx";
import {useStateContext} from "../../context/ContextProvider.jsx";
import axiosClient from "../../axios-client.js";
import {Card} from "../../components/UI/Card/Card.jsx";
import {changeItemArray, checkedProduct} from "../../utils/shoppingList.js";

export const ShowProducts = () => {
  const navigate = useNavigate();

  const {typeProductId} = useParams();
  const {typeProduct, setTypeProduct} = useStateContext()
  const {user} = useStateContext()

  const [products, setProducts] = useState([])
  const [checkedTypeProduct, setCheckedTypeProduct] = useState([])
  const [selectedProduct, setSelectedProduct] = useState([])


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

  const changeSelectedProduct = (id, product) => {
    setSelectedProduct(prevState => changeItemArray(prevState, id, product))
  }
  const handleCheckedProduct = (event) => {
    const [newArray, product] = checkedProduct(event, products)

    setProducts(newArray)
    changeSelectedProduct(+event.target.name, product)
  }

  const deleteProduct = () => {
    setSelectedProduct([])
    setProducts([]);
    navigate('/add_shopping_list')
  }

  const addProduct = () => {
    const data = {
      users_id: user.id,
      products: selectedProduct,
    }
    axiosClient.post('/addShoppingList', data)
      .then(() => {
        navigate('/shopping_list')
      })
      .catch(err => {
        console.log(err)
      })
  }
  const watch = (data) => {
    console.log(data)
    navigate(`/one_product/${data}`)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{checkedTypeProduct && checkedTypeProduct.name}</h2>
      <p className={styles.title}>{checkedTypeProduct && checkedTypeProduct.description}</p>
      <div className={styles.cards}>
        {products.length > 0
          ? products.map(item => <label key={item.id + item.name}>
              <input
                className={styles.custom_checkbox}
                type="checkbox"
                name={item.id}
                onChange={event => handleCheckedProduct(event)}/>
              <Card
                name={item.name}
                description={item.description}
                imageName={item.imageName}
                checked={item.checked}
                content={`<h3>На 100 гр. продукта приходится</h3>
                          <p>Каллорий: ${item.calories}</p>
                          <p>Белков: ${item.squirrels}</p>
                          <p>Жиров: ${item.fats}</p>
                          <p>Углеводов: ${item.carbohydrates}</p>
                `}
                id={item.id}
                watch={watch}
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
      {selectedProduct.length === 0
        ? (<Link to={'/add_shopping_list'} className={styles.text_dec_non}>
          <div className={styles.block__button}>
            <MyButton label={'Назад'}/>
          </div>
        </Link>)
        : (<div className={styles.block}>
            <p className={styles.title}>Вернуться</p>
            <div className={styles.block__buttons}>
              <MyButton label={'без сохранения '} click={deleteProduct}/>
              <MyButton label={'Добавить продукты'} click={addProduct}/>
            </div>
          </div>
        )
      }

    </div>
  );
};
