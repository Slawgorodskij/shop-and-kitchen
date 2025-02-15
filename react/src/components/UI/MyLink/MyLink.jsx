import React from 'react';
import {Link} from "react-router-dom";
import styles from "./myLink.module.css"

export const MyLink = ({link, label, addClass = '', stateName = null, setStateName: setStateName = (b) => null}) => {
    return (
        <>
            <Link
                to={link}
                className={`${styles.link} ${addClass}`}
                onClick={() => setStateName(!stateName)}
            >
                {label}
            </Link>
        </>
    );
};
