import React from 'react';
import styles from "./list.module.css"

export const List = ({product, handleCheckedProduct, index}) => {
  return (
    <div
      className={index % 2 === 0 ? `${styles.block} ${styles.even_background}` : `${styles.block} ${styles.odd_background}`}
      onClick={() => handleCheckedProduct(product.id)}
    >
      {product.checked && <div className={styles.checked_block}>
        <p>{product.name} <span className={styles.big_symbol}>{product.count}</span> {product.packing} </p>
        <svg fill="#000000" width="24" height="24" viewBox="0 0 24 24">
          <path d="M19.3,5.3L9,15.6l-4.3-4.3l-1.4,1.4l5,5L9,18.4l0.7-0.7l11-11L19.3,5.3z"/>
        </svg>
      </div>}
      {!product.checked &&
        <p>{product.name} <span className={styles.big_symbol}>{product.count}</span> {product.packing}</p>}

    </div>
  )
};
