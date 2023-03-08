import React from 'react';
import styles from "./myButton.module.css"
export const MyButton = ({label}) => {
  return (
    <button
      className={styles.button}
    >
      {label}
    </button>
  );
};
