import React, {useEffect, useState} from 'react';
import styles from "../ShoppingList/shoppingList.module.css";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import {OneNotes} from "../../components/OneNotes/OneNotes.jsx";
import {Modal} from "../../components/UI/modal/Modal.jsx";
import {ConfirmationAction} from "../../components/ConfirmationAction/ConfirmationAction.jsx";
import {ModalInformation} from "../../components/ModalInformation/ModalInformation.jsx";

const label = 'Подтверждаю';
const labelClose = 'Отмена';
const deleteProductText = 'Вы действительно хотите удалит этот продукт?';
export const Storeroom = () => {
  const {user} = useStateContext();
  const {storeroomListRendering, setStoreroomListRendering} = useStateContext();

  const [modalInformationActive, setModalInformationActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [textModal, setTextModal] = useState('');
  const [second, setSecond] = useState('');

  const deleteProduct = (data) => {
    setModalActive(true)
    const oneRow = storeroomListRendering.filter(item => item.id === data)
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
    axiosClient.post('/deleteProductOfStoreroom', request)
      .then(({data}) => {
        setTextModal(data.message)
        setSecond('5')
        setModalInformationActive(true)
        setStoreroomListRendering(storeroomListRendering.filter(item => item.id !== dataId))
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
      axiosClient.post('/storeroomListRendering', data)
        .then(({data}) => {
          setStoreroomListRendering(data.storeroomListRendering)
        })
    }
  }, [user])
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Кладовая</h2>
      {storeroomListRendering.length === 0 &&
        <div className={styles.none__table}>
          <p>В вашей кладовой к сожалению нет продуктов.</p>
        </div>
      }
      {storeroomListRendering.length > 0 &&
        <div className={styles.main}>
          {storeroomListRendering.map(oneNote =>
            <OneNotes
              key={oneNote.id}
              oneNotes={oneNote}
              deleteProduct={deleteProduct}
            />)}
        </div>
      }
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
