import React, {useEffect, useState} from 'react';
import styles from "./shoppingList.module.css"
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import {OneNotes} from "../../components/OneNotes/OneNotes.jsx";
import {Modal} from "../../components/UI/modal/Modal.jsx";
import {ConfirmationAction} from "../../components/ConfirmationAction/ConfirmationAction.jsx";

const purchasedText = 'Этот товар куплен и вы его хотите перенести в кладовую?';
const label = 'Подтверждаю';
const deleteProductText = 'Вы действительно хотите удалит этот товар?';
export const ShoppingList = () => {
  const [modalActive, setModalActive] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const {user} = useStateContext()
  const {shoppingListRendering, setShoppingListRendering} = useStateContext()

  const purchased = (data) => {
    setModalActive(true)
    const oneRow = shoppingListRendering.filter(item => item.id === data)
    const dataModalRendering = {
      id: data,
      name: oneRow[0].product_name,
      text: purchasedText,
      label: label,
      functionName: purchasedProduct,
    }
    setDataModal(dataModalRendering)
    console.log(dataModalRendering)
  }
  const purchasedProduct = (data) => {
    const oneRow = shoppingListRendering.filter(item => item.id === data)
    const response = {
      users_id: user.id,
      product_id: oneRow[0].product_id,
      units_id: oneRow[0].units_id,
      quantity: oneRow[0].quantity,
    }
    console.log(response)
    console.log(oneRow)
    console.log(shoppingListRendering)
    // axiosClient.post('/addStorerooms', response)
    //   .then(({data}) => {
    //     console.log(data)
    //   })
    setModalActive(false)
  }
  const deleteProduct = (data) => {
    setModalActive(true)
    const oneRow = shoppingListRendering.filter(item => item.id === data)
    const dataModalRendering = {
      id: data,
      name: oneRow[0].product_name,
      text: deleteProductText,
      label: label,
      functionName: confirmationDeleteProduct,
    }
    setDataModal(dataModalRendering)
    console.log(dataModalRendering)
  }

  const confirmationDeleteProduct = (data) => {
    console.log(data)
    // axiosClient.post('/deleteProductOfShoppingList', data)
    //   .then(({data}) => {
    //     console.log(data)
    //   })
    setModalActive(false)
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
      {shoppingListRendering.length === 0 &&
        <div className={styles.none__table}>
          <p>Все необходимые Вам продукты уже приобретены.</p>
        </div>
      }

      {shoppingListRendering.length > 0 &&
        <div className={styles.main}>
          {shoppingListRendering.map(oneNote =>
            <OneNotes
              key={oneNote.id}
              oneNotes={oneNote}
              purchased={purchased}
              deleteProduct={deleteProduct}
            />)}
        </div>
      }

      <Modal active={modalActive} setActive={setModalActive}>
        <ConfirmationAction dataModal={dataModal}/>
      </Modal>
    </div>
  );
};
