import React from 'react';
import styles from "./oneNotes.module.css"

export const OneNotes = ({oneNotes, purchased, deleteProduct}) => {

  return (
    <div
      className={styles.row}
    >
      <p className={styles.title}>{oneNotes.product_name}</p>
      <p>{oneNotes.units_name}</p>
      <p>{oneNotes.quantity}</p>
      <div className={styles.block__button}>
        {purchased &&
          <svg
            onClick={() => purchased(oneNotes.id)}
            className={styles.button}
            viewBox="0 0 24 24" width="25" height="25">
            <path
              d="M22.713,4.077A2.993,2.993,0,0,0,20.41,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H1A1,1,0,0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,3,0,0,1-2.82-2h11.92a5,5,0,0,0,4.921-4.113l.785-4.354A2.994,2.994,0,0,0,22.713,4.077ZM21.4,6.178l-.786,4.354A3,3,0,0,1,17.657,13H5.419L4.478,5H20.41A1,1,0,0,1,21.4,6.178Z"/>
            <circle cx="7" cy="22" r="2"/>
            <circle cx="17" cy="22" r="2"/>
          </svg>
        }
        {deleteProduct &&
          <svg
            onClick={() => deleteProduct(oneNotes.id)}
            className={styles.button}
            x="0px" y="0px" viewBox="0 0 512.021 512.021" width="20" height="20">
            <g>
              <path
                d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z"/>
            </g>
          </svg>
        }
      </div>

    </div>
  )
};
