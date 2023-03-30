import React from 'react';
import "./modal.css"

export const Modal = ({active, setActive, children}) => {
  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'modal__content modal__content_active' : 'modal__content'}
        onClick={event => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

