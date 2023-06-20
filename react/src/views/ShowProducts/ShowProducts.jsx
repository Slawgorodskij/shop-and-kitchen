import React, {useEffect, useState} from 'react';
import styles from "./showProducts.module.css"

import {Link, useNavigate, useParams} from "react-router-dom";
import {MyButton} from "../../components/UI/MyButton/MyButton.jsx";
import {useStateContext} from "../../context/ContextProvider.jsx";
import axiosClient from "../../axios-client.js";
import {Card} from "../../components/UI/Card/Card.jsx";


export const ShowProducts = () => {
  const navigate = useNavigate();
  const {typeProductId} = useParams();
  const {typeProduct, setTypeProduct} = useStateContext()
  const {products, setProducts} = useStateContext()

  const [checkedTypeProduct, setCheckedTypeProduct] = useState([])
  const [selectedProduct, setSelectedProduct] = useState([])
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

  const addSelectedProduct = (id, product) => {
    if (product['checked']) {
      const newSelectedProduct = {
        'product_id': product.id,
        'units_id': product.units_id,
        'quantity': product.default_weight,
      }
      setSelectedProduct((prevState) => [...prevState, newSelectedProduct])
    }

    if (!product['checked']) {
      setSelectedProduct(prevState => prevState.filter(obj => +obj.product_id !== +id))
    }
  }
  const checkedProduct = (event) => {
    const id = +event.target.name
    const newProducts = products.slice(0);
    let product = newProducts.find(item => +item.id === id)
    product['checked'] = event.target.checked
    setProducts(newProducts)
    addSelectedProduct(id, product)
  }

  const deleteProduct = () => {
    setSelectedProduct([])
    setProducts(products.map(product => product['checked'] = false))
    navigate('/add_shopping_list')
  }

  const addProduct = () => {
    console.log(selectedProduct)
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
