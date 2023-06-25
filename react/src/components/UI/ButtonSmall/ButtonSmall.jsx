import React from 'react';
import styles from "./buttonSmall.module.css"
import {Tooltip} from "../Tooltip/Tooltip.jsx";

export const ButtonSmall = ({name, click = null, style = ''}) => {
  return (
    <button
      className={`btn ${styles.button} ${style}`}
      onClick={click}
    >
      {name === 'purchased' && <Tooltip content={'перенести в хранилище'} style={styles.purchased}>
        <svg
          viewBox="0 0 24 24" width="25" height="25">
          <path
            d="M22.713,4.077A2.993,2.993,0,0,0,20.41,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H1A1,1,0,0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,3,0,0,1-2.82-2h11.92a5,5,0,0,0,4.921-4.113l.785-4.354A2.994,2.994,0,0,0,22.713,4.077ZM21.4,6.178l-.786,4.354A3,3,0,0,1,17.657,13H5.419L4.478,5H20.41A1,1,0,0,1,21.4,6.178Z"/>
          <circle cx="7" cy="22" r="2"/>
          <circle cx="17" cy="22" r="2"/>
        </svg>
      </Tooltip>
      }
      {name === 'delete' && <Tooltip content={'удалить'} style={styles.delete}>
        <svg
          x="0px" y="0px" viewBox="0 0 512.021 512.021" width="20" height="20">
          <g>
            <path
              d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z"/>
          </g>
        </svg>
      </Tooltip>}
      {name === 'watch' && <Tooltip content={'посмотреть продукт/товар'} style={styles.watch}>
        <svg
          x="0px" y="0px" viewBox="0 0 512 512" width="25" height="25" >
          <path
            d="M508.177,245.995C503.607,240.897,393.682,121,256,121S8.394,240.897,3.823,245.995c-5.098,5.698-5.098,14.312,0,20.01 C8.394,271.103,118.32,391,256,391s247.606-119.897,252.177-124.995C513.274,260.307,513.274,251.693,508.177,245.995z M256,361 c-57.891,0-105-47.109-105-105s47.109-105,105-105s105,47.109,105,105S313.891,361,256,361z"></path>
          <path
            d="M271,226c0-15.09,7.491-28.365,18.887-36.53C279.661,184.235,268.255,181,256,181c-41.353,0-75,33.647-75,75 c0,41.353,33.647,75,75,75c37.024,0,67.668-27.034,73.722-62.358C299.516,278.367,271,255.522,271,226z"></path></svg>
      </Tooltip>}
    </button>
  );
};
