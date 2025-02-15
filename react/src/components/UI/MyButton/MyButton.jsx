import React from 'react';
import styles from "./myButton.module.css"

export const MyButton = ({label, addClass = '', click = null, disabled = false}) => {
    return (
        <button
            className={`${styles.button} ${addClass}`}
            disabled={disabled}
            onClick={click}
        >
            {label}
        </button>
    );
};
