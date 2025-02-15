import {useCallback, useEffect, useState} from "react";
import styles from "./productItem.module.css";
import {MyButton} from "../UI/MyButton/MyButton.jsx";
import PropTypes from "prop-types";

export const ProductItem = ({
                                product,
                                shoppingListRendering,
                                updateQuantity,
                                removeProduct,
                                addProduct
                            }) => {
    const [quantity, setQuantity] = useState(1);
    const [isProductInList, setIsProductInList] = useState(false);

    useEffect(() => {
        const foundProduct = shoppingListRendering.find((p) => p.product_id !== null && p.product_id === product.id);
        if (foundProduct) {
            setQuantity(foundProduct.quantity);
        }
        setIsProductInList(shoppingListRendering.some((p) => p.product_id !== null && p.product_id === product.id));
    }, [shoppingListRendering, product.id]);

    const handleQuantityChange = useCallback(
        (e) => {
            const newQuantity = parseInt(e.target.value) || 1;
            setQuantity(newQuantity);
            updateQuantity(product.id, newQuantity);
        },
        [product, updateQuantity]
    );
    const handleRemoveProduct = useCallback(() => {
        removeProduct(product.id);
        setIsProductInList(false)
    }, [product.id, removeProduct]);

    const handleAddProduct = useCallback(() => {
        addProduct(product, quantity);
        setIsProductInList(true)
    }, [product, addProduct]);

    return (
        <div className={styles.product_item}>
            <span>{product.name}</span>
            {isProductInList
                ? (
                    <div className={styles.block_button}>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                            className={styles.quantity_input}
                        />
                        <MyButton
                            label="Удалить"
                            addClass={styles.button_product_remove}
                            click={handleRemoveProduct}
                        />
                    </div>
                )
                : (
                    <MyButton
                        label="Добавить"
                        addClass={styles.button_product_add}
                        click={handleAddProduct}
                    />
                )
            }
        </div>
    );
}
ProductItem.propTypes = {
    updateQuantity: PropTypes.func.isRequired,
    removeProduct: PropTypes.func.isRequired,
    addProduct: PropTypes.func.isRequired,
};
