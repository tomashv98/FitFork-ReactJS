import React from 'react';
import classes from '../../App.module.css';

import nextIcon from '../../img/next.png';
import backIcon from '../../img/back.png';

const Button = ({paginate, btnType})=> {
  return (
    <button
      onClick={() => paginate(btnType)}
      className={
        btnType === 'prev'
          ? classes.results__btn__prev
          : classes.results__btn__next
      }
    >
      {/* <span>{btnNo}</span> */}
      <img src={btnType === 'prev' ? backIcon : nextIcon} alt='' />
    </button>
  );
};

export default Button;

/* <button class="btn-inline results__btn--next">
                    <span>Page 3</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>
                </button> */
