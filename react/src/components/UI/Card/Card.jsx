import React from 'react';
import styles from "./card.module.css"
import {Tooltip} from "../Tooltip/Tooltip.jsx";

export const Card = ({name, description, content, imageName = null, checked = false}) => {
  return (
    <div className={checked ? styles.card_checked : styles.card }>
      <div className={styles.card__image_block}>
        <img className={styles.card__image}
             src={imageName ? `/images/${imageName}` : '/images/image_no.jpg'}
             alt={name}/>
      </div>
      <div className={styles.card__name}>
        <Tooltip content={content}>
          <h4 className={styles.card__title}>{name}</h4>
        </Tooltip>

        <div className={styles.card__text}>
          <p className={styles.card__text}>{description}</p>
          <div>
            <button>просмотр товара</button>
            <button>удаление</button>
            <button>перенос</button>
          </div>
        </div>
      </div>
    </div>
  );
};
