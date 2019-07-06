import React from 'react';
import classes from '../../App.module.css';

import nextIcon from '../../img/next.png';
import backIcon from '../../img/back.png';

const Button = props => {
  return (
    <button
      onClick={() => props.paginate(props.btnType)}
      className={
        props.btnType === 'prev'
          ? classes.results__btn__prev
          : classes.results__btn__next
      }
    >
      {/* <span>{props.btnNo}</span> */}
      <img src={props.btnType === 'prev' ? backIcon : nextIcon} alt='' />
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
