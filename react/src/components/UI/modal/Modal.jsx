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
        <div className={'block_button_close'}>
          <svg
            onClick={() => setActive(false)}
            className={'button_close'}
            x="0px" y="0px" viewBox="0 0 512.021 512.021" width="20" height="20">
            <g>
              <path
                d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z"/>
            </g>
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
};

