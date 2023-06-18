import React from 'react';
import styles from "./card.module.css"

export const Card = ({name, description}) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__image_block}>
        <img className={styles.card__image} src="/images/cereals.jpg" alt="{name}"/>
      </div>
      <div className={styles.card__name}>
        <h4 className={styles.card__title}>{name}</h4>
        <p className={styles.card__text}>{description}</p>
      </div>
    </div>
  );
};
