import React, {useState} from 'react';
import styles from "./tooltip.module.css"

export const Tooltip = ({content, children, style}) => {
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true)
  }
  const hide = () => {
    setVisible(false)
  }
  return (
    <div className={styles.tooltipWrapper}>
      {
        visible && <span className={`${styles.tooltip} ${style}`}
                         dangerouslySetInnerHTML={{__html: content}}/>
      }
      <div
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        {children}
      </div>
    </div>
  );
};
