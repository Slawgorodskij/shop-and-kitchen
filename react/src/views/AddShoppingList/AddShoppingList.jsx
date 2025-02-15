import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styles from "./addShoppingList.module.css"
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import {MyButton} from "../../components/UI/MyButton/MyButton.jsx";
import HorizontalScroll from "../../components/HorizontalScroll/HorizontalScroll.jsx";
import {ProductItem} from "../../components/ProductItem/ProductItem.jsx";

export const AddShoppingList = () => {

    const {
        user,
        typeProduct,
        setTypeProduct,
        categoryProduct,
        setCategoryProduct,
        products,
        setProducts,
        shoppingListRendering,
        setShoppingListRendering
    } = useStateContext();


    const [activeButtonType, setActiveButtonType] = useState(0);
    const [activeButtonCategory, setActiveButtonCategory] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = useMemo(() => {
        return products.filter(product =>
            (activeButtonType === 0 || product.type_goods_id === activeButtonType) && // Проверяем type_goods_id только если activeButtonType !== 0
            (activeButtonCategory === 0 || product.categories_products_id === activeButtonCategory) && // Проверяем categories_products_id только если activeButtonCategory !== 0
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Поиск по имени
        );
    }, [products, searchQuery, activeButtonCategory, activeButtonType]);

    const filteredCategoriesProducts = useMemo(() => {
        return categoryProduct.filter(category => category.type_goods_id === activeButtonType);
    }, [categoryProduct, activeButtonType]);

    useEffect(() => {
        axiosClient.get('/getDataProduct')
            .then(({data}) => {
                setTypeProduct(data.typeGoods);
                setCategoryProduct(data.categoriesProduct);
                setProducts(data.products);
            })
            .catch(err => {
                console.error('Ошибка при загрузке данных:', err);
            });
    }, [setTypeProduct, setCategoryProduct, setProducts]);

    useEffect(() => {
        if (user.id) {
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

    const filteredType = useCallback((id) => {
        setActiveButtonType(id);
        setActiveButtonCategory(0);
    }, []);

    const filteredCategories = useCallback((id) => {
        setActiveButtonCategory(id);
    }, []);

    const addProduct = useCallback((product, quantity = 1) => {
        if (!shoppingListRendering.some((p) => p.product_id === product.id)) {
            const data = {
                users_id: user.id,
                product_id: product.id,
                units_id: product.units_id,
                quantity: quantity
            };
            axiosClient.post('/addShoppingList', data)
                .then(({data}) => {
                    // TODO надо сделать на сервере
                    const filteredProduct = {...product}
                    delete filteredProduct.id;
                    delete filteredProduct.created_at;
                    delete filteredProduct.updated_at;
                    const newNotes = {...filteredProduct, ...data.shoppingList}

                    setShoppingListRendering([...shoppingListRendering, newNotes]);

                })
                .catch(err => {
                    console.error('Ошибка при добавлении продукта:', err);
                });
        }
    }, [shoppingListRendering, user.id, setShoppingListRendering]);

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

    const updateQuantity = useCallback((productId, quantity) => {
        const data = {
            users_id: user.id,
            product_id: productId,
            quantity: parseInt(quantity)
        };
        console.log(data)
        axiosClient.post('/addShoppingList', data)
            .then(() => {
                setShoppingListRendering(
                    shoppingListRendering.map((p) =>
                        p.product_id === productId ? {...p, quantity: parseInt(quantity) || 1} : p)
                );
            })
            .catch(err => {
                console.error('Ошибка при обновлении количества:', err);
            });
    }, [shoppingListRendering, user.id, setShoppingListRendering]);


    return (
        <div className={`${styles.manual_page} `}>
            <div>
                <div className={styles.categories}>
                    {typeProduct.map((p) => (
                        <MyButton
                            key={p.id}
                            label={p.name}
                            click={() => filteredType(p.id)}
                            addClass={activeButtonType === p.id ? `${styles.button} ${styles.button_active}` : styles.button}
                        />
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Найти продукт..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.search_input}
                />
                <div className={styles.categories}>
                    <HorizontalScroll>
                        {filteredCategoriesProducts.map((c) => (
                            <MyButton
                                key={c.id}
                                label={c.category_name}
                                click={() => filteredCategories(c.id)}
                                addClass={activeButtonCategory === c.id ? `${styles.button_category} ${styles.button_active}` : styles.button_category}
                            />
                        ))}
                    </HorizontalScroll>
                </div>

                {/* Список продуктов */}
                <div className={styles.product_list}>
                    {filteredProducts.map((product) => (
                        <ProductItem
                            key={'product_item_' + product.id}
                            product={product}
                            shoppingListRendering={shoppingListRendering}
                            updateQuantity={updateQuantity}
                            removeProduct={removeProduct}
                            addProduct={addProduct}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.block_selected_products}>
                <h3 className={styles.selected_title}>Текущий список:</h3>
                {/* Текущий список */}
                <div className={styles.selected_products}>
                    {shoppingListRendering.map((product) => (
                        <div
                            key={product.id}
                            className={styles.selected_product}
                        ><span>{product.name} ({product.quantity} шт.)</span>
                            <div className={styles.block_button}>
                                <input
                                    type="number"
                                    value={product.quantity}
                                    onChange={(e) => updateQuantity(product.product_id, e.target.value)}
                                    min="1"
                                    className={styles.quantity_input}
                                />
                                <MyButton
                                    key={product.id}
                                    label="Удалить"
                                    addClass={styles.button_product_remove}
                                    click={() => removeProduct(product.product_id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
