import React from 'react';
import styles from "./myInput.module.css"
export const MyInput = ({placeholder, type, onChange}) => {
  return (
      <input
        className={styles.input}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
  );
};
