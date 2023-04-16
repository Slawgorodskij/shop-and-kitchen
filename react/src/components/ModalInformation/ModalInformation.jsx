import React, {useEffect, useState} from 'react';
import styles from "./modalInformation.module.css"

export const ModalInformation = ({second, text, setModalInformationActive, setTextModal}) => {
  const [counter, setCounter] = useState(0)


  useEffect(() => {
    if (text !== '') {
      setCounter(+second)
    }
  }, [text])


  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    counter === 0 && setModalInformationActive(false);
    counter === 0 && setTextModal('');
  }, [counter])


  return (
    <div className={styles.block}>
      <p className={styles.error}>{text}</p>
      <p className={styles.error}>{counter}</p>
    </div>
  );
};
