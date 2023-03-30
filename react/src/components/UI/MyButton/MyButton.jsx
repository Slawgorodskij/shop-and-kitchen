import React from 'react';
import styles from "./myButton.module.css"

export const MyButton = ({label, click = null}) => {
  return (
    <button
      className={styles.button}
      onClick={click}
    >
      {label}
    </button>
  );
};
