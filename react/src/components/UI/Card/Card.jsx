import React from 'react';
import styles from "./card.module.css"
import {Tooltip} from "../Tooltip/Tooltip.jsx";
import {Link} from "react-router-dom";
import {MyButton} from "../MyButton/MyButton.jsx";

import {ButtonSmall} from "../ButtonSmall/ButtonSmall.jsx";

export const Card = ({
                       name,
                       description,
                       content,
                       purchased,
                       id,
                       deleteProduct,
                       imageName = null,
                       checked = false,
                     }) => {
  return (
    <div className={checked ? styles.card_checked : styles.card}>
      <div className={styles.card__image_block}>
        <img className={styles.card__image}
             src={imageName ? `/images/${imageName}` : '/images/image_no.jpg'}
             alt={name}/>
      </div>
      <div className={styles.card__name}>
        <Tooltip content={content} style={styles.tooltip_card}>
          <h4 className={styles.card__title}>{name}</h4>
        </Tooltip>

        <div className={styles.card__block}>
          <p className={styles.card__text}>{description}</p>

          <div className={styles.button__block}>
            {purchased &&
              <ButtonSmall name={'watch'}/>
            }
            {purchased &&
              <ButtonSmall name={'purchased'} click={() => purchased(id)}/>
            }
            {deleteProduct &&
              <ButtonSmall name={'delete'} click={() => deleteProduct(id)}/>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
//className={`${styles.button} ${styles.button__delete}`}
