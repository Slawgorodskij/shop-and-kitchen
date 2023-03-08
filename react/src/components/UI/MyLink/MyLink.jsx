import React from 'react';
import {Link} from "react-router-dom";
import styles from "./myLink.module.css"
export const MyLink = ({link, label}) => {
  return (
    <>
      <Link
        to={link}
        className={styles.link}
      >
        {label}
      </Link>
    </>
  );
};
