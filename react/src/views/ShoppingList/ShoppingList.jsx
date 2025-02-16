import React, {useCallback, useEffect} from 'react';
import styles from "./shoppingList.module.css"
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import {Link} from "react-router-dom";
import {ButtonSmall} from "../../components/UI/ButtonSmall/ButtonSmall.jsx";

export const ShoppingList = () => {
    const {
        user,
        products,
        setProducts,
        shoppingListRendering,
        setShoppingListRendering
    } = useStateContext();

    useEffect(() => {
        if (user.id && shoppingListRendering.length === 0) {
            const data = {
                users_id: user.id,
            };
            axiosClient.post('/getShoppingList', data)
                .then(({data}) => {
                    setShoppingListRendering(data.data);
                })
                .catch(err => {
                    console.error('Ошибка при загрузке списка покупок:', err);
                });
        }
    }, [user]);

    const toggleChecked = (productId, isBuy) => {
        const data = {
            users_id: user.id,
            product_id: productId,
            is_buy: isBuy,
        };

        axiosClient.post('/updateShoppingList', data)
            .then(() => {
                setShoppingListRendering(
                    shoppingListRendering.map((product) =>
                        product.product_id === productId
                            ? {...product, is_buy: !product.is_buy}
                            : product
                    )
                );
            })
            .catch(err => {
                console.error('Ошибка при изменении продукта:', err);
            });
    };

    const removeProduct = useCallback((productId) => {
        const data = {
            users_id: user.id,
            id: productId,
        };
        axiosClient.post('/deleteProductOfShoppingList', data)
            .then(({data}) => {
                setShoppingListRendering(shoppingListRendering.filter((p) => p.product_id !== productId));
            })
            .catch(err => {
                console.error('Ошибка при удалении продукта:', err);
            });
    }, [shoppingListRendering, user.id, setShoppingListRendering]);

    const sortedProducts = [...shoppingListRendering].sort((a, b) => {
        if (a.is_buy && !b.is_buy) return 1;
        if (!a.is_buy && b.is_buy) return -1;
        return 0;
    });

    return (
        <div className={styles.shopping_list_page}>
            <div className={styles.top}>
                <h2>Список покупок</h2>
                <Link to={'/add_shopping_list'} className={'text_dec_non'}>
                    <ButtonSmall name={'editing'}/>
                </Link>
            </div>

            {shoppingListRendering.length === 0 &&
                <div className={styles.none__table}>
                    <p>Все необходимые Вам продукты уже приобретены.</p>
                </div>
            }

            {/* Список продуктов */}
            <div className={styles.product_list}>
                {sortedProducts.map((product) => (
                    <div key={product.id} className={styles.product_item}>
                        {/* Чекбокс для отметки "куплено" */}
                        <label className={styles.product_label}>
                            <input
                                type="checkbox"
                                checked={product.is_buy}
                                onChange={(event) => toggleChecked(product.product_id, event.target.checked)}
                                className="checkbox"
                            />

                            {/* Название и количество */}
                            <p
                                className={`${product.is_buy ? styles.checked : ''}`}
                            >
                                {product.name} ({product.quantity} {product.unit})
                            </p>

                        </label>
                        {/* Кнопка удаления */}
                        <button
                            onClick={() => removeProduct(product.product_id)}
                            className={styles.remove_button}
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
