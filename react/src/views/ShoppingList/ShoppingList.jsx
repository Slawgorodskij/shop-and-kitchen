import React, {useEffect, useState} from 'react';
import styles from "./shoppingList.module.css"
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import {OneNotes} from "../../components/OneNotes/OneNotes.jsx";
import {Modal} from "../../components/UI/modal/Modal.jsx";
import {ConfirmationAction} from "../../components/ConfirmationAction/ConfirmationAction.jsx";
import {ModalInformation} from "../../components/ModalInformation/ModalInformation.jsx";
import {MyButton} from "../../components/UI/MyButton/MyButton.jsx";
import {MyLink} from "../../components/UI/MyLink/MyLink.jsx";
import {Link} from "react-router-dom";
import {Card} from "../../components/UI/Card/Card.jsx";
import {Tooltip} from "../../components/UI/Tooltip/Tooltip.jsx";

const purchasedText = 'Этот товар куплен и вы его хотите перенести в кладовую?';
const label = 'Подтверждаю';
const labelClose = 'Отмена';
const deleteProductText = 'Вы действительно хотите удалит этот товар?';
export const ShoppingList = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modalInformationActive, setModalInformationActive] = useState(false);


  const [dataModal, setDataModal] = useState({});
  const [textModal, setTextModal] = useState('');
  const [second, setSecond] = useState('');

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
      labelClose: labelClose,
      functionName: purchasedProduct,
    }
    setDataModal(dataModalRendering)
  }
  const purchasedProduct = (dataId) => {
    const oneRow = shoppingListRendering.filter(item => item.id === dataId)
    const request = {
      users_id: user.id,
      product_id: oneRow[0].product_id,
      units_id: oneRow[0].units_id,
      quantity: oneRow[0].quantity,
      shopping_list_id: oneRow[0].id,
    }
    axiosClient.post('/transferStorerooms', request)
      .then(({data}) => {
        setTextModal(data.message)
        setSecond('5')
        setModalInformationActive(true)
        setShoppingListRendering(shoppingListRendering.filter(item => item.id !== dataId))
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setTextModal(response.data.message)
          setSecond('5')
          setModalInformationActive(true)
        }
      })
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
      labelClose: labelClose,
      functionName: confirmationDeleteProduct,
    }
    setDataModal(dataModalRendering)
  }

  const confirmationDeleteProduct = (dataId) => {
    const request = {id: dataId}
    axiosClient.post('/deleteProductOfShoppingList', request)
      .then(({data}) => {
        setTextModal(data.message)
        setSecond('5')
        setModalInformationActive(true)
        setShoppingListRendering(shoppingListRendering.filter(item => item.id !== dataId))
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setTextModal(response.data.message)
          setSecond('5')
          setModalInformationActive(true)
        }
      })
    setModalActive(false)
  }
  useEffect(() => {
    if (user.id) {
      const data = {
        users_id: user.id
      }
      axiosClient.post('/shoppingListRendering', data)
        .then(({data}) => {
          console.log(data)
          setShoppingListRendering(data.arrayProducts)
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
          {shoppingListRendering.map(item =>
            <Card
              name={item.name}
              description={item.description}
              imageName={item.imageName}
              id={item.id}
              content={`<h3>На 100 гр. продукта приходится</h3>
                          <p>Каллорий: ${item.calories}</p>
                          <p>Белков: ${item.squirrels}</p>
                          <p>Жиров: ${item.fats}</p>
                          <p>Углеводов: ${item.carbohydrates}</p>
                `}
              purchased={purchased}
              deleteProduct={deleteProduct}
            />
          )}
        </div>
      }
      <Link to={'/add_shopping_list'} className={'text_dec_non'}>
        <div className={styles.block__button}>
          <MyButton label={'Добавить продукт/товар'}/>
        </div>
      </Link>
      <Modal active={modalActive} setActive={setModalActive}>
        <ConfirmationAction dataModal={dataModal} setModalActive={setModalActive}/>
      </Modal>
      <Modal active={modalInformationActive} setActive={setModalInformationActive}>
        <ModalInformation
          second={second}
          text={textModal}
          setModalInformationActive={setModalInformationActive}
          setTextModal={setTextModal}
        />
      </Modal>
    </div>
  );
};
