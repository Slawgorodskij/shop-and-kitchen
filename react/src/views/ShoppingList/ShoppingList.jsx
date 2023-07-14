import React, {useEffect, useState} from 'react';
import styles from "./shoppingList.module.css"
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import {Modal} from "../../components/UI/modal/Modal.jsx";
import {ConfirmationAction} from "../../components/ConfirmationAction/ConfirmationAction.jsx";
import {ModalInformation} from "../../components/ModalInformation/ModalInformation.jsx";
import {MyButton} from "../../components/UI/MyButton/MyButton.jsx";
import {Link, useNavigate} from "react-router-dom";
import {Card} from "../../components/UI/Card/Card.jsx";

import {ButtonSmall} from "../../components/UI/ButtonSmall/ButtonSmall.jsx";
import {changeItemArray, checkedProduct} from "../../utils/shoppingList.js";
import {List} from "../../components/List/List.jsx";

const purchasedText = 'Этот товар куплен и вы его хотите перенести в кладовую?';
const label = 'Подтверждаю';
const labelClose = 'Отмена';

export const ShoppingList = () => {
    const navigate = useNavigate();
    const {user} = useStateContext()
    const {shoppingListRendering, setShoppingListRendering} = useStateContext()
    const [listTypeRendering, setListTypeRendering] = useState(true)
    const [selectedProduct, setSelectedProduct] = useState([])
    const [removeData, setRemoveData] = useState(false)
    const [loading, setLoading] = useState(false)

    const [modalActive, setModalActive] = useState(false);
    const [modalInformationActive, setModalInformationActive] = useState(false);

    const [dataModal, setDataModal] = useState({});
    const [textModal, setTextModal] = useState('');
    const [second, setSecond] = useState('');


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

    useEffect(() => {
        const product = JSON.parse(localStorage.getItem('selectedProduct'))

        if (user.id && shoppingListRendering.length === 0) {
          setLoading(true)
          const data = {
            users_id: user.id,
          }
          axiosClient.post('/getShoppingList', data)
            .then(({data}) => {
              console.log('test')
              if (product) {
                setSelectedProduct(product)
                updateShoppingList(data.data, product)
              } else {
                setShoppingListRendering(data.data)
              }
              setLoading(false)
            })
        } else if (product) {
          setSelectedProduct(product)
          updateShoppingList(shoppingListRendering, product)
        }
      }, [user]
    )

    useEffect(() => {
      if (selectedProduct.length > 0) localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
    }, [selectedProduct])

    const changeSelectedProduct = (id, product) => {
      setSelectedProduct(prevState => changeItemArray(prevState, id, product))
    }

    const updateShoppingList = (shoppingList, selectProduct) => {
      if (shoppingList.length > 0) {
        for (let key in selectProduct) {
          const [newArray] = checkedProduct({id: selectProduct[key]['product_id'], checkedElem: true,}, shoppingList)
          setShoppingListRendering(newArray)
        }
      }
    }
    const handleCheckedProduct = (id) => {
      const [newArray, product] = checkedProduct({id: id,}, shoppingListRendering)
      setShoppingListRendering(newArray)
      changeSelectedProduct(+id, product)
    }
    const addProduct = () => {
      const product = JSON.parse(localStorage.getItem('selectedProduct'))
      console.log(product)
    }
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          {listTypeRendering
            ? <ButtonSmall name={'tile'} click={() => setListTypeRendering(false)}/>
            : <ButtonSmall name={'list'} click={() => setListTypeRendering(true)}/>}

          <h2>Список покупок</h2>

          <Link to={'/shopping_list_editing'} className={'text_dec_non'}>
            <ButtonSmall name={'editing'}/>
          </Link>
        </div>


        {shoppingListRendering.length === 0 &&
          <div className={styles.none__table}>
            <p>Все необходимые Вам продукты уже приобретены.</p>
          </div>
        }

        {shoppingListRendering.length > 0 &&
          <div className={styles.main}>
            {listTypeRendering ?
              <div>
                {shoppingListRendering.map((item, index) =>
                  <List
                    product={item}
                    handleCheckedProduct={handleCheckedProduct}
                    index={index}
                  />
                )}
              </div>
              :
              <div>
                {shoppingListRendering.map((item, index) =>
                  <p>{item.name}</p>
                )}
              </div>

            }

          </div>
        }

        <MyButton label={'Добавить продукты'} click={addProduct}/>

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
  }
;
