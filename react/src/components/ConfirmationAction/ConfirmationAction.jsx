import React from 'react';
import styles from "./confirmationActiom.module.css"
import {MyButton} from "../UI/MyButton/MyButton.jsx";

export const ConfirmationAction = ({dataModal}) => {
  return (
    <div className={styles.block}>
      <h3>Выбран продукт - "{dataModal.name}"</h3>
      <p className={styles.error}>{dataModal.text}</p>
      <MyButton
        label={dataModal.label}
        click={() => dataModal.functionName(dataModal.id)}
      />
    </div>
  );
};
